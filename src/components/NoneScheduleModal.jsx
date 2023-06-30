import React, { useState } from 'react';
import mdl from '../css/modal.module.scss';
import tgl from '../css/tgl-sample.module.scss'
import mainStyle from "../css/sass.module.scss";


import { LuCake, LuX } from "react-icons/lu";

// 닫기버튼 아이콘
import { GrClose } from "react-icons/gr";
import { Link } from 'react-router-dom';

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

            <div onClick={openModal} className={mdl['n-schedule-box']}></div>
      
            {isOpen && (

                <div className={tgl["modal-m"]}>

                    <div className={tgl["modal-background"]}></div>

                    <div className={`${tgl["modal-content"]}`}>

                            <div onClick={closeModal} className={tgl["modal-close"]}><GrClose/></div>
                            
                            <div className={`${tgl["modal-container"]} ${mdl["n-schedule-modal"]}`}>

                                {/* <div className={mdl["n-schedule-modal"]}> */}
                                  <div className={mdl["n-schedule-modal-mmj"]}>
                                    <img src="/img/mmtc-05.png" alt="이미지" />
                                  </div>
                                  <p>약속이 없는 날이에요!</p>
                                  <br/>
                                  <span>
                                  친구들의 스케줄을 확인하고<br/>
                                  약속을 신청해 보세요
                                  </span>
                                  <button className={`${mainStyle["button"]} ${mdl["n-schedule-btn"]}`}>
                                    <Link to='/list'>리스트 보러가기</Link>
                                  </button>
                                {/* </div> */}


                            </div>

                    </div>

                </div>
            )}

        </div>
    );
};

export default Modal;