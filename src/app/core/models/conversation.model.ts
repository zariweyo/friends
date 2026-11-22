export type RequestStatus='pending'|'accepted'|'rejected';
export interface MessageRequest{id:string;fromUid:string;toUid:string;firstMessage:string;status:RequestStatus;createdAt:string;}
export interface Conversation{id:string;memberUids:[string,string];acceptedRequestId:string;createdAt:string;}
export interface ChatMessage{id:string;conversationId:string;authorUid:string;body:string;sentAt:string;}
