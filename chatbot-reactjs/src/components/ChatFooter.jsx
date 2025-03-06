import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPause } from '../store/modules/button'
import { addChatMessages ,upDateChatMessages} from '../store/modules/message'
import { generateAPI,newMessageAPI,upSertMessageAPI } from '../apis/chatbot'
import { useNavigate } from 'react-router-dom'
import { pathname } from '../utils'

const ChatFooter = () => {

    const navigate= useNavigate()
    const pause = useSelector(state => state.btn.pause)
    const chatMessages=useSelector(state=>state.msg.chatMessages)
    //使用ChatMessagsRef以获取最新的chatMessages
    const chatMessagesRef =useRef(chatMessages)
    const dispatch = useDispatch()
    const inputRef = useRef()
      //使用useRef 来保存controller，因为useRef创建的对象在组件的整个生命周期内保持不变，不会因为组件重新渲染而重置
  const controllerRef = useRef(null);
    useEffect(() => {
        inputRef.current.disabled = !inputRef.current.disabled
        inputRef.current.required = !inputRef.current.required
    }, [pause])

    //获取即时改变的状态
    useEffect(()=>{
        chatMessagesRef.current=chatMessages
    },[chatMessages])

    const upSertMessage = async () => {
        try {

          let _id =pathname().lastRouter
          if (!_id) {
            const res = await newMessageAPI()
            _id = res.data.data
            navigate(`/message/${_id}`)
          }
          for(let i=0;i<chatMessagesRef.current.length;++i){
          const message_index=i
          const message=chatMessagesRef.current[i]
          const { role, text } = message
          const res = await upSertMessageAPI({
            message_index,
            role,
            text,
            _id
          })
        }
        } catch (error) {
  
        }
  
      }
    const handleFormSubmit = (e) => {
        e.preventDefault()
        const userMessage = inputRef.current.value.trim()
        if (!pause) {
            console.log(userMessage)
            if (!userMessage) { return }
            dispatch(setPause(true))
            inputRef.current.value = ""
            dispatch(addChatMessages({role:'user',text:userMessage}))
        }
        //更新用户信息的聊天记录

        //用Thinking...先代替机器人的回复
        setTimeout(async() => {
            dispatch(addChatMessages({role:'model',text:'Thinking...'}))

            const history= chatMessagesRef.current.map(({ role, text }) => ({
                role: role === "model" ? "assistant" : "user",
                content: text
              }));

              const controller = controllerRef.current;
              if(pause){
                if (controller) {
                  controller.abort();
              }
                dispatch(setPause(false))
              }else{
              try {
                controllerRef.current = new AbortController();
            
                const { signal } = controllerRef.current;
                 
                const response =(await generateAPI(history,signal)).data
          
                const apiResponseText=response.data.choices[0].message.content.replace(/\*\*(.*?)\*\*/g,"$1").trim()

                dispatch(upDateChatMessages({role:'model',text:apiResponseText,isError:false}))

                dispatch(setPause(false))
                
              } catch (error) {
                if(error.name==="CanceledError"){

                  dispatch(upDateChatMessages({role:'model',text:'已取消请求',isError:true}))

                }else{
                dispatch(upDateChatMessages({role:'model',text:error.message,isError:true}))

                dispatch(setPause(false))
                }
              }finally{
                upSertMessage()
              }
            }

        }, 600)

    }
    
    return (
        <div className="chat-footer">
            <form action="#" className='chat-form' onSubmit={handleFormSubmit}>
                <input ref={inputRef} type="text" placeholder='message...'
                    className="message-input" disabled />
                <button className={`material-symbols-outlined ${pause ? 'pause' : ''}`}>
                    {pause ? 'crop_square' : 'arrow_upward'}
                </button>
            </form>
        </div>
    )

}


export default ChatFooter