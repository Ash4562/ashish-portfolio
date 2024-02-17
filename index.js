const express = require("express")
const cors = require("cors")
require("dotenv").config({ path: "./.env" })
const path = require("path")



const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, "dist")))
app.use(cors({
    origin: "http://localhost:5173"
}))
app.use("/api/user", require("./router/emailRouters"))


app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"))
})


app.listen(process.env.PORT, console.log("server running"))