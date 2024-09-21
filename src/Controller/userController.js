const User = require('../model/userModel');



exports.inActive = async (req, res) => {
    try {
      const email = req.body.email;
  
      const date = new Date();

      const updatedUser = await User.findOneAndUpdate(
        { email },
        { 
          isActive: false,
          updatedDate: date 
        },
        { 
          new: true
        }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found', success: false });
      }
  
      res.clearCookie('token');
      res.status(200).json({ message: 'User deactivated successfully', success: true });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'User deactivation failed' });
    }
  };
  