import { useEffect, useState } from "react";
import { APIbooking } from "../api";

const HostBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await APIbooking.get("/host-bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(res.data.bookings);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Booking Requests
        </h1>

        <div className="space-y-6">

          {bookings
            .filter((booking) => booking.property)
            .map((booking) => (

              <div
                key={booking._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >

                {/* Mobile = Column | Desktop = Row */}

                <div className="flex flex-col md:flex-row md:gap-10">

                  {/* Image */}

                  <div className="w-full md:w-72 flex-shrink-0">

                    <img
                      src={booking.property.images?.[0]}
                      alt=""
                      className="w-full h-60 md:h-full object-cover"
                    />

                  </div>

                  {/* Details */}

                  <div className="flex-1 p-5">

                    <h2 className="text-2xl font-bold">
                      {booking.property.location}
                    </h2>

                    <p className="text-gray-500 mt-1">
                      {booking.property.country}
                    </p>

                    <div className="mt-5 space-y-2 text-gray-700">

                      <p>
                        <span className="font-semibold">
                          Guest :
                        </span>{" "}
                        {booking.guest.name}
                      </p>

                      <p>
                        <span className="font-semibold">
                          Email :
                        </span>{" "}
                        {booking.guest.email}
                      </p>

                      <p>
                        <span className="font-semibold">
                          Check-In :
                        </span>{" "}
                        {new Date(
                          booking.checkIn
                        ).toLocaleDateString()}
                      </p>

                      <p>
                        <span className="font-semibold">
                          Check-Out :
                        </span>{" "}
                        {new Date(
                          booking.checkOut
                        ).toLocaleDateString()}
                      </p>

                      <p>
                        <span className="font-semibold">
                          Guests :
                        </span>{" "}
                        {booking.guests}
                      </p>

                      <p className="text-2xl font-bold text-green-600">
                        ₹ {booking.totalPrice}
                      </p>

                      <p>
                        <span className="font-semibold">
                          Status :
                        </span>

                        <span className="ml-2 text-blue-600 font-bold">
                          {booking.status}
                        </span>
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            ))}

        </div>

      </div>

    </div>
  );
};

export default HostBookings;