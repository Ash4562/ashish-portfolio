const express = require("express")
const cors = require("cors")
require("dotenv").config({ path: "./.env" })
const path = require("path")
const { default: mongoose } = require("mongoose")



const app = express()
app.use(express.json())
app.use(express.static("projectimg"))
app.use(express.static(path.join(__dirname, "dist")))
app.use(cors({
    origin: "http://localhost:5173"
}))
app.use("/api/user", require("./router/emailRouters"))
app.use("/api/project", require("./router/projectRoute"))


app.use("*", (req, res) => {
    // res.status(404).json({ message: "Resource Not Found" })
    res.sendFile(path.join(__dirname, "dist", "index.html"))
})


app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message || "something went wrong" })
})


mongoose.connect(process.env.MONGO_URL)


mongoose.connection.once("open", () => {
    console.log("momgo connected")
    app.listen(process.env.PORT, console.log("server running"))
})