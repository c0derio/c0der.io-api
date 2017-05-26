import Joi from 'joi';

export default Joi.object().keys({
  id: Joi.string().max(10000).required(),
  nickName: Joi.string().max(10000),
  firstName: Joi.string().max(10000),
  familyName: Joi.string().max(10000)
});
