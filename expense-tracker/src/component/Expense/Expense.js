import React from "react";
import "./Expense.css";
export default function Expense({
  setAddExpense,
  totalExpense,
  setTransactions,
}) {
  return (
    <div className="Container">
      <div>
        <h1>
          Expenses : <span className="Amount">₹{totalExpense}</span>
        </h1>
      </div>
      <button
        className="capsuleButton"
        onClick={() => {
          setAddExpense([true, -1]);
        }}
      >
        +Add Expense
      </button>
    </div>
  );
}
