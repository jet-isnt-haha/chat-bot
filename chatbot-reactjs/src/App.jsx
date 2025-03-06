
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { checkTokenAPI } from './apis/user';
import { message } from 'antd';
import { Outlet } from 'react-router-dom';
import ChatLogout from './components/ChatLogout';
import ChatHeader from './components/ChatHeader';
import ChatBody from './components/ChatBody';
import ChatFooter from './components/ChatFooter';
import ChatbotToogler from './components/ChatbotToogler';
import ChatbotSideBar from './components/ChatbotSideBar';

export default function App() {

 const showChatbot=useSelector(state=>state.btn.showChatbot)
  //渲染页面时（重新加载页面）时验证token
  useEffect(()=>{
    async function checkToken(){
    try {
      const res= await checkTokenAPI()
      if(res.data.code==='0000'){
        console.log(res.data.msg)
        message.success('欢迎您'+res.data.data.username)
      }
    } catch (error) {
      if(error.response){
        message.error(error.response.data.msg)
      }
    }
  }
  checkToken()

  },[])



  return (
    <div className={`container ${showChatbot&&'show-chatbot'}`}>
      <ChatLogout/>
      <ChatbotToogler/>
      <div className="chatbot-popup">
        {/* chatbot SideBar */}
        <ChatbotSideBar/>
        {/* chatbot Header */}
       <ChatHeader/>
        {/* chatbot Body */}
        <ChatBody >
          <Outlet/>
        </ChatBody>
        {/* chatbot Footer */}
        <ChatFooter />
      </div>
    </div>
  )
}
