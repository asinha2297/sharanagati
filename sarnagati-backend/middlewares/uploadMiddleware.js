

const multer = require("multer"); const path = require("path");

const storage = multer.diskStorage({ destination: (req, file, cb) => cb(null, "uploads/"), 
    filename: (req, file, cb) => { const unique = Date.now() + path.extname(file.originalname); 
        cb(null, unique); } });

const fileFilter = (req, file, cb) => { const allowed = /jpg|jpeg|png/; 
    const ext = allowed.test(path.extname(file.originalname).toLowerCase()); 
    const mime = allowed.test(file.mimetype);

if (ext && mime) return cb(null, true);

cb(new Error("Only image files allowed")); };

const upload = multer({ storage, limits: { fileSize: 3 * 1024 * 1024 }, fileFilter });

module.exports = upload;