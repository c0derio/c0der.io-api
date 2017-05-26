import Joi from 'joi';
import Boom from 'boom';

import logger from '../../../logger';
import UserService from '../../../service/UserService';

export default () => ({
  method: 'GET',
  path: '/api/users/{id}',
  config: {
    auth: {
      strategies: ['jwt'],
      scope: ['read:users']
    },
    description: 'Get a single user based on its unique identifier.',
    tags: ['api'],
    validate: {
      params: {
        id: Joi.string().required()
      }
    }
  },
  handler: (req, reply) => {
    const userService = new UserService();
    userService.getUser(req.params.id)
      .then((user) => {
        if (user) return reply(user);
        return reply(Boom.notFound());
      })
      .catch((e) => {
        if (e.message) {
          logger.error('Error trying to get user data: ', e.message);
          logger.error(e.stack);
        } else {
          logger.error(e);
        }

        return reply({
          statusCode: 500,
          error: 'Internal Configuration Error',
          message: e.message ? e.message : e
        });
      });
  }
});
