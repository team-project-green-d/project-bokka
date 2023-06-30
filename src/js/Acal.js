import CalenderModal from "../components/CalenderModal";
import { useSelector } from "react-redux";
import SeeMoinModal from "../components/SeeMoinModal";
export default function Customdatecelwrapper(props) {
  const days = [
    new Date("2023-07-25"),
    new Date("2023-06-25"),
    new Date("2023-06-17"),
    new Date("2023-06-01"),
    new Date("2023-07-01"),
    new Date("2023-05-21"),
    new Date("2023-07-05"),
    new Date("2023-06-08"),
    new Date("2023-08-05")
  ];
  //달력 중 해달 날짜값이 있다면 true, 없다면 false로 만들 배열
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
  const sum = dayArray.reduce((previous, current) => previous || current);
  //최종 해당일에 약속이 있는지 없는지 확인할 수 있도록 콘솔에 출력
  //console.log(sum);
  //메인페이지,마이페이지 달력표시이므로 true이면 모임 페이지 상세 표시
  //false는 아무런 행동이 없어야 한다
  return sum ? (
    <div className="rbc-day-bg special-day">
      <SeeMoinModal date={props.value}/>
    </div>
  ) : (
    <div className="rbc-day-bg"></div>
  );
}
