import React, { useEffect } from "react";
import "./HomePage.css";
import Wallet from "../Wallet/Wallet";
import Expense from "../Expense/Expense";
import ExpenseChart from "../ExpenseChart/ExpenseChart";
import Transaction from "../Transaction/Transaction";
import TopExpense from "../TopExpense/TopExpense";
import { useState } from "react";
import AddBallance from "../AddBallance/AddBallance";
import AddExpense from "../AddExpense/AddExpense";

export default function HomePage() {
  const [addExpense, setAddExpense] = useState([false, -1]);
  const [editExpense, seteditExpense] = useState([false, -1]);
  const [addBallance, setAddBallance] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [data, setdata] = useState([]);
  const [totalExpense, setTotalExpense] = useState([]);
  const [walletBallance, setwalletBallance] = useState(
    parseInt(localStorage.getItem("walletBallance")) || 5000
  );
  const [colors, setColor] = useState({
    Food: "#A000FF",
    Entertainment: "#FF9304",
    Travel: "#FDE006",
  });
  useEffect(() => {
    let arrTransaction = JSON.parse(
      localStorage.getItem("transaction") || "[]"
    );

    let collectiveData = arrTransaction.reduce((acc, currentItem) => {
      const existingCategory = acc.find(
        (item) => item.name === currentItem.category
      );
      if (existingCategory) {
        existingCategory.value += parseInt(currentItem.price);
      } else {
        acc.push({
          name: currentItem.category,
          value: currentItem.price,
          color: colors[currentItem.category],
        });
      }
      return acc;
    }, []);
    let totalSpend = collectiveData.reduce((acc, currentItem) => {
      return acc + parseInt(currentItem.value);
    }, 0);
    setTransactions(arrTransaction);
    setdata(collectiveData);
    setTotalExpense(totalSpend);
    console.log(transactions, "Intial");
  }, [colors]);
  useEffect(() => {
    console.log(transactions, "Change");
    let collectiveData = transactions.reduce((acc, currentItem) => {
      const existingCategory = acc.find(
        (item) => item.name === currentItem.category
      );
      if (existingCategory) {
        existingCategory.value += parseInt(currentItem.price);
      } else {
        acc.push({
          name: currentItem.category,
          value: currentItem.price,
          color: colors[currentItem.category],
        });
      }
      return acc;
    }, []);
    let totalSpend = collectiveData.reduce((acc, currentItem) => {
      return acc + parseInt(currentItem.value);
    }, 0);
    setdata(collectiveData);
    setTotalExpense(totalSpend);
    setTransactions((prevTransactions) => {
      localStorage.setItem("transaction", JSON.stringify(prevTransactions));
      return prevTransactions;
    });
  }, [transactions, colors]);
  useEffect(() => {
    setwalletBallance((prevBallance) => {
      localStorage.setItem("walletBallance", prevBallance);
      return prevBallance;
    });
  }, [walletBallance]);
  return (
    <div className="Container">
      {addBallance ? (
        <AddBallance
          setAddBallance={setAddBallance}
          walletBallance={walletBallance}
          setwalletBallance={setwalletBallance}
        />
      ) : (
        <></>
      )}
      {addExpense[0] ? (
        <AddExpense
          addExpense={addExpense}
          setAddExpense={setAddExpense}
          heading={"Add Expense"}
          walletBallance={walletBallance}
          setwalletBallance={setwalletBallance}
          transactions={transactions}
          setTransactions={setTransactions}
        />
      ) : (
        <></>
      )}
      {editExpense[0] ? (
        <AddExpense
          addExpense={editExpense}
          setAddExpense={seteditExpense}
          heading={"Edit Expense"}
          walletBallance={walletBallance}
          setwalletBallance={setwalletBallance}
          transactions={transactions}
          setTransactions={setTransactions}
        />
      ) : (
        <></>
      )}
      <h1>Expense Tracker</h1>
      <div>
        <div className="TopContainer">
          <div>
            <Wallet
              walletBallance={walletBallance}
              setAddBallance={setAddBallance}
            />
          </div>
          <div>
            <Expense
              setAddExpense={setAddExpense}
              totalExpense={totalExpense}
              setTransactions={setTransactions}
            />
          </div>
          <div>
            <ExpenseChart data={data} />
          </div>
        </div>
        <div className="TransactionExpenseContainer">
          <div>
            <Transaction
              seteditExpense={seteditExpense}
              walletBallance={walletBallance}
              setwalletBallance={setwalletBallance}
              transactions={transactions}
              setTransactions={setTransactions}
            />
          </div>
          <div>
            <h1>Top Expenses</h1>
            <div className="ExpenseContainer">
              <TopExpense data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
