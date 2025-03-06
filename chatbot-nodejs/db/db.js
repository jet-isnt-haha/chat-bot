module.exports=function(success,error){
    if(typeof error !='function'){
        error=()=>{
            console.log('连接失败')
        }
    }    
    //导入 mongoose
    const mongoose =require('mongoose')
    
    //导入配置文件
    const {DBHOST,DBNAME,DBPORT}=require('../config/config')
    
    //连接mongodb服务
    mongoose.connect(`mongodb://${DBHOST}:${DBPORT}/${DBNAME}`)
    
    //设置回调
    mongoose.connection.once('open',()=>{
        success()
    })
    
    mongoose.connection.on('error',()=>{
        error()
    })
    
    mongoose.connection.on('close',()=>{
        console.log('连接关闭')
        
    })
}