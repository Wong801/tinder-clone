import Joi from 'joi';
import JoiDate from '@joi/date';

export default Joi.extend(JoiDate) as Joi.Root;
