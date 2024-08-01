import React from "react";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { styled } from "@mui/system";

interface SendButtonProps {
  description: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled: any;
}
const AnimatedButton = styled(Button)({
  animation: "appear 0.5s ease-out forwards",
  opacity: 0,
  "@keyframes appear": {
    "100%": {
      opacity: 1,
    },
  },
  "&:hover": {
    ".MuiButton-endIcon": {
      transform: "translateX(6px)",
      transition: "transform 0.6s ease",
    },
  },
});

export default function SendButton({
  description,
  onClick,
  disabled,
}: SendButtonProps) {
  return (
    <AnimatedButton
      variant="contained"
      aria-label="Send"
      onClick={onClick}
      color="primary"
      endIcon={<SendIcon />}
      disabled={disabled}
      sx={{
        marginTop: "20px",
        width: "fit-content",
      }}
    >
      {description}
    </AnimatedButton>
  );
}
