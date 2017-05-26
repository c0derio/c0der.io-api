'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sprintfJs = require('sprintf-js');

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _UserRepository = require('../models/UserRepository');

var _UserRepository2 = _interopRequireDefault(_UserRepository);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var users = {
  'Carlos Mostek': {
    name: 'Carlos Mostek'
  },
  'Shawn Meyer': {
    name: 'Shawn Meyer'
  }
};

var UserService = function () {
  function UserService() {
    _classCallCheck(this, UserService);

    /* Grab users from the google sheet */
    // TODO: Do caching for this
    // TODO: Move this to a provider pattern
    // spreadsheet key is the long id in the sheets URL
    this.userRepo = null;
  }

  _createClass(UserService, [{
    key: 'getUserRepo',
    value: function getUserRepo() {
      var _this = this;

      if (this.userRepo === null) this.userRepo = _UserRepository2.default.createFromData(users);
      return new _bluebird2.default(function (resolve) {
        return resolve(_this.userRepo);
      });
    }
  }, {
    key: 'addUser',
    value: function addUser(user) {
      return this.getUserRepo().then(function (repo) {
        return repo.addUser(user);
      });
    }
  }, {
    key: 'patchUser',
    value: function patchUser(userId, newUserAttributes) {
      return this.getUserRepo().then(function (repo) {
        return repo.patchUser(userId, newUserAttributes);
      });
    }
  }, {
    key: 'deleteUser',
    value: function deleteUser(userId) {
      return this.getUserRepo().then(function (repo) {
        return repo.deleteUser(userId);
      });
    }
  }, {
    key: 'getUser',
    value: function getUser(id) {
      return this.getUserRepo().then(function (repo) {
        return repo.get(id);
      });
    }
  }, {
    key: 'getAll',
    value: function getAll() {
      return this.getUserRepo().then(function (repo) {
        return repo.getAll();
      });
    }
  }]);

  return UserService;
}();

exports.default = UserService;