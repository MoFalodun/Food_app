const { addAdmin, findAdminByEmail } = require("../Services");
const {
  hashPassword,
  comparePassword,
  addDataToToken,
  verifyToken,
} = require("../Utils");

const addNewAdmin = async (req, res) => {
  try {
    const hashedPassword = hashPassword(req.body.password);
    const newAdmin = await addAdmin({
      ...req.body,
      password: hashedPassword,
    });
    newAdmin.save();
    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: newAdmin,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", message: "Something went wrong." });
  }
};

const logAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loggedInAdmin = await findAdminByEmail(email);
    if (loggedInAdmin && comparePassword(password, loggedInAdmin.password)) {
      // delete loggedInAdmin.password; not working...
      const token = addDataToToken({ email, id: loggedInAdmin.id, isAdmin: loggedInAdmin.isAdmin  });
      return res.status(200).json({
        status: "success",
        message: "Admin logged in successfully",
        data: { token, loggedInAdmin },
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

module.exports = {
  addNewAdmin,
  logAdmin,
};