import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { socket } from "../context/socket";
import { useDispatch, useSelector } from "react-redux";
import { setisBet } from "../features/authSlice";

const ActionArea = () => {
  const [BetAmount, setBetAmount] = useState("");
  const [BetRate, setBetRate] = useState("");
  const betState = useSelector((state) => state.auth.isBet);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  const maximumBet = Number(3000);
  const accountBalance = Number(2000);
  useEffect(() => {
    socket.on("game_end", (data) => {
      dispatch(setisBet(false));
    });
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuth) {
      return toast.error(`Login First`);
    }
    if (
      BetAmount <= 11 ||
      BetAmount >= accountBalance ||
      BetAmount >= maximumBet
    ) {
      return toast.error(`Invalid Bet Amount - ${BetAmount}`);
    }

    socket.emit(
      "bet_place",
      { amount: Number(BetAmount), rate: Number(BetRate) },
      (response) => {
        dispatch(setisBet(true));
        return toast(response.message, { type: response.status });
      }
    );
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6">
          {/* input Amount */}

          <div className="">
            <label
              htmlFor="amount"
              className="block text-lg font-medium text-white"
            >
              Amount
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-900 text-lg">Kshs.</span>
              </div>
              <input
                type="number"
                name="amount"
                value={BetAmount}
                onChange={(e) => setBetAmount(e.target.value)}
                id="amount"
                className="block w-full rounded-md border-gray-300 pl-14 focus:border-orange focus:ring-orange text-lg"
                placeholder={10}
                min={11}
                required
              />
            </div>
            <p className="mt-2 text-sm text-yellow">
              Must be greater than 10 less than {accountBalance}.
            </p>
          </div>

          {/* input chout */}
          <div className="">
            <label
              htmlFor="cashout"
              className="block text-lg font-medium text-white"
            >
              Auto Cashout(X)
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-900 text-lg">X</span>
              </div>
              <input
                type="number"
                name="cashout"
                value={BetRate}
                onChange={(e) => setBetRate(e.target.value)}
                id="cashout"
                className="block w-full rounded-md border-gray-300 pl-7 focus:border-orange focus:ring-orange text-lg"
                placeholder={10}
                required
              />
            </div>
            <p className="mt-2 text-sm text-yellow">
              Must be greater than 1.01.
            </p>
          </div>
        </div>
        {/* submit button */}
        <button
          type="submit"
          disabled={betState}
          className="w-full justify-center disabled:bg-disabled rounded-md border border-transparent bg-orange my-4 py-2 px-4 text-4xl font-bold text-white hover:bg-yellow focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2"
        >
          BET
        </button>
      </form>

      {/* dsplay autcome predicted value */}
      <div className="grid grid-cols-2 gap-6">
        {/* input Amount */}
        <div className="col-span-2"></div>
        <div className="col-span-2"></div>
      </div>
    </div>
  );
};

export default ActionArea;
