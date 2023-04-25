export const successResponse = (res, statusCode, message, data, count) => {
  res.status(statusCode).json({ message: message, data: data, count: count });
};
export const errorResponse = (res, statusCode, message) => {
  res.status(statusCode).json({ message: message });
};
export const validateResponse = (res, error) => {
  var arrOjb = { message: "error" };
  error.details.map((item, key) => {
    const { path, message } = item;
    arrOjb = { ...arrOjb, [path]: message };
  });
  res.status(400).json(arrOjb);
};
