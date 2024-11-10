import ApiError from 'api/api-error';
import environment from 'engine/environment';
import { RequestHandler } from 'express';

export default function (): RequestHandler {
  return async (req, res, next) => {
    if (!req.cookies) return next(new ApiError('Unauthorized', 401));

    try {
      const { userId, isPremium } = await res.locals.modules.iam.VerifyToken({
        token: req.cookies.auth,
        privateKey: environment.encrypt.secret,
        xsrf: req.cookies.xsrf,
      });
      res.locals.user = { userId, isPremium };
      next();
    } catch (e) {
      next(e);
    }
  };
}
