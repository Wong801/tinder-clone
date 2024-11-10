import type { Express } from 'express';
import defaultExpress from 'express';
import cors, { CorsOptions } from 'cors';
import { AppConstructor, IApp } from './models/interfaces/app-interface';
import loaders from './loaders';
import responseMiddleware from './api/middlewares/response-middleware';
import errorMiddleware from 'api/middlewares/error-middleware';
import environment from 'engine/environment';

export default class App implements IApp {
  readonly express: typeof defaultExpress;
  private app: Express | null;

  constructor({ express = defaultExpress }: AppConstructor = {}) {
    this.express = express;
    this.app = null;
  }

  init(): Express {
    const corsDomain = environment.engine.cors;

    const corsOptions: CorsOptions = corsDomain
      ? {
          origin: corsDomain.startsWith('/')
            ? new RegExp(corsDomain)
            : corsDomain,
          credentials: true,
        }
      : undefined;

    this.app = this.express();
    this.app.disable('x-powered-by');

    this.app.use(this.express.json());
    this.app.use(this.express.urlencoded({ extended: true }));
    this.app.use(cors(corsOptions));

    loaders({ app: this.app });

    this.app.use(responseMiddleware());
    this.app.use(errorMiddleware());

    return this.app;
  }

  start(): Express {
    const app = this.init();

    app.listen(environment.engine.port, () => {
      console.log(`app is running on port ${environment.engine.port}...`);
    });

    return app;
  }
}
