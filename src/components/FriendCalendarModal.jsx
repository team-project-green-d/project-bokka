import React,{ useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import friendcalendar from "../css/friendcalendar.module.scss";
import FriendCalender from "../pages/FriendCalender";
import { GrClose } from "react-icons/gr";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";

export default function FriendCalendarModal({friendName}) {

  const [nowdayB, setNowdayB] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div onClick={(openModal)} className={friendcalendar['friendcalClick']}></div>
      
      {isOpen && (
        
        <div className={friendcalendar["calendarsize"]}>
          
          <div className={friendcalendar["closeButton"]}
            onClick={closeModal}><GrClose />
          </div>

          <div className={friendcalendar["calendarheader"]}>
            <div
              onClick={() => {
                setNowdayB(new Date(nowdayB.setMonth(nowdayB.getMonth() - 1)));
              }}
            >
              <RxDoubleArrowLeft />
            </div>

            <h4>{friendName}님의 캘린더</h4>

            <div
              onClick={() => {
                setNowdayB(new Date(nowdayB.setMonth(nowdayB.getMonth() + 1)));
              }}
            >
              <RxDoubleArrowRight />
            </div>

          </div>


          <div className={friendcalendar["rbcCalendar"]}>
            <FriendCalender
              nextmonth={nowdayB}
              choosecal={false}
              friendName={friendName}
            />
          </div>

        </div>

      )}
      
    </div>
  );
}
