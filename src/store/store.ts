import {configureStore} from "@reduxjs/toolkit";
import usersSlice from "./slice/usersSlice";


export const store = configureStore({
    reducer: {
        user: usersSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppStore = typeof store
export type AppDispatch = AppStore['dispatch']