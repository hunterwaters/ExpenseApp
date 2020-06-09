const User = require('../models/User')

    exports.addUser = async (req, res, next) => {
    const { body } = req;
    const {
        firstName,
        lastName,
        password
    } = body;
    let {
      email
    } = body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Error: Email cannot be blank.'
      });
    }
    if (!password) {
      return res.status(400).json({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
    }
    if (!firstName) {
        return res.status(400).json({
          success: false,
          message: 'Error: First name cannot be blank.'
        });
      }
      if (!lastName) {
        return res.status(400).json({
          success: false,
          message: 'Error: Last name cannot be blank.'
        });
      }
    email = email.toLowerCase();
    email = email.trim();
    
    User.find({
      email: email
    }, (err, previousUsers) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: 'Error: Server error'
        });
      } else if (previousUsers.length > 0) {
        return res.status(400).json({
          success: false,
          message: 'Error: Account already exist.'
        });
      }
      // Save the new user
      const newUser = new User();
      newUser.firstName = firstName;
      newUser.lastName = lastName;
      newUser.email = email;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        if (err) {
          return res.status(400).json({
            success: false,
            message: 'Error: Server error'
          });
        }
        return res.status(201).json({
          success: true,
          message: 'Signed up'
        });
      });
    });
}

  


