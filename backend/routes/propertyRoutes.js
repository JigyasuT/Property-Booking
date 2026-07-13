const express = require("express");
const { auth } = require("../middleware/auth");

const { isHost } = require("../middleware/isHost");
const {
  createProperty,
  getMyProperties,
  getAllProperties,
  updateProperty,
  deleteProperty,
  getSingleProperty,
} = require("../controllers/propertyController");
const upload = require("../middleware/upload");

const router = express.Router();

router.post("/create", auth, isHost, upload.array("images", 3), createProperty);

router.get("/my-properties", auth, isHost, getMyProperties);


router.get("/all", getAllProperties);

router.put("/update/:id", auth, isHost, upload.array("images", 3), updateProperty);

router.delete("/delete/:id", auth, isHost, deleteProperty);

router.get("/single/:id", auth, isHost, getSingleProperty);

module.exports = router;
