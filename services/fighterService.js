import { FIGHTER } from "../models/fighter.js";
import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {



  getAllFighters() {
    const fighters = fighterRepository.getAll();
    if (!fighters) {
      return null
    }
    return fighters
  }


  getOneFighter(search) {
    const fighter = fighterRepository.getOne(search)

    if (!fighter) {
      return null
    }

    return fighter

  }

  createFighter(data) {

    for (const key in FIGHTER) {
      FIGHTER[key] = data[key];
    }

    const createdFighter = fighterRepository.create(FIGHTER)
    if (!createdFighter) {
      null
    }
    return createdFighter;

  }

  updateFighter(id, data) {
    for (const key in FIGHTER) {
      FIGHTER[key] = data[key];
    }
    if (!data) {
      return null
    }
    const updatedFighter = fighterRepository.update(id, FIGHTER)
    if (!updatedFighter) {
      null
    }
    return updatedFighter;
  }
}

const fighterService = new FighterService();

export { fighterService };
