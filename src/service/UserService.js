import Promise from 'bluebird';
import UserRepository from '../models/UserRepository';

const users = {
  'auth0|591cb764139ee91029c0d2f2': {
    id: 'auth0|591cb764139ee91029c0d2f2',
    nickName: 'mostekcm',
    firstName: 'Carlos',
    lastName: 'Mostek'
  },
  'auth0|59277acb6b81fe5bad85c3c4': {
    id: 'auth0|59277acb6b81fe5bad85c3c4',
    nickName: 'sgmeyer',
    firstName: 'Shawn',
    lastName: 'Meyer'
  }
};

export default class UserService {
  constructor() {
    /* Grab users from the google sheet */
    // TODO: Do caching for this
    // TODO: Move this to a provider pattern
    // spreadsheet key is the long id in the sheets URL
    this.userRepo = null;
  }

  getUserRepo() {
    if (this.userRepo === null) this.userRepo = UserRepository.createFromData(users);
    return new Promise(resolve => resolve(this.userRepo));
  }

  addUser(user) {
    return this.getUserRepo()
      .then(repo => repo.addUser(user));
  }

  patchUser(userId, newUserAttributes) {
    return this.getUserRepo()
      .then(repo => repo.patchUser(userId, newUserAttributes));
  }

  deleteUser(userId) {
    return this.getUserRepo()
      .then(repo => repo.deleteUser(userId));
  }

  getUser(id) {
    return this.getUserRepo()
      .then(repo => repo.get(id));
  }

  getAll() {
    return this.getUserRepo()
      .then(repo => repo.getAll());
  }
}
