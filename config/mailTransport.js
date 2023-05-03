import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS } = process.env;

const smtpConfig = {
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: true,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
};
export const mailTransport = nodemailer.createTransport(smtpConfig);
