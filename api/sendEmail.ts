import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const secretKey = process.env.SECRETKEY;

    const {
      name,
      email,
      country,
      city,
      message,
      effectiveLocale,
      captchaToken,
    } = req.body;

    const subject =
      effectiveLocale === "hu"
        ? "Megkaptuk az üzeneted"
        : effectiveLocale === "tr"
        ? "Mesajinizi aldik"
        : effectiveLocale === "en"
        ? "We have received your message"
        : effectiveLocale === "fr"
        ? "Nous avons reçu votre message"
        : "";

    const text =
      effectiveLocale === "hu"
        ? `Kedves ${name},\n\nKöszönjük, hogy kapcsolatba léptél velünk. A következő adatokat kaptuk meg:\n\nNév: ${name}\nE-mail: ${email}\nOrszág: ${country}\nVáros: ${city}\nÜzenet: ${message}\n\nHamarosan felvesszük veled a kapcsolatot, addig is türelmedet kérjük!\n\nÜdvözlettel,\nPhoton Power`
        : effectiveLocale === "tr"
        ? `Sevgili ${name},\n\nBizimle iletişime geçtiğin için teşekkür ederiz. Aldığımız bilgiler şunlardır:\n\nAd: ${name}\nE-posta: ${email}\nÜlke: ${country}\nŞehir: ${city}\nMesaj: ${message}\n\nEn kısa sürede seninle iletişime geçeceğiz, bu süre zarfında sabrın için teşekkür ederiz!\n\nSaygılarımızla,\nPhoton Power`
        : effectiveLocale === "en"
        ? `Dear ${name},\n\nThank you for getting in touch with us. We have received the following information:\n\nName: ${name}\nEmail: ${email}\nCountry: ${country}\nCity: ${city}\nMessage: ${message}\n\nWe will contact you shortly, thank you for your patience in the meantime!\n\nBest regards,\nPhoton Power`
        : effectiveLocale === "fr"
        ? `Cher/Chère ${name},\n\nMerci de nous avoir contactés. Nous avons reçu les informations suivantes:\n\nNom: ${name}\nE-mail: ${email}\n\nPays: ${country}\n\nVille: ${city}\n\nMessage: ${message}\n\nNous prendrons contact avec vous prochainement, merci de votre patience !\n\nCordialement,\nPhoton Power`
        : "";

    const recaptchaResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${secretKey}&response=${captchaToken}`,
      }
    );

    const recaptchaData = await recaptchaResponse.json();
    console.log(recaptchaData, "recaptchaData");

    if (!recaptchaData.success) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid CAPTCHA. Please try again." });
    }
    try {
      let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: true,
        },
      });

      // let transporter = nodemailer.createTransport({
      //   host: "gmail",
      //   auth: {
      //     user: "laserdevices1@gmail.com",
      //     pass: "21",
      //   },
      // });

      const customerEmailOptions = {
        from: '"Photon Power" <office@photonpower.rs>',
        to: email,
        subject: subject,
        text: text,
      };

      let mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "New Message from Website Contact Form",
        text: `
          Dear Website Administrator,
      
          You have received a new message from a website visitor. Below are the details:
      
          - Name: ${name}
          - E-mail: ${email}
          - Country: ${country}
          - City: ${city}
          - Message: ${message}
      
          Please consider this message as important and respond to it appropriately.
      
          Best Regards,
          Your Website Contact Form
        `,
      };

      await transporter.sendMail(customerEmailOptions);

      const info = await transporter.sendMail(mailOptions);
      console.log("Message sent: %s", info.messageId);
      res.status(200).json({ success: true, messageId: info.messageId });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
