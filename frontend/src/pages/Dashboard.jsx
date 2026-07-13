import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import {  useState } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

 useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }

  // const storedUser = localStorage.getItem("user");

  // if (storedUser) {
  //   setUser(JSON.parse(storedUser));
  // }

  localStorage.setItem(
    "user",
    JSON.stringify(res.data.user)
);


const user = JSON.parse(localStorage.getItem("user"));

if(user.role==="host"){

    navigate("/host-dashboard");

}
else{

    navigate("/guest-dashboard");

}
}, [navigate]);


const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/login");
};

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <nav className="bg-indigo-600 shadow-lg">

        <div className="max-w-7xl mx-auto px-5">

          <div className="flex justify-between items-center h-16">

            <h1 className="text-white text-2xl font-bold">
              MERN Auth
            </h1>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <FaSignOutAlt />
              Logout
            </button>

          </div>

        </div>

      </nav>

      {/* Main */}

      <div className="max-w-6xl mx-auto px-5 py-10">

        <div className="bg-white rounded-2xl shadow-xl p-8">

          <div className="flex flex-col md:flex-row items-center gap-6">

            <FaUserCircle
              size={100}
              className="text-indigo-600"
            />

            <div>

           <h2 className="text-3xl font-bold text-gray-800">
  Welcome, {user?.name}   ,      {user?.email}
</h2>

              <p className="text-gray-500 mt-2">
                You have successfully logged into your dashboard.
              </p>

            </div>

          </div>

        </div>

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-indigo-600">
              Profile
            </h3>

            <p className="text-gray-500 mt-3">
              Manage your personal profile information.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-indigo-600">
              Orders
            </h3>

            <p className="text-gray-500 mt-3">
              View all your recent orders here.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-indigo-600">
              Settings
            </h3>

            <p className="text-gray-500 mt-3">
              Update password and account settings.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;