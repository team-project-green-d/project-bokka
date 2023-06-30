import React, { useState } from 'react';
import { BiBell } from "react-icons/bi";
import mainStyle from '../css/sass.module.scss'
import homeStyle from '../css/home.module.scss'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AcceptAppointment from '../components/AcceptAppointment';
import InviteMeeting from '../components/AcceptGroup';

const ToggleBox = () => {
    const user = useSelector((state) => (state.user.user));
    const navigate = useNavigate('');

    const [isOpen, setIsOpen] = useState(false);
    const [isSlidingIn, setIsSlidingIn] = useState(true);
    const [selectedNotice, setSelectedNotice] = useState(null);

    const toggle1 = () => {
        if (user) {
            setIsOpen(!isOpen);
            setIsSlidingIn(!isOpen);
        } else {
            navigate('/login');
        }
    };

    const handleNoticeClick = (notice) => {
        setSelectedNotice(notice);
    };


    // 토글창 유저 더미데이터
    const noticeList = [
        {
            id: 1,
            date: "23.06.07 14:32",
            text: " 대욱님이 약속을 신청하였습니다.",
            modal: "A",
            name: "대욱"
        },
        {
            id: 2,
            date: "23.06.06 17:12",
            text: "슬린님이 모임에 초대하셨습니다.",
            modal: "B",
            name: "슬린"
        },
        {
            id: 3,
            date: "23.06.05 21:35",
            text: "영환님이 약속을 신청하셨습니다.",
            modal: "A",
            name: "영환"
        },
        {
            id: 4,
            date: "23.06.05 21:35",
            text: "은희님이 모임에 초대하셨습니다.",
            modal: "B",
            name: "은희"
        },
        {
            id: 5,
            date: "23.06.07 14:32",
            text: "은희님이 약속을 신청하였습니다.",
            modal: "A",
            name: "은희"
        },
        {
            id: 6,
            date: "23.06.06 17:12",
            text: "슬린님이 약속이 신청하였습니다.",
            modal: "A",
            name: "슬린"
        },
        {
            id: 7,
            date: "23.06.05 21:35",
            text: "대욱님이 모임에 초대하셨습니다.",
            modal: "B",
            name: "대욱"
        },
        {
            id: 8,
            date: "23.06.05 21:35",
            text: "영환님이 모임에 초대하셨습니다.",
            modal: "B",
            name: "영환"
        },
        {
            id: 9,
            date: "23.06.07 14:32",
            text: "은희님이 모임에 초대하셨습니다.",
            modal: "B",
            name: "은희"
        },
        {
            id: 10,
            date: "23.06.06 17:12",
            text: "슬린님이 약속을 신청하였습니다.",
            modal: "A",
            name: "슬린"
        },
        {
            id: 11,
            date: "23.06.05 21:35",
            text: "대욱님이 약속을 신청하였습니다.",
            modal: "A",
            name: "대욱"
        }

    ];

    return (
        <div>
            <div onClick={toggle1} className={`${user ? '' : mainStyle['header-menu-li-pop']} ${mainStyle['header-menu-li']} ${mainStyle['togglebtn']}`}>
                <BiBell />
            </div>

            {user && isOpen && (
                <div className={`${mainStyle['toggle-box']} ${mainStyle['color-box']} ${isSlidingIn ? mainStyle['slideIn'] : mainStyle['slideOut']}`}>
                    <ul className={`${homeStyle['all-timeline']} ${mainStyle['notice-list']}`}>
                        <p>알림창</p>
                        {noticeList.map((notice) => (
                            <li key={notice.id} onClick={() => handleNoticeClick(notice)}>
                                {notice.modal === 'A' ? (
                                    <AcceptAppointment notice={notice} />
                                ) : (
                                    <InviteMeeting notice={notice} />
                                )}
                                <div>
                                    {notice.date}
                                    <br />
                                    {notice.text}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ToggleBox;
