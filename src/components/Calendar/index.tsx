import FullCalendar, { EventClickArg, EventSourceInput } from "@fullcalendar/react";
import React, { useEffect, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { CalendarProps } from "./types";
import EventDialog from "components/EventDialog";


const Calendar: React.FC<CalendarProps> = ({ events }) => {
  const [event, setEvent] = useState<EventClickArg | undefined>();
  const [open, setOpen] = useState(false);

  const calendarEvents = events.map((event) => {
    return {
      id: event.id,
      title: event.title,
      start: event.start_time,
      end: event.end_time,
      color: "red", //@todo: bonus! Change color based on status!
    };
  })

  const handleAddEvent = () => {
    setOpen(true);
  }

  const handleClickEvent = (e: EventClickArg) => {
    setEvent(e);
    setOpen(true);
  }

  const handleClose = () => {
    setEvent(undefined);
    setOpen(false)
  }

  return (
    <div>
      <h1>Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={calendarEvents as EventSourceInput}
        customButtons={{
          addEvent: {
            text: "Create event",
            click: handleAddEvent
          }
        }}
        eventClick={handleClickEvent}
        headerToolbar={{
          right: 'prev,next addEvent'
        }}
      />
      {open && (
        <EventDialog open={open} eventInfo={event} onClose={handleClose} />
      )}
    </div>
  );
}

export default Calendar;
