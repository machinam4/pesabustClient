import { useDispatch } from "react-redux";
import { socket } from "../../context/socket";
import { authenticate, updateUser } from "../../features/authSlice";

const Logout = ({ onClose }) => {
  const dispatch = useDispatch();

  const doLogout = () => {
    localStorage.removeItem("Token", "username");
    socket.user = false;
    socket.isAuth = false;
    dispatch(updateUser(socket.user));
    dispatch(authenticate(socket.isAuth));
    // onClose();
    window.location.reload();
  };

  return (
    <div>
      <div className="m-5 flex flex-col items-center">
        <div className="text-4xl m-4">LOGOUT</div>
        <p>Are you sure you want to logout?</p>
        <button
          className="w-full text-white p-2 mt-5 rounded-md bg-orange"
          onClick={doLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Logout;
