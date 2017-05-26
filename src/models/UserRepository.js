import _ from 'lodash';
import Promise from 'bluebird';
import Boom from 'boom';

/**
 * This takes in a google sheet and converts it into an SKU object
 */
export default class UserRepository {
  /* This class is for containing all of the cases and providing search functions for it. */
  constructor(users) {
    this.users = users;
  }

  /**
   * Remove an user from the repository.
   * @param userId
   */
  deleteUser(userId) {
    return new Promise((resolve, reject) => {
      if (this.users[userId]) {
        delete this.users[userId];
        return resolve(userId);
      }

      return reject(Boom.notFound());
    });
  }

  patchUser(userId, newUserAttributes) {
    return new Promise((resolve, reject) => {
      if (this.users[userId]) {
        _.extend(this.users[userId], newUserAttributes);
      }
      return reject(Boom.notFound());
    });
  }

  /**
   * Add a new user to the user workbook
   * @param user
   * @returns {*|Promise.<userId>} promise that adds the user and returns the new ID
   */
  addUser(user) {
    return new Promise((resolve) => {
      this.users[user.id] = user;
      return resolve(user.id);
    });
  }

  /**
   * Returns a promise that will contain a caseRepository instance or throw an error
   * @param data
   * @returns {*|Promise.<UserRepository>}
   */
  static createFromData(data) {
    return new Promise(resolve => resolve(new UserRepository(data)));
  }

  /**
   * Returns all users in the repository, keyed by ID
   * @returns {*}
   */
  getAll() {
    return this.users;
  }

  /**
   * Return a single user that matches the user ID
   * @param userId
   * @returns {User}
   */
  get(userId) {
    return this.users[userId];
  }
}
