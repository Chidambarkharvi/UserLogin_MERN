
const jwt = require("jsonwebtoken")

const User = require("../model/userSchema");




const Authenticate = async (req, res,next) => {
 

    try{
        console.log(req.cookies)
        console.log("jwt")
        console.log(req.cookies.jwtoken,"req")
const token = req.cookies.jwtoken;
console.log(token,"jjj")
const verifyToken = jwt.verify(token,process.env.SECRET_KEY);
console.log(verifyToken,"verify");

const rootUser = await User.findOne({_id:verifyToken._id,"tokens.token":token});
console.log(rootUser,"root")

if(!rootUser){
    throw new Error ("user not found")
}


    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    next();

    }
    catch (err){
        
  
        res.status(401).send("unauthorized: No token available")
console.log(err)
    }

}

module.exports =  Authenticate