const express = require("express");
const router = express.Router();
const { signIn } = require("../services/userauth");
const { createUser } = require("../services/user");
const config = require("config");

/**
 * Method: POST
 * Path: /userauth/
 * Description: login user to the service
 * Params: NULL
 * Body: Email and Password
 */
router.post("/", async (req, res) => {
  try {
    let { email, password } = req.body;
    let { user, token, status, error, errorCode } = await signIn(
      email,
      password
    );
    if (status) {
      const { _id, name, email} = user;
      res.cookie("token", token, { expiresIn: config.get("JWT_EXPIRE_TIME") });
      return res.status(200).send({
        token,
        user: { _id, name, email},
      });
    }
    return res.status(errorCode).send({ message: error });
  } catch (ex) {
    return res.status(505).send({ message: ex.message });
  }
});

/**
 * Method: POST
 * Path: /userauth/register
 * Description: register user to the service
 * Params: NULL
 * Body: Email and Password
 */
router.post("/register", async (req, res) => {
  try {
    let user_request = req.body;
    let { user, token, status, error, errorCode } = await createUser(
      user_request
    );
    if (status) {
      const { _id, name, email} = user;
      res.cookie("token", token, { expiresIn: config.get("JWT_EXPIRE_TIME") });
      return res.status(200).send({
        token,
        user: { _id, name, email},
      });
    }
    return res.status(errorCode).send({ message: error });
  } catch (ex) {
    return res.status(505).send({ message: ex.message });
  }
});

module.exports = router;
