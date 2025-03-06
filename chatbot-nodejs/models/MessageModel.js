
const mongoose =require('mongoose')

//聊天记录Model
const MessageSchema =new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        require:true
    },
    username:{
        type:String,
        require:true
    },
    messages:[{
        _id:false,
        message_index:{
            type:Number,
            require:true,
        },
        role:{
            type:String,
        },
        message:{
            type:String,
        },
        created_at:{
            type:Date,
            default:Date.now
        }
    }],
    created_at:{
        type:Date,
        default:Date.now
    }
})

//创建复合唯一索引,确保每个用户的message_index是唯一的，不同用户之间可以使用相同的message_index
// MessageSchema.index({"messages.message_index":1,_id:1, },{unique:true})

const MessageModel=mongoose.model('message',MessageSchema)

module.exports=MessageModel