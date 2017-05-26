import Boom from 'boom';
import Joi from 'joi';
import patchUserSchema from '../schemas/patch_user';
import logger from '../../../logger';
import UserService from '../../../service/UserService';

export default () => ({
  method: 'PATCH',
  path: '/api/users/{id}',
  config: {
    auth: {
      strategies: ['jwt'],
      scope: ['update:users']
    },
    description: 'Patch an user',
    tags: ['api'],
    validate: {
      params: {
        id: Joi.string().guid().required()
      },
      payload: patchUserSchema
    }
  },
  handler: (req, reply) => {
    const service = new UserService();
    const newUserAttributes = req.payload;
    logger.info('patching user: ', JSON.stringify(newUserAttributes));
    service.patchUser(req.params.id, newUserAttributes)
      .then(newUser => reply(newUser))
      .catch((e) => {
        logger.error(e.message);
        logger.error(e.message);
        logger.error(e.stack);
        return reply(Boom.wrap(e));
      });
  }
});
