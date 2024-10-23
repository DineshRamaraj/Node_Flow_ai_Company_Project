const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    transaction_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    transaction_type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

Category = mongoose.model("Category", categorySchema);

module.exports = Category;
