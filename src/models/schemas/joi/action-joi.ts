import extendedJoi from 'plugins/extended-joi';

export const ActionUpsertSchema = extendedJoi
  .object({
    toUserId: extendedJoi.string().uuid().required(),
    swipe: extendedJoi.string().valid('LEFT', 'RIGHT'),
  })
  .meta({ className: 'ActionUpsertPayload' });
