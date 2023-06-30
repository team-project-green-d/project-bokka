import React, { useState } from 'react';
import mdl from '../css/modal.module.scss';
import mainStyle from '../css/sass.module.scss'


// 닫기버튼 아이콘
import { GrClose } from "react-icons/gr";

//** 친구수락 모달창 */
const Modal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <p onClick={openModal}>친구 신청 알림</p>

            {isOpen && (
                <div className={mdl['accept-f-modal-m']}>
                    <div className={mdl['accept-f-modal-background']}>
                        <div className={mdl['accept-f-modal-content']}>
                            <div onClick={closeModal} className={mdl["accept-f-modal-close"]}><GrClose /></div>
                            <div className={mdl['accept-f-container']}>
                                <div className={mdl['accept-f-content']}>
                                    <div className={mdl['accept-f-modal-title']}>친구 신청 알림</div>
                                    <div className={mdl['accept-f-make-group']}>
                                        <p className={`${mdl['accept-f-modal-quest1']}`}>23.06.08 10:47</p>
                                        <p className={`${mdl['accept-f-modal-quest2']}`}><b>{'A'}님</b>이 친구 신청을 하였습니다.</p>
                                        <div className={mdl['accept-f-btn-container']}>
                                            <button className={`${mdl['accept-f-last-btn1']} ${mainStyle['button']}`}>A 캘린더</button>
                                            <button className={`${mdl['accept-f-last-btn1']} ${mainStyle['button']}`}>B 캘린더</button>
                                        </div>
                                        <div className={mdl['accept-f-btn-container']} >
                                            <button className={`${mdl['accept-f-last-btn2']} ${mainStyle['button']}`}>수락</button>
                                            <button className={`${mdl['accept-f-last-btn2']} ${mainStyle['button']}`}>거절</button>
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