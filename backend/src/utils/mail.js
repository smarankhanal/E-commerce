import nodemailer from "nodemailer";
import dns from "dns";

// ==============================
// Nodemailer Transporter
// ==============================
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // STARTTLS

  // Force IPv4
  lookup: (hostname, options, callback) => {
    dns.lookup(hostname, { family: 4 }, callback);
  },

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
});

// ==============================
// Verify SMTP connection
// ==============================
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP VERIFY ERROR:", error);
  } else {
    console.log("SMTP SERVER READY:", success);
  }
});

// ==============================
// Send OTP Email
// ==============================
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

  const mailOptions = {
    from: `"Your E-Commerce App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject,

    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>${title}</title>
        </head>

        <body
          style="
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            font-family: Arial, sans-serif;
          "
        >
          <div
            style="
              max-width: 600px;
              margin: 40px auto;
              background-color: #ffffff;
              padding: 30px;
              border-radius: 10px;
            "
          >
            <h2>${title}</h2>

            <p>${message}</p>

            <div
              style="
                font-size: 32px;
                font-weight: bold;
                letter-spacing: 8px;
                margin: 25px 0;
              "
            >
              ${otp}
            </div>

            <p>
              This OTP will expire in <strong>5 minutes</strong>.
            </p>

            <p>
              If you did not request this OTP, please ignore this email.
            </p>
          </div>
        </body>
      </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);

    console.log("OTP EMAIL SENT:", {
      messageId: info.messageId,
      email,
      purpose,
    });

    return info;
  } catch (error) {
    console.error("OTP EMAIL ERROR:", error);

    throw error;
  }
};
