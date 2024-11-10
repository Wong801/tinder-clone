import ApiError from 'api/api-error';
import { RequestHandler } from 'express';

// This meant to be used after authMiddleware()
export default function (limit: number, name: string): RequestHandler {
  return async (req, res, next) => {
    if (!res.locals.user.isPremium) {
      const cacheKey = `${name}_${res.locals.user.userId as string}`;

      const actionTimes = await res.locals.modules.cache.pull(cacheKey);
      if (!actionTimes) {
        res.locals.modules.cache.setCache({
          key: cacheKey,
          data: 0,
        });
        await res.locals.modules.cache.deploy(24);
        next();
      }

      if (limit === Number(actionTimes)) {
        return next(new ApiError('You have used your limit', 400));
      }
    }
    next();
  };
}
