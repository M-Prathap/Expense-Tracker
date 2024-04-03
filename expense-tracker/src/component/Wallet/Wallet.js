import React from "react";
import "./Wallet.css";
export default function Wallet({ walletBallance, setAddBallance }) {
  return (
    <div className="Container">
      <div>
        <h1>
          Wallet Balance : <span className="Amount">₹{walletBallance}</span>
        </h1>
      </div>
      <button
        className="capsuleButton1"
        onClick={() => {
          setAddBallance(true);
        }}
      >
        +Add Income
      </button>
    </div>
  );
}
