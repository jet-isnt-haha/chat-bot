import { useEffect, useRef } from "react"
import {  useSelector } from "react-redux"
import ChatbotIcon from "./ChatbotIcon"
import ChatMessage from "./ChatMessage"


const ChatBody = () => {
  const chatMessages = useSelector(state => state.msg.chatMessages)
  const chatBodyRef = useRef()
  //定义useRef钩子其在整个生命周期内不会改变
  const isFirstRender = useRef(true)


  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return
    }
    chatBodyRef.current.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behavior: 'smooth',
    })

  }, [chatMessages])

  return (
    <div ref={chatBodyRef} className="chat-body">
      <div className="message bot-message">
        <ChatbotIcon />
        <p className="message-text">Hey,how can i help u</p>
      </div>

      {/*  动态渲染聊天记录 */}
      {chatMessages.map((chat, index) => (
        <ChatMessage chat={chat} key={index} />
      ))}
    </div>
  )
}

export default ChatBody