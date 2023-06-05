const User = require("../model/User");
const bcrypt = require("bcryptjs");
const { generateToken, refreshToken } = require("../utils/generateToken");

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}
function validatePhoneNumber(phoneNumber) {
  const pattern = /^(0[1-9])+([0-9]{8})$/;
  if (!pattern.test(phoneNumber)) {
    return false;
  }
  const validPrefixes = ["03", "05", "07", "08", "09"];
  const prefix = phoneNumber.substr(0, 2);
  if (!validPrefixes.includes(prefix)) {
    return false;
  }
  return true;
}

const register = async (req, res, next) => {
  try {
    const { email, password, phone, username } = req.body;
    if (!username || !email || !password) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    }
    if (!validateEmail(email)) {
      return res.status(200).json({
        status: "ERR",
        message: "Input email is not in the correct format",
      });
    }
    if (!validatePhoneNumber(phone)) {
      return res.status(200).json({
        status: "ERR",
        message: "Input phone is not in the correct format",
      });
    }
    const userExists = await User.findOne({ email });
    const usernameExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (usernameExists) {
      return res.status(400).json({ message: "User Name already exists" });
    }
    const user = await User.create({
      email,
      username,
      password,
      phone,
    });
    if (user) {
      return res.status(201).json({
        message: "Success",
        code: 1,
      });
    } else {
      return res.status(400).json({ message: "Invalid User Data", code: 0 });
    }
  } catch (error) {
    next(error);
  }
};
const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const { username, password } = userLogin;
    try {
      const checkUser = await User.findOne({
        username: username,
      });
      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }
      const comparePassword = bcrypt.compareSync(password, checkUser.password);

      if (!comparePassword) {
        resolve({
          status: "ERR",
          message: "The password or user is incorrect",
        });
      }
      const access_token = await generateToken({
        id: checkUser.id,
      });

      const refresh_token = await refreshToken({
        id: checkUser.id,
      });

      resolve({
        status: "OK",
        message: "SUCCESS",
        access_token,
        refresh_token,
      });
    } catch (e) {
      reject(e);
    }
  });
};
const Login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && (await user.matchPassword(password))) {
      const response = await loginUser(req.body);
      // console.log(response)

      const { refresh_token, ...newReponse } = response;
      res.cookie("refresh_token", refresh_token, {
        maxAge: 60 * 60 * 24,
        secure: true,
        sameSite: "strict",
        domain: "makemoneymmo.com",
      });
      return res.status(200).json(newReponse);
    } else {
      return res.status(401).json({ error: "Invalid Usermame or Password" });
    }
  } catch (error) {
    next(error);
  }
};
const LoginAdmin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && (await user.matchPassword(password))) {
      if (!user.isAdmin) {
        return res.status(401).json({ error: "User not Admin" });
      }
      const response = await loginUser(req.body);
      const { refresh_token, ...newReponse } = response;
      res.cookie("refresh_token", refresh_token, {
        maxAge: 60 * 60 * 24,
        secure: true,
        sameSite: "strict",
        domain: "makemoneymmo.com",
      });
      return res.status(200).json(newReponse);
    } else {
      return res.status(401).json({ error: "Invalid Usermame or Password" });
    }
  } catch (error) {
    next(error);
  }
};
const refreshTokenService = (token) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
        if (err) {
          console.log("err", err);
          resolve({
            status: "ERR",
            message: "The authemtication",
          });
        }
        const access_token = await generateToken({
          id: user.id,
        });
        resolve({
          status: "OK",
          message: "SUCESS",
          access_token,
        });
      });
    } catch (e) {
      reject(e);
    }
  });
};

const RefreshTokenController = async (req, res, next) => {
  try {
    const token = req.cookies.refresh_token;
    if (!token) {
      return res.status(200).json({
        status: "ERR",
        message: "The token is required",
      });
    }
    const response = await refreshTokenService(token);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const Logout = async (req, res, next) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({
      status: "OK",
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params._id);
    if (user) {
      return res.json({
        status: "OK",
        message: "SUCESS",
        data: {
          phone: user.phone,
          username: user.username,
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        },
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    next(error);
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const user = await User.find({});
    if (user) {
      return res.json(user);
    } else {
      return res.status(401).json({ message: "error" });
    }
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const data = req.body;

    const user = await User.findOne({ _id: req.params.id });

    if (user) {
      const updatedUser = await User.findByIdAndUpdate(user._id, data, {
        new: true,
      });
      return res.status(200).json({
        status: "OK",
        message: "SUCCESS",
        data: updatedUser,
      });
    } else {
      res.status(404).json({
        status: "ERROR",
        message: "User not found",
      });
    }
  } catch (error) {
    next(error);
  }
};
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.json({ success: false });
    }
    await User.deleteOne({ _id: req.params.id });
    return res.json({ success: true });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  register,
  Login,
  RefreshTokenController,
  Logout,
  getUserById,
  LoginAdmin,
  getAllUser,
  updateUser,
  deleteUser
};
