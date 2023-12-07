import express from "express";
import bcrypt from "bcrypt";
// import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "./../models/User.js";
import fetchUser from "./../middleware/fetchUser.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

const JWT_SECRET = "Ridoy$ismysecrettoken";

// ROUTE 01: Create a User using: POST "/api/auth/createuser". No login required
router.post(
  "/createuser",
  [
    body("name", "Enter a Valid Name").isLength({ min: 4 }),
    body("email", "Enter a Valid Email").isEmail(),
    body("password", "Enter a Password between 5 to 18").isLength({
      min: 5,
      max: 18,
    }),
  ],

  // If there are errors, return Bad request and the errors

  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check whether the user with this email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        success = false;
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
        passwordwithouthash: req.body.password,
      })
        .then((user) => {
          const data = {
            user: {
              id: user.id,
            },
          };
          const authtoken = jwt.sign(data, JWT_SECRET);
          success = true;
          res.json({success, authtoken});
          // res.json(user);
          console.log(authtoken);
          console.log(user);
          console.log(success, "User Added");
        })
        .catch((error) => {
          success = false;
          console.error(error);
          res.status(500).json({
            error: "Please enter a unique value for email",
            message: error.message,
          });
        });
    } catch (error) {
      success = false;
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 02: Authenticate a User using: POST "/api/auth/login". No login required

router.post(
  "/login",
  [
    body("email", "Enter a Vaild Email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ errors: "Please try to login with correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({ errors: "Please try to login with correct credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 03: Get loggedin User Details using: POST "/api/auth/getuser". Login required

router.post("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
