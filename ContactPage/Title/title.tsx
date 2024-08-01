import React from "react";
import { useLocalization } from "../../../context/languageContext";

export default function Title() {
  const { t } = useLocalization();
  return (
    <div className="contactTitleContainer">
      <span className="contactTitle1">{t.contactTitle1}</span>
      <span className="contactTitle2">{t.contactTitle2}</span>
    </div>
  );
}
