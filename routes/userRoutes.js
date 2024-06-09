import { Router } from "express";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import { userService } from "../services/userService.js";

const router = Router();

router.get(
  "/",
  (req, res, next) => {

    const users = userService.getAllUsers();
    if (!users) {
      req.body.error = true;
      req.body.message = "No one user is registred"
    }
    req.body = users;


    next();

  },
  responseMiddleware
);


router.get("/:id", (req, res, next) => {

  const id = req.params.id;
  const user = userService.getOneUser({ id });
  console.log(user)
  if (!user) {
    req.body.error = true;
    req.body.message = "User not found"
  } else {
    req.body = user;
  }
  next();

}, responseMiddleware);


router.post(
  "/",
  createUserValid,
  (req, res, next) => {
    if (req.body.error) {
      return next();
    }

    const { email, phoneNumber } = req.body;
    const IsEmailExist = userService.getOneUser({
      email,
    });
    const isPhoneExist = userService.getOneUser({
      phoneNumber,
    });

    if (IsEmailExist || isPhoneExist) {
      req.body.error = true;
      req.body.message = "User is already exist"
      return next();
    }

    const user = userService.createUser(req.body);
    if (!user) {
      req.body.error = true;
      req.errorNumber = 404;
      req.body.message = "User is not found"

    }
    req.body = user;
    next();
  },
  responseMiddleware
);

router.put(
  "/:id",
  updateUserValid,
  (req, res, next) => {

    if (req.body.error) {
      return next();
    }
    const { id } = req.params;
    const { email, phoneNumber } = req.body;
    const IsEmailExist = userService.getOneUser({
      email,
    });
    const isPhoneExist = userService.getOneUser({
      phoneNumber,
    });

    if (IsEmailExist || isPhoneExist) {
      req.body.error = true;
      req.body.message = "User is already exist"
      return next();
    }
    const user = userService.updateUser(id, req.body);
    if (!user) {
      console.log("!user")
      req.body.error = true;
      req.body.errorNumber = 404;
      req.body.message = "User is not found"
      return next();
    }
    req.body = user;
    delete req.body.password;
    next();

  },
  responseMiddleware
);



router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  const user = userService.removeUser(id)
  if (!user) {
    req.body.error = true;
    req.body.message = "User is not found"
    return next();
  }
  req.body = user;
  next();

}, responseMiddleware)
export { router };
