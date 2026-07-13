
import {APIproperty }from "../api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddProperty = () => {
  const navigate = useNavigate();
const { id } = useParams();

const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    location: "",
    country: "",
    price: "",
    phone: "",
    email: "",
  });

  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 3) {
      alert("Maximum 3 images allowed");
      return;
    }

    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreview(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.location ||
      !form.country ||
      !form.price ||
      !form.phone ||
      !form.email
    ) {
      return alert("Please fill all fields");
    }

    if (images.length === 0) {
      return alert("Please select images");
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("location", form.location);
      data.append("country", form.country);
      data.append("price", form.price);
      data.append("phone", form.phone);
      data.append("email", form.email);

      images.forEach((image) => {
        data.append("images", image);
      });

      const token = localStorage.getItem("token");

      // await APIproperty.post("/create", data, {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //     "Content-Type": "multipart/form-data",
      //   },
      // });



      if (isEdit) {
  await APIproperty.put(`/update/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  alert("Property Updated Successfully");

} else {

  await APIproperty.post("/create", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  alert("Property Added Successfully");
}


      alert("Property Added Successfully");

      navigate("/host-dashboard");

    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
  if (isEdit) {
    fetchProperty();
  }
}, []);



   const fetchProperty = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await APIproperty.get(`/single/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setForm({
      location: res.data.property.location,
      country: res.data.property.country,
      price: res.data.property.price,
      phone: res.data.property.phone,
      email: res.data.property.email,
    });

    setPreview(res.data.property.images);

  } catch (error) {
    console.log(error);
  }
};


  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">

      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl p-8">

       <h2 className="text-3xl font-bold text-center mb-8">
  {isEdit ? "Update Property" : "Add Property"}
</h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="country"
            placeholder="Country"
            value={form.country}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <div>
            <label className="font-semibold">
              Upload Images (Max 3)
            </label>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImages}
              className="mt-2"
            />
          </div>

          {preview.length > 0 && (

            <div className="grid grid-cols-3 gap-3">

              {preview.map((img, index) => (

                <img
                  key={index}
                  src={img}
                  alt=""
                  className="w-full h-32 object-cover rounded-lg"
                />

              ))}

            </div>

          )}

 <button
  type="submit"
  disabled={loading}
  className={`w-full py-3 rounded-lg text-white font-semibold  cursor-pointer ${
    loading
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-black hover:bg-gray-800"
  }`}
>
  {loading
    ? isEdit
      ? "Updating..."
      : "Uploading..."
    : isEdit
    ? "Update Property"
    : "Add Property"}
</button>

        </form>

      </div>

    </div>
  );
};

export default AddProperty;