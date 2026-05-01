import React from "react";

function ExpenseDetails({ incomeAmt, expenseAmt }) {
  const balance = incomeAmt - expenseAmt;

  return (
    <div className="expense-details-wrapper">
      <div className="balance-display">Your Balance is ₹{balance}</div>
      {/* Show Income & Expense amount */}
      <div className="amounts-container">
        <div>
          <span>Income</span>
          <span className="income-amount">₹{incomeAmt}</span>
        </div>
        <div>
          <span>Expense</span>
          <span className="expense-amount">₹{expenseAmt}</span>
        </div>
      </div>
    </div>
  );
}

export default ExpenseDetails;
