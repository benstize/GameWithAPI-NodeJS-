import { USER } from "../models/user.js";
import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user

  search(search) {
    const item = userRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  getAllUsers() {
    const users = userRepository.getAll();
    if (!users) {
      return null;
    }
    return users;
  }

  getOneUser(search) {
    const user = userRepository.getOne(search);
    if (!user) {
      return null;
    }
    return user;
  }



  createUser(data) {
    for (const key in USER) {
      USER[key] = data[key];
    }

    const createUser = userRepository.create(USER);
    if (!createUser) {
      return null;
    }
    return createUser;
  }

  updateUser(id, data) {
    const user = userRepository.getOne({ id })

    if (!user || !data) {
      return null
    }
    const updatedUser = userRepository.update(id, data);
    if (!updatedUser) {
      return null;
    }
    return updatedUser;
  }

  removeUser(id) {
    const removedUser = userRepository.delete(id);
    if (!removedUser) {
      return null;
    }
    return removedUser;
  }
}

const userService = new UserService();

export { userService };
