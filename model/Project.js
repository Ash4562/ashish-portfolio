const mongoose = require("mongoose")
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    hero: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },

}, { timestamps: true })

module.exports = mongoose.model("project", projectSchema)