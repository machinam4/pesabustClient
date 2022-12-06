import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";

const History = () => {
  const userData = useSelector((state) => state.auth.user);
  return (
    <div>
      <div className="relatve m-5">
        <table className="fixed table-auto border-2 border-midnight w-full">
          <thead className="text-left bg-gray-800 text-white">
            <tr>
              <th>AMOUNT</th>
              <th>@</th>
              <th>DATE</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody className="text-left text-white">
            {userData.bets.map(({ _id, amount, createdAt, rate, status }) => (
              <tr key={_id} className="border-b border-midnight">
                <td>Kshs. {amount}</td>
                <td className="pl-3">@ {rate}</td>
                <td>{moment(createdAt).fromNow()}</td>
                <td className={status === "win" ? "text-green" : "text-red"}>
                  {status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
