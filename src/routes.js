import getOrders from './api/users/routes/get_users';
import getOrder from './api/users/routes/get_user';
import postOrder from './api/users/routes/post_user';
import patchOrder from './api/users/routes/patch_user';
import deleteOrder from './api/users/routes/delete_user';

const register = (server, options, next) => {
  server.route(getOrders(server));
  server.route(getOrder(server));
  server.route(postOrder(server));
  server.route(patchOrder(server));
  server.route(deleteOrder(server));
  next();
};

register.attributes = {
  name: 'routes'
};

export default register;
