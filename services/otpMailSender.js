const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_SENDER_MAIL,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

async function OtpSender(otp, email) {
  
  const info = await transporter.sendMail({
    from: `"ShoppersStop OTP 👻" <${process.env.EMAIL_SENDER_MAIL}>`,
    to: email,
    subject: `Hello ✔ check OTP: ${otp}`,
    text: "Hello Thare is your OTP",
    html: `<b>Your OTP is ${otp}</b><br><br>
    <p style="color:red; font-weight:bold;">
      Warning: Do not share your OTP with anyone. Our team will never ask you for it.
    </p>`,
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = OtpSender;