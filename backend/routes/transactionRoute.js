const express = require("express");
const postTransaction = require("../Controllers/Transaction/PostTransaction");
const getAllTransaction = require("../Controllers/Transaction/GetAllTransaction");
const getSingleTransaction = require("../Controllers/Transaction/GetSingleTransaction");
const putTransaction = require("../Controllers/Transaction/PutTransaction");
const deleteTransaction = require("../Controllers/Transaction/DeleteTransaction");
const summary = require("../Controllers/Summary/summary");

const router = express.Router();

router.post("/transactions", postTransaction);
router.get("/transactions", getAllTransaction);
router.get("/transactions/:id", getSingleTransaction);
router.put("/transactions/:id", putTransaction);
router.delete("/transactions/:id", deleteTransaction);
router.get("/summary", summary);

module.exports = router;
