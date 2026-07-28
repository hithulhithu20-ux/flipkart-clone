import { useState } from "react";

const PaymentMethods = () => {
  const [payment, setPayment] =
    useState("cod");

  return (
    <div className="bg-white p-5">

      <h2 className="mb-5 text-xl font-semibold">
        Payment Method
      </h2>

      <div className="space-y-4">

        <label className="flex gap-3">
          <input
            type="radio"
            checked={payment === "cod"}
            onChange={() =>
              setPayment("cod")
            }
          />

          Cash On Delivery
        </label>

        <label className="flex gap-3">
          <input
            type="radio"
            checked={payment === "upi"}
            onChange={() =>
              setPayment("upi")
            }
          />

          UPI
        </label>

        <label className="flex gap-3">
          <input
            type="radio"
            checked={payment === "card"}
            onChange={() =>
              setPayment("card")
            }
          />

          Credit / Debit Card
        </label>

      </div>

    </div>
  );
};

export default PaymentMethods;