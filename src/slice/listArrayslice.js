import { createSlice } from "@reduxjs/toolkit";

export const listArraySlice = createSlice({
    name : 'listArray',
    initialState : {
        // 오름차순 true, 내림차순이면 false
        listArray : {
            groupD: true, // 그룹 리스트 등록순으로 정렬 (초기값)
            groupDup: true, // 그룹 리스트 등록순
            groupNup: true,  // 그룹 리스트 이름순
            friendD: true,
            friendDup: true,
            friendNup: true,
        }
    },
    reducers : {
        // 버튼 갱신
        updateBtn : (state, action) => {
            state.listArray = action.payload;
            sessionStorage.setItem('listArray', JSON.stringify(state.listArray));
        }
    }
})

export const { updateBtn } = listArraySlice.actions

export default listArraySlice.reducer