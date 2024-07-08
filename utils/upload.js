const multer = require("multer")
const { v4: uuid } = require("uuid")
const path = require("path")



const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        const fileName = uuid() + path.extname(file.originalname)
        cb(null, fileName)
    },

})



module.exports = multer({ storage: storage }).single("hero")