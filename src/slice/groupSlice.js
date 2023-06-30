import { createSlice } from "@reduxjs/toolkit";

export const groupSlice = createSlice({
    name : 'group',
    initialState : {
        group : []
    },
    reducers : {
        // 그룹 리스트 불러오기
        getgroupList : (state, action) => {
            state.group = action.payload;
            sessionStorage.setItem('group', JSON.stringify(action.payload));
        },
        // 그룹 리스트 추가
        addgroupList : (state, action) => {
            state.group.push(action.payload);
            sessionStorage.setItem('group', JSON.stringify(state.group));
        },
        // 그룹 삭제
        deletegroupList : (state, action) => {
            state.group.splice(action.payload, 1);
            sessionStorage.setItem('group', JSON.stringify(state.group));
        },
        // 그룹 내용 수정
        modifygroupList : (state, action) => {
            state.group = action.payload;
        }
    }
})

export const { getgroupList, addgroupList, deletegroupList, modifygroupList } = groupSlice.actions

export default groupSlice.reducer