'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _logger = require('../../../logger');

var _logger2 = _interopRequireDefault(_logger);

var _UserService = require('../../../service/UserService');

var _UserService2 = _interopRequireDefault(_UserService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return {
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
          id: _joi2.default.string().required()
        }
      }
    },
    handler: function handler(req, reply) {
      var userService = new _UserService2.default();
      userService.getUser(req.params.id).then(function (user) {
        if (user) return reply(user);
        return reply(_boom2.default.notFound());
      }).catch(function (e) {
        if (e.message) {
          _logger2.default.error('Error trying to get user data: ', e.message);
          _logger2.default.error(e.stack);
        } else {
          _logger2.default.error(e);
        }

        return reply({
          statusCode: 500,
          error: 'Internal Configuration Error',
          message: e.message ? e.message : e
        });
      });
    }
  };
};