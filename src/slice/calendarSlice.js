import { createSlice } from "@reduxjs/toolkit";
const now=new Date();
export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    //현재 달력 값
    nowdate: new Date(),
    //다음달 달력 값
    nextdate: new Date(now.setMonth(now.getMonth()+1)),
    //B캘린더 가짜 일정 값
    bDate: [],
  },
  reducers: {
    //2달 다음으로 넘기는 reducer : 달력 2개인 구간
    next2month: (state) => {
      state.nowdate = new Date(
        state.nowdate.setMonth(state.nowdate.getMonth() + 2)
      );
      state.nextdate = new Date(
        state.nextdate.setMonth(state.nextdate.getMonth() + 2)
      );
    },
    //1달 다음으로 넘기는 reducer : 달력 1개 구간
    next1month: (state) => {
      state.nowdate = new Date(
        state.nowdate.setMonth(state.nowdate.getMonth() + 1)
      );
      state.nextdate = new Date(
        state.nextdate.setMonth(state.nextdate.getMonth() + 1)
      );
    },
    //1달 이전으로 넘기는 reducer : 달력 1개 구간
    prev1month: (state) => {
      state.nowdate = new Date(
        state.nowdate.setMonth(state.nowdate.getMonth() - 1)
      );
      state.nextdate = new Date(
        state.nextdate.setMonth(state.nextdate.getMonth() - 1)
      );
    },
    //2달 이전으로 넘기는 reducer : 달력 2개인 구간
    prev2month: (state) => {
      state.nowdate = new Date(
        state.nowdate.setMonth(state.nowdate.getMonth() - 2)
      );
      state.nextdate = new Date(
        state.nextdate.setMonth(state.nextdate.getMonth() - 2)
      );
    },
    // B캘린더 가짜 약속 추가 + 업데이트
    bDateUpdate: (state, action) => {
      state.bDate = action.payload;
      sessionStorage.setItem('bDate', JSON.stringify(action.payload));
    },
    // B캘린더 가짜 약속 삭제
    bDateDelete: (state, action) => {
      state.bDate.slice(action.payload, 1);
      sessionStorage.setItem('bDate', JSON.stringify(state.bDate));
    }
  },
});
export const { next2month, prev2month, next1month, prev1month, bDateUpdate, bDateDelete } =
  calendarSlice.actions;
export default calendarSlice.reducer;
