import React, { useEffect, useState } from "react";
import seeMoin from "../css/seeMoin.module.scss";
import { useSelector } from "react-redux";
import { GrClose } from "react-icons/gr";
import { db } from "../database/firebase";
import { query, where, collection, getDocs } from "firebase/firestore";
import { sessionarray } from "../pages/Calender";

import mdl from '../css/modal.module.scss';
import tgl from '../css/tgl-sample.module.scss'

export default function SeeMoinModal({ date }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };


  /// 슬린
  const groupData = JSON.parse(sessionStorage.getItem("group"));
  const group = useSelector(state => state.group.group);
  // 내 캘린더에 저장된 약속 배열 들고오기
  // (그룹에서 날짜로 들고오기 => 이거 내 캘린더에 데이터 저장)
  const appointlist = groupData && groupData.map(g => g.gAppoint);
  // console.log(appointlist)
  let appointArray = [];
  for (let i = 0; appointlist && i < appointlist.length; i++) {
    appointArray.push(...appointlist[i]);
    // console.log(appointArray);
  }
  // console.log(appointArray)
  const array = appointArray;
  // 클릭한 해당 날짜의 약속 리스트 들고오기 (중복이면 첫 값만 일단)
  const clickDay = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`
  // console.log('clickDay', clickDay)
  const appoint = array.find(a => a.time == clickDay);
  // console.log('약속', appoint);
  // console.log('약속날짜', appoint.time);
  // console.log('약속장소', appoint.place);
  // 처음엔 그룹의 전체 약속이 다 불러와짐. 날짜 클릭하면 해당 값만 또 불러와짐.

  // 영환
  const [groupmemberlist, setGroupmemberlist] = useState([]);
  const [groupname, setGroupname] = useState("");
  const [moimname, setMoimname] = useState("");
  const onSearch = async () => {
    //더미데이터의 이름을 직접 접근해서 풀었다
    const q = query(collection(db, "groups"), where("gName", "==", "ㅇㄷㄹ"));
    const querySnapshot = await getDocs(q);
    let array = [];
    querySnapshot.forEach((doc) => {
      //console.log(doc.id,"=>",doc.data().gAppoint)
      array = array.concat(doc.data().member);
      setGroupname(`${doc.data().gName}`);
    });
    setGroupmemberlist(array);
  };
  /* 잠시 보류 : 조건부를 어떻게 잡아야할지 찾는중
    db의 groups 까지 접근하고 난 뒤 배열의 객체에 접근해서 찾아야 한다
  const onSearch2 = async () => {
    const q = query(collection(db, "groups"), where("gName", "==", "ㅇㄷㄹ"));
    const querySnapshot = await getDocs(q);
    let array = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
  };
*/
  useEffect(() => onSearch, []);
  //세션스토리지에서 값들을 받아와서 객체로 만들어주기

  const [groupD, setGroupD] = useState([]);
  useEffect(() => {
    setTimeout(install, 1000);
  }, []);
  const install = () => {
    setGroupD(JSON.parse(sessionStorage.getItem("group")));
  };
  //const groupData = JSON.parse(sessionStorage.getItem('group'));
  //일단 0번째 인덱스에서 각각의 값에 접근 할 때 어떻게 나오는지 확인
  //console.log(groupData[0].gAppoint.map((date)=>date.time))
  //console.log(groupData[0].gAppoint.map((date)=>date.title))
  //console.log(groupData[0].gName)
  //console.log(groupData[0].member.map((date)=>date.fName))
  const [inarray, setInarray] = useState();
  //위에 나온 값들을 하나씩 넣을 때 어떻게 넣어야 하는지 확인
  const addvalue = () => {
    /*
    const unarray=[];
    unarray.push({
      date:groupData[0].gAppoint[1].time,
      title:groupData[0].gAppoint[1].title,
      gName:groupData[0].gName,
      member:groupData[0].member.map((data)=>{return data.fName})
    })
    setInarray(unarray)
    */
    //console.log(groupData)
  };
  //그냥 실행 시 매우 많은 양이 반복되므로 useEffect로 횟수 조절
  useEffect(() => addvalue, [groupD]);


  // 더미 데이터
  const photo = '/img/user_profile_photo.png';


  return (
    <div>
      <div onClick={openModal} className={seeMoin["chat-modal"]}></div>

      {isOpen && (

        <div className={tgl["modal-m"]}>

          <div className={tgl["modal-background"]}></div>

          <div className={`${tgl["modal-content"]} ${mdl["appoint-modal-box"]}`}>

            <div onClick={closeModal} className={tgl["modal-close"]}><GrClose /></div>

            <div className={tgl["modal-container"]}>

              <div className={tgl["content"]}>

                <div className={seeMoin["chat-form"]}>

                  <div className={seeMoin["chat-div"]}>
                    <label>약속명</label>
                    <div className={seeMoin["textline"]}><p>{appoint ? appoint?.title : ''}</p></div>
                  </div>

                  <div className={seeMoin["chat-div"]}>
                    <label>모임명</label>
                    <div className={seeMoin["textline"]}><p>{appoint ? appoint?.gName : ''}</p></div>
                  </div>

                  <div className={seeMoin["chat-div"]}>
                    <label htmlFor="">참석자</label>
                    {
                      appoint ? 
                    <ul className={seeMoin['people']}>
                      <li
                      // 방장 정보
                      >
                        <div className={seeMoin['people-photo-wrap']}>
                          <img src={process.env.PUBLIC_URL + (appoint.gBoss ? appoint.gBoss.photo : photo)} alt="" className={seeMoin['people-photo']} />
                        </div>
                        <p className={seeMoin['member-nick']}>{appoint.gBoss ? appoint.gBoss.nickname : ''}</p>
                      </li>
                      {
                        appoint.member ?
                        (appoint.member).map((user) => (
                          // 멤버 정보
                          <li className={seeMoin["memberlist"]} key={user.fid}>
                            <div className={seeMoin['people-photo-wrap']}>
                              <img src={process.env.PUBLIC_URL + (appoint.member ? user.photo : photo)} alt="" className={seeMoin['people-photo']} />
                            </div>
                            <p className={`${seeMoin['member-nick']}`}>{user.fName}</p>
                          </li>
                        ))
                        : ''
                      }
                    </ul>
                      :''
                    }
                  </div>

                  <div className={seeMoin["chat-div"]}>
                    <label>날짜</label>
                    <div className={seeMoin["textline"]}>
                      <p>{`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`}</p>
                    </div>
                  </div>

                  <div className={seeMoin["chat-div"]}>
                    <label>장소</label>
                    <div className={seeMoin["textline"]}><p>{appoint ? appoint?.place : ''}</p></div>
                  </div>

                </div>

                {/* <div className={seeMoin["kakao"]}>
                  <div className={seeMoin["kakao-div"]}>
                    <a
                      href="https://open.kakao.com/o/giYybEpf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={seeMoin["kakao-div"]}
                    >
                      {" "}
                      <b>약속내용 카카오톡 공유하기</b>
                    </a>
                  </div>
                </div> */}

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}
