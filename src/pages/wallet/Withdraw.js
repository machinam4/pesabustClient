import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Withdraw = () => {
  const [Amount, setAmount] = useState("");
  const Balance = useSelector((state) => state.auth.user.account.balance);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Amount);
    if (Amount >= Balance || Amount < 50) {
      toast.error("Invalid Amount");
    }
  };
  return (
    <div className=" m-4">
      <div className="border-2 border-gray-500 bg-gray-800 text-white m-4 rounded-md p-4">
        <h1 className="text-lg font-bold text-yellow-700">
          Withholding Tax Notice
        </h1>
        As provided for by the Income Tax Act, Cap 472, all gaming companies are
        required to withhold winnings at a rate of 20%. This is the Withholding
        Tax. In compliance with the law, Pakakumi will deduct and remit to KRA
        20% of all winnings.
      </div>
      <form className="m-4" onSubmit={handleSubmit}>
        <label
          htmlFor="withdraw"
          className="block text-sm font-medium text-white"
        >
          AMOUNT (KES)
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <input
            type="number"
            name="withdraw"
            value={Amount}
            onChange={(e) => setAmount(e.target.value)}
            id="withdraw"
            className="block w-full rounded-md border-white focus:border-purple-dark focus:ring-purple-dark text-lg"
            min="50"
          />
        </div>

        {/* calculations */}
        <div className="relatve my-5 text-white">
          <table className="border-2 border-midnight w-full">
            <tbody>
              <tr className="border-b border-midnight">
                <td className="pl-3">Available Balance</td>
                <td>{Balance.toLocaleString()}</td>
              </tr>
              <tr className="border-b border-midnight">
                <td className="pl-3">Withdraw Amount</td>
                <td>{Amount.toLocaleString()}</td>
              </tr>
              <tr className="border-b border-midnight">
                <td className="pl-3">Withholding Tax</td>
                <td>{-0.2 * Amount}</td>
              </tr>
              <tr className="border-b border-midnight">
                <td className="pl-3">Withdraw Fee</td>
                <td>-{20}</td>
              </tr>
              <tr className="border-b border-midnight">
                <td className="pl-3">Disbursed Amount</td>
                <td className="text-red">
                  {(Amount - (0.2 * Amount + 20)).toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* submit button */}
        <button
          type="submit"
          className="w-full justify-center rounded-md border border-transparent bg-orange my-4 py-2 px-4 text-lg text-white hover:bg-yellow focus:outline-none focus:ring-2 focus:ring-yellow focus:ring-offset-2"
        >
          WITHDRAW
        </button>
      </form>
    </div>
  );
};

export default Withdraw;
