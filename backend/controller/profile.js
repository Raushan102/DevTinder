const User = require("../model/user");
const sanization = require("../src/util/data_Sanization");
const cloudinary = require("cloudinary").v2;
exports.getProfile = async (req, res) => {
  try {
    res.status(200).json({
      status: 200,
      message: "profile data fetched successfully",
      data: req.user,
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    sanization.CanUpdateTheseFields(req);
    Object.keys(req.body).forEach((element) => {
      req.user[element] = req.body[element];
    });

    await req.user.save();

    res.status(200).json({
      status: 200,
      message: "user profile is updated successfully",
      user: req.user,
    });
  } catch (error) {
    res.status(404).json({
      status: 404,
      message: error.message,
    });
  }
};

exports.profilePictureUpload = async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({
        status: "error",
        message: "No file uploaded",
      });
    }

    // Upload to Cloudinary with timeout protection
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(
        () => reject(new Error("Upload timeout after 30 seconds")),
        50000,
      );
    });

    const uploadPromise = new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "deveTinder/profiles",
          resource_type: "auto",
          transformation: [
            { width: 500, height: 500, crop: "limit" },
            { quality: "auto" },
            { fetch_format: "auto" },
          ],
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );

      uploadStream.end(req.file.buffer);
    });

    const result = await Promise.race([uploadPromise, timeoutPromise]);

    // Update user profile with new image URL
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    // Delete old image from Cloudinary if exists
    if (user.photoUrl && user.photoPublicId) {
      try {
        await cloudinary.uploader.destroy(user.photoPublicId);
      } catch (deleteError) {
        // Don't fail the request if old image deletion fails
        throw new Error({ message: "error while deleting th old photo please check photoPublicId" });
      }
    }

    // Update user with new image
    user.photoUrl = result.secure_url;
    user.photoPublicId = result.public_id;
    await user.save();

    res.status(200).json({
      status: "success",
      message: "Profile picture uploaded successfully",
      data: {
        url: result.secure_url,
        publicId: result.public_id,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message || "Upload failed",
      details: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
};
