const express = require("express");

const {
    validateContactField,
    validateUpdateContact,
} = require("../../helpers/validateContacts");

const {
    getAllContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact,
} = require("../../controllers/contacts.controller.js");

const {
    addContactSchema,
    putContactSchema,
    updateStatusSchema,
} = require("../../helpers/schemasContacts");
const { tryCatchWrapper } = require("../../helpers/helpers.js");

const router = express.Router();

router.get("/", tryCatchWrapper(getAllContacts));
router.get("/:contactId", tryCatchWrapper(getContactById));
router.post(
    "/",
    validateContactField(addContactSchema),
    tryCatchWrapper(addContact)
);
router.delete("/:contactId", tryCatchWrapper(removeContact));
router.put(
    "/:contactId",
    validateUpdateContact(putContactSchema),
    tryCatchWrapper(updateContact)
);
router.patch(
    "/:contactId/favorite",
    validateContactField(updateStatusSchema),
    tryCatchWrapper(updateStatusContact)
);

module.exports = router;
