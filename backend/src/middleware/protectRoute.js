import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerkId = req.auth().userId;
      if (!clerkId)
        return res
          .status(401)
          .json({ message: "Unauthorized - Invalid token" });

      const user = await User.findOne({ clerkId }); //find user from clerk db by id
      if (!user) return res.status(404).json({ message: "user not found" });

      req.user = user; //attach user to req
      next();
    } catch {
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];
