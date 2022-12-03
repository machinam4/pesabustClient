import { GET_PLAYERS } from "../queries.js/gqlQueries";
import { useQuery } from "@apollo/client";
import LoadingSpinner from "./LoadingSpinner";
import { useEffect, useState } from "react";
import { socket } from "../context/socket";

const PlayersRight = () => {
  const { loading, error, data, refetch } = useQuery(GET_PLAYERS);
  const [OnlineUsers, setOnlineUsers] = useState();
  const [Counter, setCounter] = useState();

  useEffect(() => {
    socket.on("users_online", (data) => {
      setOnlineUsers(data);
    });
    socket.on("game_start", (res) => {
      refetch();
    });
    socket.on("game_play", (data) => {
      setCounter(data);
    });
  });
  if (loading) return <LoadingSpinner />;
  if (error)
    return <p className="text-center text-red">Error : {error.message}</p>;
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
              {data.bets.map(({ _id, amount, rate, user }) => (
                <tr
                  key={_id}
                  className={
                    rate <= Counter
                      ? "border-b text-green"
                      : `border-b text-yellow ${rate < Counter && "hidden"}`
                  }
                >
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
            Playing:{" "}
            <span className="text-yellow-300">
              {" "}
              {Object.keys(data.bets).length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayersRight;
