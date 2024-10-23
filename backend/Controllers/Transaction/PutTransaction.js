const moment = require("moment");
const Transaction = require("../../Models/transactionModel");

const putTransaction = async (req, res) => {
  const { id } = req.params;
  const { amount, transaction_type, date, category, description } = req.body;
  // console.log(req.body);

  const checkingValue = await Transaction.findById(id);
  // console.log(checkingValue);

  let parsedDate = null;
  if(date) parsedDate = moment(date, "DD/MM/YYYY").toDate();

  const updatedData = {
    transaction_type: transaction_type || checkingValue.transaction_type,
    category: category || checkingValue.category,
    amount: amount || checkingValue.amount,
    date: parsedDate || checkingValue.date,
    description: description || checkingValue.description,
  };

  //   console.log(id);
  //   console.log(updatedData);
  try {
    const result = await Transaction.findOneAndUpdate(
      { _id: id },
      updatedData,
      {
        new: true,
      }
    );

    if (!result) {
      return res
        .status(404)
        .json({ error_msg: "Transaction ID Not Found", isAction: false });
    }

    res.status(200).json({ msg: "Updated Successfully", isAction: true });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error_msg: "Internal Server Error", isAction: false });
  }
};

module.exports = putTransaction;
