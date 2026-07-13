import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../api";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return alert("Please fill all fields");
    }

    try {
      setLoading(true);

      const res = await API.post("/login", form);

     localStorage.setItem("token", res.data.token);
localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful");

     if (res.data.user.role === "host") {
  navigate("/host-dashboard");
} else {
  navigate("/guest-dashboard");
}

    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-500 via-black to-gray-500 flex justify-center items-center px-4">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-600">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Login to continue
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}

          <div>
            <label className="text-gray-600 font-medium">
              Email
            </label>

            <div className="mt-2 flex items-center border rounded-xl px-3">

              <FaEnvelope className="text-gray-400" />

              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 outline-none"
              />

            </div>
          </div>

          {/* Password */}

          <div>

            <label className="text-gray-600 font-medium">
              Password
            </label>

            <div className="mt-2 flex items-center border rounded-xl px-3">

              <FaLock className="text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="********"
                value={form.password}
                onChange={handleChange}
                className="w-full p-3 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-500" />
                ) : (
                  <FaEye className="text-gray-500" />
                )}
              </button>

            </div>

          </div>

          <button
            disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold transition duration-300
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-600 hover:bg-black"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <div className="mt-6 text-center text-gray-900">

          Don't have an account?

          <Link
            to="/signup"
            className="ml-2 text-green-600 font-semibold hover:underline"
          >
            Signup
          </Link>

        </div>

      </div>

    </div>
  );
};

export default Login;