//const User = require('../models/User')
const UserSession = require('../models/UserSession');

exports.logoutUser = async (req, res, next) => {
    const  { query } = req;
    const { token } = query;

    //"deploy": "now ./build",
    //"postdeploy": "now alias -A ./build/now.json"


    UserSession.findOneAndUpdate({
        _id: token,
        isDeleted: false
    }, 
    {$set:{isDeleted: true}},
     null, (err, sessions) => {
        if(err) {
            return res.status(400).json({
                success: false,
                message: ' Error: Server Error'
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Good'
            });
    });
}