const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

const sendOTP = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: "Email Verification OTP",

      html: `
            <h2>Email Verification</h2>
            <p>Your OTP is:</p>
            <h1>${otp} </h1>
            <p>This OTP is valid for 5 minutes. </p>
            `,
    });
    console.log("OTP Email Sent");
  } catch (error) {
    console.log(error)
  }
};


module.exports=sendOTP
