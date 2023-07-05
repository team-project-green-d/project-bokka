import { createSlice } from "@reduxjs/toolkit";

export const friendSlice = createSlice({
    name : 'friend',
    initialState : {
        friend : []
    },
    reducers : {
        // 친구 리스트 불러오기 + 업데이트
        getfriendList : (state, action) => {
            state.friend = action.payload;
            sessionStorage.setItem('friend', JSON.stringify(action.payload));
        },
        // 친구 리스트 추가
        addfriendList : (state, action) => {
            state.friend.push(action.payload);
            sessionStorage.setItem('friend', JSON.stringify(state.friend));
        },
        // 친구 리스트 삭제
        deletefriendList : (state, action) => {
            state.friend.splice(action.payload, 1);
            sessionStorage.setItem('friend', JSON.stringify(state.friend));
        },
    }
})

export const { getfriendList, addfriendList, deletefriendList, noSessionfriendList } = friendSlice.actions

export default friendSlice.reducer