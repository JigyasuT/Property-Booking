const Booking = require("../models/Booking");
const Property = require("../models/Property");

exports.bookProperty = async (req, res) => {
  try {
    const { propertyId, checkIn, checkOut, guests } = req.body;

    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    const days =
      Math.ceil(
        (new Date(checkOut) - new Date(checkIn)) /
          (1000 * 60 * 60 * 24)
      ) || 1;

    const totalPrice = property.price * days;

    const booking = await Booking.create({
      property: property._id,
      guest: req.user.id,
      host: property.host,
      checkIn,
      checkOut,
      guests,
      totalPrice,
    });

    res.status(201).json({
      success: true,
      message: "Booking Successful",
      booking,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      guest: req.user.id,
    });

    res.status(200).json({
      success: true,
      bookings,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};






exports.getHostBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      host: req.user.id,
    })
      .populate("guest", "name email")
      .populate("property", "location country price images")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      bookings,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};