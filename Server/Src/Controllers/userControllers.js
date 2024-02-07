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

const Login = asyncHandler(async (req, res) => {
  //Fetch the user credentials from the request body
  const { email, password } = req.body;

  //Check if the emai or password are null
  if (!email && !password) {
    res.status(403);
    throw new Error("Please provide all the required fields");
  }

  //Validate the email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(403);
    throw new Error("Invalid email address");
  }

  //Fetch the user from the database with the provided email
  const user = await Prisma.user.findUnique({
    where: {
      email,
    },
  });

  //Check if the use does not exist in the database
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Check if the provided password and one with the fetched user matches
  const passwordMatches = await bcrypt.compare(password, user.password);

  //If they don't match throw an error
  if (!passwordMatches) {
    res.status(401);
    throw new Error("Invalid Credentials");
  }
  //if the password matches and the user exists already return success message with the user
  res.status(200).json({
    message: "User Logged in successfully",
    user,
  });
});

module.exports = {
  Register,
  Login,
};
