import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role:"guest"
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password ||   !form.role) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await API.post("/signup", form);

      alert("OTP sent successfully!");

      navigate("/verify", {
        state: {
          email: form.email,
        },
      });
    } catch (error) {
      alert(error.response?.data?.message || "Signup Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-500 via-gray-900 to-gray-500 flex items-center justify-center px-4">

      <div className="bg-white shadow-2xl rounded-3xl w-full max-w-md p-8">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-600">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Signup to continue
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>
            <label className="block text-gray-600 mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

<div>
  <label className="block text-gray-600 mb-2">
    Select Role
  </label>

  <select
    name="role"
    value={form.role}
    onChange={handleChange}
    className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
  >
    <option value="guest">Guest</option>
    <option value="host">Host</option>
  </select>
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
            {loading ? "Creating Account..." : "Signup"}
          </button>
        </form>

        <div className="mt-6 text-center text-gray-900">
          Already have an account?

          <Link
            to="/login"
            className="text-green-600 ml-2 font-semibold hover:underline"
          >
            Login
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Signup;