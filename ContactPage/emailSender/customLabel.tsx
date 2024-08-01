import React from "react";
import enLocale from "../../../locales/en.json";
import frLocale from "../../../locales/fr.json";
import huLocale from "../../../locales/hu.json";
import trLocale from "../../../locales/tr.json";
import { useRouter } from "next/router";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Link from "next/link";

type Locale = "en" | "fr" | "hu" | "tr";

const locales: Record<Locale, typeof enLocale> = {
  en: enLocale,
  fr: frLocale,
  hu: huLocale,
  tr: trLocale,
};
interface CustomLabel {
  policyAccept: boolean;
  setPolicyAccept: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomFormControlLabel = styled(FormControlLabel)({
  width: "95%",
  minWidth: "300px",
  "& .MuiTypography-root": {
    fontSize: "0.875rem",
    color: "grey",
    textAlign: "justify",
  },
});
export default function CustomLabel({
  policyAccept,
  setPolicyAccept,
}: CustomLabel) {
  const { locale } = useRouter();
  const effectiveLocale = (locale || "en") as Locale;
  const t = locales[effectiveLocale];

  const policyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPolicyAccept(event.target.checked);
  };

  return (
    <div>
      <CustomFormControlLabel
        control={
          <Checkbox
            checked={policyAccept}
            onChange={policyChange}
            color="primary"
          />
        }
        label={
          <Typography className="policyTypography">
            {t.policyAccept}
            <Link href="/policy" passHref legacyBehavior>
              <a className="policyLink">{t.justPolicy}</a>
            </Link>
            {t.policyAccept2}
          </Typography>
        }
      />
    </div>
  );
}
