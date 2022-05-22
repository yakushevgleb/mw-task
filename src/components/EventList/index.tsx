import FullCalendar, { EventSourceInput } from "@fullcalendar/react";
import listPlugin from '@fullcalendar/list'
import React from "react";
import { EventType } from "types/event";

type Props = {
  events?: EventType[];
};

export default function EventList({ events }: Props) {
  const listEvents: EventSourceInput = events?.map((event) => ({
    id: event.id.toString(),
    title: event.title,
    start: event.start_time,
    end: event.end_time,
    color: "red", //@todo: bonus! Change color based on status!
  })) || [];

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
      />
    </div>
  );
}
