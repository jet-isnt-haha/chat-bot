//创建路由规则
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ChatbotSideBar from "../components/ChatbotSideBar";
const router =createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                path:'/message/:id',
                element:<div></div>
            }
        ]
    },
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/register',
        element:<Register/>

    },
    {
        path:'/side',
        element:<ChatbotSideBar/>
    }
])

export default router