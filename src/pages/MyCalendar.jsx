import React, {useMemo } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../css/calendar.scss";
import Toolbar from "../js/Toolbar";
import CustomDateHeader from "../js/DateHeader";
import Acal from '../js/Acal'
import Bcal from '../js/Bcal'
//마이페이지 캘린더이다. Customdatecelwrapper.js에서 날짜값을 받아와서 계산함. 추가로 choosecal로 A캘린더/B캘린더 표시를 정해준다
export default function Main({nextmonth,choosecal}) {
  // console.log("choosecal",choosecal)
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
        style={{ height: 370 }}
        components={{
          toolbar: Toolbar,
          month: {
            dateHeader: CustomDateHeader,
          },
          dateCellWrapper: choosecal?Acal:Bcal,
        }}
      />
  );
}
