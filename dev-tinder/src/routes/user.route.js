import express from "express";
import { authCheck } from "../middleware/auth.middleware.js";
import { User, USER_SAFE_FIELDS } from "../models/usser.model.js";
import { connectRequestModal } from "../models/connectionRequest.modal.js";
const router = express.Router();

// router.get("/feed", authCheck, async (req, res) => {
//   const data = await User.find();
//   console.log(data, "data");
//   res.send({ message: "data fetched successfully", data });
// });

router.get("/getbyEmailId", authCheck, async (req, res) => {
  try {
    // const cookies = req.cookies

    // const {token} = cookies

    // if(!token){
    //     res.status(401).send('unauthorized or invalid token')
    // }

    // console.log(token,"token")

    const userEmail = req.body.emailId;
    // const userId= req.body.userId
    const data = await User.find({ emailId: userEmail });
    // const data = await User.findById(userId)

    if (data.length <= 0) {
      res.status(404).send("user not found");
    } else {
      res.send({ message: "user data fetched successfully", data });
    }
  } catch (error) {
    res.status(400).send(error, "something went wrong");
  }
});

router.delete("/deleteByEmailId", async (req, res) => {
  try {
    const userId = req.body.emailId;
    const data = await User.deleteOne({ emailId: userId });
    const data1 = await User.findOne({ emailId: userId });
    console.log(data1);
    res.send({ message: "user deleted successfully", data });
  } catch (error) {
    res.send(error, "something went wrong");
  }
});

router.patch("/updateById/:userId", async (req, res) => {
  try {
    const userId = req.params.userId || req.body.userId;
    console.log(userId, "ID");
    const userInfo = req.body;
    const alowedEdits = ["firstName", "lastName", "age", "skills", "emailId"];
    const updates = Object.keys(userInfo).every((k) => alowedEdits.includes(k));
    if (!updates) {
      throw new Error("some fields are not allowed to update");
    }
    const data = await User.findByIdAndUpdate(userId, userInfo, {
      returnDocument: "after",
    });
    res.send({ message: "user updated successfully", data });
  } catch (error) {
    res.send(error + "something went wrong");
  }
});

router.put("/updateByEmailId", async (req, res) => {
  try {
    const emaiId = req.body.emailId;
    const userInfo = req.body;

    const data = await User.findOneAndUpdate({ emailId: emaiId }, userInfo, {
      returnDocument: "after",
    });
    res.send({ message: "user updated successfully", data });
  } catch (error) {
    res.send(error, "something went wrong");
  }
});

router.get("/", authCheck, async (req, res) => {
  try {
    const id = req.user.id;

    const userData = await User.findById(id).select(USER_SAFE_FIELDS);

    if (!userData) {
      return res.status(404).send({ message: "user not found" });
    }
    return res.send({ message: "user data fetched successfully", data: userData });
  } catch (e) {
    return res.status(400).send({ message: e.message });
  }
});

// update the logged-in user's own profile
const PROFILE_EDITABLE_FIELDS = ["firstName", "lastName", "age", "gender", "skills", "photoUrl"];

router.patch("/profile", authCheck, async (req, res) => {
  try {
    const invalidFields = Object.keys(req.body).filter(
      (key) => !PROFILE_EDITABLE_FIELDS.includes(key)
    );
    if (invalidFields.length > 0) {
      return res
        .status(400)
        .send({ message: `these fields can not be updated: ${invalidFields.join(", ")}` });
    }

    const data = await User.findByIdAndUpdate(req.user.id, req.body, {
      returnDocument: "after",
      runValidators: true,
    }).select(USER_SAFE_FIELDS);

    return res.send({ message: "profile updated successfully", data });
  } catch (e) {
    return res.status(400).send({ message: e.message });
  }
});

//get all the pending connection requests
router.get("/getAllRequests", authCheck, async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await connectRequestModal
      .find({
        toUserId: userId,
        status: "interested",
      })
      .populate("fromUserId", USER_SAFE_FIELDS);

    return res
      .status(200)
      .json({ message: "pending connection req. fetched successfully", data });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

//get all connections
router.get("/connections", authCheck, async (req, res) => {
  try {
    const loggedInUserId = req.user.id;

    const data = await connectRequestModal
      .find({
        $or: [
          { toUserId: loggedInUserId, status: "accepted" },
          {
            fromUserId: loggedInUserId,
            status: "accepted",
          },
        ],
      })
      .populate("fromUserId toUserId", USER_SAFE_FIELDS);

    res.status(200).send({ message: "data fetched successfully", data });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

//get all users (feed)

router.get("/feed", authCheck, async (req, res) => {
  try {
    //show feed that are not freinds or snet frend request or ignore the connection request

    const loggedInUserId = req.user.id;

    const connectionRequets = await connectRequestModal
      .find({
        $or: [
          {
            fromUserId: loggedInUserId,
          },
          {
            toUserId: loggedInUserId,
          },
        ],
      })
      .select("fromUserId toUserId");

    console.log(connectionRequets, "connectionRequets");
    // return res.send(connectionRequets)

    const hideFromFeed = new Set();

    connectionRequets.forEach((req) => {
      hideFromFeed.add(req.fromUserId.toString());
      hideFromFeed.add(req.toUserId.toString());
    });
    console.log(hideFromFeed, "hideFromFeed");

    const data = await User.find({
      $and: [
        {
          _id: {
            $nin: [...hideFromFeed],
          },
        },
        {
          _id: { $ne: loggedInUserId },
        },
      ],
    }).select(USER_SAFE_FIELDS);

    res.status(200).send({ message: "data fetched suucessfully", data });
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
});

export default router;
