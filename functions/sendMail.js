const nodemailer = require("nodemailer");

const sendMail = async (email, otp)=>{
  let createAccount = await nodemailer.createTestAccount();
  
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'romaine22@ethereal.email',
        pass: 'QANYq229AHM4VH8cUb'
      }
    });

    const info = await transporter.sendMail({
      from: 'chinmoypathak1123@gmail.com',
      to: "kashyapdas2234@gmail.com",
      subject: "OTP Verification for Password Forgot",
      text: `Your otp is ${otp}`,
      html: "<b>Paste it to reset the password</b>", // HTML body
    });

  return info;
}

module.exports = sendMail;