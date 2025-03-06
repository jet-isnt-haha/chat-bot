import { configureStore } from "@reduxjs/toolkit";
import btnReducer from "./modules/button";
import userReducer from "./modules/user";
import msgReducer from "./modules/message";
const store =configureStore({
    reducer:{
        btn:btnReducer,
        user:userReducer,
        msg:msgReducer
    }
})

export default store