import fs from "fs/promises";
import { join } from "path";

export const handleFile = async (imageData, file) => {
  const imageBuffer = Buffer.from(imageData, "base64");
  const timestamp = Date.now();
  const filename = `${file}_${timestamp}.jpg`;

  const imagePath = join(process.cwd(), "uploads", file, filename);
  await fs.writeFile(imagePath, imageBuffer);
  const imageUrl = `${process.env.SERVER_BASE_URL}/uploads/${file}/${filename}`;
  return imageUrl;
};

export const handleFileRemove = async (imageUrl, file) => {
  const imageName = imageUrl.split("/").slice(-1)[0];
  const imagePath = join(process.cwd(), "uploads", file, imageName);
  await fs.unlink(imagePath);
};
