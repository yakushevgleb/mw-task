import { getEventsFailure, getEventsRequest, getEventsSuccess } from "./actions";
import { PostEventPayload, PatchEventPayload } from "./types";

export const getEvents = () => {
  return async (dispatch) => {
    try {
      dispatch(getEventsRequest());
      const result = await fetch("events.json");
      const json = await result.json();
      return dispatch(getEventsSuccess(json));
    } catch (e) {
      dispatch(getEventsFailure(e));
    }
  };
};

export const postEvent = (event: PostEventPayload) => {
  return async (dispatch) => {
    try {
      dispatch(getEventsRequest());
      const result = await fetch("https://someapi", {
        method: 'post',
        body: JSON.stringify(event)
      });
      const json = await result.json();
      return json;
    } catch (e) {
      dispatch(getEventsFailure(e));
    }
  }
}

export const patchEvent = (event: PatchEventPayload) => {
  return async (dispatch) => {
    try {
      dispatch(getEventsRequest());
      const result = await fetch(`https://someapi/${event.id}`, {
        method: 'patch',
        body: JSON.stringify(event)
      });
      const json = await result.json();
      return json;
    } catch (e) {
      dispatch(getEventsFailure(e));
    }
  }
}

export const deleteEvent = (id: number | string) => {
  return async (dispatch) => {
    try {
      dispatch(getEventsRequest());
      const result = await fetch(`https://someapi/${id}`, {
        method: 'delete',
      });
      const json = await result.json();
      return json;
    } catch (e) {
      dispatch(getEventsFailure(e));
    }
  }
}
