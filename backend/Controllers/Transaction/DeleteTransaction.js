const Transaction = require("../../Models/transactionModel");

const deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Transaction.findOneAndDelete({ _id: id });

    if (!result) {
      return res
        .status(404)
        .json({ error_msg: "Transaction ID not found", isAction: false });
    }

    res
      .status(200)
      .json({ success: true, message: "Transaction deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error_msg: "Internal Server Error", isAction: false });
  }
};

module.exports = deleteTransaction;
