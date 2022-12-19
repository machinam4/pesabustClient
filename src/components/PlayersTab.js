import { useSelector } from "react-redux";

const PlayersTab = () => {
  const OnlineUsers = useSelector((state) => state.auth.onlineUsers);
  const bets = useSelector((state) => state.auth.bets);

  return (
    <div>
      <div className="w-full flex flex-col h-64 overflow-hidden" id="chat">
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
                <tr key={_id} className="border-b hover:bg-gray-700">
                  <td>{user.username}</td>
                  <td>{rate}</td>
                  <td>{amount}</td>
                  <td>{Math.floor(amount * rate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-2 text-sm justify-around">
          <p className="text-white">
            Online: <span className="text-yellow-300">{OnlineUsers}</span>
          </p>
          <p className="text-white">
            Playing: <span className="text-yellow-300">{bets.length}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayersTab;
