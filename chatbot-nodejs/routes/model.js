const express =require('express')
const router =express.Router();
const checkTokenMiddleware = require('../middlewares/checkTokenMiddleware');
const { default: axios } = require('axios');
const{API_URL,API_KEY}=require('../config/config')
router.post('/generate',checkTokenMiddleware,async (req,res)=>{
    try {
        const{history} =req.body
        //在后端发送大数据模型请求，apiKey安全性相对更高
        const data =await axios({
            url:API_URL,
            method:'POST',
            headers:{
                "Content-Type": "application/json",
                Authorization:`Bearer ${API_KEY}`
            },
            data:{
                model:"deepseek-r1",
                messages:history
            },
        })
        console.log('aaaa',data)
        const modelResponse = data.data;
         res.json({
            code:'0000',
            msg:'model响应成功',
            data:modelResponse
        })

    } catch (error) {
        return res.json({
            code: '3001',
            msg: 'model响应失败',
            data: null
        });
    }

})

module.exports=router