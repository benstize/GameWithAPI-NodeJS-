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
    try {
      const result = userService.getAllUsers();
      if (!result) throw new Error();
      req.body = result;
      console.log(result)
      res.status(200).send(req.body);
    } catch ({ message }) {
      res.status(404).send({
        error: true,
        message,
      });
    } finally {
      next();
    }
  },
  responseMiddleware
);
router.get("/:id", userService.getOneUser, responseMiddleware);

export { router };
