import express from "express";
import { authCheck } from "../middleware/auth.middleware.js";
import { connectRequestModal } from "../models/connectionRequest.modal.js";
import { User } from "../models/usser.model.js";
const router = express.Router();

router.post("/send/:status/:toUserId", authCheck, async (req, res) => {
  try {
    console.log(req.user.id);
    const fromUserId = req.user.id;
    const status = req.params.status;
    const toUserId = req.params.toUserId;

    //check user is sending request to himself

    if (fromUserId === toUserId) {
      return res
        .status(400)
        .send({ message: "user can not send request to himself" });
    }

    const touserData = await User.findById(toUserId);

    //check user is present i db or not

    const userExist = await User.findById(toUserId);

    if (!userExist) {
      return res.status(404).send({ message: "user not exist" });
    }
    //check ststus is valid or not

    const allowedStatus = ["interested", "ignored"];

    if (!allowedStatus.includes(status)) {
      return res
        .status(400)
        .json({ message: `status is not allowed ${status}` });
    }

    //check reuest is already sent or not
    const existingconnectionReq = await connectRequestModal.findOne({
      $or: [
        { fromUserId, toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });

    if (existingconnectionReq) {
      return res
        .status(400)
        .send({ message: "connection request already exists" });
    }

    const data = await connectRequestModal.create({
      fromUserId,
      toUserId,
      status,
    });
    const msg =
      status === "interested"
        ? `${req.user.firstName} is ${status} in ${touserData.firstName} profile`
        : `${req.user.firstName} is ${status}  ${touserData.firstName} profile`;

    res.send({ message: msg, data });
  } catch (e) {
    console.error("POST /request/send failed:", e);
    res.status(500).send({ message: "something went wrong", error: e.message });
  }
});

router.post("/review/:status/:requestId", authCheck, async (req, res) => {
  try {
    const loggedInUser = req.user.id;
    const {status,requestId} = req.params;

    const allowedStatus = ["accepted", "rejected"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ error: `${status} is not allowed` });
    }
    //check the reqid is present in db or not
    const connectionRequest = await connectRequestModal.findOne({
      _id : requestId,
      toUserId : loggedInUser, // check that logged in user is same that accepting 
      status: "interested",
    });
    if (!connectionRequest) {
      return res.status(400).send({ error: "connection request  not found" });
    }

    connectionRequest.status = status;
    await connectionRequest.save();
    return res.status(200).json({message : `connection request ${status} successfully`})
  } catch (e) {
    return res.status(400).send({ error: e.message });
  }
});

export default router;
