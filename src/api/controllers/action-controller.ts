import ActionService from 'services/action';
import Controller from '.';
import { RequestHandler } from 'express';
import { ActionUpsertSchema } from 'models/schemas/joi/action-joi';

export default class ActionController extends Controller<ActionService> {
  constructor(service: ActionService = new ActionService()) {
    super({ service });
  }

  swipeUser(): RequestHandler {
    return async (req, res) => {
      const { value } = this.validateRequest(ActionUpsertSchema, req.body);

      const data = await this.service.upsert({
        id: res.locals.user.userId as string,
        json: value,
      });

      const limitKey = `get-random-profile_${res.locals.user.userId as string}`;
      const cachedLimit = await res.locals.modules.cache.pull(limitKey);
      await this.deployCache(res, {
        key: limitKey,
        data: String(Number(cachedLimit) + 1),
      });

      const swipedProfileKey = `swiped-profile_${res.locals.user.userId as string}`;
      const cachedSwipedProfile =
        (await res.locals.modules.cache.pull(swipedProfileKey)) || '[]';
      await this.deployCache(res, {
        key: swipedProfileKey,
        data: JSON.stringify([
          ...JSON.parse(cachedSwipedProfile),
          data.swipedUserId,
        ]),
      });

      res.locals.response.setResults({
        data,
      });
    };
  }
}
