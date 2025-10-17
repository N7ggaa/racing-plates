﻿import multer from "multer";
import path from "path";
import fs from "fs";
const uploadDir = "media";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } }).single("file");

export const uploadFile = (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    if (!req.file) return res.status(400).json({ message: "No file" });
    return res.json({ success: true, filename: req.file.filename, url: `/media/${req.file.filename}` });
  });
};
