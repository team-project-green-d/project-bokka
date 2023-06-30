import { configureStore } from '@reduxjs/toolkit';

import userSlice from './slice/userSlice';
import calendarSlice from './slice/calendarSlice';
import friendSlice from './slice/friendSlice';
import groupSlice from './slice/groupSlice';
import appointmentSlice from './slice/appointmentSlice';
import markSlice from './slice/markSlice';
import listArraySlice from './slice/listArrayslice';

export default configureStore({
    reducer : {
        user : userSlice,
        calendar:calendarSlice,
        friend : friendSlice,
        group : groupSlice,
        appointment : appointmentSlice,
        userMark : markSlice,
        listArray : listArraySlice
    },

})