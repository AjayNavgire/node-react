const express = require("express");
const { addJob } = require("../controller/jobController");
const { getJob } = require("../controller/jobController");


const router = express.Router();

router.route("/addJob").post(addJob);
router.route("/jobs").get(getJob);

module.exports = router;