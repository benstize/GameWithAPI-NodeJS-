import { USER } from "../models/user.js";

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

  const errors = [];

  if (!firstName) {
    errors.push({ field: "firstName", message: "First name is required" });
  }
  if (!lastName) {
    errors.push({ field: "lastName", message: "Last name is required" });
  }
  if (!email) {
    errors.push({ field: "email", message: "Email is required" });
  } else if (!validateEmail(email)) {
    errors.push({ field: "email", message: "Invalid email" });
  }
  if (!phoneNumber) {
    errors.push({ field: "phoneNumber", message: "Phone number is required" });
  } else if (!validatePhone(phoneNumber)) {
    errors.push({ field: "phoneNumber", message: "Phone number is required" });
  }
  if (!password) {
    errors.push({ field: "password", message: "Password is required" });
  } else if (password.length < 3) {
    errors.push({
      field: "password",
      message: "Password must be at least 3 characters long",
    });
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

const updateUserValid = (req, res, next) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  const errors = [];

  if (firstName !== undefined && firstName === "") {
    errors.push({ field: "firstName", message: "First name cannot be empty" });
  }
  if (lastName !== undefined && lastName === "") {
    errors.push({ field: "lastName", message: "Last name cannot be empty" });
  }
  if (email !== undefined) {
    if (email === "") {
      errors.push({ field: "email", message: "Email cannot be empty" });
    } else if (!validateEmail(email)) {
      errors.push({ field: "email", message: "Invalid email" });
    }
  }
  if (phoneNumber !== undefined && phoneNumber === "") {
    errors.push({
      field: "phoneNumber",
      message: "Phone number cannot be empty",
    });
  } else if (!validatePhone(phoneNumber)) {
    errors.push({ field: "phoneNumber", message: "Phone number is required" });
  }

  
  if (password !== undefined) {
    if (password === "") {
      errors.push({ field: "password", message: "Password cannot be empty" });
    } else if (password.length < 3) {
      errors.push({
        field: "password",
        message: "Password must be at least 3 characters long",
      });
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};

export { createUserValid, updateUserValid };
