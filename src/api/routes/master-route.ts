import MasterController from 'api/controllers/master-controller';
import defaultMiddleware from 'api/middlewares/default-middleware';
import { Router } from 'express';

export default function ({ router = Router() }: { router?: Router }) {
  const controller = new MasterController();

  router.get('/zodiac', defaultMiddleware(controller.listZodiac()));
  router.get('/gender', defaultMiddleware(controller.listGender()));

  return router;
}
