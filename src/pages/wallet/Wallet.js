import { Tab } from "@headlessui/react";
import Deposit from "./Deposit";
import History from "./History";
import Withdraw from "./Withdraw";

const Wallet = () => {
  return (
    <div className="w-full pt-10 px-2 sm:px-0">
      <Tab.Group vertical>
        <Tab.List className="grid grid-cols-3 space-x-1 bg-midnight pt-1 px-1">
          <Tab
            className={({ selected }) =>
              selected
                ? "bg-purple-dark rounded-t-lg py-2 text-white focus:outline-none"
                : "py-2 focus:outline-none text-white"
            }
          >
            DEPOSIT
          </Tab>
          <Tab
            className={({ selected }) =>
              selected
                ? "bg-purple-dark rounded-t-lg py-2 text-white focus:outline-none"
                : "py-2 text-white"
            }
          >
            WITHDRAW
          </Tab>
          <Tab
            className={({ selected }) =>
              selected
                ? "bg-purple-dark rounded-t-lg py-2 text-white focus:outline-none"
                : "py-2 text-white"
            }
          >
            HISYORY
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <Deposit />
          </Tab.Panel>
          <Tab.Panel>
            <Withdraw />
          </Tab.Panel>
          <Tab.Panel>
            <History />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Wallet;
