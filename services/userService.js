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

  getOneUser(id) {
    const user = userRepository.getOne(id);
    if (!user) {
      return null;
    }
    return user;
  }

  createUser(data) {
    const createUser = userRepository.create(data);
    if (!createUser) {
      return null;
    }
    return createUser;
  }

  updateUser(id, data) {
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
