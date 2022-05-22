import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { ContentWrapper, InlineWrapper } from "./styles";
import { EventDialogProps } from "./types";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useDispatch } from "react-redux";
import { deleteEvent, patchEvent, postEvent } from "redux/events/events";

const EventDialog: React.FC<EventDialogProps> = (props) => {
  const dispatch = useDispatch();
  const dialogTitle = props.eventInfo ? "Edit event" : "Create event";
  const event = props.eventInfo?.event;
  const [title, setTitle] = React.useState("");
  const [datetimeFrom, setDatetimeFrom] = React.useState(new Date());
  const [datetimeTo, setDatetimeTo] = React.useState(new Date());

  React.useEffect(() => {
    if (event) {
      setTitle(event.title)
      setDatetimeFrom(new Date(event.start))
      setDatetimeTo(new Date(event.end));
    }
  }, [event])

  const handleDelete = () => {
    dispatch(deleteEvent(event.id));
  }

  const handleSubmit = () => {
    if (event.id) {
      dispatch(patchEvent({
        id: event.id,
        title,
        start_time: datetimeFrom.toString(),
        end_time: datetimeTo.toString()
      }))
    } else {
      dispatch(postEvent({
        title,
        start_time: datetimeFrom.toString(),
        end_time: datetimeTo.toString()
      }))
    }
  }

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      maxWidth={false}
    >
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <ContentWrapper>
          <TextField label="Title" margin="dense" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
          <InlineWrapper>
            <DateTimePicker 
              renderInput={(props) => <TextField {...props} fullWidth />}
              label="From"
              value={datetimeFrom}
              onChange={setDatetimeFrom}
            />
            <DateTimePicker 
              renderInput={(props) => <TextField {...props} fullWidth />}
              label="To"
              value={datetimeTo}
              onChange={setDatetimeTo}
            />
          </InlineWrapper>
        </ContentWrapper>
      </DialogContent>
      <DialogActions>
        {!!props.eventInfo && (
          <Button color='error' onClick={handleDelete}>Delete</Button>
        )}
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}

export default EventDialog;
