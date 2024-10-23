const Transaction = require("../../Models/transactionModel");

const getSingleTransaction = async (req, res) => {
  const { id } = req.params;
  //   console.log(id);
  try {
    const getTransactionItem = await Transaction.findById(id);
    // console.log("eerror", getTransactionItem);

    if (!getTransactionItem) {
      return res
        .status(404)
        .json({ error_msg: "Transaction ID Not Found", isAction: false });
    }

    res
      .status(200)
      .json({ get_transaction_item: getTransactionItem, isAction: true });
  } catch (error) {
    // console.log(error);
    res.status(500);
    res.json({ error_msg: "Internal Server Error", isAction: false });
  }
};

module.exports = getSingleTransaction;
