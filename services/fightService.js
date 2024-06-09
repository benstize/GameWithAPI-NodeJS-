import { FIGHT } from "../models/fight.js";
import { fightRepository } from "../repositories/fightRepository.js";

class FightersService {

    getAllFights() {
        const fights = fightRepository.getAll()
        if (!fights) {
            return null
        }
        return fights
    }

    getOneFight(search) {
        const fight = fightRepository.getOne(search);
        if (!fight) {
            return null
        }
        return fight
    }

    createFight(data) {

        for (const key in FIGHT) {
            FIGHT[key] = data[key]
        }



        const createdFight = fightRepository.create(FIGHT)
        if (!createdFight) {
            return null
        }
        return createdFight;
    }

}

const fightersService = new FightersService();

export { fightersService };
