import { Router } from 'express';
import defaultMiddleware from 'api/middlewares/default-middleware';
import UserController from 'api/controllers/user-controller';
import authMiddleware from 'api/middlewares/auth-middleware';

export default function ({ router = Router() }: { router?: Router } = {}) {
  const controller = new UserController();

  router.post('/register', defaultMiddleware(controller.register()));
  router.post('/login', defaultMiddleware(controller.login()));
  router.post('/check/email', defaultMiddleware(controller.checkEmail()));
  router.post(
    '/check/phone-number',
    defaultMiddleware(controller.checkPhoneNumber())
  );
  router.get('/profile', authMiddleware(), defaultMiddleware(controller.get()));
  router.get(
    '/profile/:userId',
    authMiddleware(),
    defaultMiddleware(controller.get())
  );
  router.post(
    '/logout',
    authMiddleware(),
    defaultMiddleware(controller.logout())
  );

  return router;
}
