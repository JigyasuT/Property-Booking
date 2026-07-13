const express=require("express");
const { auth } = require("../middleware/auth");
const { isGuest } = require("../middleware/isGuest");
const { bookProperty, getMyBookings, getHostBookings } = require("../controllers/bookingController");
const { isHost } = require("../middleware/isHost");

const router=express.Router();




// router.post("/property",auth,isGuest,createBooking);

router.post("/create", auth,isGuest, bookProperty);
router.get("/my-bookings", auth, getMyBookings);
router.get("/host-bookings", auth, isHost, getHostBookings);


module.exports=router;