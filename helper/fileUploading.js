import fs from "fs/promises";
import path from "path";

export const handleFile = async (imageData, file) => {
  const imageBuffer = Buffer.from(imageData, "base64");

  // Create a unique filename for the image
  const timestamp = Date.now();
  const filename = `${file}_${timestamp}.jpg`;

  // Save the image to the uploads folder
  const imagePath = path.join(process.cwd(), "upload", file, filename);
  await fs.writeFile(imagePath, imageBuffer);
  const imageUrl = `${process.env.SERVER_BASE_URL}/uploads/${file}/${filename}`;
  return imageUrl;
};
