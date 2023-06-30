import React, { useState } from 'react';
import mdl from '../css/modal.module.scss';
import mainStyle from '../css/sass.module.scss'


// 닫기버튼 아이콘
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from 'react-redux';
import { addDoc, collection, doc, getDoc, getDocs, or, query, where } from 'firebase/firestore';
import { db } from '../database/firebase';
import { getgroupList } from '../slice/groupSlice';

//** 친구 빈 캘린더를 클릭했을 때 나오는 약속 신청 모달창 */
const Modal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    // 유저, 그룹 리덕스 가져오기
    const user = useSelector((state) => (state.user.user));
    const group = useSelector((state) => (state.group.group))
    const friend = useSelector((state) => (state.friend.friend));
    const dispatch = useDispatch();

    // 약속을 잡을 유저 선택하기
    const [selectF, setSelectF] = useState('');

    return (
        <div>
            <p onClick={openModal}>약속 신청</p>

            {isOpen && (
                <div className={mdl['modal-m']}>

                    {/* <div className={mdl['modal-background']}> */}

                        <div className={mdl['modal-content']}>

                            <div onClick={closeModal} className={mdl["modal-close"]}><GrClose /></div>

                            <div className={mdl['modal-container1']}>

                                <div className={mdl['content']}>

                                    <div className={mdl['modal-title']}>약속 신청</div>
                                    <div className={mdl['make-group2']}>


                                        <p className={`${mdl['modal-quest2']}`}>23.06.08 10:47</p>
                                        <p className={`${mdl['modal-quest']}`}><b>{'A'}님</b>에게 약속신청을 하시겠습니까?</p>

                                        <div className={mdl['last-btn3-wrap']} >
                                            <button className={`${mdl['last-btn3']} ${mainStyle['button']}`}>신청</button>
                                            <button className={`${mdl['last-btn3']} ${mainStyle['button']}`}>취소</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                // </div>
            )}
        </div>
    );
};

export default Modal;