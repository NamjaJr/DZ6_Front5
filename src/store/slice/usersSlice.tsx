import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {User} from "../types/userTypes.ts";


const name: string = 'usersSlice'

type State = {
    users: User[]
    loading: boolean
    error: string
}

const initialState: State = {
    users: [
        {
            name: 'name',
            username: 'userName'
        },
        {
            name: 'name 2',
            username: 'userName2'
        }
    ],
    loading: false,
    error: ''
}


export const asyncGetUsers = createAsyncThunk(
    `${name}/asyncGetUsers`, async () => {
        const response = await axios.get<User[]>(`https://jsonplaceholder.typicode.com/users`)
        return response.data
    }
)


const usersSlice = createSlice({
    name,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(asyncGetUsers.pending, (state, action) => {
                state.loading = true
            })
            .addCase(asyncGetUsers.fulfilled, (state, action) => {
                state.loading = false
                state.users = action.payload
            })
            .addCase(asyncGetUsers.rejected, (state, action) => {
                state.loading = false
                console.log('acitons', action.error.message)
                state.error = action.error.message
            })
    }
})

export const {} = usersSlice.actions
export default usersSlice.reducer