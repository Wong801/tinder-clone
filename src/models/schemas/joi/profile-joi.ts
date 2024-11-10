import { UserPreference, UserProfile } from '@prisma/client';
import extendedJoi from 'plugins/extended-joi';

export const ProfileUpdateSchema = extendedJoi
  .object<UserProfile>({
    genderId: extendedJoi.string().uuid().optional().allow(null),
    fullName: extendedJoi.string().optional().allow(null),
    bio: extendedJoi.string().optional().allow(null),
    birthDate: extendedJoi.date().format('MM-DD-YYYY').optional().allow(null),
    location: extendedJoi.string().optional().allow(null),
    hometown: extendedJoi.string().optional().allow(null),
  })
  .meta({ className: 'ProfileUpdatePayload' });

export const ProfileUpdatePreferenceSchema = extendedJoi
  .object<UserPreference>({
    maxAge: extendedJoi.number().required(),
    minAge: extendedJoi.number().required(),
    radius: extendedJoi.number().optional().default(10),
    genderId: extendedJoi.string().uuid().required(),
  })
  .meta({ className: 'ProfileUpdatePreferencePayload' });
