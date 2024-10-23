const Transaction = require("../../Models/transactionModel");

const getAllTransaction = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const transactionsList = await Transaction.find({})
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);
    
    const totalTransactions = await Transaction.countDocuments();

    if (pageNumber > Math.ceil(totalTransactions / limitNumber)) {
      return res.status(404).json({
        error_msg: "Invalid Page Number",
        isAction: false,
      });
    }

    res.status(200).json({
      transaction_list: transactionsList,
      total_transactions: totalTransactions,
      total_pages: Math.ceil(totalTransactions / limitNumber),
      current_page: pageNumber,
      isAction: true,
    });
  } catch (error) {
    // error
    // console.error(error); 
    res.status(500).json({
      error_msg: "Internal Server Error",
      isAction: false,
    });
  }
};

module.exports = getAllTransaction;
