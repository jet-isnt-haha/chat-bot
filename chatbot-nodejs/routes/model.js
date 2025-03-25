const express =require('express')
const router =express.Router();
const checkTokenMiddleware = require('../middlewares/checkTokenMiddleware');
const { default: axios } = require('axios');
const{API_URL,API_KEY}=require('../config/config')
// router.post('/generate',checkTokenMiddleware,async (req,res)=>{
//     try {
//         const{history} =req.body
//         //在后端发送大数据模型请求，apiKey安全性相对更高
//         const data =await axios({
//             url:API_URL,
//             method:'POST',
//             headers:{
//                 "Content-Type": "application/json",
//                 Authorization:`Bearer ${API_KEY}`
//             },
//             data:{
//                 model:"deepseek-r1",
//                 messages:history
//             },
//         })
//         console.log('aaaa',data)
//         const modelResponse = data.data;
//          res.json({
//             code:'0000',
//             msg:'model响应成功',
//             data:modelResponse
//         })

//     } catch (error) {
//         return res.json({
//             code: '3001',
//             msg: 'model响应失败',
//             data: null
//         });
//     }

// })

router.post('/generate',checkTokenMiddleware,async (req,res)=>{
    try {
        const {history}=req.body
        const response =await axios({
            url:API_URL,
            method:'POST',
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${API_KEY}`
            },
            data:{
                model:"deepseek-r1",
                messages:history,
                stream: true,
                stream_options: {
                    "include_usage": true
                }
            },
            responseType:'stream'//设置响应类型为流
        })
        //设置响应头，告知客户端这是流式响应
        res.setHeader('Content-Type','text/event-stream')
        res.setHeader('Cache-Control','no-cache')
        res.setHeader('Connection','keep-alive')
        response.data.on('data',(chunk)=>{
  
            res.write(chunk)
        })
        response.data.on('end',(end)=>{
            console.log('bbbbbbb',end)
            res.end()
        })
    } catch (error) {
        
    }
})

module.exports=router