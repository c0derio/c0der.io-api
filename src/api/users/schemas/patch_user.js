import Joi from 'joi';

export default Joi.object().keys({
  nickName: Joi.string().max(10000),
  firstName: Joi.string().max(10000),
  familyName: Joi.string().max(10000)
}).or(
  'nickName',
  'firstName',
  'familyName'
);
