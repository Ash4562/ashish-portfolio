const asyncHandler = require("express-async-handler")
const validator = require("validator")
const fs = require("fs/promises")
const path = require("path")
const project = require("../model/project")
const upload = require("../utils/upload")



exports.getAllProject = asyncHandler(async (req, res) => {

    const result = await project.find()

    res.json({ message: "Project Fetch Success", result })
})



exports.addProject = asyncHandler(async (req, res) => {

    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message || "Unable to upload" });
        }

        if (req.file) {
            await project.create({ ...req.body, hero: req.file.filename });
        } else {
            await project.create(req.body);
        }

        res.status(201).json({ message: "Project Add Successfully" });
    });
});


exports.deleteProject = asyncHandler(async (req, res) => {
    const { id } = req.params

    const result = await project.findById(id)

    await fs.unlink(path.join(__dirname, "..", "projectimg", result.hero))

    await project.findByIdAndDelete(id)

    res.status(200).json({ message: "Project Delete Success" })
})



exports.updateProject = asyncHandler(async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ message: err.message || "unable to upload" })
        }

        const { id } = req.params
        const result = await project.findById(id)

        if (req.file) {
            //Delete Previous image and upload new image
            await fs.unlink(path.join(__dirname, "..", "projectimg", result.hero)) //Delete
            //upload
            await project.findByIdAndUpdate(id, { ...req.body, hero: req.file.filename })
        } else {
            await project.findByIdAndUpdate(id, req.body)
        }

        res.status(200).json({ message: "Project Update Success" })
    })

})