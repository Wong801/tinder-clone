import Service from 'services';
import Controller from '.';
import db from 'engine/db/prisma';
import { RequestHandler } from 'express';

export default class MasterController extends Controller<Service> {
  constructor(service: Service = new Service({ prisma: db })) {
    super({ service });
  }

  listZodiac(): RequestHandler {
    return async (req, res) => {
      const data = await this.service.prisma.mstZodiac.findMany();

      res.locals.response.setResults({
        data,
      });
    };
  }

  listGender(): RequestHandler {
    return async (req, res) => {
      const data = await this.service.prisma.mstGender.findMany();

      res.locals.response.setResults({
        data,
      });
    };
  }
}
