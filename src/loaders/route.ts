import { Router, type Express } from 'express';
import userRoute from 'api/routes/user-route';
import profileRoute from 'api/routes/profile-route';
import masterRoute from 'api/routes/master-route';
import actionRoute from 'api/routes/action-route';
import premiumRoute from 'api/routes/premium-route';

export default ({ app }: { app: Express }) => {
  const router = Router();
  app.use('/api/v1/masters', masterRoute({ router }));
  app.use('/api/v1/users', userRoute({ router }));
  app.use('/api/v1/profiles', profileRoute({ router }));
  app.use('/api/v1/actions', actionRoute({ router }));
  app.use('api/v1/premiums', premiumRoute({ router }));
};
