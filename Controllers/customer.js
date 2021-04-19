const { addCustomer, loginCustomer, findSingleUserCart } = require("../Services");
const {
  hashPassword,
  comparePassword,
  addDataToToken,
  verifyToken,
} = require("../Utils");

const addNewUser = async (req, res) => {
  try {
    const hashedPassword = hashPassword(req.body.password);
    const newUser = await addCustomer({
      ...req.body,
      password: hashedPassword,
    });
    console.log(addCustomer({ ...req.body, password: hashedPassword }));
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
    const userId = id
    console.log(id);
    const userCart = await findSingleUserCart(userId);
    console.log(userCart);
    res.status(201).json({
      status: "success",
      message: "Cart fetched successfully",
      data: userCart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", message: "Something went wrong." });
  }
};

module.exports = {
  addNewUser,
  loginUser,
  viewCart
};
