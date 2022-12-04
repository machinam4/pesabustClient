import { Tab } from "@headlessui/react";
import ChatTab from "./ChatTab";
import HistoryTab from "./HistoryTab";
import PlayersTab from "./PlayersTab";

const TabArea = () => {
  return (
    <div className="w-full px-2 sm:px-0">
      <Tab.Group vertical>
        <Tab.List className="grid grid-cols-3 space-x-1 bg-midnight pt-1 px-1 text-white">
          <Tab
            className={({ selected }) =>
              selected
                ? "bg-purple-light rounded-t-lg py-2 text-white focus:outline-none"
                : "py-2"
            }
          >
            HISTORY
          </Tab>
          <Tab
            className={({ selected }) =>
              selected
                ? "bg-purple-light rounded-t-lg py-2 text-white focus:outline-none"
                : "py-2 focus:outline-none"
            }
          >
            CHAT
          </Tab>

          <Tab
            className={({ selected }) =>
              selected
                ? "bg-purple-light rounded-t-lg py-2 text-white focus:outline-none"
                : "py-2"
            }
          >
            PLAYERS
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <HistoryTab />
          </Tab.Panel>
          <Tab.Panel>
            <ChatTab />
          </Tab.Panel>
          <Tab.Panel>
            <PlayersTab />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default TabArea;
