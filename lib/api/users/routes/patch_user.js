'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _patch_user = require('../schemas/patch_user');

var _patch_user2 = _interopRequireDefault(_patch_user);

var _logger = require('../../../logger');

var _logger2 = _interopRequireDefault(_logger);

var _UserService = require('../../../service/UserService');

var _UserService2 = _interopRequireDefault(_UserService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  return {
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
          id: _joi2.default.string().guid().required()
        },
        payload: _patch_user2.default
      }
    },
    handler: function handler(req, reply) {
      var service = new _UserService2.default();
      var newUserAttributes = req.payload;
      _logger2.default.info('patching user: ', JSON.stringify(newUserAttributes));
      service.patchUser(req.params.id, newUserAttributes).then(function (newUser) {
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