import React, {useEffect, useMemo } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../css/calendar.scss";
import Toolbar from "../js/Toolbar";
import CustomDateHeader from "../js/DateHeader";
import Moimdatecelwrapper from "../js/Moimdatecelwrapper"

//모임에 나타낼 달력이며, Moimdatecelwrapper에서 날짜값을 받아와서 작업함
export default function Main({nextmonth}) {
  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);
  //초기에 보여줄 캘린더 창
  const defaultDate = useMemo(() => nextmonth,[nextmonth]);
  console.log(`받아오는값:${defaultDate}`)

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
          dateCellWrapper: Moimdatecelwrapper,
        }}
      />
  );
}
