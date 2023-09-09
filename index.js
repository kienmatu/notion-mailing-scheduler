const nodemailer = require("nodemailer");

const userEmail = process.env.SENDING_EMAIL;
const password = process.env.SENDING_PASSWORD;
const destinationEmail = process.env.DESTINATION_EMAIL;

if (!userEmail || !password || !destinationEmail) {
  console.error(
    "You must provide sending email, password and the destination email"
  );
  process.exit(1);
}

let mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: userEmail,
    pass: password,
  },
});

let mailDetails = {
  from: userEmail,
  to: destinationEmail,
  subject: "[NMS] Scheduled vocabulary review",
  text: "Node.js testing mail for GeeksforGeeks",
};

mailTransporter.sendMail(mailDetails, function (err, data) {
  if (err) {
    console.error("Can't send email: ", err.message);
  } else {
    console.log("Email sent successfully");
  }
});
