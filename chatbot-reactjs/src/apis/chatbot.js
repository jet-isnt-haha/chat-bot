import { http } from "../utils";

//模型回复API
export function generateAPI(history,signal){
    return http({
        url:'/generate',
        method:'POST',
        data:{
            history
        },
        signal
    })
}

//存储MessageAPI
export function upSertMessageAPI(data){
    return http({
        url:'/message/upsert',
        method:'POST',
        data
    })
}

//获取特定对话API
export function getMessageAPI(msgId){
    return http({   
        url:`/message/${msgId}`,
        method:'GET'
    })
}

//获取当前用户最近对话id数组API
export function getMsgIdsAPI(){
    return http({
        url:'/msgids',
        method:'GET',
    })
}

//创建新对话API
export function newMessageAPI(){
    return http({
        url:'/message',
        method:'GET'
    })
}