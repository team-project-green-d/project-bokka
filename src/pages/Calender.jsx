import React, {useMemo } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../css/calendar.scss";
import Toolbar from "../js/Toolbar";
import CustomDateHeader from "../js/DateHeader";
import Customdatecelwrapper from "../js/Customdatecelwrapper";
//메인페에지 캘린더이다. Customdatecelwrapper.js에서 날짜값을 받아와서 계산함
export const sessionarray=()=>{
  return JSON.parse(sessionStorage.getItem('group'))
}
export default function Main({nextmonth}) {
  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);
  //초기에 보여줄 캘린더 창
  const defaultDate = useMemo(() => nextmonth,[nextmonth]);
  // console.log(`받아오는값:${defaultDate}`)
  return (
      <Calendar
        date={nextmonth}
        defaultDate={defaultDate}
        localizer={localizer}
        style={{ height: 310 }}
        components={{
          toolbar: Toolbar,
          month: {
            dateHeader: CustomDateHeader,
          },
          dateCellWrapper: Customdatecelwrapper,
        }}
      />
  );
}
