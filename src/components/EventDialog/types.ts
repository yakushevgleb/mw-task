import { EventClickArg } from "@fullcalendar/react";

export interface EventDialogProps {
  eventInfo?: EventClickArg;
  open: boolean;
  onClose: () => void;
}
