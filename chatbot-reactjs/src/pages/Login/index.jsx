import { Input, Form, Button, message } from "antd"
import { useNavigate } from "react-router-dom"
import { fetchLogin } from "../../store/modules/user"
import { useDispatch } from "react-redux"
import './index.css'
const Login = () => {
    const dispatch =useDispatch()
    const navigate =useNavigate()
   const onFinish=async (values)=>{
    console.log(values)
        const {isLogin,msg}=await dispatch(fetchLogin(values))
        if(isLogin){
        message.success(msg)
        setTimeout(() => {
            navigate('/')
        }, 500);
        }else{
            message.error(msg)
        }
    }

   const handleRegister=()=>{
        navigate('/register')
    }

    return (
        <div className="container">
            <div className="login-popup  w-[375px] h-[420px] rounded-[15px] shadow-[0_0_128px_0_rgba(0,0,0,0.1),0_32px_64px_-48px_rgba(0,0,0,0.5)]  flex items-center justify-center bg-gradient-to-b from-[#F4F0FF] to-[#DACDEF]">
                <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                    <div className="login-header mb-8 text-center">
                        <h1 className="text-3xl font-semibold text-gray-700 pb-[45px]">Login</h1>
                    </div>

                    <div className="login-body">
                        <Form
                            onFinish={onFinish}
                            className="space-y-6 flex flex-col items-center"
                            initialValues={{ remember: true }}
                        >
                            <div>
                                <Form.Item
                                    name="email"
                                    rules={[
                                        { required: true, message: '请输入邮箱!' },
                                        { type: 'email', message: '请输入有效的邮箱地址!' },
                                    ]}
                                >
                                    <Input
                                        size="large"
                                        placeholder="请输入电子邮箱"
                                        className="bg-[#f4f7fb] rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-[227.6px]"
                                    />
                                </Form.Item>
                            </div>

                            <div>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: '请输入密码!' }]}
                                >
                                    <Input.Password
                                        size="large"
                                        placeholder="请输入密码"
                                        className="bg-[#f4f7fb] rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </Form.Item>
                            </div>

                            <div className="flex gap-[8px]">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="w-full py-3 bg-[#6D4FC2] text-white font-medium rounded-md hover:!bg-[#593bab] focus:outline-none"
                                >
                                    登录
                                </Button>
                                <Button
                                    onClick={handleRegister}
                                    type="primary"
                                    className="w-full py-3 bg-[#6D4FC2] text-white font-medium rounded-md  hover:!bg-[#593bab] focus:outline-none"
                                >
                                    注册
                                </Button>
                            </div>
                        </Form>
                    </div>

                    <div className="login-footer mt-[20px] text-center">
                        <a href="#" className="text-blue-500 no-underline hover:underline">
                            忘记密码?
                        </a>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login