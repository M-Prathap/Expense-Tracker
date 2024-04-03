import React from "react";
import "./AddBallance.css";
import { useSnackbar } from "notistack";

export default function AddBallance({
  setAddBallance,
  walletBallance,
  setwalletBallance,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = (e) => {
    e.preventDefault();

    const amount = parseInt(e.target[0].value);
    if (amount < 0) {
      enqueueSnackbar("Please enter a positive value.", { variant: "error" });
      return;
    }

    localStorage.setItem("walletBallance", walletBallance + amount);
    setwalletBallance(walletBallance + amount);
    setAddBallance(false);
  };
  return (
    <div className="container_Box">
      <div className="Ballance">
        <h1>Add Balance</h1>
        <form
          className="Form"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <input
            className="Amount"
            type="number"
            placeholder="Income Amount"
            required
          />
          <button className="submitButton" type="submit">
            Add Balance
          </button>
          <button
            className="cancelButton"
            type="button"
            onClick={() => {
              setAddBallance(false);
            }}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
