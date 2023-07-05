import { createSlice } from "@reduxjs/toolkit";

export const markSlice = createSlice({
    name : 'listArray',
    initialState : {
        userMark : []
    },
    reducers : {
        // 관심 그룹 갱신
        updateMark : (state, action) => {
            state.userMark = action.payload;
            sessionStorage.setItem('userMark', JSON.stringify(state.userMark));
        }
    }
})

export const { adduserMark, deleteuserMark, updateMark } = markSlice.actions

export default markSlice.reducer