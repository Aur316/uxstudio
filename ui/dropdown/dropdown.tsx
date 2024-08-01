import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";

interface DropdownProps {
  title: string;
  description: string;
}

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  background: "transparent",
  borderRadius: "20px",
  margin: "10px 0",
  overflow: "hidden",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  "&:before": {
    display: "none",
  },
  "&.Mui-expanded": {
    margin: "10px 0",
    "& .MuiAccordionSummary-root": {
      borderRadius: "20px 20px 0 0",
    },
    "& .MuiAccordionDetails-root": {
      borderRadius: "0 0 20px 20px",
    },
  },
}));

const StyledAccordionSummary = styled(AccordionSummary)({
  background: "linear-gradient(45deg, #3C7EC3 80%, #3C7EC3 90%)",
  borderRadius: "20px",
  color: "white",
  overflow: "hidden",
  "& .MuiAccordionSummary-expandIconWrapper": {
    transform: "rotate(0deg)",
    "&.Mui-expanded": {
      transform: "rotate(180deg)",
    },
  },
  "& .MuiAccordionSummary-expandIcon": {
    color: "white",
  },
  padding: "0 30px",
});

const StyledAccordionDetails = styled(AccordionDetails)({
  background: "rgba(33, 150, 243, 0.1)",
  borderTop: "1px solid #DFB892",
  padding: "20px",
  borderRadius: "0 0 20px 20px",
});

const Dropdown: React.FC<DropdownProps> = ({ title, description }) => {
  return (
    <StyledAccordion>
      <StyledAccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className="faqDescTitle">{title}</Typography>
      </StyledAccordionSummary>
      <StyledAccordionDetails>
        <Typography className="faqDescription">{description}</Typography>
      </StyledAccordionDetails>
    </StyledAccordion>
  );
};

export default Dropdown;
