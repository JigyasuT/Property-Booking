import { useEffect, useState } from "react";
import { APIproperty } from "../api";
import { useNavigate } from "react-router-dom";

const MyProperties = () => {
  const [properties, setProperties] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await APIproperty.get("/my-properties", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProperties(res.data.properties);

    } catch (error) {
      console.log(error);
    }
  };

     
          
 const deleteProperty = async (id) => {
  try {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    const res = await APIproperty.delete(`/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert(res.data.message);

    // Refresh property list
    fetchProperties();

  } catch (error) {
    console.log(error);

    alert(error.response?.data?.message || "Delete Failed");
  }
};



  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold mb-8">
        My Properties
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {properties.map((property) => (

          <div
            key={property._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >

            <img
              src={property.images[0]}
              alt=""
              className="w-full h-56 object-cover"
            />

            <div className="p-5">

              <h2 className="text-xl font-bold">
                {property.location}
              </h2>

              <p>{property.country}</p>

              <p className="mt-2 text-green-600 font-bold">
                ₹ {property.price}
              </p>

              <p>{property.phone}</p>

              <div className="flex gap-2 mt-5">

                {/* <button className="bg-blue-600 text-white px-4 py-2 rounded">
                  View
                </button> */}

              <button
  onClick={() => navigate(`/edit-property/${property._id}`)}
  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
>
  Edit
</button>

           <button
  onClick={() => deleteProperty(property._id)}
  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
>
  Delete
</button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default MyProperties;