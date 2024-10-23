const ifThenElse = (condition, thenValue, elseValue) => {
  return {
    $cond: [
      condition, // Condition
      thenValue, // Then
      elseValue, // Else
    ],
  };
};

const summary = async (req, res) => {
  try {
    // console.log("Fetching summary...");

    const summary = await Transaction.aggregate([
      {
        $group: {
          _id: null,
          total_income: {
            $sum: ifThenElse(
              { $eq: ["$transaction_type", "income"] },
              "$amount",
              0
            ),
          },
          total_expenses: {
            $sum: ifThenElse(
              { $eq: ["$transaction_type", "expense"] },
              "$amount",
              0
            ),
          },
        },
      },
      {
        $project: {
          _id: 0,
          total_income: 1,
          total_expenses: 1,
          balance: { $subtract: ["$total_income", "$total_expenses"] },
        },
      },
    ]);

    const summaryResult = summary[0] || {
      total_income: 0,
      total_expenses: 0,
      balance: 0,
    };
    res
      .status(200)
      .json({ transaction_details: summaryResult, isAction: true });
  } catch (error) {
    // console.error(error);
    res
      .status(500)
      .json({ error: "Failed to retrieve summary", isAction: false });
  }
};

module.exports = summary;
