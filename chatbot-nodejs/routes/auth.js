const express =require('express')
const UserModel =require('../models/UserModel')
const jwt =require('jsonwebtoken')
const router =express.Router();
const {SECRET_TOKEN_KEY} =require('../config/config');
const checkTokenMiddleware = require('../middlewares/checkTokenMiddleware');



router.post('/register',async (req,res)=>{
    try{
        const data =await UserModel.create({
            ...req.body
        })
        res.json({
            code:'0000',
            msg:'注册成功',
            data
        })
        
    }catch(error){
        return res.json({
            code:'1002',
            msg:'注册失败',
            data:null
        })
    }
})

router.post('/login',async (req,res)=>{
    try{
        const {email,password} =req.body
        const user =await UserModel.findOne({email,password})
        
        if(!user){
            return res.json({
                code:'2002',
                msg:'用户或密码错误',
                data:null
            })
        }
        //密码验证通过生成token
        const token = jwt.sign({
            username:user.username,
            _id:user._id
        },SECRET_TOKEN_KEY,{
            //逾期时间设为一周
            expiresIn:60*60*24*7
        })
        console.log(token)
        res.json({
            code:'0000',
            msg:'登录成功',
            data:{token,user}
        })

    }catch(error){
        return res.json({
            code:'2001',
            msg:'登录失败',
            data:null
        })
    }
})

router.post('/logout',async(req,res)=>{
    try {
        res.json({
            code:'0000',
            msg:'退出成功',
        })
    } catch (error) {
        return res.json({
            code:'4001',
            msg:'退出失败'
        })
    }
})

router.get('/check',checkTokenMiddleware,async (req,res)=>{
    try {
        const data =req.currUser
        res.json({
            code:'0000',
            msg:'token已成功验证',
            data
        })
    } catch (error) {
        return res.json({
            code:'5001',
            msg:'其他错误',
            data:null
        })
    }    
    }
)

module.exports =router