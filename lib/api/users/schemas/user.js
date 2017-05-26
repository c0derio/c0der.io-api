'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _joi2.default.object().keys({
  id: _joi2.default.string().max(10000).required(),
  nickName: _joi2.default.string().max(10000),
  firstName: _joi2.default.string().max(10000),
  familyName: _joi2.default.string().max(10000)
});