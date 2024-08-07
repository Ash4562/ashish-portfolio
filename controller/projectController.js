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
        console.log(req.file);
        const { secure_url } = await cloudinary.uploader.upload(req.file.path);
        const result = await Project.create({ ...req.body, hero: secure_url });
        res.status(201).json({ message: "Project added successfully", result });

    });
});


// exports.adminDeleteProduct = asyncHandler(async (req, res) => {
//     const { deleteId } = req.params
//     const result = await Product.findById(deleteId)
//     const str = result.images.split("/")
//     const img = str[str.length - 1].split(".")[0]
//     await cloudinary.uploader.destroy(img)
//     await Product.findByIdAndDelete(deleteId)
//     res.json({ message: "Product Delete Success" })
// })

exports.deleteProject = asyncHandler(async (req, res) => {
    const { id } = req.params

    const result = await Project.findById(id)
    const str = result.hero.split("/")
    const img = str[str.length - 1].split(".")[0]
    await cloudinary.uploader.destroy(img)

    // await fs.unlink(path.join(__dirname, "..", "projectimg", result.hero))

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