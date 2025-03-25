import { Button, message, Modal } from "antd"
import { useEffect, useState } from "react";
import { delMessageAPI } from "../../../../apis/chatbot";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setShowSideBar } from "../../../../store/modules/button";
import { clearChatMessages } from "../../../../store/modules/message";
const DeleteMessage = (props) => {
    const {msgId,setShow}=props
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState
    (false);
    const [modalText, setModalText] = useState('删除后，聊天记录将不可恢复');
    const navigate =useNavigate()
    const showSideBar = useSelector(state => state.btn.showSideBar)
    const dispatch =useDispatch()
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setModalText('删除中...');
        setConfirmLoading(true);
        setTimeout(async() => {
            try {
                const res=  await delMessageAPI(msgId)
                if(res.data.code==='0000'){
                    message.success(res.data.msg)
                   dispatch(setShowSideBar(!showSideBar))
                   dispatch(clearChatMessages())
                }
            } catch (error) {
                console.log(error)
            }
 
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    useEffect(()=>{
setShow(-1)
    },[open])
    return (
        <div className="delete">
            <span class="material-symbols-outlined">
                delete
            </span>
            <Button danger
                onClick={showModal}
                style={{
                    outline: 'none',
                    boxShadow: 'none'
                }}
            >
                删除
            </Button>
            <Modal
                title="确定删除对话？"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                okText="确认"
                cancelText="取消"
                okButtonProps={{
                   danger: true,
                  }}
            >
                <p>{modalText}</p>
            </Modal>
        </div>
    )
}

export default DeleteMessage