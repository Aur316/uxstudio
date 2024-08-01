import React from "react";
import { Box, TextField } from "@mui/material";
import { styled } from "@mui/system";

interface InputProps {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  Icon: React.ElementType;
}

const InputContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  width: "100%",
  minWidth: "300px",
}));

const IconContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#3C7EC3",
  borderRadius: "4px 0 0 4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(2),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  ".MuiInputLabel-root.Mui-focused": { color: "#1976d2" },
  ".MuiInput-underline:after": { borderBottomColor: "#1976d2" },
  ".MuiOutlinedInput-root": {
    "& fieldset": { borderColor: "#ccc" },
    "&:hover fieldset": { borderColor: "#1976d2" },
    "&.Mui-focused fieldset": { borderColor: "#1976d2" },
    borderRadius: "0 4px 4px 0",
  },
  width: "100%",
}));

export default function Input({ label, value, setValue, Icon }: InputProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <InputContainer className="inputFont">
      <IconContainer>
        <Icon sx={{ color: "#fff" }} />
      </IconContainer>
      <StyledTextField
        label={label}
        variant="outlined"
        value={value}
        onChange={handleChange}
        multiline
        minRows={1}
      />
    </InputContainer>
  );
}
