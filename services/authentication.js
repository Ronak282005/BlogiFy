const JWT = require("jsonwebtoken")
const secret =  "mysecretkey"; // Change this to a secret key of your choice

function createTokenForUser(user){
    const payload = {
        _id :  user._id,
        email : user.email,
        profileImageUrl : user.profileImageUrl,
        role : user.role,
    }
    const token = JWT.sign(payload,secret)
    return token
}

function  verifyToken(token){
    const payload = JWT.verify(token,secret)
    return payload
}


module.exports =  {createTokenForUser,verifyToken}


