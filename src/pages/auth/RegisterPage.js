import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authenticate, updateUser } from "../../features/authSlice";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { USER_REGISTER } from "../../queries.js/gqlQueries";
import LoadingSpinner from "../../components/LoadingSpinner";

const RegisterPage = ({ onClose, socket }) => {
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  // gql post method
  const [register, { loading, error }] = useMutation(USER_REGISTER);
  useEffect(() => {
    socket.emit("user_login", (data) => {
      if (!data.isAuth) {
        dispatch(authenticate(data.isAuth));
      }
      dispatch(updateUser(data.user));
      dispatch(authenticate(data.isAuth));
    });
  });

  const validateForm = () => {
    if (!PhoneNumber.match("^254[17][0-9]{8}$")) {
      return "Please provide valid phone number eg. 254712XXXXXX";
    }
    if (Password !== ConfirmPassword) {
      return "Passwords Do Not Match";
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      return toast.error(validationError);
    }
    const user = await register({
      variables: {
        username: Username,
        password: Password,
        phoneNumber: PhoneNumber,
      },
    });
    const loggedIn = user.data.registerUser;
    localStorage.setItem("Token", loggedIn.token);
    toast.success("Register Succesful");
    onClose();
  };

  return (
    <div className="m-5 p-4  mt-10 border-2 rounded-md border-purple-dark">
      <div className="text-4xl mb-4 flex flex-col items-center text-white">
        REGISTER
      </div>
      {loading && <LoadingSpinner />}
      {error && <p className="text-center text-red">{error.message}</p>}
      <form className="m-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-white"
          >
            Phone Number
          </label>
          <div className="relative mt-0 rounded-md shadow-sm">
            <input
              type="text"
              value={PhoneNumber}
              onChange={(e) =>
                setPhoneNumber(
                  e.target.value.replace(/^0+/, "254").replace("+", "")
                )
              }
              id="phone"
              className="block w-full rounded-md border-gray-300 focus:border-purple-500 focus:ring-purple-500 text-lg"
              placeholder="e.g, 254712XXXXXX"
              required
            />
          </div>
          <p className="mt-0 pt-0 text-xs text-white">
            Please enter a valid MPESA number. All deposits &amp; withdrawals
            will be made through this number
          </p>
        </div>
        <div className="mt-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-white"
          >
            Username
          </label>
          <div className="relative mt-0 rounded-md shadow-sm">
            <input
              type="text"
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
              id="username"
              className="block w-full rounded-md border-gray-300 focus:border-purple-500 focus:ring-purple-500 text-lg"
              placeholder="e.g, pesa234"
              maxLength="15"
              required
            />
          </div>
          <p className="mt-0 pt-0 text-xs text-white">
            A unique public username, eg pesa234. Please note it does not have
            to be your real name
          </p>
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium mt-4 text-white"
          >
            Password
          </label>
          <div className="relative mt-0 rounded-md shadow-sm">
            <input
              type="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              className="block w-full rounded-md border-gray-300 focus:border-purple-500 focus:ring-purple-500 text-lg"
              minLength="8"
              required
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="confirm-password"
            className="block text-sm font-medium mt-4 text-white"
          >
            Confirm Password
          </label>
          <div className="relative mt-0 rounded-md shadow-sm">
            <input
              type="password"
              value={ConfirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="confirm-password"
              className="block w-full rounded-md border-gray-300 focus:border-purple-500 focus:ring-purple-500 text-lg"
              required
            />
          </div>
        </div>

        {/* submit button */}
        <div>
          <button
            type="submit"
            className="w-full justify-center rounded-md border border-transparent bg-orange mt-4 py-2 px-4 text-lg text-white hover:bg-yellow focus:outline-none focus:ring-2 focus:ring-yellow focus:ring-offset-2"
          >
            LOGIN
          </button>
        </div>
      </form>
      <p className="text-sm text-center text-white">
        By using this platform I attest that I am at least 18 years old and have
        read and agree to the{" "}
        <span className="text-yellow"> Terms of Service.</span>
      </p>
    </div>
  );
};

export default RegisterPage;
