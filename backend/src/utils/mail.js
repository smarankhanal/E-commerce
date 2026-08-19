import nodemailer from "nodemailer";
import dns from "dns";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,

  lookup: (hostname, options, callback) => {
    dns.lookup(hostname, { family: 4 }, callback);
  },

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOtpMail = async (email, otp, purpose) => {
  let subject;
  let title;
  let message;

  if (purpose === "registration") {
    subject = "Verify Your Email";
    title = "Email Verification";
    message = "Use this OTP to complete your registration.";
  } else if (purpose === "forgot-password") {
    subject = "Reset Your Password";
    title = "Password Reset";
    message = "Use this OTP to reset your password.";
  } else {
    throw new Error("Invalid OTP purpose");
  }

  await transporter.sendMail({
    from: `"Your E-Commerce App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject,
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>${title}</h2>
        <p>${message}</p>
        <h1>${otp}</h1>
        <p>This OTP will expire in 5 minutes.</p>
        <p>If you did not request this OTP, please ignore this email.</p>
      </div>
    `,
  });
};
