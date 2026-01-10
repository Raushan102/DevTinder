const ConnectRequest = require("../model/connectionRequest");
const User = require("../model/user");

const SHOW_FIELDS = [
  "firstName",
  "lastName",
  "age",
  "photoUrl",
  "about",
  "gender",
];
exports.getRequest = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({
        status: 400,
        message: "invalid credentials please login",
      });
    }

    const connectionReqests = await ConnectRequest.find({
      toUserId: req.user._id,
      status: "interested",
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "age",
      "photoUrl",
      "about",
      "gender",
    ]);

    res.status(200).json({
      status: 200,
      message: "successfully get the data",
      data: connectionReqests,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

exports.getConnection = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({
        status: 400,
        message: "invalid credentials please login",
      });
    }

    const result = await ConnectRequest.find({
      $or: [
        { fromUserId: req.user._id, status: "accepted" },
        { toUserId: req.user._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", SHOW_FIELDS)
      .populate("toUserId", SHOW_FIELDS);

    res.status(200).json({
      status: 200,
      message: "data fetched successfully",
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

exports.getFeeds = async (req, res) => {
  console.log("yes request it here");

  try {
    if (!req.user) {
      return res.status(400).json({
        status: 400,
        message: "invalid credentials please login",
      });
    }
    console.log("Query params:", req.query);

    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 20;
    limit = limit > 50 ? 50 : limit;

    // ✅ Fix: Parse only if value exists
    let startage = req.query?.startage ? parseInt(req.query.startage) : null;
    let endage = req.query?.endage ? parseInt(req.query.endage) : null;
    let gender = req.query?.gender;
    let skillsParam = req.query?.skills; // Keep as string first

    let skip = (page - 1) * limit;

    // Get all connections
    const allconnectionMadeByUser = await ConnectRequest.find({
      $or: [{ fromUserId: req.user._id }, { toUserId: req.user._id }],
    }).select("fromUserId toUserId");

    // Build blocked users set
    const blockedUsers = new Set();
    allconnectionMadeByUser.forEach((element) => {
      blockedUsers.add(element.fromUserId.toString());
      blockedUsers.add(element.toUserId.toString());
    });

    // Add current user to blocked list
    blockedUsers.add(req.user._id.toString());

    // ✅ Fix: Correct query structure - Simplified approach
    let query = {
      _id: { $nin: Array.from(blockedUsers) }, // Exclude all at once
    };

    // ✅ Fix: Complete condition check
    if (
      startage !== null &&
      endage !== null &&
      !isNaN(startage) &&
      !isNaN(endage)
    ) {
      query.age = { $gte: startage, $lte: endage };
    }

    // ✅ Fix: Check if gender exists before using .length
    if (gender && gender.trim().length > 0) {
      query.gender = gender;
    }

    // ✅ Fix: Check if skills exists before splitting
    if (skillsParam && skillsParam.trim().length > 0) {
      const skillsArray = skillsParam.split(",").map((s) => s.trim());
      query.skills = { $in: skillsArray };
    }

    // Execute query
    console.log("query is equal to  = ", query);

    let users = await User.find(query)
      .select(SHOW_FIELDS)
      .skip(skip)
      .limit(limit);

    console.log(`Found ,users, users` ,users);

    res.status(200).json({
      status: 200,
      message: "user fetched successfully",
      data: users,
      count: users.length,
      page,
      limit,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
};
