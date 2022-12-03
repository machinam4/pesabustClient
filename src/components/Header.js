import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Wallet from "../pages/wallet/Wallet";
import Modal from "../pages/wallet/Modal";
import Account from "../pages/Account";
import Logout from "../pages/Logout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { socket } from "../context/socket";
import Faqs from "../pages/wallet/Faqs";

const Header = () => {
  const [WalletOpen, setWalletOpen] = useState(false);
  const [AccountOpen, setAccountOpen] = useState(false);
  const [LogoutOpen, setLogoutOpen] = useState(false);
  const [LoginOpen, setLoginOpen] = useState(false);
  const [RegisterOpen, setRegisterOpen] = useState(false);
  const [FAQSOpen, setFAQSOpen] = useState(false);
  const [MenuOpen, setMenuOpen] = useState(false);

  const isAuth = useSelector((state) => state.auth.isAuth);
  const userData = useSelector((state) => state.auth.user);

  useEffect(() => {
    socket.emit("send_message", { data: "data" });
    socket.on("game_start", (data) => {
      // console.log(data);
    });
  });

  function toggleMenu() {
    setMenuOpen(!MenuOpen);
  }
  return (
    <>
      <nav className="bg-midnight">
        <div className="px-2 mx-2">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              {/* <!-- logo --> */}
              <div>
                <a
                  href="/"
                  className="flex items-center py-3 text-yellow hover:text-orange"
                >
                  <span className="font-mono font-bold text-5xl">
                    {" "}
                    VUTAPESA
                  </span>
                </a>
              </div>

              {/* <!-- deposit button --> */}
              {isAuth && (
                <div className="hidden md:flex flex items-center space-x-1">
                  <button
                    className="py-2 px-3 bg-purple hover:bg-purple text-yellow hover:text-orange rounded transition duration-300"
                    onClick={() => setWalletOpen(true)}
                  >
                    DEPOSIT
                  </button>
                </div>
              )}
            </div>

            {/* <!-- secondary nav --> */}
            <div className="hidden md:flex flex items-center space-x-1 ">
              {isAuth && (
                <>
                  <button
                    className="py-1 px-4 border-b-2 border-purple m-2 rounded-md   hover:bg-purple text-yellow hover:text-orange transition duration-300"
                    onClick={() => setWalletOpen(true)}
                  >
                    WALLET
                  </button>
                  {/* <button className="py-1 px-4 border-b-2 border-purple m-2 rounded-md   hover:bg-purple text-yellow hover:text-orange transition duration-300">
                    REFER TO EARN
                  </button> */}
                  <button
                    className="py-1 px-4 border-b-2 border-purple m-2 rounded-md   hover:bg-purple text-yellow hover:text-orange transition duration-300"
                    onClick={() => setFAQSOpen(true)}
                  >
                    FAQ
                  </button>
                  <button
                    className="uppercase py-1 px-4 border-b-2 border-purple m-2 rounded-md   hover:bg-purple text-yellow hover:text-orange transition duration-300"
                    onClick={() => setAccountOpen(true)}
                  >
                    {userData.username}
                  </button>
                  <button
                    className="py-1 px-4 border border-purple m-2 rounded-md   hover:bg-purple text-yellow hover:text-orange transition duration-300"
                    onClick={() => setAccountOpen(true)}
                  >
                    KSH. {userData.account.balance.toLocaleString()}
                  </button>
                  <button
                    className="py-1 px-4 border border-purple m-2 rounded-md   hover:bg-purple text-yellow hover:text-orange transition duration-300"
                    onClick={() => setLogoutOpen(true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      style={{ color: "#FF0000" }}
                    >
                      <path d="M12 21c4.411 0 8-3.589 8-8 0-3.35-2.072-6.221-5-7.411v2.223A6 6 0 0 1 18 13c0 3.309-2.691 6-6 6s-6-2.691-6-6a5.999 5.999 0 0 1 3-5.188V5.589C6.072 6.779 4 9.65 4 13c0 4.411 3.589 8 8 8z"></path>
                      <path d="M11 2h2v10h-2z"></path>
                    </svg>
                  </button>
                </>
              )}

              {!isAuth && (
                <>
                  <button
                    onClick={() => setLoginOpen(true)}
                    className="py-1 px-4 border border-purple m-2 rounded-md   hover:bg-purple text-yellow hover:text-orange transition duration-300"
                  >
                    LOGIN
                  </button>
                  <button
                    className="py-1 px-4 border border-purple m-2 rounded-md   hover:bg-purple text-yellow hover:text-orange transition duration-300"
                    onClick={() => setRegisterOpen(true)}
                  >
                    REGISTER
                  </button>
                </>
              )}
            </div>

            {/* <!-- mobile button goes here -->  */}
            <div className="md:hidden flex items-center">
              <button
                className="mobile-menu-button"
                onClick={() => toggleMenu(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  style={{ color: "#ffff" }}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* <!-- mobile menu --> */}
        {MenuOpen && (
          <div className="mobile-menu md:hidden">
            {isAuth && (
              <>
                <button
                  className="py-1 px-4 border-b-2 border-purple m-2 rounded-md   hover:bg-purple text-yellow hover:text-orange transition duration-300"
                  onClick={() => setWalletOpen(true)}
                >
                  WALLET
                </button>
                <button className="py-1 px-4 border-b-2 border-purple m-2 rounded-md   hover:bg-purple text-yellow hover:text-orange transition duration-300">
                  REFER TO EARN
                </button>
                <button
                  className="py-1 px-4 border-b-2 border-purple m-2 rounded-md   hover:bg-purple text-yellow hover:text-orange transition duration-300"
                  onClick={() => setFAQSOpen(true)}
                >
                  FAQ
                </button>
                <button
                  className="uppercase py-1 px-4 border-b-2 border-purple m-2 rounded-md   hover:bg-purple text-yellow hover:text-orange transition duration-300"
                  onClick={() => setAccountOpen(true)}
                >
                  {userData.username}
                </button>
                <button
                  className="py-1 px-4 border border-purple m-2 rounded-md   hover:bg-purple text-yellow hover:text-orange transition duration-300"
                  onClick={() => setAccountOpen(true)}
                >
                  KSH. {userData.account.balance.toLocaleString()}
                </button>
                <button
                  className="py-1 px-4 border border-purple m-2 rounded-md   hover:bg-purple text-yellow hover:text-orange transition duration-300"
                  onClick={() => setLogoutOpen(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21c4.411 0 8-3.589 8-8 0-3.35-2.072-6.221-5-7.411v2.223A6 6 0 0 1 18 13c0 3.309-2.691 6-6 6s-6-2.691-6-6a5.999 5.999 0 0 1 3-5.188V5.589C6.072 6.779 4 9.65 4 13c0 4.411 3.589 8 8 8z"></path>
                    <path d="M11 2h2v10h-2z"></path>
                  </svg>
                </button>
              </>
            )}

            {!isAuth && (
              <>
                <button
                  onClick={() => setLoginOpen(true)}
                  className="py-1 px-4 border border-purple m-2 rounded-md   hover:bg-purple text-yellow hover:text-orange transition duration-300"
                >
                  LOGIN
                </button>
                <button
                  className="py-1 px-4 border border-purple m-2 rounded-md   hover:bg-purple text-yellow hover:text-orange transition duration-300"
                  onClick={() => setRegisterOpen(true)}
                >
                  REGISTER
                </button>
              </>
            )}
          </div>
        )}
      </nav>
      <Modal open={WalletOpen} onClose={() => setWalletOpen()}>
        <Wallet socket={socket} />
      </Modal>
      <Modal open={FAQSOpen} onClose={() => setFAQSOpen()}>
        <Faqs onClose={() => setFAQSOpen()} socket={socket} />
      </Modal>
      <Modal open={AccountOpen} onClose={() => setAccountOpen()}>
        <Account socket={socket} />
      </Modal>
      <Modal open={LogoutOpen} onClose={() => setLogoutOpen()}>
        <Logout onClose={() => setLogoutOpen()} socket={socket} />
      </Modal>
      <Modal open={LoginOpen} onClose={() => setLoginOpen()}>
        <LoginPage onClose={() => setLoginOpen()} socket={socket} />
      </Modal>
      <Modal open={RegisterOpen} onClose={() => setRegisterOpen()}>
        <RegisterPage onClose={() => setRegisterOpen()} socket={socket} />
      </Modal>
    </>
  );
};

export default Header;
