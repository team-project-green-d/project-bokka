import CalenderModal from "../components/CalenderModal";
import { friendArray } from "../pages/GroupDetail";
import ChatModal from "../components/ChatModal";
import SeeMoinModal from "../components/SeeMoinModal";

export default function customdatecelwrapper(props) {
  // console.log(props);
  //그룹에 속한 인원들의 더미데이터에서 date 값만 들고옴
  const grouparray = friendArray.map((day) => day.date);
  // console.log(grouparray)

  // 해당 페이지 그룹 정보 url에서 들고오기
  let para = document.location.href.split("/group/")[1];
  const gName = decodeURIComponent(para);
  // console.log(decodeURIComponent(para));

  // 해당 그룹에서 추가한 그룹 약속 데이터
  const groupData = JSON.parse(sessionStorage.getItem('group'));
  // 내 그룹 데이터에서 선택 그룹 들고오기
  const appointGroupData = groupData.filter((a) => a.gName === gName);
  // console.log(appointGroupData)
  const appointlist = appointGroupData[0].gAppoint;

  //날짜값들을 합칠 임의 배열 생성
  const groupconcat = [];
  //for문과 ...(스프레드시트연산자)를 이용해 date 값이 배열로 담긴 배열들을 하나로 합치기
  //더미데이터가 많은데 그중에서 grouparray의 값이 있는 것들만 합치게 했다. 없는 값이 올 경우 에러가 발생한다
  for (let i = 0; i < grouparray.length; i++) {
    grouparray[i] && groupconcat.push(...grouparray[i]);
  }
  // console.log('groupconcat', groupconcat)
  //달력 중 해달 날짜값이 있다면 true, 없다면 false로 만들 배열
  const newdatearray = appointlist.map((e) => new Date(e.time))
  const finalarray = groupconcat.concat(newdatearray);
  // console.log('newdate추가',newdatearray);
  const dayArray = [];
  //페이지 위치에 따라 선택할 배열(group 페이지이면 group 배열), 친구의 것을 볼려고 하는 것이 페이지 위치 조건이 아니라면 다르게 해야 할 것 같음
  {
    for (let i = 0; i < finalarray.length; i++) {
      let bool =
        finalarray[i].getDate() === props.value.getDate() &&
        finalarray[i].getMonth() === props.value.getMonth() &&
        finalarray[i].getFullYear() === props.value.getFullYear();
      dayArray.push(bool);
    }
  }
  //모임캘린더에서는 친구의 약속날짜(더미데이터) 와 모임에서 잡은 약속날짜(세션스토리지)를 구분해서 넣는다
  let bool;
  const friendDateArray=[];
  {
    for (let i = 0; i < groupconcat.length; i++) {
      if(      groupconcat[i].getDate() === props.value.getDate() &&
      groupconcat[i].getMonth() === props.value.getMonth() &&
      groupconcat[i].getFullYear() === props.value.getFullYear())
      bool=true;
      else bool=false;
        friendDateArray.push(bool);
    }
  }
  const moinDateArray=[];
  {
    if (newdatearray!=[]) {
      for (let i = 0; i < newdatearray.length; i++) {
        if(newdatearray[i].getDate() === props.value.getDate() &&
        newdatearray[i].getMonth() === props.value.getMonth() &&
        newdatearray[i].getFullYear() === props.value.getFullYear())
        bool=true;
        else bool=false;
        moinDateArray.push(bool);
      }
    }
  }
  const friendDateNum=friendDateArray.reduce((previous,current)=>previous||current);
  let moinDateNum = [];
  if (moinDateArray && moinDateArray.length>0) {
    moinDateNum= moinDateArray.reduce((previous,current)=>previous||current);
    // console.log('그룹약속', moinDateArray)
  } 
  {
    for (let i = 0; i < appointlist.length; i++) {
      let bool =
      appointlist[i] === props.value.getFullYear() - ("0" + (props.value.getMonth() + 1)).slice(-2) - ("0" + props.value.getDate()).slice(-2);
      dayArray.push(bool);
    }
  }
  // console.log(dayArray)

  const printTitle = (day) => {
    // console.log(day)
    // console.log(appointlist.time)
    const showTitle = appointlist.filter((a)=>a.time == day);
    // console.log(showTitle[0] && showTitle[0].title)
    return showTitle[0] && showTitle[0].title;
  }

  //이 dayarray는 [[],[]] 처럼 달력일수만큼 배열이 인덱스로 들어가는 배열만큼 생긴다(한 인덱스당 30or60개의 배열)
  // console.log(dayArray.map((bool) => bool));
  //최상단 배열의 인덱스마다 접근을 해서 true가 하나라도 있으면 true가 되도록 배열들을 다 합친다
  const sum = dayArray.reduce((previous, current) => previous || current);
  //최종 해당일에 약속이 있는지 없는지 확인할 수 있도록 콘솔에 출력
  // console.log('sum', sum);
  //모임캘린더이므로 true이면 약속이 이미 있다는 알림
  //false면 모임의 약속이 생성된다
  /*
  return sum ? (
    <div
      className="rbc-day-bg special-day onMoim"
      onClick={() => alert("이미 약속이 잡혀있는 날짜입니다")}
    >
    </div>
  ) : (
    <div className="rbc-day-bg">
      <CalenderModal date={`${props.value.getFullYear()}-${("0" + (props.value.getMonth() + 1)).slice(-2)
        }-${("0" + props.value.getDate()).slice(-2)}`} />
    </div>
  );
  */
  return friendDateNum||moinDateNum===true ? (
    friendDateNum===true?
    <div
      className="rbc-day-bg special-day "
      onClick={() => alert("이미 약속이 잡혀있는 날짜입니다")}
    >
    </div>
    :
    <div
    className="rbc-day-bg special-day onMoim"
  >
    <SeeMoinModal date={props.value}/>
  </div>
  ) : (
    <div className="rbc-day-bg">
      <ChatModal date={`${props.value.getFullYear()}-${("0" + (props.value.getMonth() + 1)).slice(-2)
        }-${("0" + props.value.getDate()).slice(-2)}`}/>
    </div>
  );
}
