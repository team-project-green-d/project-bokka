import React, { useState } from 'react';
import mdl from '../css/modal.module.scss';
import tgl from '../css/tgl-sample.module.scss';
import mainStyle from '../css/sass.module.scss';

// 닫기버튼 아이콘
import { GrClose } from "react-icons/gr";

const InviteMeeting = ({ notice }) => {
    const [isOpen, setIsOpen] = useState(false);

    // 모달 열고 닫는 함수
    const openModal = () => {
        setIsOpen(true);
    };

   
    const closeModal = () => {
        setIsOpen(false);
    };

    // 버튼 눌리면 alert창 뜨며 모달창이 닫히는 함수
    const acceptButton = () => {
        alert("모임이 수락되었습니다.");
        closeModal();
    };

    const refuseButton = () => {
        alert("모임이 거절되었습니다.");
        closeModal();
    };

    return (
        <div className={mdl['btn-box']}>
            <div onClick={openModal} className={mdl["add-meet-btn"]}></div>

            {isOpen && (
                <div className={tgl["modal-m"]}>
                    <div className={tgl["modal-background"]}></div>
                    <div className={`${tgl["modal-content"]} ${tgl["accept-a-modal-box"]}`}>
                        <div onClick={closeModal} className={tgl["modal-close"]}><GrClose /></div>
                        <div className={tgl["modal-container"]}>
                            <div className={tgl["content"]}>
                                <div className={tgl['modal-title']}>모임 초대 알림</div>
                                <div className={tgl['make-group']}>
                                    <div className={`${mdl['modal-text']}`}><b>{notice.name}</b> 님이 모임에 초대하셨습니다.</div>
                                    <div className={mdl['accept-btn-wrap']}>
                                        <button className={`${mdl['accept-last-btn']} ${mainStyle['button']}`} onClick={acceptButton}>수락</button>
                                        <button className={`${mdl['accept-last-btn']} ${mainStyle['button']}`} onClick={refuseButton}>거절</button>
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

export default InviteMeeting;
