
const createFighterValid = (req, res, next) => {
  const { name, health, power, defense } = req.body;


  if (!name) {
    req.body.error = true;
    req.body.message = "Name is required"
    return next();
  }
  if (health !== undefined) {
    if (typeof health !== "number" || health < 0 || health > 100) {
      req.body.error = true;
      req.body.message = "Health must be a number between 0 and 100";
      return next();
    }
  }

  if (power === undefined || typeof power !== "number" || power < 0) {
    req.body.error = true;
    req.body.message = "Power must be a non-negative number";
    return next();
  }
  if (
    defense === undefined ||
    typeof defense !== "number" ||
    defense < 1 ||
    defense > 10
  ) {
    req.body.error = true;
    req.body.message = "Defense must be a number between 1 and 10";
    return next()
  }



  next();
};

const updateFighterValid = (req, res, next) => {
  const { name, health, power, defense } = req.body;

  if (!name && !health && !power && !defense) {
    req.body.error = true;
    req.body.message = "At least one field must be changed"
    return next();
  }
  if (name !== undefined && name === "") {
    req.body.error = true;
    req.body.message = "Name must exist";
    return next();
  }


  if (health !== undefined) {
    if (typeof health !== "number" || health < 0 || health > 100) {
      req.body.error = true;
      req.body.message = "Health must be a number between 0 and 100";
      return next();
    }

  }
  if (power !== undefined) {
    if (typeof power !== "number" || power < 0) {
      req.body.error = true;
      req.body.message = "Power must be a non-negative number";
      return next();
    }
  }

  if (defense !== undefined) {
    if (typeof defense !== "number" || defense < 1 || defense > 10) {
      req.body.error = true;
      req.body.message = "Defense must be a number between 1 and 10";
      return next();
    }
  }



  next();
};

export { createFighterValid, updateFighterValid };
