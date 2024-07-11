// auth, isStudent, isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    
try{
    
   // extract jwt token
    // PENDING: other ways to fetch token

    console.log("cookie", req.cookies.token);
    console.log("body", req.body.token);
    // console.log("header", req.header("Authorization"))

    const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","");
    if(!token || token === undefined){
        return res.status(401).json({
            success: false,
            message: "Token is missing",
        });
    }

    // verify the token
    try{
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);

    req.user = payload;
    }catch(error){
        return res.status(401).json({
            success: false,
            message: "token is invalid",
        });
    }
    next();
}catch(error){
      return res.json(401)({
            success: false,
            message: "Something went wrong, while verifhying the token"
         });
      }
}

