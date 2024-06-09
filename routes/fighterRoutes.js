import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";
import { FIGHTER } from "../models/fighter.js";
import { userRepository } from "../repositories/userRepository.js";

const router = Router();


router.get("/", (req, res, next) => {
  const fighters = fighterService.getAllFighters();
  console.log(fighters)
  if (fighters.length < 1) {
    req.body.error = true;
    req.body.errorNumber = 404;
    req.body.message = "No one fighter exists"
    return next();
  }

  req.body = fighters;
  next()

}, responseMiddleware)


router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  const fighter = fighterService.getOneFighter({ id })
  if (!fighter) {
    req.body.error = true;
    req.body.message = "Fighter is not found";
    return next();
  }
  req.body = fighter;
})


router.post("/", createFighterValid,
  (req, res, next) => {

    if (req.body.error) {
      return next();
    }

    const { name } = req.body;

    const isFighterExist = fighterService.getOneFighter({ name });
    if (isFighterExist) {
      req.body.error = true;
      req.body.message = "Fighter exists"
      return next();
    }



    const createdFighter = fighterService.createFighter(req.body);

    if (!createdFighter) {
      req.error = true;
      req.message = "Something has gone wrong"
      return next();
    }

    req.body = createdFighter;

    next();

  }, responseMiddleware)


router.patch('/:id', updateFighterValid, (req, res, next) => {
  if (req.body.error) {
    return next();
  }
  const id = req.params.id;



  const updatedFighter = fighterService.updateFighter(id, req.body);

  if (!updatedFighter) {
    req.body.error = true;
    req.body.message = "Updating is unsuccessful";
    return next();
  }

  req.body = updatedFighter;
  next();

}, responseMiddleware)

export { router };
