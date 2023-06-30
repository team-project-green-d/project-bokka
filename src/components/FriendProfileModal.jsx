import React, { useState } from 'react';
import mdl from '../css/modal.module.scss';
import tgl from '../css/tgl-sample.module.scss'
import mainStyle from '../css/sass.module.scss'
import mypage from "../css/mypage.module.scss";

import { LuCake, LuX } from "react-icons/lu";

// 닫기버튼 아이콘
import { GrClose } from "react-icons/gr";
import { Link } from 'react-router-dom';
import FriendCalendarModal from './FriendCalendarModal';

//** 친구프로필 모달창 */
// const Modal = () => {
// const Modal = ({ name }) => {  
const Modal = ({ friend }) => {  
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => {
        setIsOpen(true);
        // 모달 클릭 시 추가
        sessionStorage.setItem("friendName", friend.name)
        sessionStorage.setItem("friendPhoto", friend.photo)
    };

    const closeModal = () => {
        setIsOpen(false);
        // 아닐 때 삭제
        sessionStorage.removeItem("friendName")
        sessionStorage.removeItem("friendPhoto")
    };

    // console.log(friend);

    const defaultPhoto = '/img/user_profile_photo.png';

    return (
        <div className={mdl['btn-box']}>

            <div onClick={openModal} className={mdl["add-meet-btn"]}></div>

            {isOpen && (

                <div className={tgl["modal-m"]}>

                    <div className={tgl["modal-background"]}></div>

                    <div className={`${tgl["modal-content"]} ${mdl["profile-modal-box"]}`}>

                            <div onClick={closeModal} className={tgl["modal-close"]}><GrClose/></div>
                            
                            <div className={tgl["modal-container"]}>

                                <div className={tgl["content"]}>

                                  {/** 프로필 사진 */}
                                  <div className={`${mdl[`profile-photo`]}`}>
                                    <img
                                      // src={`${process.env.PUBLIC_URL}/img/bokka logo_kor02.jpg`}
                                      src={process.env.PUBLIC_URL + (friend.photo ? friend.photo : defaultPhoto)}
                                      alt="프로필사진"
                                      className={`${mypage[`prof-img`]}`}
                                    />
                                  </div>

                                  {/* 프로필 텍스트 */}
                                  <div className={`${mdl["profile-text"]}`}>
                                    <div>
                                      <div
                                        // className={`${mypage[`text-line`]} ${mypage[`text-line-title`]}`}
                                        className={`${mypage[`text-line`]} ${mypage[`text-line-title`]}`}
                                        style={{ height: "28px" }}
                                      >
                                        {/* <span>친구 이름&nbsp;</span> */}
                                        <span>{friend && friend.name}</span>

                                      </div>
                                      <div className={`${mypage[`text-line`]}`}>
                                        {/* <span className={`${mypage.email}`}>green@mail.com</span> */}
                                        <span className={`${mypage.email}`}>{friend.email}</span>
                                      </div>
                                      <div className={mypage[`text-line`]}>
                                        <LuCake />
                                        <span className={`${mypage.birthday}`} style={{ height: "25px" }}>
                                          &nbsp;{friend.birthday ? friend.birthday : '---.--.--'}&nbsp;
                                        </span>
                                      </div>

                                      <div className={`${mdl[`f-calendar`]}`}>
                                        <div className={`${mdl['btn-parent']}`}>
                                          <FriendCalendarModal friendName={friend && friend.name}/>
                                        </div>
                                        친구 캘린더 보기
                                      </div>

                                    </div>

                                  </div>

                                </div>

                            </div>

                    </div>

                </div>
            )}

        </div>
    );
};

export default Modal;