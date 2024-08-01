import React, { useState, useRef } from "react";
import enLocale from "../../../locales/en.json";
import frLocale from "../../../locales/fr.json";
import huLocale from "../../../locales/hu.json";
import trLocale from "../../../locales/tr.json";
import { useRouter } from "next/router";
import Title from "../Title/title";
import InputForm from "./inputForm";
import CustomLabel from "./customLabel";
import CaptchaButton from "./captchaButton";

type Locale = "en" | "fr" | "hu" | "tr";

const locales: Record<Locale, typeof enLocale> = {
  en: enLocale,
  fr: frLocale,
  hu: huLocale,
  tr: trLocale,
};

export default function EmailSender() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { locale } = useRouter();
  const effectiveLocale = (locale || "en") as Locale;
  const t = locales[effectiveLocale];

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [policyAccept, setPolicyAccept] = useState<boolean>(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const init = () => {
    setName("");
    setEmail("");
    setCountry("");
    setCity("");
    setMessage("");
    setPolicyAccept(false);
  };

  return (
    <>
      <div ref={containerRef} className="inputContainer">
        <Title />
        <p className="contactText">{t.contactPage1}</p>

        <InputForm
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          country={country}
          setCountry={setCountry}
          city={city}
          setCity={setCity}
          message={message}
          setMessage={setMessage}
        />

        <CustomLabel
          policyAccept={policyAccept}
          setPolicyAccept={setPolicyAccept}
        />
        <CaptchaButton
          name={name}
          email={email}
          country={country}
          city={city}
          message={message}
          policyAccept={policyAccept}
          loading={loading}
          captchaToken={captchaToken}
          setCaptchaToken={setCaptchaToken}
          setLoading={setLoading}
          init={init}
        />
        <p className="contactText2">{t.contactPage2}</p>
      </div>
    </>
  );
}
