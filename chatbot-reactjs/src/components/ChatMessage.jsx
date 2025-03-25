import React,{forwardRef}from 'react'
import ChatbotIcon from './ChatbotIcon'
import Markdown from 'react-markdown'

const ChatMessage =({ chat }, ref) => {
  return (
    <div ref={ref} className={`message ${chat.role==="model"?"bot":"user"}-message  ${chat.isError?"error":""}`}>
        {chat.role==='model'&&<ChatbotIcon/>}
        {chat.text==='Thinking...'?<span className="material-symbols-outlined search">
          search
</span>:
    <p className="message-text">{chat.text}</p>
        }
  </div>
  )
}

export default ChatMessage