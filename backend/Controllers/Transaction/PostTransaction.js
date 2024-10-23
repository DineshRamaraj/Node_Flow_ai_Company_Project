const moment = require("moment");
const Transaction = require("../../Models/transactionModel");

const postTransaction = async (req, res) => {
  // console.log(req.body);
  const {
    transaction_type,
    category,
    amount,
    date,
    description = transaction_type,
  } = req.body;

  if (
    transaction_type === "" ||
    category === "" ||
    amount === "" ||
    date === ""
  ) {
    res
      .status(401)
      .json({ error_msg: "All Fields are Mandatory", isAction: false });
    return;
  }

  // if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) {
  //   return res.status(400).json({ error_msg: "Invalid date format", isAction: false });
  // }
  

  function convertDateFormat(dateString) {
    const parts = dateString.split('-') || dateString.split('/'); 
    if (parts.length === 3) {
        const year = parts[0]; 
        const month = parts[1];
        const day = parts[2];  
        if(year.length === 4){
          return `${day}-${month}-${year}`;
        }
        return `${year}-${month}-${day}`;
    } else {
        throw new Error("Invalid date format. Please use yyyy-mm-dd.");
    }
}

const convertedDate = convertDateFormat(date);
// console.log(convertedDate); // Output: "23-10-2024"


  const parsedDate = moment(convertedDate, [
    "DD/MM/YYYY" || "DD-MM-YYYY",
  ]).toDate();

  try {
    await Transaction.create({
      transaction_type: transaction_type,
      category: category,
      amount: amount,
      date: parsedDate,
      description: description,
    });
    res
      .status(201)
      .json({ msg: "Insert Transaction Successfully...", isAction: true });
  } catch (error) {
    // console.log(error);
    res.status(500);
    res.json({ error_msg: "Internal Server Error", isAction: false });
  }
};

module.exports = postTransaction;
