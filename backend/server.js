const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const connect = require("./database/dbConnect");
// Routers
const authRouter = require("./Routes/auth");
const { userRouter } = require("./Routes/user");
const { friendRouter } = require("./Routes/friend");
const { postRouter } = require("./Routes/post");

const communityRouter = require("./Routes/community");
//middelwares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://friendzone-nine.vercel.app"],
    credentials: true,
  })
);

connect();

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/friend", friendRouter);
app.use("/post", postRouter);
app.use("/zone", communityRouter);

const fetchNotification = require("./Controllers/fetchNotification");
const { authVerify } = require("./Controllers/authController");
app.get("/notification", authVerify, fetchNotification); // direct called controller here

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
