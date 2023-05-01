export const handleFile = (data) => {
  const FILENAME = Date.now();
  const FILE_URL = `${process.env.SERVER_BASE_URL}/${FILENAME}`;
  return FILE_URL;
};
