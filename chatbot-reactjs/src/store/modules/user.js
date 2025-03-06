import { createSlice } from "@reduxjs/toolkit";

import { registerAPI,loginAPI, getByIdAPI,logoutAPI } from "../../apis/user";
import { getToken,setToken as _setToken, removeToken } from "../../utils";
const userStore=createSlice({
    name:"user",
    initialState:{
        userInfo:{},
        token:getToken()||'',
    },
    reducers:{
        setUserInfo(state,action){
            state.userInfo=action.payload
        },
        setToken(state,action){
            state.token =action.payload
            _setToken(state.token)
        },
        clearUserInfo(state){
            state.token=''
            state.userInfo={}
            removeToken()
        },

    }
})

const{setUserInfo,setToken,clearUserInfo} =userStore.actions

const userReducer=userStore.reducer

const fetchRegister=(registerForm)=>{
    return async()=>{
        try{
            const res = await registerAPI(registerForm)
            if(res.data.code==='0000'){
                return { 
                    isReg:true,
                    msg:res.data.msg
                }
            }
            }catch(error){
                if (error.response) {
                    return {
                        isLogin: false,
                        msg: error.response.data.msg || '请求出错，请稍后重试'
                    };
                }
                return {
                    isLogin: false,
                    msg: '网络错误，请检查网络连接'
                };
            }
    }
}

const fetchLogin=(loginForm)=>{
    return async(dispatch)=>{
        try {
            const res =await loginAPI(loginForm)
            if(res.data.code==='0000'){
                dispatch(setToken(res.data.data.token))
                dispatch(setUserInfo(res.data.data.user))
                return {
                    isLogin:true,
                    msg:res.data.msg
                }
            }
            return {
                isLogin: false,
                msg: res.data.msg
            };
        } catch (error) {
            if (error.response) {
                return {
                    isLogin: false,
                    msg: error.response.data.msg || '请求出错，请稍后重试'
                };
            }
            return {
                isLogin: false,
                msg: '网络错误，请检查网络连接'
            };
        }
    }
}

const fetchUserInfo=(id)=>{
    return async(dispatch)=>{
        const res =await getByIdAPI(id);
        dispatch(setUserInfo(res.data.data))
    }
}

const logOutUserInfo=()=>{
    return async(dispatch)=>{
        try{
        const res =await logoutAPI();
        dispatch(clearUserInfo())
        removeToken()
        return{
            isLogout:true,
            msg:res.data.msg
        }
        }catch(error){
            if(erorr.response){
                return{
                    isLogout:false,
                    msg:error.response.data.msg
                }
            }
            return{
                isLogout:false,
                msg:'网络错误，请检查网络连接'
            }
        }
    }
}

export {fetchRegister,fetchLogin,setToken,logOutUserInfo}

export default userReducer