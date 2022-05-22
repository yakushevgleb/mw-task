import FullCalendar, { EventClickArg, EventSourceInput } from "@fullcalendar/react";
import listPlugin from '@fullcalendar/list'
import React from "react";
import { EventType } from "types/event";
import EventDialog from "components/EventDialog";

type Props = {
  events?: EventType[];
};

export default function EventList({ events }: Props) {
  const [event, setEvent] = React.useState<EventClickArg | undefined>();
  const [open, setOpen] = React.useState(false);

  const listEvents: EventSourceInput = events?.map((event) => ({
    id: event.id.toString(),
    title: event.title,
    start: event.start_time,
    end: event.end_time,
    color: "red", //@todo: bonus! Change color based on status!
  })) || [];


  const handleClickEvent = (e: EventClickArg) => {
    setEvent(e);
    setOpen(true);
  }

  const handleClose = () => {
    setEvent(undefined);
    setOpen(false)
  }

  if (!events) {
    return <p>No events.</p>;
  }

  return (
    <div>
      <h1>Event List</h1>
      <FullCalendar
        initialView="listWeek"
        plugins={[listPlugin]}
        events={listEvents}
        eventClick={handleClickEvent}
      />
      {open && (
        <EventDialog open={open} eventInfo={event} onClose={handleClose} />
      )}
    </div>
  );
}
