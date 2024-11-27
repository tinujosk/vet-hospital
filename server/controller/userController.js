import User from '../model/User.js';
import Staff from '../model/Staff.js';
import { sendPasswordEmail } from './emailServiceController.js';

export const createUser = async (req, res) => {
  try {
    const {
      email,
      role,
      password,
      firstName,
      lastName,
      specialization,
      phone,
    } = req.body;

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
    const emailResponse = await sendPasswordEmail(email, password);
    if (!emailResponse.success) {
      return res
        .status(500)
        .json({ message: 'User created but failed to send email' });
    }
    console.log('User created:', newUser);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res
      .status(500)
      .json({ error: 'Failed to create user "controller error messge"' });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    // const UserData = await User.find();
    const staffData = await Staff.find().populate({
      path: 'user',
      select: 'email role',
    });

    if (staffData.length === 0) {
      console.log('No User found.');
    } else {
      console.log('Fetched User Data:');
    }

    res.status(200).json(staffData);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to Get user Details' });
  }
};

export const getLoggedInUser = async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ message: 'User ID not provided' });
  }
  try {
    // const staffData = await Staff.findOne()
    //   .populate({
    //     path: 'user',
    //     select: '-password',
    //     match: { _id: userId },
    //   })
    //   .exec();

    // const staffData = await Staff.findOne({ user: userId })
    //   .populate({ path: 'user', select: '-password' }) // Populate `user` and exclude `password`
    //   .exec();

    const staffData = await Staff.findOne({ user: userId })
      .populate({ path: 'user', select: '-password' }) // Populate the `user` field and exclude the `password`
      .exec();

    if (!staffData) {
      return res.status(404).json({ message: 'Staff not found' });
    }
    res.json(staffData);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user details' });
  }
};
