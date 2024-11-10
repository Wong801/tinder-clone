import PremiumService from 'services/premium';
import Controller from '.';
import { RequestHandler } from 'express';

export default class PremiumController extends Controller<PremiumService> {
  constructor(service: PremiumService = new PremiumService()) {
    super({ service });
  }

  requestPremium(): RequestHandler {
    return async (req, res) => {
      if (await this.service.requestPremium({ id: res.locals.user.userId })) {
        res.locals.response.setResults({
          data: {
            success: true,
          },
        });
      }
    };
  }

  processPremium(): RequestHandler {
    return async (req, res) => {
      if (await this.service.process({ id: res.locals.user.userId })) {
        res.locals.response.setResults({
          data: {
            success: true,
          },
        });
      }
    };
  }

  activatePremium(): RequestHandler {
    return async (req, res) => {
      if (await this.service.activate({ id: res.locals.user.userId })) {
        res.locals.response.setResults({
          data: {
            success: true,
          },
        });
      }
    };
  }
}
