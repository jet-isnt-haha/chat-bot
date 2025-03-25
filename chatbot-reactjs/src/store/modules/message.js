//集中管理对话记录状态
import { createSlice } from "@reduxjs/toolkit";


const msgStore=createSlice({
    name:'msg',
    initialState:{
        chatMessages:[]
    },
    reducers:{
        addChatMessages(state,action){
            state.chatMessages=[...state.chatMessages,action.payload]
        },
        upDateChatMessages(state, action) {
            const { role, text, isError } = action.payload;
            // 过滤
            const filteredMessages = state.chatMessages.filter(msg =>((msg.text!== "Thinking..."|| msg.role!=='model')));
        
            if (filteredMessages.length > 0) {
                if(filteredMessages[filteredMessages.length-1].role!=='model'){
                    //如果最后一个聊天信息不为model则创建新信息role为model
                    filteredMessages.push({ role,text:'',isError });
                }
                // 如果过滤后的数组不为空，将新的 text 追加到最后一项的 text 后面
                const lastMessage={...filteredMessages[filteredMessages.length-1]}
                lastMessage.text+=text
                filteredMessages[filteredMessages.length-1]=lastMessage
            } else {
                // 如果过滤后的数组为空，直接添加新消息
                filteredMessages.push({ role, text, isError });
            }
            // 更新 state 中的 chatMessages
            state.chatMessages = filteredMessages;
        },
        clearChatMessages(state){
            state.chatMessages=[]
        },
        setChatMessages(state,action){
            state.chatMessages=action.payload
        }
    }
})

const {addChatMessages,setChatMessages,upDateChatMessages,clearChatMessages} =msgStore.actions

const msgReducer =msgStore.reducer

export {addChatMessages,setChatMessages,upDateChatMessages,clearChatMessages}

export default msgReducer