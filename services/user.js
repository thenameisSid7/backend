const User = require("../models/user");
const { validate } = require("../validation/user");
const logger = require("../middleware/logger");
const _ = require("lodash");
const config = require("config");
const jwt = require("jsonwebtoken");

/**
 * Creates User in User Service.
 * @param {User} user - user object.
 * @returns - user, token status, error,errorCode
 */
exports.createUser = async (user) => {
  logger.info("service - user - createUser - start");
  logger.debug(`service - user - in createUser, email slug is ${user.email}`);
  let { error } = validate(user);
  console.log(user.password, user.email);
  if (error) {
    logger.debug(error);
    console.log(error);
    return { error: error.message, status: false, errorCode: 400 };
  }

  const isemailAvailable = await User.findOne({ email: user.email });
  console.log(isemailAvailable);
  if (isemailAvailable != null) {
    return { error: "email is Taken", status: false, errorCode: 409 };
  }
  user = new User(user);
  let token = "";
  // create user if not available
  try {
    console.log("hi");
    user = await user.save();

    user = await User.findById(user._id);
    console.log("hi");
    token = jwt.sign({ _id: user._id }, config.get("JWT_SECRET"), {
      expiresIn: config.get("JWT_EXPIRE_TIME"),
    });
  } catch (ex) {
    // logger.debug(ex);
    console.log(ex);
    return { error: "Something Went Wrong", status: false, errorCode: 500 };
  }
  // return proper statement of the user.
  return { user, token, status: true };
};
