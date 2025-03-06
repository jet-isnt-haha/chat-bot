//发送按钮状态管理

import { createSlice } from "@reduxjs/toolkit";


const btnStore=createSlice({
    name:"btn",
    initialState:{
        pause:false,
        showChatbot:false,
        showSideBar:false
    },
    reducers:{
    setPause(state,action){
        state.pause=action.payload
    } ,
    setShowChatbot(state,action){
        state.showChatbot=action.payload
    },
    setShowSideBar(state,action){
        state.showSideBar=action.payload
    }
    }
})

const {setPause,setShowChatbot,setShowSideBar}=btnStore.actions

const btnReducer =btnStore.reducer

export {setPause,setShowChatbot,setShowSideBar}

export default btnReducer