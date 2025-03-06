
import { useDispatch, useSelector } from 'react-redux';
import { setShowChatbot,setShowSideBar } from '../store/modules/button';
import clsx from 'clsx';

const ChatHeader = () => {

    const showSideBar =useSelector(state=>state.btn.showSideBar)
    const showChatbot = useSelector(state => state.btn.showChatbot)
    const dispatch = useDispatch()

    return (
        <div className="chat-header">
            <div className="chat-info">
                <button class={clsx("material-symbols-outlined ")} onClick={()=>{dispatch(setShowSideBar(!showSideBar))}}>
                    side_navigation
                </button>

            </div>
            <button className="material-symbols-outlined" onClick={() => dispatch(setShowChatbot(!showChatbot))}>
                keyboard_arrow_down
            </button>
        </div>
    )
}

export default ChatHeader