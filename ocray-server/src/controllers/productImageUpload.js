import cloudinary from '../config/cloudinary.js';

export function uploadImageBuffer(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'bulldogs-exchange/products', resource_type: 'image' },
      (error, image) => (error ? reject(error) : resolve(image)),
    );
    stream.end(buffer);
  });
}

export function normalizeProductInput(body) {
  const input = { ...body };
  if (typeof input.descriptions === 'string') input.descriptions = [input.descriptions];
  if (input.price !== undefined) input.price = Number(input.price);
  if (input.stockQuantity !== undefined) input.stockQuantity = Number(input.stockQuantity);
  if (input.isFeatured !== undefined) input.isFeatured = input.isFeatured === true || input.isFeatured === 'true';
  if (input.isActive !== undefined) input.isActive = input.isActive === true || input.isActive === 'true';
  if (input.supplier === '') input.supplier = null;
  return input;
}

export async function productInputWithImage(body, file) {
  const input = normalizeProductInput(body);
  if (file) {
    try {
      const image = await uploadImageBuffer(file.buffer);
      input.imageKey = image.secure_url;
      input.imagePublicId = image.public_id;
    } catch (error) {
      console.error('Product image upload failed:', error);
      const uploadError = new Error('Image upload failed. Please try again.');
      uploadError.status = 500;
      throw uploadError;
    }
  }
  return input;
}
