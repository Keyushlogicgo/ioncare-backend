import { mailTransport } from "../config/mailTransport.js";
import fs from "fs";
import { join } from "path";

export const sendMail = async (to, subject, dynamicData, filename) => {
  let html = fs.readFileSync(
    join(process.cwd(), "pages", "mail", filename),
    "utf-8"
  );
  Object.keys(dynamicData).forEach((key) => {
    const regex = new RegExp(`\\{\\{${key}\\}\\}`, "g");
    html = html.replace(regex, dynamicData[key]);
  });

  const result = await mailTransport.sendMail(
    {
      from: process.env.MAIL_FROM,
      to: to,
      subject: subject,
      html: html,
    },
    async (err, info) => {
      if (err) {
        return err.message;
      }
    }
  );
  return result;
};
