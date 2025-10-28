const express = require("express");
const sellerFile = require("./seller");
const buyerFile = require("./buyer");

const router = express.Router();

router.use("/seller",sellerFile);
router.use("/buyer",buyerFile);

module.exports = router;