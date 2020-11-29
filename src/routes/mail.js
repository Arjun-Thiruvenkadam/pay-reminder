const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

router.post("/", (request, response) => {
  const receiver = request.body.email;
  const message = request.body.message;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: receiver,
    subject: "Reminder for due",
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      response.send(error);
    } else {
      response.send(info);
    }
  });
});

module.exports = router;
