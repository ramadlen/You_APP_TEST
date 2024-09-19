export class AboutResponse {
  id: string;
  Display_name: string;
  Image_profile_zodiac: string;
  Image_zodiac: string;
  Birthday: Date;
  Gender: string;
  Height: string;
  Weight: string;
}

export class CreateAboutRequest {
  Display_name: string;
  Image_profile_zodiac: string;
  Image_zodiac: string;
  Birthday: string;
  Gender: string;
  Height: string;
  Weight: string;
}

export class UpdateAboutRequest {
  id: string;
  Display_name: string;
  Image_profile_zodiac: string;
  Image_zodiac: string;
  Birthday: string;
  Gender: string;
  Height: string;
  Weight: string;
}

export class SearchAboutRequest {
  Display_name: string;
  page: number;
  size: number;
}
