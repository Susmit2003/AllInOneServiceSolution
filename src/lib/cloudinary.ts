import { v2 as cloudinary } from 'cloudinary';

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || cloudName.includes('<YOUR_CLOUD_NAME>')) {
  throw new Error('Cloudinary Cloud Name is not configured. Please set CLOUDINARY_CLOUD_NAME in your .env.local file.');
}
if (!apiKey || apiKey.includes('<YOUR_API_KEY>')) {
  throw new Error('Cloudinary API Key is not configured. Please set CLOUDINARY_API_KEY in your .env.local file.');
}
if (!apiSecret || apiSecret.includes('<YOUR_API_SECRET>')) {
    throw new Error('Cloudinary API Secret is not configured. Please set CLOUDINARY_API_SECRET in your .env.local file.');
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true,
});

export default cloudinary;
