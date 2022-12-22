import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { socket } from "../../context/socket";

const Deposit = () => {
  const userData = useSelector((state) => state.auth.user);
  const [DepositAmount, setDepositAmount] = useState(200);
  const [RefCode, setRefCode] = useState();

  const handleDeposit = async (e) => {
    e.preventDefault();
    if (DepositAmount <= 20) {
      return toast.error("Minimum deposit Amount is Kshs. 50");
    }
    socket.emit(
      "transaction_deposit",
      { amount: Number(DepositAmount) },
      (response) => {
        return toast(response.message, { type: response.status });
      }
    );
  };
  const handlePending = async (e) => {
    e.preventDefault();
  };

  const [IsExpress, setIsExpress] = useState(true);
  return (
    <div>
      <div className=" m-4 flex rounded-md justify-around bg-purple-light">
        <button
          className={
            IsExpress
              ? "w-full text-white p-2 bg-orange rounded-l-md"
              : "w-full p-2 bg-purple-light rounded-l-md text-white"
          }
          onClick={() => setIsExpress(true)}
        >
          M-pesa Express
        </button>
        <button
          className={
            !IsExpress
              ? "w-full text-white p-2 bg-orange rounded-r-md bg-purple-dark"
              : "w-full  p-2 bg-purple-light rounded-r-md text-white"
          }
          onClick={() => setIsExpress(false)}
        >
          Paybill Instructions
        </button>
      </div>
      {IsExpress ? (
        <form
          className="border-2 border-white m-4 rounded-md p-4 "
          onSubmit={handleDeposit}
        >
          <div className="">
            <label
              htmlFor="deposit"
              className="block text-lg text-white font-medium"
            >
              Amount (KES)
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <input
                type="number"
                name="deposit"
                value={DepositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                id="deposit"
                className="block w-full rounded-md border-purple-light focus:border-purple-500 focus:ring-purple-500 text-lg"
                min={20}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full justify-center rounded-md border border-transparent bg-orange my-4 py-2 px-4 text-lg text-white hover:bg-yellow focus:outline-none focus:ring-2 focus:ring-yellow focus:ring-offset-2"
          >
            DEPOSIT
          </button>
        </form>
      ) : (
        <div className="border-2 border-white m-4 rounded-md p-4 text-white">
          NOTE:
          <ul className="list-disc pl-5 text-sm mb-5">
            <li>Minimum deposit amount is KES 100</li>
            <li>
              You can ONLY deposit using the same phone number you use to login.
            </li>
          </ul>
          STEPS:
          <ul className="list-decimal pl-5 text-sm">
            <li>Go to M-PESA on your phone </li>
            <li>Select Pay Bill option </li>
            <li>
              Enter Business no.{" "}
              <span className="text-orange text-lg font-bold">
                {process.env.REACT_APP_MPESA_PAYBILL}
              </span>{" "}
              ({process.env.REACT_APP_MPESA_NAME}){" "}
            </li>
            <li>
              Enter Account no.{" "}
              <span className="text-orange text-lg font-bold">
                {userData.account.accountNumber}
              </span>{" "}
            </li>
            <li>Enter the Amount </li>
            <li>Enter your M-PESA PIN and Send</li>
          </ul>
        </div>
      )}
      <div className="border-2 border-white bg-gray-800 text-white m-4 rounded-md p-4">
        Your deposit is processed within 2 minutes. When there are delays, enter
        the mpesa transaction code in the form below and press Verify.
        <hr className="m-2" />
        For assistance, contact us on{" "}
        <span className="text-orange font-bold">0793003346</span>
      </div>
      <div className="border-2 border-white  m-4 rounded-md p-4">
        <h1 className="font-bold my-2 text-2xl text-white">
          Verify pending mpesa deposit
        </h1>
        <p className="text-white">
          We automatically verify all mpesa transactions and you may never have
          to use this step. ONLY use this if your deposit is delayed for more
          than a minute.
        </p>
        <form className="mt-4" onSubmit={handlePending}>
          <label
            htmlFor="referenceNO"
            className="block text-sm font-medium text-white"
          >
            MPesa Reference Number
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <input
              type="text"
              name="referenceNO"
              value={RefCode}
              onChange={(e) => setRefCode(e.target.value)}
              id="referenceNO"
              className="block w-full rounded-md border-purple-light focus:border-purple-dark focus:ring-purple-dark text-lg"
              placeholder="e.g, OLBX10BTY"
              required
            />
          </div>
          {/* submit button */}
          <button
            type="submit"
            className="w-full justify-center rounded-md border border-transparent bg-orange my-4 py-2 px-4 text-lg text-white hover:bg-yellow focus:outline-none focus:ring-2 focus:ring-yellow focus:ring-offset-2"
          >
            VERIFY
          </button>
        </form>
      </div>
    </div>
  );
};

export default Deposit;
