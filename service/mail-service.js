import nodemailer from "nodemailer";
import { User } from "../models/index.js";
import { HttpError } from "../helpers/index.js";

const { UKR_NET_HOST, UKR_NET_PORT, UKR_NET_EMAIL, UKR_NET_PASSWORD } = process.env;

const nodemailerConfig = {
  host: UKR_NET_HOST,
  port: UKR_NET_PORT,
  secure: true,
  auth: {
    user: UKR_NET_EMAIL,
    pass: UKR_NET_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendMail = async (to, link) => {
  const email = {
    from: UKR_NET_EMAIL,
    to,
    subject: "Verifying email",
    text: "",
    html: `
    <div>
      <a href="${link}">Click to verify email</a>
    </div>
    `,
  };

  await transport.sendMail(email);
};

export default {
  sendMail,
};
