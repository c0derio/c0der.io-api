'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _user = require('../schemas/user');

var _user2 = _interopRequireDefault(_user);

var _logger = require('../../../logger');

var _logger2 = _interopRequireDefault(_logger);

var _UserService = require('../../../service/UserService');

var _UserService2 = _interopRequireDefault(_UserService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return {
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
        payload: _user2.default
      }
    },
    handler: function handler(req, reply) {
      var service = new _UserService2.default();
      var user = req.payload;
      _logger2.default.info('adding new user: ', JSON.stringify(user));
      service.addUser(user).then(function (newUser) {
        return reply(newUser);
      }).catch(function (e) {
        _logger2.default.error(e.message);
        _logger2.default.error(e.message);
        _logger2.default.error(e.stack);
        return reply(_boom2.default.wrap(e));
      });
    }
  };
};