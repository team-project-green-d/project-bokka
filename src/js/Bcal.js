import CalenderModal from "../components/CalenderModal";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
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

  let [daysB, setDaysB] = useState([
    new Date("2023-06-20"),
    new Date("2023-05-28"),
    new Date("2023-06-04"),
    new Date("2023-06-16"),
    new Date("2023-05-29"),
    new Date("2023-06-05"),
    new Date("2023-06-14"),
    new Date("2023-05-30"),
    new Date("2023-06-07"),
    new Date("2023-06-13"),
    new Date("2023-06-22"),
    new Date("2023-05-31"),
    new Date("2023-06-06"),
    new Date("2023-06-20"),
    new Date("2023-06-02"),
    new Date("2023-06-12"),
    new Date("2023-06-10"),
    new Date("2023-06-24"),
    new Date("2023-06-28"),
    new Date("2023-06-21"),
    new Date("2023-06-27"),
    new Date("2023-06-11"),
    new Date("2023-06-26"),
    new Date("2023-06-29"),
    new Date("2023-06-19"),
    new Date("2023-06-23"),
  ]);

  const [isSpecialDay, setIsSpecialDay] = useState(false);

  const days = daysA.concat(daysB);

  const dayArrayA = [];

  for (let i = 0; i < daysA.length; i++) {
    let bool =
      daysA[i].getDate() === props.value.getDate() &&
      daysA[i].getMonth() === props.value.getMonth() &&
      daysA[i].getFullYear() === props.value.getFullYear();
    dayArrayA.push(bool);
  }
  const sumA = dayArrayA.reduce((previous, current) => previous || current);

  const dayArrayB = [];
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
        `해당 날짜를 약속 ${sumB ? "없는" : "있는"} 날로 변경하시겠습니까?`
      )
    ) {
      setIsSpecialDay(!sumB);
      alert(`약속 ${sumB ? "없는" : "있는"} 날로 수정되었습니다.`);
      if (!sumB) {
        let addarray = [];
        addarray = daysB.concat(props.value);
        setDaysB(addarray);
      } else {
        let deletearray = [];
        deletearray = daysB.filter(
          (e) =>
            e.getFullYear() !== props.value.getFullYear() ||
            e.getMonth() !== props.value.getMonth() ||
            e.getDate() !== props.value.getDate()
        );
        setDaysB(deletearray);
      }
    } else {
      alert("취소되었습니다.");
    }
  };
  /*useEffect(() => {
    console.log(daysB);
  }, [daysB]);
  */
  return sumA ? (
    <div className={`rbc-day-bg special-day`}></div>
  ) : (
    <div
      className={`rbc-day-bg ${sumB ? "fakespecial-day" : ""}`}
      onClick={clickCal}
    ></div>
  );
}
