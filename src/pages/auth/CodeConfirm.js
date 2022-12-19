import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import { USER_LOGIN } from "../../queries.js/gqlQueries";
import { toast } from "react-toastify";

const LoginPage = ({ onClose }) => {
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Password, setPassword] = useState("");

  // gql post method
  const [login, { loading, error }] = useMutation(USER_LOGIN);
  useEffect(() => {});

  const validateForm = () => {
    if (!PhoneNumber.match("^254[17][0-9]{8}$")) {
      return "Please provide valid phone number eg. 254712XXXXXX";
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      return toast.error(validationError);
    }
    const user = await login({
      variables: {
        password: Password,
        phoneNumber: PhoneNumber,
      },
    });
    const loggedIn = user.data.loginUser;
    await localStorage.setItem("Token", loggedIn.token);
    toast.success("Login Succesful");
    window.location.reload();
    // onClose();
  };

  return (
    <div className="m-5 mt-10 p-4 border-2 rounded-md border-purple-dark text-white">
      <div className="text-4xl mb-4 flex flex-col items-center">LOGIN</div>
      {error && <p className="text-center text-red">{error.message}</p>}
      {loading && <LoadingSpinner />}
      <form className="m-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium">
            Phone Number
          </label>
          <div className="relative mt-0 rounded-md shadow-sm text-midnight">
            <input
              type="text"
              name="phone"
              value={PhoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              id="phone"
              className="block w-full rounded-md border-white focus:border-purple-dark focus:ring-purple-dark text-lg"
              placeholder="e.g, +254712XXXXXX"
            />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium mt-4">
            Password
          </label>
          <div className="relative mt-0 rounded-md shadow-sm text-midnight">
            <input
              type="password"
              name="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              className="block w-full rounded-md border-white focus:border-purple-dark focus:ring-purple-dark text-lg"
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
          <p className="mt-0 pt-0 text-right text-lg text-yellow">
            Forgot Password?
          </p>
        </div>
      </form>
      <p className="text-sm text-center">
        By using this platform I attest that I am at least 18 years old and have
        read and agree to the{" "}
        <span className="text-yellow"> Terms of Service.</span>
      </p>
    </div>
  );
};

export default LoginPage;
