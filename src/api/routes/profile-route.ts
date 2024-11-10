import ProfileController from 'api/controllers/profile-controller';
import authMiddleware from 'api/middlewares/auth-middleware';
import defaultMiddleware from 'api/middlewares/default-middleware';
import limitActionMiddleware from 'api/middlewares/limit-action-middleware';
import { Router } from 'express';
import multer from 'multer';

export default function ({ router = Router() }: { router?: Router }) {
  const controller = new ProfileController();

  const upload = multer();

  router.post(
    '/update',
    authMiddleware(),
    defaultMiddleware(controller.update())
  );
  router.post(
    '/update/photo',
    authMiddleware(),
    upload.array('photos', 4),
    defaultMiddleware(controller.updatePhoto())
  );
  router.get('/photo/:userId/:path', defaultMiddleware(controller.getPhoto()));
  router.get(
    '/random',
    authMiddleware(),
    limitActionMiddleware(10, 'get-random-profile'),
    defaultMiddleware(controller.getRandomProfile())
  );
  router.get(
    '/matched',
    authMiddleware(),
    defaultMiddleware(controller.listMatchedProfile())
  );

  return router;
}
