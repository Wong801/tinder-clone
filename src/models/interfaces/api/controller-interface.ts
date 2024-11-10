/* eslint-disable no-unused-vars */
import Joi from 'joi';
export interface IController {
  validateRequest(
    schema: Joi.ObjectSchema<any>,
    payload: any
  ): Joi.ValidationResult<any>;
}
