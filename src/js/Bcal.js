import CalenderModal from "../components/CalenderModal";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ddd from "../css/ddd.module.scss";
import { bDateUpdate } from "../slice/calendarSlice";

export default function Customdatecelwrapper(props) {

  const groupData = JSON.parse(sessionStorage.getItem("group"));
  const bDateData = JSON.parse(sessionStorage.getItem("bDate"));
  const bDate = useSelector(state=>state.bDate);
  const dispatch = useDispatch();
  // 세션 스토로지 값에는 해외 기준 날짜로 표기됨 (작동에는 문제 없음)

  let dayconcat = [];
  let finalget = [];
  const getappoint = groupData && groupData.map((data) => data.gAppoint);
  // console.log(getappoint)
  getappoint && getappoint.forEach((date) => finalget.push(...date));
  // console.log(finalget)
  const ffnalget = finalget.map((date) => new Date(date.time));
  // console.log(ffnalget)
  const daysA = dayconcat.concat(ffnalget);
  
  const getbday = bDateData && bDateData.map((data) => new Date(data));
  let [daysB, setDaysB] = useState(getbday);
  // console.log(daysB)

  const [isSpecialDay, setIsSpecialDay] = useState(false);

  // const days = daysA.concat(daysB);

  const dayArrayA = [];

  {
    if (daysA != []) {
      for (let i = 0; i < daysA.length; i++) {
        let bool =
          daysA[i].getDate() === props.value.getDate() &&
          daysA[i].getMonth() === props.value.getMonth() &&
          daysA[i].getFullYear() === props.value.getFullYear();
        dayArrayA.push(bool);
      }
    } else {
      let bool = false;
      dayArrayA.push(bool);
    }
  }
  let sumA = [];
  if (dayArrayA && dayArrayA.length > 0) {
    sumA = dayArrayA.reduce((previous, current) => previous || current);
  }
  const dayArrayB = [];
  // for (let i = 0; i < daysB.length; i++) {
  //   let bool =
  //     daysB[i].getDate() === props.value.getDate() &&
  //     daysB[i].getMonth() === props.value.getMonth() &&
  //     daysB[i].getFullYear() === props.value.getFullYear();
  //   dayArrayB.push(bool);
  // }
  // console.log(dayArrayB)

  for (let i = 0; i < daysB.length; i++) {
    let bool =
    (daysB[i].getDate() === props.value.getDate() &&
    daysB[i].getMonth() === props.value.getMonth() &&
    daysB[i].getFullYear() === props.value.getFullYear()) 
    dayArrayB.push(bool);
  }
  // console.log(dayArrayB)
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
        dispatch(bDateUpdate(addarray));
      } else {
        let deletearray = [];
        deletearray = daysB.filter(
          (e) =>
            e.getFullYear() !== props.value.getFullYear() ||
            e.getMonth() !== props.value.getMonth() ||
            e.getDate() !== props.value.getDate()
        );
        setDaysB(deletearray);
        dispatch(bDateUpdate(deletearray));
      }
    } else {
      alert("취소되었습니다.");
    }
  };
  /*useEffect(() => {
    console.log(daysB);
  }, [daysB]);
  */
  return sumA === true ? (
    <div className={`rbc-day-bg special-day`}></div>
  ) : (
    <div
      className={`rbc-day-bg ${sumB ? "fakespecial-day" : ""}`}
      onClick={clickCal}
    ></div>
  );
}
