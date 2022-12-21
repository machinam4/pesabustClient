import { useState } from "react";
import { useSelector } from "react-redux";
import Wallet from "../pages/wallet/Wallet";
import Modal from "../pages/wallet/Modal";
import Account from "../pages/Account";
import { socket } from "../context/socket";
import Faqs from "../pages/wallet/Faqs";
import logo from "../vutapesa_logo.png";
import Logout from "../pages/auth/Logout";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

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

  function toggleMenu() {
    setMenuOpen(!MenuOpen);
  }
  return (
    <>
      <nav className="bg-midnight">
        <div className="px-2 mx-2">
          <div className="flex justify-between">
            <div className="flex space-x-4 justify-center">
              {/* <!-- logo --> */}
              <div className="">
                <img
                  src={logo}
                  alt={process.env.REACT_APP_NAME}
                  height=""
                  className="h-14 md:h-20 inline-block"
                />
                {/* <span> */}
                <a
                  href="tel:0793003346"
                  className="inline-block items-center align-middle rotate-180 ml-10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    // width="48"
                    // height="48"
                    className="h-10 md:h-14 animate-bounce"
                    viewBox="0 0 24 24"
                    style={{
                      fill: "rgba(6, 255, 0, 1)",
                      transform: "",
                      msFilter: "",
                    }}
                  >
                    <path d="m20.487 17.14-4.065-3.696a1.001 1.001 0 0 0-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.391L6.859 3.513a1 1 0 0 0-1.391-.087l-2.17 1.861a1 1 0 0 0-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 0 0 .648-.291l1.86-2.171a.997.997 0 0 0-.085-1.39z"></path>
                  </svg>
                </a>
                {/* </span> */}
              </div>

              {/* <!-- deposit button --> */}
              {isAuth && (
                <div className="hidden md:flex flex items-center space-x-1">
                  <button
                    className="py-2 px-3 bg-yellow hover:bg-orange text-purple-dark hover:text-white rounded transition duration-300"
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
                    onClick={() => setWalletOpen(true)}
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
              {!isAuth && (
                <>
                  <button
                    onClick={() => setLoginOpen(true)}
                    className="py-1 px-1 border border-purple m-2 rounded-md text-sm hover:bg-purple text-yellow hover:text-orange transition duration-300"
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
              {isAuth && (
                <button
                  className="py-1 px-1 border border-purple m-2 rounded-md text-sm  hover:bg-purple text-yellow hover:text-orange transition duration-300"
                  onClick={() => setWalletOpen(true)}
                >
                  KSH. {userData.account.balance.toLocaleString()}
                </button>
              )}
              {isAuth && (
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
              )}
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
                  className="hidden py-1 px-4 border border-purple m-2 rounded-md   hover:bg-purple text-yellow hover:text-orange transition duration-300"
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
