import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import {
  SEND_CODE,
  SEND_PASSWORD,
  SEND_PHONE,
} from "../../queries.js/gqlQueries";
import { toast } from "react-toastify";

const PhoneInput = ({ onClose }) => {
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [OTP, setOTP] = useState("");
  const [Step, setStep] = useState("phoneInput");
  const [phone, { loading: loadingp, error: errorp }] = useMutation(SEND_PHONE);
  const [code, { loading: loadingc, error: errorc }] = useMutation(SEND_CODE);
  const [changepassword, { loading: loadingpwd, error: errorpwd }] =
    useMutation(SEND_PASSWORD);
  useEffect(() => {});

  const validatePhone = () => {
    if (!PhoneNumber.match("^254[17][0-9]{8}$")) {
      return "Please provide valid phone number eg. 254712XXXXXX";
    }
    return false;
  };

  const validatePassword = () => {
    if (Password !== ConfirmPassword) {
      return "Passwords Do Not Match";
    }
    return false;
  };

  const handleCheckPhone = async (e) => {
    e.preventDefault();
    const validationError = validatePhone();
    if (validationError) {
      return toast.error(validationError);
    }
    await phone({
      variables: {
        phoneNumber: PhoneNumber,
      },
    }).then((data) => {
      setStep("codeInput");
      return toast.success(data.message);
    });
  };

  const handleCheckCode = async (e) => {
    e.preventDefault();
    await code({
      variables: {
        phoneNumber: PhoneNumber,
        code: OTP,
      },
    }).then((data) => {
      setStep("passwordChange");
      return toast.success(data.message);
    });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const validationError = validatePassword();
    if (validationError) {
      return toast.error(validationError);
    }
    await changepassword({
      variables: {
        phoneNumber: PhoneNumber,
        password: Password,
      },
    }).then((data) => {
      toast.success(data.message);
      return onClose();
    });
  };
  // const renderLoading = () => {
  //   if (loadingp || loadingc || loadingpwd) {
  //     return <LoadingSpinner />;
  //   }
  // };
  // const renderError = () => {
  //   if (loadingp || loadingc || loadingpwd) {
  //     return (
  //       <p className="text-center text-red">
  //         {errorp.message || errorc.message || errorpwd.message}
  //       </p>
  //     );
  //   }
  // };

  return (
    <div className="m-5 mt-10 p-4 border-2 rounded-md border-purple-dark text-white">
      <div className="text-4xl mb-4 flex flex-col items-center">
        RESET PASSWORD
      </div>
      {errorp && <p className="text-center text-red">{errorp.message}</p>}
      {loadingp && <LoadingSpinner />}

      {errorc && <p className="text-center text-red">{errorc.message}</p>}
      {loadingc && <LoadingSpinner />}

      {errorpwd && <p className="text-center text-red">{errorpwd.message}</p>}
      {loadingpwd && <LoadingSpinner />}

      {/* input phone number */}
      {Step === "phoneInput" && (
        <form className="m-4" onSubmit={handleCheckPhone}>
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
          {/* submit button */}
          <div>
            <button
              type="submit"
              className="w-full justify-center rounded-md border border-transparent bg-orange mt-4 py-2 px-4 text-lg text-white hover:bg-yellow focus:outline-none focus:ring-2 focus:ring-yellow focus:ring-offset-2"
            >
              SUBMIT
            </button>
          </div>
        </form>
      )}
      {/* End Phone Number Input */}

      {/* Code Input */}
      {Step === "codeInput" && (
        <form className="m-4" onSubmit={handleCheckCode}>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium">
              Enter OTP
            </label>
            <div className="relative mt-0 rounded-md shadow-sm text-midnight">
              <input
                type="text"
                name="otp"
                value={OTP}
                onChange={(e) => setOTP(e.target.value)}
                id="otp"
                className="block w-full rounded-md border-white focus:border-purple-dark focus:ring-purple-dark text-lg"
                placeholder="e.g, XXXXXXX"
              />
            </div>
          </div>
          {/* submit button */}
          <div>
            <button
              type="submit"
              className="w-full justify-center rounded-md border border-transparent bg-orange mt-4 py-2 px-4 text-lg text-white hover:bg-yellow focus:outline-none focus:ring-2 focus:ring-yellow focus:ring-offset-2"
            >
              CONFIRM CODE
            </button>
          </div>
        </form>
      )}
      {/* End Code Input */}

      {/* Password Input */}
      {Step === "passwordChange" && (
        <form className="m-4" onSubmit={handleChangePassword}>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
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
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium"
            >
              Confrim Password
            </label>
            <div className="relative mt-0 rounded-md shadow-sm text-midnight">
              <input
                type="password"
                name="confirm-password"
                value={ConfirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                id="confirm-password"
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
              CHANGE PASSWORD
            </button>
          </div>
        </form>
      )}
      {/* End Password Change */}
    </div>
  );
};

export default PhoneInput;
