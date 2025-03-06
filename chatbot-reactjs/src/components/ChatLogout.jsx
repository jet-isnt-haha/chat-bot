import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logOutUserInfo } from "../store/modules/user"
import { message } from "antd"
const ChatLogout=()=>{
    const navigate =useNavigate()
    const dispatch =useDispatch()
    

    const onClick=async()=>{
        const{isLogout,msg}=await dispatch(logOutUserInfo())
          if(isLogout){
            message.success(msg)
            setTimeout(()=>{
              navigate('/login').then(
                ()=>{
                  window.location.reload()
                }
              )
            },500)
          }else{
            message.error(msg)
            //跳转到ERRORU页面
            //navigate('/error)
          }
        }
    return(
        <button id="chatbot-logout" onClick={onClick}>
        <span className="material-symbols-outlined">logout</span>
        </button>
    )
}

export default ChatLogout