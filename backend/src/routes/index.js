const express = require("express");
const router = express.Router();

router.use("/contact", require("./contact"));
router.use("/newsletter", require("./newsletter"));

module.exports = router;
