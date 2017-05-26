import Boom from 'boom';
import userSchema from '../schemas/user';
import logger from '../../../logger';
import UserService from '../../../service/UserService';

export default () => ({
  method: 'POST',
  path: '/api/users/',
  config: {
    auth: {
      strategies: ['jwt'],
      scope: ['create:users']
    },
    description: 'Create a new user..',
    tags: ['api'],
    validate: {
      payload: userSchema
    }
  },
  handler: (req, reply) => {
    const service = new UserService();
    const user = req.payload;
    logger.info('adding new user: ', JSON.stringify(user));
    service.addUser(user)
      .then(newUser => reply(newUser))
      .catch((e) => {
        logger.error(e.message);
        logger.error(e.message);
        logger.error(e.stack);
        return reply(Boom.wrap(e));
      });
  }
});
