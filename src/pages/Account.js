import { Tab } from "@headlessui/react";
import moment from "moment";
import { useSelector } from "react-redux";

const Account = () => {
  const userData = useSelector((state) => state.auth.user);
  return (
    <div className="w-full pt-10 px-2 sm:px-0 text-white">
      <Tab.Group vertical>
        <Tab.List className="grid grid-cols-2 space-x-1 bg-midnight pt-1 px-1">
          <Tab
            className={({ selected }) =>
              selected
                ? "bg-purple-light rounded-t-lg py-2 text-white focus:outline-none"
                : "py-2 focus:outline-none"
            }
          >
            OVERVIEW
          </Tab>
          <Tab
            className={({ selected }) =>
              selected
                ? "bg-purple-light rounded-t-lg py-2 text-white focus:outline-none"
                : "py-2"
            }
          >
            SETTINGS
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <div>
              <div className="m-5">
                <table className="table-fixed border-2 border-midnight w-full text-white">
                  <tbody>
                    <tr className="border-b border-midnight">
                      <td className="pl-3">Username</td>
                      <td>machina</td>
                    </tr>
                    <tr className="border-b border-midnight">
                      <td className="pl-3">Date Joined</td>
                      <td>{moment(userData.createdAt).format("LLL")}</td>
                    </tr>
                    <tr className="border-b border-midnight">
                      <td className="pl-3">Profit (ATH)</td>
                      <td>{"null"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="m-5">
                <table className="table-fixed border-2 border-midnight w-full text-white">
                  <tbody>
                    <tr className="border-b border-midnight">
                      <td className="pl-3">Deposits</td>
                      <td>{"null"}</td>
                    </tr>
                    <tr className="border-b border-midnight">
                      <td className="pl-3">Withdrawals</td>
                      <td>{"null"}</td>
                    </tr>
                    <tr className="border-b border-midnight">
                      <td className="pl-3">Balance</td>
                      <td>KSHS. {userData.account.balance.toLocaleString()}</td>
                    </tr>
                    <tr className="border-b border-midnight">
                      <td className="pl-3">Winnings</td>
                      <td>{"null"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </Tab.Panel>
          <Tab.Panel>
            <div className="text-4xl m-4">Change Password</div>
            <form className="m-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium">
                  New Password
                </label>
                <div className="relative mt-1 rounded-md shadow-sm text-midnight">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="block w-full rounded-md border-purple-light focus:border-purple-dark focus:ring-purple-dark text-lg"
                    defaultValue="50"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium mt-2"
                >
                  Confirm Password
                </label>
                <div className="relative mt-1 rounded-md shadow-sm text-midnight">
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirm-password"
                    className="block w-full rounded-md border-purple-light focus:border-purple-dark focus:ring-purple-dark text-lg"
                    defaultValue="50"
                  />
                </div>
              </div>

              {/* submit button */}
              <button
                type="submit"
                className="w-full justify-center rounded-md border border-transparent bg-orange my-4 py-2 px-4 text-lg text-white hover:bg-yellow focus:outline-none focus:ring-2 focus:ring-yellow focus:ring-offset-2"
              >
                SAVE CHANGES
              </button>
            </form>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Account;
