import User from '../model/User.js';
import Staff from '../model/Staff.js';
import { sendPasswordEmail } from './emailService.js';

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


// Get logged-in user details
export const getLoggedInUser = async (req, res) => {
  const { userId } = req.query;
  console.log('Received userId:', userId); // Log received userId

  if (!userId) {
    return res.status(400).json({ message: 'User ID not provided' });
  }

  try {
    const user = await User.findById(userId).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const staffDetails = await Staff.findOne({ user: userId });
    res.status(200).json({ user, staffDetails });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'Failed to fetch user details' });
  }
};
