import User from '../model/User.js';

export const createUser = async (req, res) => {
  try {
    const { email, role, password } = req.body;

    const newUser = new User({ email, role, password }); 
    await newUser.save();

    console.log('User created:', newUser);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user "controller error messge"' });
  }
};


export const getUserDetails = async(req,res)=>{
  try{
    const UserData = await User.find()

    if (UserData.length === 0) {
      console.log('No User found.');
    } else {
      console.log('Fetched User Data:');
    }

    res.status(200).json(UserData);

  }catch(error){
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to Get user Details' });
  }

};
