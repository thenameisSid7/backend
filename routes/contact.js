const express = require("express");
const router = express.Router();
const config = require("config");
const {
  createContact,
  getContact,
  deleteContact,
  updateContact,
} = require("../services/contact");

router.get("/", async (req, res) => {
  try {
    let { contact, status, error, errorCode } = await getContact();
    if (status) {
      return res.status(200).send({ contact: contact });
    }
    return res.status(errorCode).send({ message: error });
  } catch (ex) {
    return res.status(505).send({ message: ex.message });
  }
});

router.post("/", async (req, res) => {
  try {

    let contact_request = req.body;
    let { contact, status, error, errorCode } = await createContact(
      contact_request
    );
    if (status) {
      return res.status(200).send({ contact: contact });
    }
    return res.status(errorCode).send({ message: error });
  } catch (ex) {
    return res.status(505).send({ message: ex.message });
  }
});

router.put("/", async (req, res) => {
  try {
    let contact = req.body;
    let { con,status, error, errorCode } = await updateContact(
      contact
    );
    if (status) {
      return res.status(200).send({con});
    }
    return res.status(errorCode).send({ message: error });
  } catch (ex) {
    return res.status(505).send({ message: ex.message });
  }
});

router.delete("/", async (req, res) => {
  try {
    let body = req.body;
    let { status, error, errorCode } = await deleteContact(body);
    if (status) {
      return res.status(200).send({
        isDeleted: status,
      });
    }
    return res.status(errorCode).send({ message: error });
  } catch (ex) {
    return res.status(505).send({ message: ex.message });
  }
});

module.exports = router;
