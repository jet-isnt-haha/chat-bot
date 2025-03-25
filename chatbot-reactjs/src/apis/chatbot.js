import { http } from "../utils";
import { getToken } from "../utils";
const token =getToken()
// export function generateAPI(history,signal){
//     return http({
//         url:'/generate',
//         method:'POST',
//         data:{
//             history
//         },
//         signal,
//         responseType: 'text', // 不能用 'stream'，改为 'text' 处理
//         onDownloadProgress: (progressEvent) => {
//             const xhr = progressEvent.target;
//             const responseText = xhr.responseText;
//             console.log('流式数据:', responseText);
//         }
//     })
// }
export function generateAPI(history, signal) {
    return fetch('http://127.0.0.1:3000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' ,
           Authorization:`Bearer ${token}`
        },
        body: JSON.stringify({ history }),
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

//删除对话API
export function delMessageAPI(msgId){
    return http({
        url:`/message/${msgId}`,
        method:'DELETE'
    })
}