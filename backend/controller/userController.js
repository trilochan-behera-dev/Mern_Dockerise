const User = require("../model/userSchema");

const secretkey = "mysecretkey";
const jwt = require("jsonwebtoken");

const getUser = async (req, res) => {
  try {
    const userData = await User.find();
    return res.json({
      totalUser: userData.length,
      result: userData,
      message: "Get User Successfully",
    });
  } catch (err) {
    return res.json({
      message: err?.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    if (Object.keys(req.body).length) {
      const { name, email, phone, password, confirmPassword } = req.body;
      let errorMsg = "";
      if (!name?.trim() || !email?.trim() || !password?.trim()) {
        errorMsg = "Please enter all required data";
      } else if (password !== confirmPassword) {
        errorMsg = "Password doesnot match";
      } else {
        const data = new User({
          name,
          email,
          phone,
          password,
        });
        const createUserData = await data.save();

        return res.json({
          message: "User created successfully",
          data: createUserData,
        });
      }
      return res.json({ message: errorMsg });
    } else {
      return res.json({
        message: "Data is empty to create user",
      });
    }
  } catch (err) {
    console.log(err);
    return res.json({
      message: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.find();

    const user = userData.find(
      (data) => data.email === email && data.password === password
    );
    if (!user) {
      jwt.sign({ user }, secretkey, { expireIn: 2400 }, (err, token) => {
        res.send({
          token: token,
        });
      });
    } else {
      return res.json({
        message: "Invalid Credentials",
      });
    }
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
};

const verifyToken = async (req, res, next) => {
  try {
    const bearerToken = req.headers["authorization"];
    if (typeof bearerToken !== "undefined") {
      const token = bearerToken.split(" ")[1];
      req.token = token;
      next();
    } else {
      res.json({
        message: "Invalid Token",
      });
    }
  } catch (err) {
    return res.json({
      message: err.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    jwt.verify(req.token, secretkey, (err, loginuserdata) => {
      if (err) {
        res.json({
          message: "Token is invalid",
        });
      } else {
        User.findByIdAndDelete(loginuserdata.id, req.body, {
          new: true,
        });
        res.json({
          message: "Update user data successfully",
          id: loginuserdata.id,
        });
      }
    });
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports = { getUser, createUser, verifyToken, loginUser, updateUser };
