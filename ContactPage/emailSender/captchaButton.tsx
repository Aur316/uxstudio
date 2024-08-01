import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import SendButton from "../../ui/button/sendButton/sendButton";
import enLocale from "../../../locales/en.json";
import frLocale from "../../../locales/fr.json";
import huLocale from "../../../locales/hu.json";
import trLocale from "../../../locales/tr.json";
import { useRouter } from "next/router";
import EmailLoader from "../../ui/loader/emailLoader/emailLoader";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

type Locale = "en" | "fr" | "hu" | "tr";

const locales: Record<Locale, typeof enLocale> = {
  en: enLocale,
  fr: frLocale,
  hu: huLocale,
  tr: trLocale,
};

interface CaptchaButtonT {
  name: string;
  email: string;
  country: string;
  city: string;
  message: string;
  policyAccept: boolean;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  captchaToken: string | null;
  setCaptchaToken: React.Dispatch<React.SetStateAction<string | null>>;
  init: any;
}

interface FormData {
  name: string;
  email: string;
  country: string;
  city: string;
  message: string;
  effectiveLocale: Locale;
  captchaToken: string | null;
}

const Alert = React.forwardRef(function Alert(props: any, ref: any) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CaptchaButton({
  name,
  email,
  country,
  city,
  message,
  policyAccept,
  loading,
  captchaToken,
  setCaptchaToken,
  setLoading,
  init,
}: CaptchaButtonT) {
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastSeverity, setToastSeverity] = useState<string>("success");
  const [open, setOpen] = useState<boolean>(false);

  const { locale } = useRouter();
  const effectiveLocale = (locale || "en") as Locale;
  const t = locales[effectiveLocale];

  const isFormFilled =
    name && email && country && city && message && policyAccept === true;

  const siteKey = process.env.NEXT_PUBLIC_SITEKEY;
  const API = process.env.NEXT_PUBLIC_EMAILSENDER;

  const onCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  const handleClose = (reason: any) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  async function sendEmail() {
    const formData: FormData = {
      name: name,
      email: email,
      country: country,
      city: city,
      message: message,
      effectiveLocale: effectiveLocale,
      captchaToken: captchaToken,
    };
    try {
      setLoading(true);
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setLoading(false);
        setToastMessage(t.sendSuccess);
        setToastSeverity("success");
        init();
        console.log("Message sent:", data.messageId);
      } else {
        console.error("Email sending failed");
        throw new Error("Email sending failed.");
      }
    } catch (error: any) {
      setLoading(true);
      setToastMessage(error.message);
      setToastSeverity("error");
    } finally {
      setOpen(true);
    }
  }

  return (
    <>
      {" "}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={toastSeverity}>
          {toastMessage}
        </Alert>
      </Snackbar>
      <div className="loaderSenderContainer">
        {isFormFilled && loading === false && (
          <>
            <ReCAPTCHA sitekey={`${siteKey}`} onChange={onCaptchaChange} />
            <SendButton
              description={t.send}
              onClick={() => {
                sendEmail();
              }}
              disabled={!captchaToken}
            />
          </>
        )}
        {loading === true ? <EmailLoader /> : null}
      </div>
    </>
  );
}
