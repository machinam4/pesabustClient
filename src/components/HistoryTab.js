import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { socket } from "../context/socket";
import { GET_GAMES } from "../queries.js/gqlQueries";
import LoadingSpinner from "./LoadingSpinner";

const HistoryTab = () => {
  const { loading, error, data, refetch } = useQuery(GET_GAMES);
  useEffect(() => {
    socket.on("game_end", () => {
      refetch();
    });
  });
  if (loading) return <LoadingSpinner />;
  if (error)
    return <p className="text-center text-red-200">Error : {error.message}</p>;

  return (
    <div>
      <div className="w-full flex flex-col h-64 overflow-hidden" id="chat">
        <div className="flex-1 overflow-y-scroll border-box">
          <table className="table-fixed w-full text-sm">
            <thead className="text-white">
              <tr>
                <th>Burst</th>
                <th>@</th>
                <th>Amount</th>
                <th>Profit</th>
                <th>Hash</th>
              </tr>
            </thead>
            <tbody className="text-center text-white">
              {data.games.map(({ bust, hash }) => (
                <tr key={hash} className="border-b hover:bg-gray-700">
                  <td className="text-orange">{bust}x</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>{hash}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoryTab;
