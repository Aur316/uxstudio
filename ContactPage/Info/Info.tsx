import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useLocalization } from "../../../context/languageContext";
import { styled } from "@mui/material/styles";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  gap: theme.spacing(2),
  alignItems: "left",
  width: "50%",
  minWidth: "250px",
  margin: "0 auto",
  boxShadow: "0 3px 5px 2px rgba(0, 0, 0, 0.3)",
  padding: theme.spacing(2),
  fontSize: "medium",
}));

const InfoBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

export default function Info() {
  const { t } = useLocalization();
  const phoneNumberLink = "+381645643869";
  const phoneNumber = " +381 64 5643869";
  const emailAddress = "office@photonpower.rs";
  const address = "72 Proleterskih Brigada, Subotica, Serbia";

  return (
    <StyledBox>
      <InfoBox>
        <IconButton
          aria-label="whatsapp"
          href={`https://wa.me/${phoneNumberLink}`}
          target="_blank"
        >
          <WhatsAppIcon sx={{ color: "black" }} />
        </IconButton>

        <span className="spanInInfo">
          <p className="pWithoutMargin">{t.phone}</p>
          <p className="pWithoutMargin">{phoneNumber}</p>
        </span>
      </InfoBox>

      <InfoBox>
        <IconButton aria-label="email" href={`mailto:${emailAddress}`}>
          <EmailIcon sx={{ color: "black" }} />
        </IconButton>
        <span className="spanInInfo">
          <p className="pWithoutMargin">{t.emailSend}</p>
          <p className="pWithoutMargin">{emailAddress}</p>
        </span>
      </InfoBox>

      <InfoBox>
        <IconButton
          aria-label="location"
          href="https://www.google.com/maps/place/Photon+Power/@46.1218939,19.6492778,15z/data=!4m6!3m5!1s0x474367dccf68df2d:0x7a2eece56d226667!8m2!3d46.1218939!4d19.6492778!16s%2Fg%2F11t7f7xxsc?entry=ttu"
          target="_blank"
        >
          <LocationOnIcon sx={{ color: "black" }} />
        </IconButton>
        <span className="spanInInfo">
          <p className="pWithoutMargin">{t.gps}</p>
          <p className="pWithoutMargin">{address}</p>
        </span>
      </InfoBox>
    </StyledBox>
  );
}
