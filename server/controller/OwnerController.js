import Owner from '../models/Owner.js';


export const getOwner = async (req, res) => {
  try {
    const owner = await Owner.findById(req.params.id);
    if (!owner) return res.status(404).json({ message: 'Owner not found' });

    res.json(owner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
