import nodemailer from "nodemailer";

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            auth: {
                user: "julikhosla17@gmail.com",
                pass: "yyftqcvqxmvrmmwp",
            },
        });

        await transporter.sendMail({
            from: "julikhosla17@gmail.com",
            to: "julikhosla17@gmail.com",
            subject: subject,
            text: text,
        });

        console.log("Email sent successfully");
    } catch (error) {
        console.log(error, "Email not sent");
    }
};

export default sendEmail;
