export interface PostEventPayload {
  title: string;
  start_time: string;
  end_time: string;
}

export interface PatchEventPayload extends PostEventPayload {
  id: number | string
}
