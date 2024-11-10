import ActionController from 'api/controllers/action-controller';
import authMiddleware from 'api/middlewares/auth-middleware';
import defaultMiddleware from 'api/middlewares/default-middleware';
import limitActionMiddleware from 'api/middlewares/limit-action-middleware';
import { Router } from 'express';

export default function ({ router = Router() }: { router?: Router }) {
  const controller = new ActionController();

  router.post(
    '/swipe',
    authMiddleware(),
    limitActionMiddleware(10, 'get-random-profile'),
    defaultMiddleware(controller.swipeUser())
  );

  return router;
}
