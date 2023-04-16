const logger = require("../middleware/logger");
const config = require("config");
const Contact = require("../models/contact");
const { validate } = require("../validation/contact");

exports.createContact = async (contact) => {
  logger.info("service - contact - createContact - start");
  let { error } = validate(contact);
  if (error) {
    // logger.debug(error);
    // console.log(error);
    return { error: error.message, status: false, errorCode: 400 };
  }
  console.log(contact.name, contact.phone);
  const isNumberAvailable = await Contact.findOne({ phone: contact.phone });
  console.log(isNumberAvailable);
  if (isNumberAvailable != null) {
    return { error: "phone number is Taken", status: false, errorCode: 409 };
  }
  contact = new Contact(contact);
  // create user if not available
  try {
    console.log("hi");
    contact = await contact.save();
    contact = await Contact.findById(contact._id);
    console.log("hi");
  } catch (ex) {
    // logger.debug(ex);
    console.log(ex);
    return { error: ex, status: false, errorCode: 500 };
  }
  // return proper statement of the user.
  return { contact, status: true };
};

exports.getContact = async () => {
  logger.info("service - contact - getContact - start");
  // create user if not available
  try {
    console.log("hi");
    contact = await Contact.find();
    console.log("hi");
  } catch (ex) {
    // logger.debug(ex);
    console.log(ex);
    return { error: ex, status: false, errorCode: 500 };
  }
  // return proper statement of the user.
  return { contact, status: true };
};

exports.updateContact = async (contact) => {
  logger.info("service - contact - updateContact - start");
  // create user if not available
  try {
    console.log("hi");
    contact = await Contact.findByIdAndUpdate(contact._id, {
      "name": contact.name,
      "phone": contact.phone,
    });
    console.log("hi");
  } catch (ex) {
    // logger.debug(ex);
    console.log(ex);
    return { error: ex, status: false, errorCode: 500 };
  }
  // return proper statement of the user.
  return { contact, status: true };
};

exports.deleteContact = async (id) => {
  logger.info("service - contact - getContact - start");
  // create user if not available
  try {
    console.log("hi");
    if (id) {
      await Contact.deleteOne({ _id: id.id });
    } else {
      return {
        error: "id can not be null",
        status: false,
        errorCode: 401,
      };
    }
    console.log("hi");
  } catch (ex) {
    // logger.debug(ex);
    console.log(ex);
    return { error: ex, status: false, errorCode: 500 };
  }
  // return proper statement of the user.
  return { status: true };
};
