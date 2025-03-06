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
        },//redux中状态更新以替代appjsx的setChatHistory
        upDateChatMessages(state,action){
            const {role,text,isError}=action.payload
            //过滤
            const filteredMessages =state.chatMessages.filter(msg=>msg.text!=="Thinking...")
            //添加新记录
            state.chatMessages=[...filteredMessages,{role,text,isError}]
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