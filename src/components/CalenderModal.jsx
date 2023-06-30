import React, { useState } from 'react';
import mdl from '../css/modal.module.scss';
import mainStyle from '../css/sass.module.scss'

import AddGroupSample from '../components/AddGroupSample'
import ChatModal from '../components/ChatModal'


// 닫기버튼 아이콘
import { GrClose } from "react-icons/gr";
import { Link } from 'react-router-dom';

//** 달력을 눌렸을때 약속 모달창 */
const Modal = ({date}) => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };
    // console.log(date)

    return (
        <div>
            <p onClick={openModal}>달력을 눌렸을때</p>

            {isOpen && (

                <div className={mdl['modal-m']}>

                    <div className={mdl['modal-background']}>

                        <div className={mdl['modal-content']}>

                            <div onClick={closeModal} className={mdl["modal-close"]}><GrClose /></div>

                            <div className={mdl['modal-container-calender']}>

                                <div className={mdl['content']}>

                                    <div className={mdl['modal-title']}>
                                        <div className={mdl['modal-date']}>{date}</div>
                                        스케줄 형태를 선택하세요.
                                    </div>

                                    <div className={mdl['make-group-calender']}>

                                        <div className={mdl['btn-container']}>
                                            <div className={`${mdl['calender-modal-btn']} ${mainStyle['button']}`}>
                                                <div className={mdl['btn-parent']}>
                                                    <ChatModal date={date}/>
                                                </div>
                                                <span>
                                                    약속 만들기
                                                </span>
                                            </div>
                                            {/* <Link to='/list'>
                                                <button className={`${mdl['calender-modal-btn']} ${mainStyle['button']}`}>
                                                    모임 만들기
                                                </button>
                                            </Link> */}
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