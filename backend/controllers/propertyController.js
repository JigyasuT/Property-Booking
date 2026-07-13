
const cloudinary = require("../config/cloudinary");
const Property = require("../models/Property");

exports.createProperty = async (req, res) => {
  try {
    const { location, country, price, phone, email } = req.body;

    if (!location || !country || !price || !phone || !email) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Upload at least one image",
      });
    }

    const imageUrls = [];

    for (const file of req.files) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "properties",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            },
          )
          .end(file.buffer);
      });

      imageUrls.push(result.secure_url);
    }

    const property = await Property.create({
      location,
      country,
      price,
      phone,
      email,
      images: imageUrls,
      host: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Property Added Successfully",
      property,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};






exports.getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({
      host: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      properties,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};









exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find()
      .populate("host", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      properties,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};



exports.getHostProperties = async (req, res) => {
  try {
    const properties = await Property.find({
      host: req.user.id,
    });

    res.status(200).json({
      success: true,
      properties,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};




exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    if (property.host.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await Property.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Property Deleted",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};






exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    if (property.host.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const {
      location,
      country,
      price,
      phone,
      email,
    } = req.body;

    property.location = location;
    property.country = country;
    property.price = price;
    property.phone = phone;
    property.email = email;

    await property.save();

    res.status(200).json({
      success: true,
      message: "Property Updated",
      property,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};




exports.getSingleProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    if (property.host.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    res.status(200).json({
      success: true,
      property,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};