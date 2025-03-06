import { useSelector } from "react-redux"
import { setShowChatbot } from "../store/modules/button"
import { useDispatch } from "react-redux"
const ChatbotToogler =()=>{
    const showChatbot=useSelector(state=>state.btn.showChatbot)
    const dispatch =useDispatch()
    return(
  <button  id="chatbot-toogler" onClick={()=>dispatch(setShowChatbot(!showChatbot))}>
        <span className="material-symbols-outlined">mode_comment</span>
        <span className="material-symbols-outlined">close</span>
      </button>
    )

}

export default ChatbotToogler