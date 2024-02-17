const express = require("express")
const cors = require("cors")
require("dotenv").config({ path: "./.env" })
const app = express()
const path = require("path")
require("dotenv").config({ path: "./.env" })


app.use(express.json())
// app.use(path.join(__dirname, "dist"))
app.use(cors({
    origin: "http://localhost:5173"
}))
app.use("/api/user", require("./router/emailRouters"))


// app.use("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "dist", "index.html"))
// })


app.listen(5000, console.log("server running"))