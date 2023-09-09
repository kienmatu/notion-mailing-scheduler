const nodemailer = require("nodemailer");
const { randomFetch, buildEmailContent } = require("./notion.js");
require("dotenv").config();

const userEmail = process.env.SENDING_EMAIL;
const password = process.env.SENDING_PASSWORD;
const destinationEmail = process.env.DESTINATION_EMAIL;

if (!userEmail || !password || !destinationEmail) {
  console.error(
    "You must provide sending email, password and the destination email"
  );
  process.exit(1);
}

const main = async function () {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: userEmail,
      pass: password,
    },
  });

  const resp = await randomFetch();
  const emailContent = buildEmailContent(resp);
  let mailDetails = {
    from: userEmail,
    to: destinationEmail,
    subject: "[NMS] Scheduled vocabulary review",
    text: emailContent,
  };

  mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.error("Can't send email: ", err.message);
    } else {
      console.log("Email sent successfully");
    }
  });
};

main();
