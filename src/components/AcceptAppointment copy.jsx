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
        <div className={mdl['btn-box']}>
            {/* <p onClick={openModal}>약속 신청 알림</p> */}
            <div onClick={openModal} className={mdl["add-meet-btn"]}></div>

            {isOpen && (

                <div className={mdl['accept-a-modal']}>

                    <div className={mdl['accept-a-modal-background']}></div>

                    {/* <div className={mdl['accept-a-modal-content']}> */}
                    <div className={`${mdl['modal-box']} ${mdl['accept-a-modal-box']}`}>

                            <div onClick={closeModal} className={mdl["accept-a-modal-close"]}><GrClose /></div>

                            <div className={mdl['accept-a-modal-container']}>

                                <div className={mdl['accept-a-content']}>

                                    <div className={mdl['accept-a-modal-title']}>약속 신청 알림</div>

                                    <div className={mdl['accept-a-make-group']}>

                                        {/* <p className={`${mdl['accept-a-modal-quest1']}`}>23.06.08 10:47</p> */}
                                        <p className={`${mdl['accept-a-modal-quest2']}`}><b>{'A'}님</b>이 약속을 신청하셨습니다</p>

                                        <div className={mdl['accept-a-btn-container']}>
                                            <button className={`${mdl['accept-a-last-btn']} ${mainStyle['button']}`}>수락</button>
                                            <button className={`${mdl['accept-a-last-btn']} ${mainStyle['button']}`}>거절</button>
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