exports.isHost = (req, res, next) => {
   console.log("Inside isHost:", req.user);
  if (req.user.role !== "host") {
    return res.status(403).json({
      success: false,
      message: "Only Host can access",
    });
  }
  next();
};
