const mongoose =require('mongoose')

//用户信息Model
const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})

const UserModel =mongoose.model('user',UserSchema)

module.exports=UserModel