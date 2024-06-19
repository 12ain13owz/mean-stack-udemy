const multer = require("multer");
const fs = require("fs");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    const path = "server/images";
    let error = new Error("Invalid mime type");

    if (isValid) error = null;

    fs.mkdirSync(path, { recursive: true });
    cb(error, path);
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .replace(/\.[^.]+$/, "") // ตัดนามสกุลไฟล์ออก
      .replace(/\s+/g, "-"); // แทนที่ช่องว่างด้วยขีด
    const ext = MIME_TYPE_MAP[file.mimetype];

    cb(null, name + "-" + Date.now() + "." + ext);
    cb(null, `${name}-${Date.now()}.${ext}`);
  },
});

module.exports = multer({ storage }).single("image");
