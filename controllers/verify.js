//const User = require('../models/User')
const UserSession = require('../models/UserSession');

exports.verifyUser = async (req, res, next) => {
    const  { query } = req;
    const { token } = query;


    UserSession.find({
        _id: token,
        isDeleted: false
    }, (err, sessions) => {
        if(err) {
            return res.status(400).json({
                success: false,
                message: ' Error: Server Error'
            })
        }
        if(sessions.length != 1) {
            return res.status(400).json({
                success: false,
                message: ' Error: Server Error'
            })
        } else {
            return res.status(200).json({
                success: true,
                message: 'Good'
            })
        }
    })
}