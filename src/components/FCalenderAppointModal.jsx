import React,{ useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import friendcalendar from "../css/friendcalendar.module.scss";
import FriendCalender from "../pages/FriendCalender";
import mdl from '../css/modal.module.scss';
import mainStyle from '../css/sass.module.scss'
import mypage from "../css/mypage.module.scss";

import { GrClose } from "react-icons/gr";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";

export default function FriendCalendarModal({ date }) {

  const [nowdayB, setNowdayB] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const friendName = sessionStorage.getItem("friendName")
  const friendPhoto = sessionStorage.getItem("friendPhoto")

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // 버튼 눌리면 alert창 뜨며 모달창이 닫히는 함수
  const acceptButton = () => {
    alert("약속이 신청되었습니다.");
    closeModal();
    window.location.reload();
};



  return (
    <div>

      <div onClick={(openModal)} className={friendcalendar['friendcalClick']}></div>
      
      {isOpen && (
        
        <div className={friendcalendar["add-appoint"]}>
          
          <div className={friendcalendar["closeButton"]}
            onClick={closeModal}><GrClose />
          </div>

        {/* <div>{friendName}님에게 약속을 신청하시겠습니까?</div> */}

        <div className={mdl['f-calender-appoint-box']}>

            <div className={`${friendcalendar[`appoint-f-content`]}`}>
                <div className={`${friendcalendar[`appoint-f-title`]}`}>약속 신청</div>
                <div>

                    {/** 프로필 사진 */}
                    <div className={`${friendcalendar[`appoint-f-photo`]}`}>
                        <img
                            src={process.env.PUBLIC_URL + friendPhoto}
                            // src="/img/mmtc-15.png"
                            alt="프로필사진"
                            className={`${mypage[`prof-img`]}`}
                        />
                    </div>

                    <div className={`${friendcalendar['appoint-f-text']}`}>

                        {/* <div className={`${friendcalendar['appoint-f-date']}`}>23.06.08 10:47</div> */}
                        <div className={`${friendcalendar['appoint-f-date']}`}>
                          <div>{`${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`}</div>
                        </div>

                        <div className={`${friendcalendar['appoint-f-quest']}`}><b>{friendName}님</b>에게 약속신청을 하시겠습니까?</div>
                    </div>

                    <div className={`${friendcalendar['appoint-f-btn']}`} >
                        <button className={`${mdl['last-btn3']} ${mainStyle['button']}`}
                          onClick={acceptButton}>신청</button>
                        <button className={`${mdl['last-btn3']} ${mainStyle['button']}`} onClick={closeModal}>취소</button>
                    </div>
                </div>
            </div>

        </div>

        </div>

      )}
      
    </div>
  );
}
