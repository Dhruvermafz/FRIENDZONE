const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;
const User = require("../Models/userSchema");

const signup = async (req, res) => {
  const { username, email, password, pic } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: "empty field!!" });
  }

  try {
    //checking user existence with that email
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res
        .status(400)
        .json({ error: "user already exist with this email" });
    }

    if (!pic) {
      const newUser = new User({
        username,
        email,
        password,
      });
      console.log("no pic block");
      await newUser.save();
      return res.status(200).json({ message: "user created", user: newUser });
    }

    if (pic) {
      console.log("pic block");
      const newUser = new User({
        username,
        email,
        password,
        pic,
      });
      await newUser.save();
      return res.status(200).json({ message: "user created", user: newUser });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "field cannot be empty" });
  }
  try {
    //finding if user exists or not..
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "email/password is invalid" }); //email doesn't exist
    }

    if (password != user.password) {
      return res.status(400).json({ error: "email/password is invalid" });
    }

    const token = jwt.sign({ userId: user._id }, secretKey);
    res.cookie("token", token, { httpOnly: true });

    return res
      .status(200)
      .json({ message: "successfully logged in", user: user });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

const authVerify = async (req, res, next) => {
  console.log("in authVerify");
  try {
    const token = req.cookies.token;
    // console.log(token);
    if (!token) {
      return res.status(400).json({ error: "no token" });
    }
    try {
      const verify = jwt.verify(token, secretKey);
      console.log(verify);
      if (!verify) {
        return res.status(400).json({ error: "invalid token!" });
      }

      const user = await User.findOne({ _id: verify.userId }).select(
        "-password"
      );
      if (!user) {
        return res.status(400).json({ error: "user not found" });
      }
      // console.log(user);
      req.user = user;
      // res.status(200).json({ user: user });
    } catch (error) {
      return res.status(400).json({ error });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
  next();
};

const logout = async (req, res) => {
  res.clearCookie("token", { httpOnly: true });
  res.status(200).json({ message: "Logout Successful" });
};
const registerAdmin = async (req, res) => {
  try {
    const { fullname, username, email, password, gender, role } = req.body;

    let newUserName = username.toLowerCase().replace(/ /g, "");

    const user_name = await Users.findOne({ username: newUserName });
    if (user_name) {
      return res.status(400).json({ msg: "This username is already taken." });
    }

    const user_email = await Users.findOne({ email });
    if (user_email) {
      return res.status(400).json({ msg: "This email is already registered." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ msg: "Password must be at least 6 characters long." });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = new Users({
      fullname,
      username: newUserName,
      email,
      password: passwordHash,
      gender,
      role,
    });

    await newUser.save();

    res.json({ msg: "Admin Registered Successfully." });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email, role: "admin" });

    if (!user) {
      return res.status(400).json({ msg: "Email or Password is incorrect." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Email or Password is incorrect." });
    }

    const access_token = createAccessToken({ id: user._id });
    const refresh_token = createRefreshToken({ id: user._id });

    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      path: "/api/refresh_token",
      maxAge: 30 * 24 * 60 * 60 * 1000, //validity of 30 days
    });

    res.json({
      msg: "Logged in  Successfully!",
      access_token,
      user: {
        ...user._doc,
        password: "",
      },
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await Users.findOne({ _id: req.user._id });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Your password is wrong." });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ msg: "Password must be at least 6 characters long." });
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 12);

    await Users.findOneAndUpdate(
      { _id: req.user._id },
      { password: newPasswordHash }
    );

    res.json({ msg: "Password updated successfully." });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
module.exports = {
  signup,
  login,
  authVerify,
  logout,
  adminLogin,
  registerAdmin,
  changePassword,
};
