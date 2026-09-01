import nodemailer from "nodemailer";

// Create a reusable transporter for sending emails.
const transporter = nodemailer.createTransport({
  // service: "gmail",
  // auth: {
  //   user: process.env.EMAIL_USER,
  //   pass: process.env.EMAIL_PASS,
  // },
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send OTP email
export const sendOtpMail = async (email, otp, purpose) => {
  let subject;
  let title;
  let message;

  // Different email content depending on why the OTP was requested
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

  const mailOptions = {
    from: `"Your E-Commerce App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject,

    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>${title}</h2>

        <p>${message}</p>

        <h1>${otp}</h1>

        <p>This OTP will expire in 5 minutes.</p>

        <p>
          If you did not request this OTP, please ignore this email.
        </p>
      </div>
    `,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};
