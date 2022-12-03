import Header from "./components/Header";
import "./app.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ActionArea from "./components/ActionArea";
import TabArea from "./components/TabArea";
import PlayersRight from "./components/PlayersRight";

import BurstGraph from "./components/BurstGraph";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authenticate, updateUser } from "./features/authSlice";
import { socket } from "./context/socket";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    socket.emit("user_login", (data) => {
      if (!data.isAuth) {
        dispatch(authenticate(data.isAuth));
      }
      dispatch(updateUser(data.user));
      dispatch(authenticate(data.isAuth));
    });
  });

  return (
    <div className="font-serif container mx-auto rounded-md bg-purple-light md:h-screen">
      <Header />

      {/* <!-- content goes here --> */}
      <div className="grid md:grid-cols-4 gap-4 m-4 h-5/6">
        <div className="md:col-span-3 ">
          <div className="grid md:grid-rows-2 gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border-2 border-midnight rounded-md p-4 bg-purple-dark">
                <BurstGraph />
              </div>
              <div className="border-2 border-midnight rounded-md p-4 bg-purple-dark">
                <ActionArea />
              </div>
            </div>
            <div className="border-2 border-midnight rounded-md p-4 bg-purple-dark">
              <TabArea />
            </div>
          </div>
        </div>
        <div className="border-2 border-midnight rounded-md pb-0">
          <PlayersRight />
        </div>
      </div>
      <div className="text-center text-xs text-white">
        Must be 18+ to register or play. Please gamble responsibly. Licensed and
        authorised by BCLB under licence No. 0000438.
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        limit={3}
      />
    </div>
  );
}

export default App;
