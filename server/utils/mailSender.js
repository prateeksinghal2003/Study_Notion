const nodemailer = require("nodemailer");
//this function would send an email
const mailSender = async (email, title, body) => {
    try{

        //create a transporter
            let transporter = nodemailer.createTransport({
                host:process.env.MAIL_HOST,
                auth:{
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS,
                }
            })

           //send an mail
            let info = await transporter.sendMail({
                from: '"StudyNotion || CodeHelp - by Babbar" <prateeksinghal682@gmail.com>',
                to:`${email}`,
                subject: `${title}`,
                 html: `${body}`,
                //html : `<p>Test email from backend</p>`
            })
            console.log(info);
            return info;
    }
    catch(error) {
        console.log(error.message);
    }
}


module.exports = mailSender;