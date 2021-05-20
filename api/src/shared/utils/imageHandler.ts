import awsFileHandler from './awsFileHandler';
/**
 * @param  {Buffer} buffer image buffer
 * @param  {string} imageName image name
 * @returns Promise
 */
export const uploadImage = async (buffer: Buffer, imageName: string): Promise<string> => {
  // upload image inside a public folder
  const key = `public/${imageName}`;
  return await awsFileHandler.uploadFile(buffer, key);
};

export const deleteImage = async (imageName: string): Promise<string> => {
  const key = `public/${imageName}`;
  return await awsFileHandler.fileDelete(key);
};

export default { uploadImage, deleteImage };
