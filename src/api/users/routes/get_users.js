import _ from 'lodash';
import Joi from 'joi';
import logger from '../../../logger';
import UserService from '../../../service/UserService';

export default () => ({
  method: 'GET',
  path: '/api/users',
  config: {
    auth: {
      strategies: ['jwt'],
      scope: ['read:users']
    },
    description: 'Get all users in the system.',
    tags: ['api'],
    validate: {
      query: {
        search: Joi.string().max(1000).allow('').default(''),
        page: Joi.number().integer().min(0).max(1000)
      }
    }
  },
  handler: (req, reply) => {
    logger.debug('Getting users');
    const userService = new UserService();
    userService.getAllNotCancelled()
      .then(users => reply(_.values(users)))
      .catch((e) => {
        if (e.message) {
          logger.error('Error trying to get users data: ', e.message);
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
