const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
  {
    // user_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true
    // },
    transaction_type: {
      type: String,
      required: true,
      enum: ['income', 'expense']
    },
    category: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
