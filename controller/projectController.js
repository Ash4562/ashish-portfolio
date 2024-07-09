const asyncHandler = require("express-async-handler")
const validator = require("validator")
const fs = require("fs/promises")
const path = require("path")
const upload = require("../utils/upload")
const Project = require("../model/Project")
const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: process.env.CLOUNDNARY_CLOUD_NAME,
    api_key: process.env.CLOUNDNARY_CLOUD_KEY,
    api_secret: process.env.CLOUNDNARY_CLOUD_SECRET,
})
exports.getAllProject = asyncHandler(async (req, res) => {

    const result = await Project.find()

    res.json({ message: "Project Fetch Success", result })
})



exports.addProject = asyncHandler(async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: err.message || "Unable to upload" });
        }

        try {
            const { secure_url } = await cloudinary.uploader.upload(req.file.path);
            const result = await Project.create({ ...req.body, hero: secure_url });
            res.status(201).json({ message: "Project added successfully", result });
        } catch (error) {
            res.status(500).json({ message: error.message || "Internal Server Error" });
        }
    });
});



exports.deleteProject = asyncHandler(async (req, res) => {
    const { id } = req.params

    const result = await Project.findById(id)

    await fs.unlink(path.join(__dirname, "..", "projectimg", result.hero))

    await Project.findByIdAndDelete(id)

    res.status(200).json({ message: "Project Delete Success" })
})



exports.updateProject = asyncHandler(async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log(err)
            return res.status(400).json({ message: err.message || "unable to upload" })
        }

        const { id } = req.params
        const result = await Project.findById(id)

        if (req.file) {
            //Delete Previous image and upload new image
            await fs.unlink(path.join(__dirname, "..", "projectimg", result.hero)) //Delete
            //upload
            await Project.findByIdAndUpdate(id, { ...req.body, hero: req.file.filename })
        } else {
            await Project.findByIdAndUpdate(id, req.body)
        }

        res.status(200).json({ message: "Project Update Success" })
    })

})