const express=require('express')
const MessageModel =require('../models/MessageModel')
const router =express.Router();
const checkTokenMiddleware = require('../middlewares/checkTokenMiddleware');
const mongoose =require('mongoose')
const { ObjectId } = mongoose.Types;


//创建新message并创建数据库
router.get('/message',checkTokenMiddleware,async(req,res)=>{
    const user_id = new ObjectId(req.currUser._id)
    const {username}=req.currUser

    try {
        const result =await MessageModel.create({
            user_id,
            username,
            messages:[
                {
                    message_index:0
                }
            ]
        })
        res.json({
            code:'0000',
            msg:'message创建成功',
            data:result._id
        })
    } catch (error) {
        return res.json({
            code:'5002',
            msg:'message创建失败',
            data:null
        })
    }
})

//message更新并插入数据库
router.post('/message/upsert',checkTokenMiddleware,async(req,res)=>{
    const {username}=req.currUser
    const {role,text,message_index} =req.body
    const _id =new ObjectId(req.body._id)
    try {
        //先查看是否又message内容被改变并更新
        const updateResult = await MessageModel.updateOne(
            {_id,"messages.message_index":message_index},//查询条件：用户id以及message索引
            {
                //用于设置（更新）文档中的特定字段$set
                $set:{
                    "messages.$":{//使用$定位到具体的消息
                        message_index,
                        role,
                        message:text,
                        created_at:Date.now()
                    }
                }
            }
        ) 
        // 如果更新操作没有修改如何文档，则插入新消息
        if(updateResult.modifiedCount===0){
        const result =await MessageModel.findOneAndUpdate(
            {_id,username},//查询条件：根据用户ID查找文档
            {
                $push:{
                    messages:{
                    message_index,
                    role,
                    message:text,
                    created_at:Date.now()
                    }
                }
            },
            {
                upsert:true,//如果文档不存在则创建新文档
                new:true,// 返回更新后的文档
                setDefaultsOnInsert:true//在创建新文档时应用默认值                
            }
        )

                res.json({
                    code:'0000',
                    msg:'更新message成功',
                    data:result
                })
    }else{
            res.json({
                code:'0000',
                msg:'更新message成功',
                data:updateResult
            })
    }

    } catch (error) {
        return res.json({
            code:'5001',
            msg:'更新message失败',
            data:null
        })
    }
})

//获取该用户的对话集
router.get('/msgids',checkTokenMiddleware,async(req,res)=>{
    const {_id}=req.currUser

    const results =await MessageModel.find({user_id:_id})

    const msgIds =results.map(item=>item._id)
    // const messageIds= result.map
    //接下来1.将messageids填入messages表的id们，然后将其传给组件？然后通过点击事件获取异步请求，渲染对应的message
    res.json({
        code:'0000',
        msg:'导入message_ids成功',
        data:msgIds
    })
})

//获取该用户的对话
router.get('/message/:id',checkTokenMiddleware,async(req,res)=>{
    try{
    const _id =req.params.id
    const data =await MessageModel.findOne({_id})
    res.json({
        code:'0000',
        msg:'获取单条对话成功',
        data
    })
    }catch(error){
      return res.json({
        code:'5003',
        msg:'获取单条对话失败',
        data:null
      })
    }
})

module.exports =router