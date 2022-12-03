import React from "react";
import { useSelector } from "react-redux";

const History = () => {
  const userData = useSelector((state) => state.auth.user);
  return (
    <div>
      <div className="relatve m-5">
        <table className="table-auto border-2 border-midnight w-full">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th>AMOUNT</th>
              <th>RATE</th>
              <th>@</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody className="text-left text-white">
            {userData.bets.map((bet) => {
              <tr className="border-b border-midnight uppercase">
                <td>{bet.amout}</td>
                <td className="pl-3">{bet.rate}</td>
                <td>{bet.createdAt}</td>
                <td
                  className={(bet.status = "win" ? "text-red" : "text-green")}
                >
                  {bet.status}
                </td>
              </tr>;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
