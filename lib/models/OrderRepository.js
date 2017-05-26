'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * This takes in a google sheet and converts it into an SKU object
 */
var UserRepository = function () {
  /* This class is for containing all of the cases and providing search functions for it. */
  function UserRepository(users) {
    _classCallCheck(this, UserRepository);

    this.users = users;
  }

  /**
   * Remove an user from the repository.
   * @param name
   */


  _createClass(UserRepository, [{
    key: 'deleteUser',
    value: function deleteUser(name) {
      var _this = this;

      return new _bluebird2.default(function (resolve, reject) {
        if (_this.users[name]) {
          delete _this.users[name];
          return resolve(name);
        }

        return reject(_boom2.default.notFound());
      });
    }
  }, {
    key: 'patchUser',
    value: function patchUser(name, newUserAttributes) {
      var _this2 = this;

      return new _bluebird2.default(function (resolve, reject) {
        if (_this2.users[name]) {
          _.extend(_this2.users[name], newUserAttributes);
        }
        return reject(_boom2.default.notFound());
      });
    }

    /**
     * Add a new user to the user workbook
     * @param user
     * @returns {*|Promise.<name>} promise that adds the user and returns the new ID
     */

  }, {
    key: 'addUser',
    value: function addUser(user) {
      var _this3 = this;

      return new _bluebird2.default(function (resolve) {
        _this3.users[user.name] = user;
        return resolve(user.name);
      });
    }

    /**
     * Returns a promise that will contain a caseRepository instance or throw an error
     * @param data
     * @returns {*|Promise.<UserRepository>}
     */

  }, {
    key: 'getAll',


    /**
     * Returns all users in the repository, keyed by ID
     * @returns {*}
     */
    value: function getAll() {
      return this.users;
    }

    /**
     * Return a single user that matches the user ID
     * @param name
     * @returns {User}
     */

  }, {
    key: 'get',
    value: function get(name) {
      return this.users[name];
    }
  }], [{
    key: 'createFromData',
    value: function createFromData(data) {
      return new _bluebird2.default(function (resolve) {
        return resolve(new UserRepository(data));
      });
    }
  }]);

  return UserRepository;
}();

exports.default = UserRepository;