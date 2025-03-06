import React,{forwardRef}from 'react'
import ChatbotIcon from './ChatbotIcon'

const ChatMessage =({ chat }, ref) => {
  return (
    <div ref={ref} className={`message ${chat.role==="model"?"bot":"user"}-message  ${chat.isError?"error":""}`}>
        {chat.role==='model'&&<ChatbotIcon/>}
    <p className="message-text">{chat.text}</p>
  </div>
  )
}

export default ChatMessage