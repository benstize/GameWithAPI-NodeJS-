
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const validatePhone = (phone) => {
  const re = new RegExp(
    /(\+380)?\(?\d{3}\)?[\s\.-]?(\d{7}|\d{3}[\s\.-]\d{2}[\s\.-]\d{2}|\d{3}-\d{4})/,
    "g"
  );
  return re.test(phone);
};

const createUserValid = (req, res, next) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;


  if (!firstName) {

    req.body.error = true;
    req.body.message = "First name is required";
  }
  if (!lastName) {

    req.body.error = true;
    req.body.message = "Last name is required";
  }
  if (!email) {
    req.body.error = true;
    req.body.message = "Email is required";
  } else if (!validateEmail(email)) {

    req.body.error = true;
    req.body.message = "Invalid email";
  }
  if (!phoneNumber) {
    req.body.error = true;
    req.body.message = "Phone number is required";
  } else if (!validatePhone(phoneNumber)) {
    req.body.error = true;
    req.body.message = "Phone number must be +380xxxxxxxxx";
  }
  if (!password) {

    req.body.error = true;
    req.body.message = "Password is required"
  } else if (password.length < 3) {
    req.body.error = true;
    req.body.message = "Password must be at least 3 characters long"
  }
  next();
};



const updateUserValid = (req, res, next) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  if (!firstName && !lastName && !email && !phoneNumber && !password) {
    req.body.error = true;
    req.body.message = "At least one field must be changed"
    return next();
  }

  if (firstName !== undefined && firstName === "") {
    req.body.error = true;
    req.body.message = "First name cannot be empty"
  }
  if (lastName !== undefined && lastName === "") {
    req.body.error = true;
    req.body.message = "Last name cannot be empty"
  }
  if (email !== undefined) {
    if (email === "") {
      req.body.error = true;
      req.body.message = "Email cannot be empty"
    } else if (!validateEmail(email)) {
      req.body.error = true;
      req.body.message = "Invalid email"
    }
  }
  if (phoneNumber !== undefined && phoneNumber === "") {

    req.body.error = true;
    req.body.message = "Phone number cannot be empty";
  } else if (!validatePhone(phoneNumber)) {
    req.body.error = true;
    req.body.message = "Phone number must be +380xxxxxxxxx";
  }


  if (password !== undefined) {
    if (password === "") {
      req.body.error = true;
      req.body.message = "Password cannot be empty";
    } else if (password.length < 3) {
      req.body.error = true;
      req.body.message = "Password must be at least 3 characters long";
    }
  }



  next();
};

export { createUserValid, updateUserValid };
