// import { z, ZodType } from 'zod';

// export class AboutValidation {
//   static readonly CREATE: ZodType = z.object({
//     zodiac_date: z.date(),
//     zodiac_name: z.string().min(1).max(100).optional(),
//     url: z.string().min(1).max(100).optional(),
//   });

//   static readonly UPDATE: ZodType = z.object({
//     id: z.number().positive(),
//     zodiac_date: z.date(),
//     zodiac_name: z.string().min(1).max(100).optional(),
//     url: z.string().min(1).max(100).optional(),
//   });

//   static readonly SEARCH: ZodType = z.object({
//     zodiac_date: z.date(),
//     zodiac_name: z.string().min(1).max(100).optional(),
//     url: z.string().min(1).max(100).optional(),
//     page: z.number().min(1).positive(),
//     size: z.number().min(1).max(100).positive(),
//   });
// }
import { z, ZodType } from 'zod';

export class AboutValidation {
  static readonly CREATE: ZodType = z.object({
    Display_name: z.string().min(1).max(100),
    url: z.string().min(1).max(100).optional(),
    Image_profile_zodiac: z.string().min(1).max(100).optional(),
    Image_zodiac: z.string().min(1).max(100).optional(),
    Birthday: z.date(),
    Gender: z.string().min(1).max(100).optional(),
    Height: z.string().min(1).max(100).optional(),
    Weight: z.string().min(1).max(100).optional(),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.string().min(1),
    Display_name: z.string().min(1).max(100).optional(),
    url: z.string().min(1).max(100).optional(),
    Image_profile_zodiac: z.string().min(1).max(100).optional(),
    Image_zodiac: z.string().min(1).max(100).optional(),
    Birthday: z.date(),
    Gender: z.string().min(1).max(100).optional(),
    Height: z.string().min(1).max(100).optional(),
    Weight: z.string().min(1).max(100).optional(),
  });

  static readonly SEARCH: ZodType = z.object({
    Display_name: z.string().min(1).max(100).optional(),
    page: z.number().min(1).positive(),
    size: z.number().min(1).max(100).positive(),
  });
}
