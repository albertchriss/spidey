import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { HiChevronDown } from "react-icons/hi";

interface AccordionDropdownProps {
  title: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  defaultExpanded?: boolean;
}

export const AccordionDropdown = ({
  title,
  children,
  className,
  defaultExpanded
}: AccordionDropdownProps) => {
  return (
    <Accordion className={className} defaultExpanded={defaultExpanded}>
      <AccordionSummary
        expandIcon={<HiChevronDown />}
      >
        {title}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};
