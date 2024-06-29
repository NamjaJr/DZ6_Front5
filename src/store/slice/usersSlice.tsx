import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {User} from "./userTypes";


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
            username: 'surname'
        },
        {
            name: 'name 2',
            username: 'surname 2'
        }
    ],
    loading: false,
    error: ''
}


export const asyncGetUsers = createAsyncThunk(
    `${name}/asyncGetUsers`, async () => {
        const response = await axios.get<User[]>(`https://jsonplaceholder.typicode.com/users?_limit=3`)
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
                console.log('aciton', action.error.message)
                state.error = action.error.message
            })
    }
})

export const {} = usersSlice.actions
export default usersSlice.reducer