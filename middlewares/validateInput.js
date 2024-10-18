const { check, validationResult } = require("express-validator");

exports.validateSignup = [
  check("firstName").not().isEmpty().withMessage("First name is required"),
  check("lastName").not().isEmpty().withMessage("Last name is required"),
  check("username").not().isEmpty().withMessage("Username is required"),
  check("email").isEmail().withMessage("Please enter a valid email"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  check("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    next();
  },
];
