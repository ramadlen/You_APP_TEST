export class InterestResponse {
  id: string;
  interet_user: string;
}

export class CreateInterestRequest {
  about_id: string;
  interet_user: string;
}

export class GetInterestRequest {
  about_id: string;
  interet_user: string;
}

export class UpdateInterestRequest {
  id: string;
  about_id: string;
  interet_user: string;
}

export class RemoveInterestRequest {
  about_id: string;
  interet_user: string;
}
