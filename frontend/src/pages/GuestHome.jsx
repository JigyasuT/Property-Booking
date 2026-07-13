import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIbooking, APIproperty } from "../api";

const GuestHome = () => {
  const navigate = useNavigate();

  const [properties, setProperties] = useState([]);
  const [bookedProperties, setBookedProperties] = useState([]);

useEffect(() => {
  fetchProperties();
  fetchBookings();
}, []);

  const fetchProperties = async () => {
    try {
      const res = await APIproperty.get("/all");
      setProperties(res.data.properties);
    } catch (error) {
      console.log(error);
    }
  };



  const bookProperty = async (propertyId) => {
  try {
    const token = localStorage.getItem("token");

    const res = await APIbooking.post(
      "/create",
      {
        propertyId,
        checkIn: new Date(),
        checkOut: new Date(Date.now() + 24 * 60 * 60 * 1000),
        guests: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(res.data.message);

      // Refresh booked properties
    await fetchBookings();

  } catch (error) {
    console.log(error);

    alert(error.response?.data?.message || "Booking Failed");
  }
};


const fetchBookings = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await APIbooking.get("/my-bookings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const ids = res.data.bookings.map(
      (booking) => booking.property
    );

    setBookedProperties(ids);

  } catch (error) {
    console.log(error);
  }
};

















  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}

      <div className="bg-black text-white p-5 flex justify-between">

        <h1 className="text-3xl font-bold">
          StayFinder
        </h1>

        <button
          onClick={() => navigate("/guest-dashboard")}
          className="bg-green-600 px-4 py-2 rounded-lg"
        >
          Dashboard
        </button>

      </div>

      <div className="max-w-7xl mx-auto py-10 px-5">

        <h2 className="text-3xl font-bold mb-8">
          Available Properties
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {properties.map((property) => (

            <div
              key={property._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl duration-300"
            >

              <img
                src={property.images[0]}
                alt=""
                className="w-full h-60 object-cover"
              />

              <div className="p-5">

                <h2 className="text-2xl font-bold">
                  {property.location}
                </h2>

                <p className="text-gray-500">
                  {property.country}
                </p>

                <p className="mt-3 text-green-600 text-xl font-bold">
                Price:  ₹ {property.price}
                </p>

                <p className="mt-2">
                  Ph: {property.phone}
                </p>

                <p>
                  Email: {property.email}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Host: {property.host.name}
                </p>

                <div className="flex gap-3 mt-5">

                  {/* <button
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
                  >
                    View Details
                  </button> */}
<button
  disabled={bookedProperties.includes(property._id)}
  onClick={() => bookProperty(property._id)}
  className={
    bookedProperties.includes(property._id)
      ? "bg-gray-500 text-white px-4 py-2 rounded cursor-not-allowed"
      : "bg-green-600 text-white px-4 py-2 rounded"
  }
>
  {bookedProperties.includes(property._id)
    ? "Booked ✓"
    : "Book Now"}
</button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default GuestHome;