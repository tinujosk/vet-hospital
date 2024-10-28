import User from "../model/User.js";
import Staff from "../model/Staff.js";

export const createUser = async (req, res) => {
  try {
    const { email, role, password,firstName, lastName, specialization, phone } = req.body;

    const newUser = new User({ email, role, password });
    const savedUser = await newUser.save();
    const newStaff = new Staff({
      firstName,
      lastName,
      specialization,
      phone,
      email,
      user: savedUser._id,
    });
    await newStaff.save();

    console.log("User created:", newUser);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ error: 'Failed to create user "controller error messge"' });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    // const UserData = await User.find();
    const staffData = await Staff.find().populate({
      path:'user',
      select: 'email role password'
    });


    if (staffData.length === 0) {
      console.log("No User found.");
    } else {
      console.log("Fetched User Data:");
    }

    res.status(200).json(staffData);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to Get user Details" });
  }
};
