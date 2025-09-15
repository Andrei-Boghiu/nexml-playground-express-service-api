import multer from "multer";

const allowedTypes = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
];

const storage = multer.memoryStorage(); // store in memory for S3 upload

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (_req, file, cb) => {
    const accept = allowedTypes.includes(file.mimetype);
    cb(null, accept);
  },
});

export default upload;
