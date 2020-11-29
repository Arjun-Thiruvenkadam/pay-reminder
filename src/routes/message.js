const express = require("express");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const router = express.Router();

router.post("/", (request, response) => {
  const message = request.body.message;
  const phone = request.body.phone;
  client.messages
    .create({
      body: message,
      from: "whatsapp:+14155238886",
      to: `whatsapp:${phone}`,
    })
    .then((message) => {
      response.send(message);
    })
    .done();
});

module.exports = router;
