import FCalenderAppointModal from "../components/FCalenderAppointModal";
export default function customdatecelwrapper(props) {
  //친구달력을 볼 때 들고와야하는 배열 형식 : 배열에 배열이 있다면 Moindateclwrapper.js를 참고
  const days = [
    new Date("2023-07-23"),
    new Date("2023-06-18"),
    new Date("2023-06-20"),
    new Date("2023-05-23"),
    new Date("2023-08-01"),
    new Date("2023-04-23"),
    new Date("2023-07-11"),
    new Date("2023-06-05"),
    new Date("2023-07-01"),
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
  //친구달력을 보는 창이므로 true이면 이미 약속이 잡혔으니 동작이 없고
  //false이면 친구와 약속을 잡을 수 있도록 설정
  return sum ? (
    <div
      className="rbc-day-bg special-day"
      onClick={() => alert("이미 약속이 잡혀있는 날짜입니다")}
    >
    </div>
  ) : (
    <div className="rbc-day-bg">
      {/* <FCalenderAppointModal date={`${props.value.getFullYear()}-${("0" + (props.value.getMonth() + 1)).slice(-2)
        }-${("0" + props.value.getDate()).slice(-2)}`} /> */}
      <FCalenderAppointModal date={props.value} />
    </div>
  );
}
