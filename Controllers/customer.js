const { addCustomer, loginCustomer, findSingleUserCart } = require("../Services");

const {
  hashPassword,
  comparePassword,
  addDataToToken,
  verifyToken,
  transporter
} = require("../Utils");

const addNewUser = async (req, res) => {
  try {
    const hashedPassword = hashPassword(req.body.password);
    const newUser = await addCustomer({
      ...req.body,
      password: hashedPassword,
    });
    newUser.save();
    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", message: "Something went wrong." });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loggedInUser = await loginCustomer(email);
    if (loggedInUser && comparePassword(password, loggedInUser.password)) {
      // delete loggedInUser.password; not working...
      const token = addDataToToken({ email, id: loggedInUser._id });
      return res.status(200).json({
        status: "success",
        message: "User logged in successfully",
        data: { token, loggedInUser },
      });
    }
    return res
      .status(401)
      .json({ status: "fail", message: "Invalid login details" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", message: "Something went wrong." });
  }
};

const viewCart = async (req, res) => {
  try {
    const { id } = req.user;
    const allCart = await findSingleUserCart();
    const userCart = allCart.filter((item, index, array) => item.userId === id)
    const cartTotal = userCart.reduce((acc, val) => val.price + acc, 0)
    res.status(201).json({
      status: "success",
      message: "Cart fetched successfully",
      data: userCart,
      total: cartTotal
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", message: "Something went wrong." });
  }
};

const signUpMessage = async (req, res, next) => {
  try {
    const { email, firstName } = req.body;
    const mailOptions = await transporter.sendMail({
      from: `"Mo's Buka" <mzdoopey10@gmail.com>`, // sender address
      to: email, // list of receivers
      subject: "Welcome to Mo's Buka", // Subject line
      text: `<p>Dear ${firstName}, <br><br> Thank you for signing up to Mo's Buka. If you haven't tried out any of our delicious offers kindly head to our website. You maximum enjoyment is guaranteed. </p>`,
      html: `<p>Dear ${firstName}, <br><br> Thank you for signing up to Mo's Buka. If you haven't tried out any of our delicious offers kindly head to our website. You maximum enjoyment is guaranteed. </p>`, // html body
    });
    console.log("Message sent: %s", mailOptions.messageId);
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addNewUser,
  loginUser,
  viewCart,
  signUpMessage
};
