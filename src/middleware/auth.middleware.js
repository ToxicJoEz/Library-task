import jwt from "jsonwebtoken";
import User from "../modules/user/user.model.js";
import { CustomError } from "../utils/customError.js";

export const tokenAuth = async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      if (!req.user) throw new CustomError("User not found", 401);

      next();
    } catch (err) {
      next(err);
    }
  }
  if (!token) throw new CustomError("No token provided", 401);
};
