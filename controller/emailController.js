const sendEmail = require("../utils/email")
const asynchandler = require("express-async-handler")

exports.regiter = asynchandler(async (req, res) => {
    const { fname, email, message, subject, company, mobile } = req.body

    await sendEmail({
        to: process.env.FROM_EMAIL,
        subject: subject,
        message: `Name :- ${fname} \n\n Email :- ${email}\n\n Company name :- ${company}\n\n Phone No :- ${mobile}\n\n  Message :- ${message} `
    })

    await sendEmail({
        to: email,
        subject: `I well contect you soon `,
        message: `Thank you  for your moreable time  that you have spend on portfolio. I am looking forward to our next adventure together!`
    })

})