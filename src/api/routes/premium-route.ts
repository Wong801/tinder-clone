import PremiumController from 'api/controllers/premium-controller';
import authMiddleware from 'api/middlewares/auth-middleware';
import defaultMiddleware from 'api/middlewares/default-middleware';
import { Router } from 'express';

export default function ({ router = Router() }: { router?: Router }) {
  const controller = new PremiumController();

  router.post(
    '/request',
    authMiddleware(),
    defaultMiddleware(controller.requestPremium())
  );
  router.post(
    '/process',
    authMiddleware(),
    defaultMiddleware(controller.processPremium())
  );
  router.post(
    '/activate',
    authMiddleware(),
    defaultMiddleware(controller.activatePremium())
  );

  return router;
}
