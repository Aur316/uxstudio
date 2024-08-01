import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PublicIcon from "@mui/icons-material/Public";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import MessageIcon from "@mui/icons-material/Message";
import enLocale from "../../../locales/en.json";
import frLocale from "../../../locales/fr.json";
import huLocale from "../../../locales/hu.json";
import trLocale from "../../../locales/tr.json";
import Input from "../../ui/input/input";
import { useRouter } from "next/router";

type Locale = "en" | "fr" | "hu" | "tr";

const locales: Record<Locale, typeof enLocale> = {
  en: enLocale,
  fr: frLocale,
  hu: huLocale,
  tr: trLocale,
};
interface InputForm {
  name: string;
  email: string;
  country: string;
  city: string;
  message: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

export default function InputForm({
  name,
  setName,
  email,
  setEmail,
  country,
  setCountry,
  city,
  setCity,
  message,
  setMessage,
}: InputForm) {
  const { locale } = useRouter();
  const effectiveLocale = (locale || "en") as Locale;
  const t = locales[effectiveLocale];

  return (
    <div className="inputContainer inputContainerWidth ">
      <Input label={t.name} value={name} setValue={setName} Icon={PersonIcon} />
      <Input
        label={t.email}
        value={email}
        setValue={setEmail}
        Icon={EmailIcon}
      />
      <Input
        label={t.country}
        value={country}
        setValue={setCountry}
        Icon={PublicIcon}
      />
      <Input
        label={t.city}
        value={city}
        setValue={setCity}
        Icon={LocationCityIcon}
      />
      <Input
        label={t.message}
        value={message}
        setValue={setMessage}
        Icon={MessageIcon}
      />
    </div>
  );
}
