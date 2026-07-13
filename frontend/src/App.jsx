import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import VerifyOtp from "./pages/VerifyOtp";
import Dashboard from "./pages/Dashboard";
import HostDashboard from "./pages/HostDashboard";
import GuestDashboard from "./pages/GuestDashboard";
import AddProperty from "./pages/AddProperty";
import MyProperties from "./pages/MyProperties";
import GuestHome from "./pages/GuestHome";
import HostBookings from "./pages/HostBookings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to signup */}
        <Route path="/" element={<Navigate to="/signup" />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/login" element={<Login />} />

        <Route path="/verify" element={<VerifyOtp />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/guest-dashboard" element={<GuestDashboard />} />

        <Route path="/host-dashboard" element={<HostDashboard />} />
        <Route path="/add-property" element={<AddProperty />} />
        <Route path="/edit-property/:id" element={<AddProperty />} />
        <Route path="/my-properties" element={<MyProperties />} />
        <Route path="/properties" element={<GuestHome />} />
        <Route
  path="/host-bookings"
  element={<HostBookings />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
