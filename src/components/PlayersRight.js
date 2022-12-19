import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setisBet } from "../features/authSlice";

const PlayersRight = () => {
  const OnlineUsers = useSelector((state) => state.auth.onlineUsers);
  const bets = useSelector((state) => state.auth.bets);
  const BustRate = useSelector((state) => state.auth.bustRate);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const AuthUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {});
  const checkbet = (user) => {
    if (AuthUser._id === user._id) {
      dispatch(setisBet(true));
    } else {
      dispatch(setisBet(false));
    }
  };

  return (
    <div>
      <div
        className="w-full flex flex-col h-[43rem] overflow-hidden pb-0 bg-purple-dark"
        id="chat"
      >
        <div className="messages flex-1 overflow-y-scroll border-box">
          <table className="table-fixed w-full text-sm">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th>USER</th>
                <th>@</th>
                <th>Amount</th>
                <th>Profit</th>
              </tr>
            </thead>
            <tbody className="text-center text-white">
              {bets.map(({ _id, amount, rate, user }) => (
                <tr
                  key={_id}
                  className={
                    rate <= BustRate[BustRate.length - 1]
                      ? "border-b text-green"
                      : `border-b text-yellow ${
                          rate < BustRate[BustRate.length - 1] && "hidden"
                        }`
                  }
                >
                  {isAuth && checkbet(user)}
                  <td>{user.username}</td>
                  <td>{rate}</td>
                  <td>{amount}</td>
                  <td>{Math.floor(rate * amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-2 text-sm justify-around px-5 pb-3 bg-gray-700 border-t-4 border-black">
          <div className="text-white">
            Online: <span className="text-yellow-300">{OnlineUsers}</span>
          </div>
          <div className="text-white">
            Playing: <span className="text-yellow-300"> {bets.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayersRight;
