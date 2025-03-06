const express =require('express')
const router =express.Router();
const UserModel =require('../models/UserModel')
const checkTokenMiddleware = require('../middlewares/checkTokenMiddleware');

router.get('/user/:id',checkTokenMiddleware,async (req,res)=>{
   try{
    const {id}=req.params
    const data=await UserModel.findById(id)
    res.json({
        code:'0000',
        msg:'读取成功',
        data
    })
}catch(error){
    return  res.json({
        code:'1004',
        msg:'读取失败',
        data:null
    })
}
})

module.exports=router