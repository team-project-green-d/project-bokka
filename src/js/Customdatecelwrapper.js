import { Link } from "react-router-dom";
import CalenderModal from "../components/CalenderModal";
import SeeMoinModal from "../components/SeeMoinModal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { sessionarray } from "../pages/Calender";
import NoneScheduleModal from "../components/NoneScheduleModal";

import mdl from "../css/modal.module.scss";

export default function Customdatecelwrapper(props) {
  const nowdate = useSelector((state) => state.calendar.nowdate);
  // console.log(`커스텀값 : ${nowdate}`)
  const seeAcal = useSelector((state) => state.user.seeAcal);
  // console.log(seeAcal)
  const bDateData = JSON.parse(sessionStorage.getItem("bDate"));
  const dispatch = useDispatch();
  const daysA = [
    // new Date("2023-07-25"),
    // new Date("2023-06-25"),
    // new Date("2023-06-17"),
    // new Date("2023-06-01"),
    // new Date("2023-07-01"),
    // new Date("2023-05-21"),
    // new Date("2023-07-05"),
    // new Date("2023-06-08"),
    // new Date("2023-08-05"),
  ];
  //B캘린더는 A캘린더보다 색칠되는 값이 많아야 하므로 더미데이터를 추가해놓음
  const getbday = bDateData && bDateData.map((data) => new Date(data));
  const daysB = daysA.concat(getbday);
  //Home에서 dispatch로 seeAcal(bool값)을 변경해주고 true이면 daysA 배열로, false면 daysB 배열로 변경되도록 설정함
  const dayconcat = seeAcal ? daysA : daysB;
  //달력 중 해달 날짜값이 있다면 true, 없다면 false로 만들 배열
  const groupData = JSON.parse(sessionStorage.getItem("group"));
  const group = useSelector((state) => state.group.group);

  // const [groupData,setGroupData]=useState([]);
  // useEffect(()=>{
  //   setTimeout(install,1000)
  // } ,[])
  // const install=()=>{
  //   setGroupData(JSON.parse(sessionStorage.getItem('group')))
  //   //console.log(groupData)
  //   //캘린더 횟수만큼 반복하기 때문에 최적화 필요
  // }

  // useEffect(() => arrayfunction(), [group])

  // const [sum, setSum] = useState([]);

  // const arrayfunction = () => {

  //const groupData = JSON.parse(sessionStorage.getItem('group'));
  //console.log(groupData)

  const finalget = [];
  const getappoint = groupData && groupData.map((data) => data.gAppoint);
  // console.log(getappoint)
  getappoint && getappoint.forEach((date) => finalget.push(...date));
  // console.log(finalget)
  const ffnalget = finalget.map((date) => new Date(date.time));
  // console.log(ffnalget)
  const days = dayconcat.concat(ffnalget);
  // console.log(days)

  const dayArray = [];
  //페이지 위치에 따라 선택할 배열(group 페이지이면 group 배열), 친구의 것을 볼려고 하는 것이 페이지 위치 조건이 아니라면 다르게 해야 할 것 같음
  {
    for (let i = 0; i < days.length; i++) {
      let bool =
        days[i].getDate() === props.value.getDate() &&
        days[i].getMonth() === props.value.getMonth() &&
        days[i].getFullYear() === props.value.getFullYear();
      dayArray.push(bool);
    }
  }
  //이 dayarray는 [[],[]] 처럼 달력일수만큼 배열이 인덱스로 들어가는 배열만큼 생긴다(한 인덱스당 30or60개의 배열)
  //console.log(dayArray.map((bool) => bool));
  //최상단 배열의 인덱스마다 접근을 해서 true가 하나라도 있으면 true가 되도록 배열들을 다 합친다
  // setSum(dayArray.reduce((previous, current) => previous || current));
  // const sum = dayArray.reduce((previous, current) => previous || current);
  //최종 해당일에 약속이 있는지 없는지 확인할 수 있도록 콘솔에 출력
  //console.log(sum);
  //메인페이지,마이페이지 달력표시이므로 true이면 모임 페이지 상세 표시
  //false는 아무런 행동이 없어야 한다
  // }

  // console.log(sum)
  // console.log(props.value)
  let sum = [];
  if (dayArray && dayArray.length > 0) {
    sum = dayArray.reduce((previous, current) => previous || current);
  }


  return sum === true ? (
    // 약속 있는 날
    <div className="rbc-day-bg special-day">
      <SeeMoinModal date={props.value} />
    </div>
  ) : (
    // 약속 없는 날
    <div className="rbc-day-bg"
      // onClick={() => alert("친구들의 스케줄을 확인하고 약속을 신청해 보세요!")}
    >
      <div className={mdl["none-schedule-parent"]}>
          <NoneScheduleModal />
      </div>
    </div>
  );
}
