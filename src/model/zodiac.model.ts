export class ZodiacResponse {
  id: string;
  about_id: string;
  zodiac_name?: string;
  zodiac_date?: Date;
}

export class CreateZodiacRequest {
  about_id: string;
  zodiac_name?: string;
  zodiac_date?: Date;
}

export class GetZodiacRequest {
  about_id: string;
  zodiac_id: string;
}

export class UpdateZodiacRequest {
  id: string;
  about_id: string;
  zodiac_name?: string;
  zodiac_date?: Date;
}

export class RemoveZodiacRequest {
  about_id: string;
  zodiac_id: string;
}
