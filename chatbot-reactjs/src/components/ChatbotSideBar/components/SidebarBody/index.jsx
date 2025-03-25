import { Button, Collapse, Popover, Popconfirm } from "antd"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState,useContext } from "react";
import './index.scss'
import { getMessageAPI } from "../../../../apis/chatbot";
import { setChatMessages, clearChatMessages } from "../../../../store/modules/message";
import { setShowSideBar } from "../../../../store/modules/button";
import DeleteMessage from "./DeleteMessage";


const SidebarBody = (props) => {
    const { msgIds } = props;
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const showSideBar = useSelector(state => state.btn.showSideBar)
    //获取当前对话
    const getCurrMessage = async (msgId) => {
        try {
            const res = await getMessageAPI(msgId)
            dispatch(setShowSideBar(!showSideBar))
            const currMessages = res.data.data.messages.map(item => ({ role: item.role, text: item.message }))
            dispatch(clearChatMessages())

            dispatch(setChatMessages(currMessages))
        } catch (error) {
            console.log(error)
        } finally {
            navigate(`/message/${msgId}`)
        }
    }

    //创建新对话，将侧边栏收起将用户url重置为根url
    const createNewMessage = () => {
        navigate('/');
        dispatch(setShowSideBar(!showSideBar))
        dispatch(clearChatMessages())
    }

    const [show, setShow] = useState(-1);
    const handleOpenChange = (index) => {
        if (show === index) {
            setShow(-1);
        } else {
            setShow(index);
        }
    };

    return (
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
                            {msgIds.map((msgId, index) => (<div key={index} className="dialog-item"><Button
                                key={msgId}
                                style={{
                                    // 定义正常状态下的字体颜色
                                    color: 'rgb(134, 132, 132)',
                                    // 覆盖悬浮状态下的样式
                                    '&:hover': {
                                        color: 'rgb(134, 132, 132)',
                                    },
                                    '&:focus': {
                                        outline: 'none',
                                        boxShadow: 'none'
                                    }
                                }}
                                onClick={() => getCurrMessage(msgId)}
                            >{'对话' + index}</Button>

                                <Popover
                                    placement="bottomRight"
                                    content={
                                        <div>
                                            <DeleteMessage msgId={msgId} setShow={setShow}/>{/* 删除当前对话组件 */}
                                        </div>
                                    }
                                    trigger="click"
                                    open={show === index}
                                    onOpenChange={() => handleOpenChange(index)}
                                    className={`material-symbols-outlined more_horiz ${index}`}
                                >
                                    more_horiz
                                </Popover>

                            </div>))}
                        </div>
                    )
                }]}
                className="recent-message"
            />
        </div>
    )
}

export default SidebarBody