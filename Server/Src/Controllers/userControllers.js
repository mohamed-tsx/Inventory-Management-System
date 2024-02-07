const asyncHandler = require("express-async-handler");
const Prisma = require("../Config/Prisma");
const bcrypt = require("bcryptjs");

// @description Register new user
// @Method POST
// @Route /user/
// @Access Public
const Register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  let { avatar } = req.body;

  console.log(email);
  if (!email || !password || !username) {
    res.status(403);
    throw new Error("Please provide all the required fields");
  }

  if (!avatar) {
    avatar =
      "https://as1.ftcdn.net/v2/jpg/03/39/45/96/1000_F_339459697_XAFacNQmwnvJRqe1Fe9VOptPWMUxlZP8.jpg";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(403);
    throw new Error("Invalid email address");
  }

  const user = await Prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    res.status(403);
    throw new Error("User already exists");
  }

  // Corrected the asynchronous hashing of the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await Prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
      avatar,
    },
  });

  res.status(200).json({
    message: "User created successfully",
    newUser,
  });
});

module.exports = {
  Register,
};
