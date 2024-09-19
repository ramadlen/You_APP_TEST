export class HoroscopeResponse {
  id: string;
  zodiac_chinese: string;
}

export class CreateHoroscopeRequest {
  zodiac_id: string;
  zodiac_chinese: string;
}

export class GetHoroscopeRequest {
  zodiac_id: string;
  horoscope_id: string;
}

export class UpdateHoroscopeRequest {
  id: string;
  zodiac_id: string;
  zodiac_chinese: string;
}

export class RemoveHoroscopeRequest {
  zodiac_id: string;
  horoscope_id: string;
}
