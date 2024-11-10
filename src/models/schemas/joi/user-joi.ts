import { User } from '@prisma/client';
import extendedJoi from 'plugins/extended-joi';
import { sanitizePhoneNumber } from 'utils';

export const UserRegisterSchema = extendedJoi
  .object<User>({
    username: extendedJoi.string().required(),
    phoneNumber: extendedJoi
      .string()
      .required()
      .custom((value) => {
        const sanitized = sanitizePhoneNumber(value);
        return sanitized;
      }, 'Sanitize Phone Number'),
    email: extendedJoi.string().email().optional().allow(null),
    pin: extendedJoi.string().length(6).pattern(/^\d+$/).required(),
  })
  .meta({ className: 'UserRegisterPayload' });

export const UserPhoneNUmberCheckSchema = extendedJoi
  .object<User>({
    phoneNumber: extendedJoi
      .string()
      .required()
      .custom((value) => {
        const sanitized = sanitizePhoneNumber(value);
        return sanitized;
      }, 'Sanitize Phone Number'),
  })
  .meta({ className: 'UserPhoneNumberCheckPayload' });

export const UserEmailCheckSchema = extendedJoi
  .object<User>({
    email: extendedJoi.string().email().required(),
  })
  .meta({ className: 'UserEmailCheckPayload' });

export const UserLoginSchema = extendedJoi
  .object({
    identifier: extendedJoi.string().required(),
    pin: extendedJoi.string().length(6).pattern(/^\d+$/).required(),
  })
  .meta({ className: 'UserLoginPayload' });

export const UserGetSchema = extendedJoi
  .object<User>({
    userId: extendedJoi.string().uuid().required(),
  })
  .meta({ className: 'UserGetParams' });
