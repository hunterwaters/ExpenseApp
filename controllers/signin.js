const User = require('../models/User')
const UserSession = require('../models/UserSession');

    exports.signupUser = async (req, res, next) => {

      const { body } = req;
      const {
        password,
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
      email = email.toLowerCase();

      const newUser = new User();
      newUser.email = email;
      newUser.password = newUser.generateHash(password);

      User.find({
        email: email
      }, (err, users) => {
        if(err) {
          return res.status(400).json({
            success: false,
            message: 'Server Error'
          })
        }
        if(users.length != 1) {
          return res.status(400).json({
            success: false,
            message: 'Invalid'
          })
        }

        const user = users[0];
        if(!user.validPassword(password)) {
          return res.status(400).json({
            success: false,
            message: 'Invalid'
          })
        }
        const userSession = new UserSession();
        userSession.userId = user._id;
        userSession.save((err, doc) => {
          if(err) {
          return res.status(400).json({
            success: false,
            message: 'Server Error'
          });
          }

          return res.status(200).json({
            success: true,
            message: 'Valid Sign in',
            token: doc._id
          })
        })
      })
}