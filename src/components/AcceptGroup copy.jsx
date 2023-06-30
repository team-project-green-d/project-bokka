import React, { useState } from 'react';
import mdl from '../css/modal.module.scss';
import mainStyle from '../css/sass.module.scss'


// 닫기버튼 아이콘
import { GrClose } from "react-icons/gr";

//** 약속수락 모달창 */
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
            <p onClick={openModal}>모임 초대 알림</p>
            {isOpen && (
                <div className={mdl['accept-g-modal-m']}>
                    <div className={mdl['accept-g-modal-background']}>
                        <div className={mdl['accept-g-modal-content']}>
                            <div onClick={closeModal} className={mdl["accept-g-modal-close"]}><GrClose /></div>
                            <div className={mdl['accept-g-modal-container']}>
                                <div className={mdl['accept-g-content']}>
                                    <div className={mdl['accept-g-modal-title']}>모임 초대 알림</div>
                                    <div className={mdl['accept-g-make-group']}>
                                        <p className={`${mdl['accept-g-modal-quest1']}`}>23.06.08 10:47</p>
                                        <p className={`${mdl['accept-g-modal-quest2']}`}><b>{'A'}님</b>이 모임에 초대하셨습니다. </p>
                                        <div className={mdl['accept-g-accept-btn-container']}>
                                            <button className={`${mdl['accept-g-last-btn2']} ${mainStyle['button']}`}>수락</button>
                                            <button className={`${mdl['accept-g-last-btn2']} ${mainStyle['button']}`}>거절</button>
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