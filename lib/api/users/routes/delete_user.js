'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _logger = require('../../../logger');

var _logger2 = _interopRequireDefault(_logger);

var _UserService = require('../../../service/UserService');

var _UserService2 = _interopRequireDefault(_UserService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return {
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
          id: _joi2.default.string().guid().required()
        }
      }
    },
    handler: function handler(req, reply) {
      var service = new _UserService2.default();
      _logger2.default.warn('deleting user: ', req.params.id);
      service.deleteUser(req.params.id).then(function () {
        return reply({ id: req.params.id });
      }).catch(function (e) {
        _logger2.default.error(e.message);
        _logger2.default.error(e.stackTrace);
        return reply(_boom2.default.wrap(e));
      });
    }
  };
};