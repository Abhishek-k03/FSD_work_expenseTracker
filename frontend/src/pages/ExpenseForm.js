import React, { useState } from "react";
import { handleError } from "../utils";
import "../TransactionForm.css";

function ExpenseForm({ addTransaction }) {
  const [transactionType, setTransactionType] = useState("expense");
  const [transactionInfo, setTransactionInfo] = useState({
    amount: "",
    text: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyTransactionInfo = { ...transactionInfo };
    copyTransactionInfo[name] = value;
    setTransactionInfo(copyTransactionInfo);
  };

  const handleTypeChange = (type) => {
    setTransactionType(type);
  };

  const addTransaction_ = (e) => {
    e.preventDefault();
    const { amount, text } = transactionInfo;
    if (!amount || !text) {
      handleError("Please fill all details");
      return;
    }

    // Convert to number and apply sign based on type
    const numAmount = Math.abs(parseFloat(amount));
    const finalAmount = transactionType === "expense" ? -numAmount : numAmount;

    const transactionData = {
      ...transactionInfo,
      amount: finalAmount,
    };

    addTransaction(transactionData);
    setTransactionInfo({ amount: "", text: "" });
  };

  return (
    <div className="transaction-container">
      <h1>Add Transaction</h1>
      <form onSubmit={addTransaction_}>
        {/* Type Toggle */}
        <div className="type-toggle">
          <button
            type="button"
            className={`type-btn ${transactionType === "income" ? "active income" : ""}`}
            onClick={() => handleTypeChange("income")}
          >
            💰 Income
          </button>
          <button
            type="button"
            className={`type-btn ${transactionType === "expense" ? "active expense" : ""}`}
            onClick={() => handleTypeChange("expense")}
          >
            💸 Expense
          </button>
        </div>

        <div>
          <label htmlFor="text">
            {transactionType === "income" ? "Income" : "Expense"} Description
          </label>
          <input
            onChange={handleChange}
            type="text"
            name="text"
            placeholder={`Enter ${transactionType} details...`}
            value={transactionInfo.text}
          />
        </div>

        <div>
          <label htmlFor="amount">Amount (₹)</label>
          <input
            onChange={handleChange}
            type="number"
            name="amount"
            placeholder="Enter amount..."
            value={transactionInfo.amount}
            step="0.01"
            min="0"
          />
        </div>

        <button type="submit" className={`submit-btn ${transactionType}`}>
          Add {transactionType === "income" ? "Income" : "Expense"}
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;
