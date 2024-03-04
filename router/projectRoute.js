const { getProject, addProject, updateProject, deleteProject, getAllProject } = require("../controller/projectController")


const router = require("express").Router()
router
    .get("/", getAllProject)
    .post("/add", addProject)
    .put("/update/:id", updateProject)
    .delete("/delete/:id", deleteProject)
module.exports = router