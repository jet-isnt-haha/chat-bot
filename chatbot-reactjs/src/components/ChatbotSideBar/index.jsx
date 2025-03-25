import { useEffect, useReducer, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import clsx from "clsx"
import './index.css'
import ChatbotIcon from "../ChatbotIcon"
import { getMsgIdsAPI } from "../../apis/chatbot"
import { setShowSideBar } from "../../store/modules/button"
import SidebarBody from "./components/SidebarBody"

const ChatbotSideBar = () => {
    const dispatch = useDispatch()
    // const navigate =useNavigate()
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
            getMessageIds();

    },[showSideBar])
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
            {/* 侧边栏body */}
            <SidebarBody msgIds={msgIds}/>
            <div className="side-footer">
                this is footer
            </div>
        </div>
    )
}


export default ChatbotSideBar