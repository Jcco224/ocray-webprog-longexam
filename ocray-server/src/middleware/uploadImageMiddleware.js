import multer from 'multer';
import { fileTypeFromBuffer } from 'file-type';

const allowedImageTypes = new Set(['image/jpeg', 'image/png', 'image/webp']);

const uploadImageMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (_request, file, callback) => {
    if (allowedImageTypes.has(file.mimetype)) {
      callback(null, true);
      return;
    }

    const error = new Error('Only JPEG, PNG, and WebP images are allowed.');
    error.status = 400;
    callback(error);
  },
});

export default uploadImageMiddleware;

export async function validateUploadedImage(req, _res, next) {
  if (!req.file) return next();

  try {
    const detectedType = await fileTypeFromBuffer(req.file.buffer);
    if (!detectedType || !allowedImageTypes.has(detectedType.mime) || detectedType.mime !== req.file.mimetype) {
      const error = new Error('File content must be a real JPEG, PNG, or WebP image.');
      error.status = 400;
      return next(error);
    }
    return next();
  } catch {
    const error = new Error('Could not read the uploaded image.');
    error.status = 400;
    return next(error);
  }
}
