export class ChatResponse {
  id: string;
  SenderID: string;
  ReceiverID: string;
  Message: string;
}

export class CreateAboutRequest {
  SenderID: string;
  ReceiverID: string;
  Message: string;
}

export class UpdateAboutRequest {
  id: string;
  SenderID: string;
  ReceiverID: string;
  Message: string;
}

export class SearchAboutRequest {
  SenderID: string;
  ReceiverID: string;
  Message: string;
  page: string;
  size: string;
}
