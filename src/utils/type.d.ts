export interface Message {
  userName: string;
  content: string;
  createdAt: string;
  readAt: string;
}

export interface Chat {
  roomId: string;
  userName: string;
  latestMessage?: string;
  latestTime?: string;
  new: number;
}
