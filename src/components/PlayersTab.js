import { GET_PLAYERS } from "../queries.js/gqlQueries";
import { useQuery } from "@apollo/client";
import LoadingSpinner from "./LoadingSpinner";
import { useEffect, useState } from "react";
import { socket } from "../context/socket";

const PlayersTab = () => {
  const [OnlineUsers, setOnlineUsers] = useState();
  useEffect(() => {
    socket.on("users_online", (data) => {
      console.log(data);
      setOnlineUsers(data);
    });
  });
  const { loading, error, data } = useQuery(GET_PLAYERS);
  if (loading) return <LoadingSpinner />;
  if (error)
    return <p className="text-center text-red-200">Error : {error.message}</p>;

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
              {data.bets.map(({ _id, amount, rate, user }) => (
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
            Playing:{" "}
            <span className="text-yellow-300">
              {Object.keys(data.bets).length}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayersTab;
