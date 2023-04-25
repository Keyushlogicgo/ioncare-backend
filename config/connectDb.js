import mongoose from "mongoose";

export const connectDb = (url) => {
  try {
    mongoose.connect(url);
    console.log("Database connect successfully");
  } catch (error) {
    console.log("error ==>", error);
  }
};
