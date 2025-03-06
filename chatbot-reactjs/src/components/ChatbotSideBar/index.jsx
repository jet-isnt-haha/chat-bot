import { Collapse, Button } from "antd"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import clsx from "clsx"
import './index.css'
import ChatbotIcon from "../ChatbotIcon"
import { getMsgIdsAPI,getMessageAPI } from "../../apis/chatbot"
import { setShowSideBar } from "../../store/modules/button"
import { setChatMessages,clearChatMessages } from "../../store/modules/message"

const ChatbotSideBar = () => {
    const dispatch = useDispatch()
    const navigate =useNavigate()
    const showSideBar = useSelector(state => state.btn.showSideBar)
    const [msgIds,setMsgIds]=useState([])//设置msgIds状态用于渲染sidebar的最近对话items

    useEffect(()=>{
        //登录后异步获取msgids
       async function getMessageIds(){
            try {
                const res =await getMsgIdsAPI()
                setMsgIds(res.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        getMessageIds()
    },[showSideBar])

// useEffect(()=>{
// console.log(chatMessages)
// },[chatMessages])

    //获取当前对话
    const getCurrMessage=async(msgId)=>{
        try {
            const res= await getMessageAPI(msgId)
        dispatch(setShowSideBar(!showSideBar))
         const currMessages=res.data.data.messages.map(item=>({role:item.role,text:item.message}))
         dispatch(clearChatMessages())

         dispatch(setChatMessages(currMessages))
        } catch (error) {
            console.log(error)
        }finally{
            navigate(`/message/${msgId}`)
        }
    }


    //创建新对话，将侧边栏收起将用户url重置为根url
    const createNewMessage=()=>{
        navigate('/');
        dispatch(setShowSideBar(!showSideBar))
        dispatch(clearChatMessages())
    }
    return (
        <div className={clsx("sidebar-container", !showSideBar && 'collapse')}>
            <div className="side-header">
                <ChatbotIcon />
                <h2 className="logo-text">
                    chatbot
                </h2>
                <button className={clsx("material-symbols-outlined ")} onClick={() => { dispatch(setShowSideBar(!showSideBar)) }}>
                    side_navigation
                </button>
            </div>
            <div className="side-body">
                <Button onClick={createNewMessage}>
                    +   新对话
                </Button>
                <Collapse
                    items={[{
                        key: '1',
                        label: '最近对话',
                        children: (
                            <div className="dialog-items flex flex-col">
                                {msgIds.map((msgId,index)=>(<Button
                                    key={msgId}
                                   style={{
                                    // 定义正常状态下的字体颜色
                                    color: 'rgb(134, 132, 132)', 
                                    // 覆盖悬浮状态下的样式
                                    '&:hover': {
                                        color: 'rgb(134, 132, 132)' 
                                    },
                                    '&:focus': {
                                        outline: 'none',
                                        boxShadow: 'none'
                                    }
                                }}
                                onClick={()=>getCurrMessage(msgId)}
                                >{'对话'+index}</Button>))}
                            </div>
                        )
                    }]}
                    className="recent-message"
                />
            </div>
            <div className="side-footer">
                this is footer
            </div>
        </div>
    )
}


export default ChatbotSideBar