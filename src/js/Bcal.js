import CalenderModal from "../components/CalenderModal";
import { useSelector } from "react-redux";
import { useState } from "react";
import ddd from "../css/ddd.module.scss";

export default function Customdatecelwrapper(props) {
  const daysA = [
    new Date("2023-07-25"),
    new Date("2023-06-25"),
    new Date("2023-06-17"),
    new Date("2023-06-01"),
    new Date("2023-07-01"),
    new Date("2023-05-21"),
    new Date("2023-07-05"),
    new Date("2023-06-08"),
    new Date("2023-08-05"),
  ];

  const daysB = daysA.concat([
    new Date("2023-06-20"),
  ]);

  const [isSpecialDay, setIsSpecialDay] = useState(false);

  const days = daysB;

  const dayArrayA = [];

  for (let i = 0; i < daysA.length; i++) {
    let bool =
      daysA[i].getDate() === props.value.getDate() &&
      daysA[i].getMonth() === props.value.getMonth() &&
      daysA[i].getFullYear() === props.value.getFullYear();
    dayArrayA.push(bool);
  }
  const sumA = dayArrayA.reduce((previous, current) => previous || current);

  const dayArrayB=[];
  for (let i = 0; i < daysB.length; i++) {
    let bool =
      daysB[i].getDate() === props.value.getDate() &&
      daysB[i].getMonth() === props.value.getMonth() &&
      daysB[i].getFullYear() === props.value.getFullYear();
    dayArrayB.push(bool);
  }
  const sumB = dayArrayB.reduce((previous, current) => previous || current);


  const clickCal = () => {
    if (
      window.confirm(
        `해당 날짜를 약속 ${
          isSpecialDay ? "없는" : "있는"
        } 날로 변경하시겠습니까?`
      )
    ) {
      setIsSpecialDay(!isSpecialDay);
      alert(`약속 ${isSpecialDay ? "없는" : "있는"} 날로 수정되었습니다.`);
    } else {
      alert("취소되었습니다.");
    }
  };

  return sumA ? (
    <div className={`rbc-day-bg special-day`}></div>
  ) : (
    <div
      className={`rbc-day-bg ${isSpecialDay||sumB===true ? "fakespecial-day" : ""}`}
      onClick={clickCal}
    ></div>
  );
}
