
const jwt =require('jsonwebtoken')
const {SECRET_TOKEN_KEY} =require('../config/config')
module.exports=async (req,res,next)=>{
    try {
    const authHeader = req.get('Authorization');
    const token = authHeader.split(' ')[1];

   const{username,_id}= await jwt.verify(token,SECRET_TOKEN_KEY)
   req.currUser={
    username,
    _id
   }
    next()
} catch (error) {
    return res.json({
        code:'2003',
        msg:'token 校验失败',
        data:null
    })
}
}