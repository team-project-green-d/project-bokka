import { createSlice } from "@reduxjs/toolkit";

export const appointmentSlice = createSlice({
    name : 'appointment',
    initialState : {
        appointment : []
    },
    reducers : {
        // 내 약속 리스트 불러오기
        getappointmentList : (state, action) => {
            state.appointment = action.payload;
            sessionStorage.setItem('appointment', JSON.stringify(action.payload));
        },
        // 약속 추가
        addappointmentList : (state, action) => {
            state.appointment.push(action.payload);
            sessionStorage.setItem('appointment', JSON.stringify(state.appointment));
        },
        // 약속 삭제
        deleteappointmentList : (state, action) => {
            state.appointment.splice(action.payload, 1);
            sessionStorage.setItem('appointment', JSON.stringify(state.appointment));
        }
    }
})

export const { getappointmentList, addappointmentList, deleteappointmentList } = appointmentSlice.actions

export default appointmentSlice.reducer