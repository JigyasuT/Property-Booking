import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(30);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (!email) {
      navigate("/signup");
    }
  }, [email, navigate]);

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      alert("Enter complete OTP");
      return;
    }

    try {
      setLoading(true);

      await API.post("/verify-otp", {
        email,
        otp: finalOtp,
      });

      alert("Email Verified Successfully");

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Verification Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setResending(true);

      await API.post("/resend-otp", {
        email,
      });

      alert("OTP Sent Again");

      setTimer(30);
      setOtp(["", "", "", "", "", ""]);

      inputRefs.current[0].focus();
    } catch (error) {
      alert(error.response?.data?.message || "Unable to resend OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8">

        <h2 className="text-3xl font-bold text-center text-indigo-600">
          Verify OTP
        </h2>

        <p className="text-center text-gray-500 mt-2">
          Enter the 6-digit code sent to
        </p>

        <p className="text-center font-semibold text-indigo-600 mb-8 break-all">
          {email}
        </p>

        <form onSubmit={handleVerify}>

          <div className="flex justify-between gap-2 mb-8">

            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                value={digit}
                maxLength={1}
                onChange={(e) =>
                  handleChange(e.target.value, index)
                }
                onKeyDown={(e) =>
                  handleKeyDown(e, index)
                }
                className="w-12 h-14 md:w-14 md:h-16 border-2 rounded-xl text-center text-xl font-bold outline-none focus:border-indigo-500"
              />
            ))}

          </div>

          <button
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold transition
            ${
              loading
                ? "bg-gray-400"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

        </form>

        <div className="mt-6 text-center">

          {timer > 0 ? (
            <p className="text-gray-500">
              Resend OTP in
              <span className="font-bold text-red-500">
                {" "}
                {timer}s
              </span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              disabled={resending}
              className="text-indigo-600 hover:underline font-semibold"
            >
              {resending ? "Sending..." : "Resend OTP"}
            </button>
          )}

        </div>

      </div>
    </div>
  );
};

export default VerifyOtp;