import Boom from 'boom';
import Joi from 'joi';
import logger from '../../../logger';
import UserService from '../../../service/UserService';

export default () => ({
  method: 'DELETE',
  path: '/api/users/{id}',
  config: {
    auth: {
      strategies: ['jwt'],
      scope: ['delete:users']
    },
    description: 'Get all users in the system.',
    tags: ['api'],
    validate: {
      params: {
        id: Joi.string().guid().required()
      }
    }
  },
  handler: (req, reply) => {
    const service = new UserService();
    logger.warn('deleting user: ', req.params.id);
    service.deleteUser(req.params.id)
      .then(() => reply({ id: req.params.id }))
      .catch((e) => {
        logger.error(e.message);
        logger.error(e.stackTrace);
        return reply(Boom.wrap(e));
      });
  }
});
