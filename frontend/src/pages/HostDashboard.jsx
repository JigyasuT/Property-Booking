import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaPlusCircle,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";

const HostDashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!token || !storedUser) {
      navigate("/login");
      return;
    }

    if (storedUser.role !== "host") {
      navigate("/guest-dashboard");
      return;
    }

    setUser(storedUser);
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}

      <div className="bg-black text-white px-6 py-4 flex justify-between items-center">

        <h1 className="text-2xl font-bold">
          Host Dashboard
        </h1>

        <div className="flex items-center gap-4">

          <span>{user?.name}</span>

          <button
            onClick={logout}
            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>

        </div>

      </div>

      {/* Cards */}

      <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-6">

        <div className="bg-white rounded-xl shadow-lg p-6">

          <FaHome size={35} className="text-blue-600 mb-4" />

          <h2 className="text-xl font-bold">
            My Properties
          </h2>

          <p className="text-gray-500 mt-2">
            View all your listed properties.
          </p>

         <button
onClick={() => navigate("/my-properties")}
className="mt-5 bg-blue-600 text-white px-4 py-2 rounded-lg"
>
View
</button>

        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">

          <FaPlusCircle
            size={35}
            className="text-green-600 mb-4"
          />

          <h2 className="text-xl font-bold">
            Add Property
          </h2>

          <p className="text-gray-500 mt-2">
            List a new property.
          </p>

        <button
  onClick={() => navigate("/add-property")}
  className="mt-5 bg-green-600 text-white px-4 py-2 rounded-lg"
>
  Add Property
</button>

        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">

          <FaUsers
            size={35}
            className="text-purple-600 mb-4"
          />

          <h2 className="text-xl font-bold">
            Bookings
          </h2>

          <p className="text-gray-500 mt-2">
            View guest bookings.
          </p>

       <button
  onClick={() => navigate("/host-bookings")}
  className="bg-blue-600 text-white px-5 py-3 rounded-lg"
>
  View Booking Requests
</button>

        </div>

      </div>

    </div>
  );
};

export default HostDashboard;