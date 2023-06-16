import nodemailer from "nodemailer";

const sendDefaultMail = async (email, subject, text) => {
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
            text: "",
            html: `<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="x-apple-disable-message-reformatting" />
    <title></title>
    <!--[if mso]>
        <noscript>
            <xml>
                <o:OfficeDocumentSettings>
                    <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
            </xml>
        </noscript>
    <![endif]-->
    <link
        href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
        rel="stylesheet"
    />
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap");

        * {
            font-family: Montserrat, sans-serif;
        }
        table.bodyPara,
        table.header,
        table.footerContent {
            width: 100%;
            border-collapse: collapse;
        }
        table.header,
        table.footerContent,
        table.bodyPara {
            border: 0;
            border-spacing: 0;
        }
        table.header {
            background: #ffffff;
        }
        table.footerContent {
            font-size: 9px;
            font-family: Montserrat, sans-serif;
        }
        table.subheader {
            width: 602px;
            border-collapse: collapse;
            border: 1px solid #cccccc;
            border-spacing: 0;
            text-align: left;
        }
        .footerPara {
            margin: 0;
            font-size: 14px;
            line-height: 16px;
            font-family: Montserrat, sans-serif;
            color: #000;
        }
    </style>
</head>
<body style="margin: 0; padding: 0">
    <table role="presentation" class="header">
        <tr>
            <td align="center" style="padding: 0">
                <table role="presentation" class="subheader">
                    <tr>
                        <td
                            align="center"
                            style="padding: 40px 0 30px 0; background: #673ab7"
                        >
                            <img
                                src="https://res.cloudinary.com/asset-aivc/image/upload/v1671754336/extendthevisa-logos_white_u4rhbc.png"
                                alt=""
                                width="300"
                                style="height: auto; display: block"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 36px 30px 42px 30px">
                            <table role="presentation" class="bodyPara">
                                <tr>
                                    <td
                                        style="
                                            padding: 0 0 36px 0;
                                            color: #153643;
                                        "
                                    >
                                        <h1
                                            style="
                                                font-size: 24px;
                                                margin: 0 0 20px 0;
                                                font-family: Montserrat,
                                                    sans-serif;
                                            "
                                        >
                                         Follow-up Action Description :
                                        </h1>
                                        <p
                                            style="
                                                margin: 0 0 12px 0;
                                                font-size: 16px;
                                                line-height: 24px;
                                                font-family: Montserrat,
                                                    sans-serif;
                                            "
                                        >${text.name}
                                        </p><p
                                            style="
                                                margin: 0 0 12px 0;
                                                font-size: 16px;
                                                line-height: 24px;
                                                font-family: Montserrat,
                                                    sans-serif;
                                            "
                                        >${text.email}
                                        </p><p
                                            style="
                                                margin: 0 0 12px 0;
                                                font-size: 16px;
                                                line-height: 24px;
                                                font-family: Montserrat,
                                                    sans-serif;
                                            "
                                        >${text.message}
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 30px; background: #673ab761">
                            <table role="presentation" class="footerContent">
                                <tr>
                                    <td style="padding: 0" align="left">
                                        <p class="footerPara">
                                            © Copyright 2022, ExtendTheVisa <br />
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
`,
        });

        console.log("Email sent successfully");
    } catch (error) {
        console.log(error, "Email not sent");
    }
};

export default sendDefaultMail;
