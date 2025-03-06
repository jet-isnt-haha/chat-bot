import { http } from "../utils"


export function registerAPI(data){
    return http({
        url:'/register',
        method:'POST',
        data
    })
}

export function loginAPI(data){
    return http({
        url:'/login',
        method:'POST',
        data
    })
}

export function getByIdAPI(id){
    return http({
        url:`/user/${id}`,
        method:'GET'
    })
}

export function logoutAPI(){
    return http({
        url:'/logout',
        method:'POST'
    })
}

export function checkTokenAPI(){
    return http({
        url:'/check',
        method:'GET'
    })
}