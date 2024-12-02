const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_SENDER_MAIL,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

async function OtpSender(otp, email) {
  
  const info = await transporter.sendMail({
    from: `"Maddison Foo Koch 👻" <${process.env.EMAIL_SENDER_MAIL}>`,
    to: email,
    subject: "Hello ✔ check OTP:",
    text: "Hello Thare is your OTP",
    html: `<b>Your OTP is ${otp}</b>`,
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = OtpSender;