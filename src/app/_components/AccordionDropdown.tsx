import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { HiChevronDown } from "react-icons/hi";

interface AccordionDropdownProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const AccordionDropdown = ({
  title,
  children,
  className,
}: AccordionDropdownProps) => {
  return (
    <Accordion className={className}>
      <AccordionSummary
        expandIcon={<HiChevronDown />}
      >
        {title}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};
