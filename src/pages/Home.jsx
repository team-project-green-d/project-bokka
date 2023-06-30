import React, { useEffect, useState } from 'react'
import mainStyle from '../css/sass.module.scss'
import homeStyle from '../css/home.module.scss'
import modal from '../css/modal.module.scss';
// import ReactDOM from "react-dom";
import AdSlide from '../components/AdSlide';
import Calender from './Calender';

import { FaBeer } from 'react-icons/fa';
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import { BiBookmarkMinus, BiBookmarkPlus } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import { GrClose } from "react-icons/gr";

// import AddGroup from '../components/AddGroup'
import FriendListModal from '../components/FriendListModal'
import AddGroupSample from '../components/AddGroupSample'
import AddFriend from '../components/AddFriend'
import MoimFriend from '../components/MoimFriend';
import FriendProfileModal from '../components/FriendProfileModal';
import { useDispatch, useSelector } from 'react-redux';
import { updateMark } from '../slice/markSlice';
import { setFalse, setTrue } from '../slice/userSlice';


export default function Home() {
    const navigate = useNavigate('');

    // 리덕스 저장 정보
    const user = useSelector((state) => state.user.user);
    const friend = useSelector((state) => state.friend.friend);
    const group = useSelector((state) => state.group.group);
    const userMark = useSelector((state) => state.userMark.userMark);
    const dispatch = useDispatch();

    // 세션스토로지 저장 정보 (새.고 해도 OK인 정보 사용)
    const userData = JSON.parse(sessionStorage.getItem('user'));
    const groupData = JSON.parse(sessionStorage.getItem('group'));
    const markData = JSON.parse(sessionStorage.getItem('userMark'));
    const listArrayData = JSON.parse(sessionStorage.getItem('listArray'));

    //달력값 구성
    const now = new Date();
    const [nowday, setNowday] = useState(new Date());
    const [nextday, setNextday] = useState(
        new Date(now.setMonth(now.getMonth() + 1))
    );
    
    const dateone=()=>{
        nowday.setDate(1);
        nextday.setDate(1);
    }
    const allTimeline = [
        {
            id: 1,
            date: "23.06.07 14:32",
            name: "장은희",
            photo: `${process.env.PUBLIC_URL}/img/m-left-01.png`,
            email: "eh@bokka.com",
            text: "은희님의 약속이 변경되었습니다"
        },
        {
            id: 2,
            date: "23.06.06 17:12",
            name: "전하슬린",
            email: "sl@bokka.com",
            photo: `${process.env.PUBLIC_URL}/img/mmtc-03.png`,
            text: "슬린님의 약속이 취소되었습니다"
        },
        {
            id: 3,
            date: "23.06.05 21:35",
            name: "허대욱",
            email: "du@bokka.com",
            photo: `${process.env.PUBLIC_URL}/img/mmtc-08.png`,
            text: "대욱님과 새로운 친구가 되었습니다"
        },
        {
            id: 4,
            date: "23.06.05 21:35",
            name: "김영환",
            email: "yh@bokka.com",
            photo: `${process.env.PUBLIC_URL}/img/mmtc-07.png`,
            text: "영환님이 친구신청을 하셨습니다"
        },
        {
            id: 5,
            date: "23.06.07 14:32",
            name: "장은희",
            photo: `${process.env.PUBLIC_URL}/img/m-left-01.png`,
            email: "eh@bokka.com",
            text: "은희님의 약속이 변경되었습니다"
        },
        {
            id: 6,
            date: "23.06.06 17:12",
            name: "전하슬린",
            email: "sl@bokka.com",
            photo: `${process.env.PUBLIC_URL}/img/mmtc-03.png`,
            text: "슬린님의 약속이 취소되었습니다"
        },
        {
            id: 7,
            date: "23.06.05 21:35",
            name: "허대욱",
            email: "du@bokka.com",
            photo: `${process.env.PUBLIC_URL}/img/mmtc-08.png`,
            text: "대욱님과 새로운 친구가 되었습니다"
        },
        {
            id: 8,
            date: "23.06.05 21:35",
            name: "김영환",
            email: "yh@bokka.com",
            photo: `${process.env.PUBLIC_URL}/img/mmtc-07.png`,
            text: "영환님이 친구신청을 하셨습니다"
        },
        {
            id: 9,
            date: "23.06.07 14:32",
            name: "장은희",
            photo: `${process.env.PUBLIC_URL}/img/m-left-01.png`,
            email: "eh@bokka.com",
            text: "은희님의 약속이 변경되었습니다"
        },
        {
            id: 10,
            date: "23.06.06 17:12",
            name: "전하슬린",
            email: "sl@bokka.com",
            photo: `${process.env.PUBLIC_URL}/img/mmtc-03.png`,
            text: "슬린님의 약속이 취소되었습니다"
        },
        {
            id: 11,
            date: "23.06.05 21:35",
            name: "허대욱",
            email: "du@bokka.com",
            photo: `${process.env.PUBLIC_URL}/img/mmtc-08.png`,
            text: "대욱님과 새로운 친구가 되었습니다"
        },
        {
            id: 12,
            date: "23.06.05 21:35",
            name: "김영환",
            email: "yh@bokka.com",
            photo: `${process.env.PUBLIC_URL}/img/mmtc-07.png`,
            text: "영환님이 친구신청을 하셨습니다"
        },
        {
            id: 13,
            date: "23.06.07 14:32",
            name: "장은희",
            photo: `${process.env.PUBLIC_URL}/img/m-left-01.png`,
            email: "eh@bokka.com",
            text: "은희님의 약속이 변경되었습니다"
        },
        {
            id: 14,
            date: "23.06.06 17:12",
            name: "전하슬린",
            email: "sl@bokka.com",
            photo: `${process.env.PUBLIC_URL}/img/mmtc-03.png`,
            text: "슬린님의 약속이 취소되었습니다"
        },
        {
            id: 15,
            date: "23.06.05 21:35",
            name: "허대욱",
            email: "du@bokka.com",
            photo: `${process.env.PUBLIC_URL}/img/mmtc-08.png`,
            text: "대욱님과 새로운 친구가 되었습니다"
        },
        {
            id: 16,
            date: "23.06.05 21:35",
            name: "김영환",
            email: "yh@bokka.com",
            photo: `${process.env.PUBLIC_URL}/img/mmtc-07.png`,
            text: "영환님이 친구신청을 하셨습니다"
        },
    ]

    const unmarkGroup = (gName) => {
        console.log(gName)
        const newArray = markData.filter(s => s !== gName);
        dispatch(updateMark(newArray));
    }

    useEffect(() => {
        if (!markData) {
            navigate('/')
        }
    }, [])


    //캘린더 컬러
    const [isMainColorBox, setIsMainColorBox] = useState(true);

    const handleCalenderAClick = () => {
        setIsMainColorBox(true);
    };

    const handleCalenderBClick = () => {
        setIsMainColorBox(false);
    };




    return (
        markData &&
        <div className={mainStyle.wrap}>

            <div className={homeStyle['home-wrap']}>

                {/* Home - left */}
                <div className={`${homeStyle['left-box']} ${mainStyle['color-box']} ${isMainColorBox ? mainStyle['main-color-box'] : mainStyle['sub-color-box']}`}>

                    <div className={homeStyle['left-top']}>
                        <div className={homeStyle['left-top-left']}>
                            <div className={homeStyle['calender-A']} onClick={handleCalenderAClick}>
                                <img src={`${process.env.PUBLIC_URL}/img/calenderA_w.svg`} alt="icon"
                                    onClick={() => dispatch(setTrue())} />
                            </div>
                            <div className={homeStyle['calender-B']} onClick={handleCalenderBClick}>
                                <img src={`${process.env.PUBLIC_URL}/img/calenderB_w.svg`} alt="icon"
                                    onClick={() => dispatch(setFalse())} />
                            </div>
                        </div>
                        <div className={homeStyle['left-top-right']}>
                            <div className={homeStyle['left-top-prev']}
                                onClick={() => {
                                    dateone()
                                    setNowday(new Date(nowday.setMonth(nowday.getMonth() - 2)));
                                    setNextday(new Date(nextday.setMonth(nextday.getMonth() - 2)));
                                }}><RxDoubleArrowLeft /></div>
                            <div className={homeStyle['left-top-next']}
                                onClick={() => {
                                    dateone()
                                    setNowday(new Date(nowday.setMonth(nowday.getMonth() + 2)));
                                    setNextday(new Date(nextday.setMonth(nextday.getMonth() + 2)));
                                }}><RxDoubleArrowRight /></div>
                        </div>
                    </div>

                    {/* ----------------- calender ---------------*/}
                    {
                        groupData ?
                            <div className={`${homeStyle['calender-wrap']}`}>
                                <div className={`${homeStyle['calendar-box']}`}>
                                    <div className={homeStyle['calendar-A']}><Calender nextmonth={nowday} /></div>
                                </div>
                                <div className={`${homeStyle['calendar-box']}`}>
                                    <div className={homeStyle['calendar-B']}><Calender nextmonth={nextday} /></div>
                                </div>
                            </div>
                            :
                            // 로딩 화면 (빈캘린더값)
                            <div className={`${homeStyle['calender-wrap']}`}>
                                <div className={`${homeStyle['calendar-box']}`}>
                                    <div className={homeStyle['calendar-A']}><Calender /></div>
                                </div>
                                <div className={`${homeStyle['calendar-box']}`}>
                                    <div className={homeStyle['calendar-B']}><Calender /></div>
                                </div>
                            </div>
                    }

                </div>


                {/* Home - center */}
                <div className={homeStyle['center-box']}>

                    <div className={homeStyle['list-wrap']}>

                        <ul className={homeStyle['interest-box']}>

                            {
                                markData.map((i, index) => (
                                    <li className={mainStyle['color-box']} key={index}>
                                        <div></div>
                                        <div className={homeStyle['interest-symbol']}>
                                            <img src={`${process.env.PUBLIC_URL}/img/bokka_symbol_w.png`} alt="symbol" />
                                        </div>
                                        <Link to={`/group/${markData[index]}`}>
                                            <div className={homeStyle['interest-name']}>{i}</div>
                                        </Link>
                                        <div className={homeStyle['interest-close']} onClick={() => unmarkGroup(i)}>
                                            <GrClose />
                                        </div>
                                    </li>
                                ))}

                            {
                                Array.from({ length: 4 - markData.length }).map((_, index) => (
                                    <li
                                        key={`empty-${index}`}
                                        className={`${homeStyle['interest-add']} ${mainStyle['color-box']}`}
                                    >
                                        <div className={homeStyle['interest-symbol']}><img src={`${process.env.PUBLIC_URL}/img/bokka_symbol_w.png`} alt="symbol" /></div>
                                        {/* <div className={`${homeStyle['interest-name']} ${modal['add-int-btn']}`}><AddFriend/>관심추가<FiPlus/></div> */}
                                        <Link to='/list'><div className={`${homeStyle['interest-add-text']} ${modal['add-int-btn']}`}>관심모임 추가<div className={`${homeStyle['interest-add-plus']}`}><FiPlus /></div></div></Link>
                                    </li>
                                ))}
                        </ul>

                        {/* <Link to='/list'><div className={`${homeStyle['list-view']} ${mainStyle['color-box']}`}>리스트 더보기</div></Link> */}

                        <ul className={homeStyle['list-add-warp']}>
                            {/* <Link to='/list'>
                                <li className={`${homeStyle['list-add-left']} ${mainStyle['color-box']}`}>
                                    모임 추가
                                </li>
                            </Link> */}
                            <li className={`${homeStyle['list-add-left']} ${mainStyle['color-box']}`}>
                                <div className={`${modal['add-f-btn']}`}>
                                    <div>
                                        <ul className={`${homeStyle['add-m-emoji']}`}>
                                            <li><img src={`${process.env.PUBLIC_URL}/img/mmtc-15.png`} alt="로고" /></li>
                                            <li><img src={`${process.env.PUBLIC_URL}/img/mmtc-11.png`} alt="로고" /></li>
                                            <li><img src={`${process.env.PUBLIC_URL}/img/mmtc-10.png`} alt="로고" /></li>
                                            <li><img src={`${process.env.PUBLIC_URL}/img/mmtc-23.png`} alt="로고" /></li>
                                        </ul>
                                        <div className={`${modal['btn-parent']}`}>
                                            <AddGroupSample />
                                        </div>
                                        모임 추가
                                    </div>
                                </div>
                            </li>
                            <li className={`${homeStyle['list-add-right']} ${mainStyle['color-box']}`}>
                                <div className={`${modal['add-f-btn']}`}>
                                    <div>
                                        <ul className={`${homeStyle['add-f-emoji']}`}>
                                            <li><img src={`${process.env.PUBLIC_URL}/img/mmtc-14.png`} alt="로고" /></li>
                                            <li><img src={`${process.env.PUBLIC_URL}/img/mmtc-22.png`} alt="로고" /></li>
                                        </ul>
                                        <div className={`${modal['btn-parent']}`}>
                                            <AddFriend />
                                        </div>
                                        친구 추가
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>


                    {/* Home - 광고배너 */}
                    <div className={`${homeStyle['ad-slide']} ${mainStyle['color-box']}`}>
                        <AdSlide />
                        {/* ReactDOM.render(<AdSlide />, document.getElementById("AdSlide")); */}
                    </div>

                </div>


                {/* Home - right */}
                <div className={`${homeStyle['right-box']} ${mainStyle['color-box']}`}>

                    <ul className={homeStyle['all-timeline']}>
                        <p>전체 타임라인</p>
                        {
                            allTimeline.map((t) =>
                                <li key={t.id}>
                                    <div>
                                        <div>
                                            <div className={`${modal['btn-parent']}`}>
                                                {/* <FriendProfileModal/> */}
                                                <FriendProfileModal friend={t} />
                                            </div>
                                        </div>
                                        {t.date}
                                        <br />
                                        {t.text}
                                    </div>
                                </li>
                            )
                        }
                    </ul>

                </div>

                {/* home-wrap - end */}
            </div>

            {/* mainStyle.warp - end */}
        </div>
    )
}