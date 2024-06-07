import { FIGHTER } from "../models/fighter.js";

const createFighterValid = (req, res, next) => {
  const { name, health, power, defense } = req.body;

  const errors = [];

  if (!name) {
    errors.push({ field: "name", message: "Name is required" });
  }
  if (health !== undefined) {
    if (typeof health !== "number" || health < 0 || health > 100) {
      errors.push({
        field: "health",
        message: "Health must be a number between 0 and 100",
      });
    }
  } else {
    errors.push({ field: "health", message: "Health is required" });
  }
  if (power === undefined || typeof power !== "number" || power < 0) {
    errors.push({
      field: "power",
      message: "Power must be a non-negative number",
    });
  }
  if (
    defense === undefined ||
    typeof defense !== "number" ||
    defense < 1 ||
    defense > 10
  ) {
    errors.push({
      field: "defense",
      message: "Defense must be a number between 1 and 10",
    });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

const updateFighterValid = (req, res, next) => {
  const { name, health, power, defense } = req.body;

  const errors = [];

  if (name !== undefined && name === "") {
    errors.push({ field: "name", message: "Name cannot be empty" });
  }
  if (health !== undefined) {
    if (typeof health !== "number" || health < 0 || health > 100) {
      errors.push({
        field: "health",
        message: "Health must be a number between 0 and 100",
      });
    }
  }
  if (power !== undefined) {
    if (typeof power !== "number" || power < 0) {
      errors.push({
        field: "power",
        message: "Power must be a non-negative number",
      });
    }
  }
  if (defense !== undefined) {
    if (typeof defense !== "number" || defense < 1 || defense > 10) {
      errors.push({
        field: "defense",
        message: "Defense must be a number between 1 and 10",
      });
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

export { createFighterValid, updateFighterValid };
