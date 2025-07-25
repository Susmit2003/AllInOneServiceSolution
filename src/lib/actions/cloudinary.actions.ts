'use server';

import cloudinary from '@/lib/cloudinary';

/**
 * Uploads an image to Cloudinary.
 * @param fileDataUri The image file as a Base64 encoded Data URI.
 * @param folder The Cloudinary folder to upload the image to.
 * @returns An object with the public_id and secure_url, or an error object.
 */
export async function uploadImage(fileDataUri: string, folder: string): Promise<{ public_id: string, secure_url: string } | { error: string }> {
  try {
    const result = await cloudinary.uploader.upload(fileDataUri, {
      folder: `handyconnect/${folder}`, // Root folder for the app for better organization
    });

    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return { error: 'Failed to upload image.' };
  }
}

/**
 * Deletes an image from Cloudinary.
 * @param publicId The public_id of the image to delete.
 * @returns A success object or an error object.
 */
export async function deleteImage(publicId: string): Promise<{ success: boolean } | { error: string }> {
    try {
        await cloudinary.uploader.destroy(publicId);
        return { success: true };
    } catch (error) {
        console.error('Cloudinary delete error:', error);
        return { error: 'Failed to delete image.' };
    }
}
