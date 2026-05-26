import { createSlice } from "@reduxjs/toolkit";

/*
Userdata structure : 
const userData = state.user.userData 
=> 
    {
        id : "user id from database" | STRING ,
        name : "user name from database" | STRING ,
        email : "user email from database" | STRING ,
        credit : "user credits from database" | NUMBER ,
        isCreditAvailable : "user credit availability from database" | BOOLEAN ,
        notes : "user notes array from database" | ARRAY OF NOTE IDS
    }
*/

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload
        },
        updateUserCredit: (state, action) => {
            if (state.userData)
                state.userData.credit = action.payload;
        }
    }
})

export const { setUserData , updateUserCredit } = userSlice.actions
export default userSlice.reducer