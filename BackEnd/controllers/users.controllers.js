import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import usersModels from "../models/users.models";

export const signUp = async (req, res) => {
  try {
    const { userName, password, userEmail, userPhone, userType } = req.body;

    const existUser = await usersModels.findOne({ userEmail: userEmail });
    if (existUser) {
      return res.status(400).json({
        message: "User Exist!!!",
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const saveUser = new usersModels({
      userName: userName,
      password: hashedPassword,
      userEmail: userEmail,
      userPhone: userPhone,
      userType: userType || "client",
    });
    saveUser.save();
    if (saveUser) {
      return res.status(201).json({
        data: saveUser,
        message: "User successfully created",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { userEmail, password } = req.body;
    const existUser = await usersModels.findOne({ userEmail: userEmail });
    if (!existUser) {
      return res.status(400).json({
        message: "User doesn't Exist!!!",
      });
    }

    const checkPassword = bcrypt.compareSync(password, existUser.password);
    if (!checkPassword) {
      return res.status(401).json({  
        message: "Invalid Credentials",
      });
    } else {
      const secretKey = process.env.SECRET_KEY || "fallback_secret_key";
      const token = jwt.sign(
        { userid: existUser._id, userEmail: existUser.userEmail },
        secretKey,
        { expiresIn: "1h" }
      );
      console.log(token);
      return res.status(200).json({  
        token: token,
        data: existUser,
        role: existUser.userType,
        message: "Successfully Login",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
