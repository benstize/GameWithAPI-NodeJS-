import { Router } from "express";
import { fightersService } from "../services/fightService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import { fighterService } from "../services/fighterService.js";

const router = Router();

router.post("/", (req, res, next) => {
  const userHeader = req.headers['user'];
  const fightLogHeader = req.headers['fight-log'];
  console.log(userHeader, fightLogHeader)
  if (!fightLogHeader) {
    req.body.error = true;
    req.body.message = "Log of fight is not logged in"
    return next()
  }

  if (!userHeader) {
    req.body.error = true;
    req.body.message = "User is not logged in"
    return next()
  }

  try {
    req.body.user = JSON.parse(userHeader);
    req.body.log = JSON.parse(fightLogHeader);
  } catch (error) {
    req.body.error = true;
    req.body.message = "Invalid JSON format in headers";
    return next();
  }


  const createFight = fightersService.createFight({ ...req.body.user, log: [...req.body.log] })

  console.log(createFight)
  next();
}, responseMiddleware
)

export { router };
