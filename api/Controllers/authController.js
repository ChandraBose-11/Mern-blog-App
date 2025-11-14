import { errorHandler } from "../Middleware/error.js";
import User from "../Models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export const signup = async (req, res,next) => {
  // console.log(req.body);
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400),res.json({success:false,message:'All fields are required'}))
    // return res.status(400).json({ message: "All fields are required" });
  }
  const hashedPassword = bcryptjs.hashSync(password, 10);
   const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.json({ success:true,message: "Signup successfully" });
  } catch (error) {
   next(error)
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400), res.json({ message: "All fields are required" }));
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404), res.json({ message: "User not found" }));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400), res.json({ message: "Invalid password" }));
    }
    const token = jwt.sign({ id: validUser._id,isAdmin:validUser.isAdmin}, process.env.JWT_SECRET_KEY);
    const { password: Password, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user_id,isAdmin:validUser.isAdmin}, process.env.JWT_SECRET_KEY);
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4), // Chandra Bose => chandrubose123456
          email,
          password:hashedPassword,
          profilePicture:googlePhotoUrl,
      });
      await newUser.save();
      const token=jwt.sign({id:newUser._id,isAdmin:validUser.isAdmin},process.env.JWT_SECRET_KEY);
      const {password,...rest}=newUser._doc;
      res.status(200)
      .cookie('access_token',token,{
        httpOnly:true,
      })
      .json(rest)
    }
  } catch (error) {}
};