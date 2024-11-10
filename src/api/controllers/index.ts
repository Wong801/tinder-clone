import ApiError from 'api/api-error';
import { Response } from 'express';
import Joi from 'joi';
import { IController } from 'models/interfaces/api/controller-interface';
import Service from 'services';

export default class Controller<T extends Service> implements IController {
  readonly service: T;

  constructor({ service }: { service: T }) {
    this.service = service;
  }

  validateRequest(
    schema: Joi.ObjectSchema<any>,
    payload: any
  ): Joi.ValidationResult<any> {
    const validation = schema.validate(payload);

    if (validation.error) {
      throw new ApiError(
        validation.error.details[0].message,
        400,
        validation.error
      );
    }

    return validation;
  }

  async deployCache(
    res: Response,
    {
      key,
      data,
      expiration = null,
    }: { key: string; data: string; expiration?: number }
  ) {
    res.locals.modules.cache.setCache({
      key,
      data,
    });

    await res.locals.modules.cache.deploy(expiration);
  }
}
