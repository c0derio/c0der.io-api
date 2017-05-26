'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get_users = require('./api/users/routes/get_users');

var _get_users2 = _interopRequireDefault(_get_users);

var _get_user = require('./api/users/routes/get_user');

var _get_user2 = _interopRequireDefault(_get_user);

var _post_user = require('./api/users/routes/post_user');

var _post_user2 = _interopRequireDefault(_post_user);

var _patch_user = require('./api/users/routes/patch_user');

var _patch_user2 = _interopRequireDefault(_patch_user);

var _delete_user = require('./api/users/routes/delete_user');

var _delete_user2 = _interopRequireDefault(_delete_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var register = function register(server, options, next) {
  server.route((0, _get_users2.default)(server));
  server.route((0, _get_user2.default)(server));
  server.route((0, _post_user2.default)(server));
  server.route((0, _patch_user2.default)(server));
  server.route((0, _delete_user2.default)(server));
  next();
};

register.attributes = {
  name: 'routes'
};

exports.default = register;