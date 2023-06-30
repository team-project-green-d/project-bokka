import React, { useEffect, useState } from 'react'
import mainStyle from '../css/sass.module.scss'
import homeStyle from '../css/home.module.scss'
import groupStyle from '../css/group.module.scss'
import modal from '../css/modal.module.scss';
import list from '../css/list.module.scss'

// import photo_a from '/img/m-left-01.png';


import { FaBeer } from 'react-icons/fa';
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import { BiBookmarkMinus, BiBookmarkPlus } from "react-icons/bi";
import { FiPlus } from "react-icons/fi";
import { Link, useNavigate, useParams } from 'react-router-dom';

import PhotoGallery from '../components/PhotoGallery';
import MoimCalender from '../pages/MoimCalender';
import FriendProfileModal from '../components/FriendProfileModal';
import { useDispatch, useSelector } from 'react-redux';
import { getfriendList } from '../slice/friendSlice';
import AddGroupMember from '../components/AddGroupMember';

//더미데이터를 js에서도 쓰기 위해 전역에 꺼냄-날짜값 추가방법은 
//date: [new Date("2023-06-23"),new Date("2023-06-07")] 처럼 배열로 만든다
export const friendArray = [
    {
        id: 1,
        name: "장은희",
        // photo : photo_a,
        photo: '/img/m-left-01.png',
        email: "eh@bokka.com",
        date: [new Date("2023-06-23"),new Date("2023-06-21"),new Date("2023-06-06")
        ,new Date("2023-06-30"),new Date("2023-06-08"),new Date("2023-06-16"),
        new Date("2023-06-19"),new Date("2023-05-30"),new Date("2023-06-10"),
        new Date("2023-07-02"),new Date("2023-07-15"),new Date("2023-07-18"),
        new Date("2023-07-19"),new Date("2023-07-22"),new Date("2023-08-03"),

    ]
    },
    {
        id: 2,
        name: "전하슬린",
        email: "sl@bokka.com",
        photo: '/img/mmtc-03.png',
        date: [new Date("2023-06-23"), new Date("2023-06-07"), new Date("2023-05-23"),
        new Date("2023-06-15"),new Date("2023-06-28"),new Date("2023-06-12"),
        new Date("2023-06-13"),new Date("2023-05-28"),new Date("2023-07-01"),
        new Date("2023-07-13"),new Date("2023-07-21"),new Date("2023-07-10"),
        new Date("2023-07-12"),new Date("2023-07-28"),new Date("2023-08-02"),

        ]

    },
    {
        id: 3,
        name: "김영환",
        email: "yh@bokka.com",
        photo: '/img/mmtc-07.png',
        date: [new Date("2023-06-21"), new Date("2023-06-01"), new Date("2023-07-03"),
        new Date("2023-06-04"),new Date("2023-06-27"),new Date("2023-06-26"),
        new Date("2023-06-18"),new Date("2023-07-04"),new Date("2023-07-06"),
        new Date("2023-08-04"),new Date("2023-07-30"),new Date("2023-07-20"),
        new Date("2023-07-11"),new Date("2023-07-23"),new Date("2023-08-01"),
    ]

    },
    {
        id: 4,
        name: "허대욱",
        email: "du@bokka.com",
        photo: '/img/mmtc-08.png',
        date: [new Date("2023-06-24"), new Date("2023-06-01"), new Date("2023-05-29"),
        new Date("2023-06-02"),new Date("2023-06-22"),new Date("2023-06-14"),
        new Date("2023-06-25"),new Date("2023-06-10"),new Date("2023-07-07"),
        new Date("2023-07-08"),new Date("2023-07-31"),new Date("2023-07-27"),
        new Date("2023-07-16"),new Date("2023-07-24"),new Date("2023-07-26"),
    ]

    },
]
//변수선언-다음달 달력
const now = new Date();
const nextmonth = new Date(now.setMonth(now.getMonth() + 1));

export default function GroupDetail() {

    const navigate = useNavigate('');

    const { gName } = useParams();
    const [grouptitle, setgrouptitle] = useState(gName);

    //달력값 구성
    const now = new Date();
    const [nowday, setNowday] = useState(new Date());

    const [nextday, setNextday] = useState(
        new Date(now.setMonth(now.getMonth() + 1))
    );


    const groupTimeline = [
        {
            id: 1,
            date: "23.06.07 14:32",
            name: "장은희",
            photo: '/img/m-left-01.png',
            email: "eh@bokka.com",
            text: "은희님의 약속이 변경되었습니다"
        },
        {
            id: 2,
            date: "23.06.06 17:12",
            name: "전하슬린",
            email: "sl@bokka.com",
            photo: '/img/mmtc-03.png',
            text: "슬린님의 약속이 취소되었습니다"
        },
        {
            id: 3,
            date: "23.06.05 21:35",
            name: "허대욱",
            email: "du@bokka.com",
            photo: '/img/mmtc-08.png',
            text: "대욱님이 모임에 초대되었습니다"
        },
        {
            id: 4,
            date: "23.06.05 21:35",
            name: "김영환",
            email: "yh@bokka.com",
            photo: '/img/mmtc-07.png',
            text: "영환님이 사진을 등록했습니다"
        },
        {
            id: 5,
            date: "23.06.07 14:32",
            name: "장은희",
            photo: '/img/m-left-01.png',
            email: "eh@bokka.com",
            text: "은희님의 약속이 변경되었습니다"
        },
        {
            id: 6,
            date: "23.06.06 17:12",
            name: "전하슬린",
            email: "sl@bokka.com",
            photo: '/img/mmtc-03.png',
            text: "슬린님의 약속이 취소되었습니다"
        },
        {
            id: 7,
            date: "23.06.05 21:35",
            name: "허대욱",
            email: "du@bokka.com",
            photo: '/img/mmtc-08.png',
            text: "대욱님이 모임에 초대되었습니다"
        },
        {
            id: 8,
            date: "23.06.05 21:35",
            name: "김영환",
            email: "yh@bokka.com",
            photo: '/img/mmtc-07.png',
            text: "영환님이 사진을 등록했습니다"
        }
    ];


    const group = useSelector(state => state.group.group);
    const dispatch = useDispatch();
    // 세션스토로지 저장 정보 (새.고 해도 OK인 정보 사용)
    const groupData = JSON.parse(sessionStorage.getItem('group'));
    const friendData = JSON.parse(sessionStorage.getItem('friend'));


    useEffect(() => {
        if (!groupData) {
            navigate('/');
        }
    }, [])

    // 선택한 그룹 정보 가져오기
    const selectG = group.find(g => g.gName === gName);

    // 멤버 리스트 (더미)
    const [memArray, setMemArray] = useState(friendArray);

    // 실제 멤버 리스트
    const selectGroup = groupData && groupData.filter((g) => g.gName === gName)[0];
    const [realmem, setRealmem] = useState(selectGroup ? selectGroup.member : []);

    // 이름순 정렬
    const [nameBtn, setNameBtn] = useState(true);

    // 이름순 정렬 관리 함수
    const handleNameSort = () => {
        const nameUP = [...realmem].sort((a, b) => {
            return a.fName < b.fName ? -1 : a.fName > b.fName ? 1 : 0;
        });
        const nameDown = [...realmem].sort((a, b) => {
            return a.fName > b.fName ? -1 : a.fName < b.fName ? 1 : 0;
        });
        if (nameBtn) {
            setRealmem(nameUP);
            setNameBtn(!nameBtn);
        } else {
            setRealmem(nameDown);
            setNameBtn(!nameBtn);
        }
    }

    // 화면에 데이터 갱신 랜더링
    useEffect(() => {
        setRealmem(selectGroup && selectGroup.member);
        setgrouptitle(gName);
        // console.log(realmem)
        // console.log(grouptitle)
    }, [group])

    const dateone=()=>{
        nowday.setDate(1);
        nextday.setDate(1);
    }
    return (
        <div className={mainStyle.wrap}>
            <div className={homeStyle['home-wrap']}>
                {/* Home - left */}
                <div className={`${homeStyle['left-box']} ${mainStyle['color-box']} ${mainStyle['main-color-box']}`}>
                    <div className={homeStyle['left-top']}>
                        <p className={groupStyle['group-name']}>
                            {/* 그룹명 출력 */}
                            {selectG && selectG.gName}
                        </p>

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

                    <div className={`${homeStyle['calender-wrap']}`}>
                        <div className={`${mainStyle['color-box']} ${homeStyle['calendar-box']} ${mainStyle['white-color-box']}`}>
                            <div className={homeStyle['calendar-A']}><MoimCalender nextmonth={nowday} gName={grouptitle} /></div>
                        </div>
                        <div className={`${mainStyle['color-box']} ${homeStyle['calendar-box']} ${mainStyle['white-color-box']}`}>
                            <div className={homeStyle['calendar-B']}><MoimCalender nextmonth={nextday} gName={grouptitle} /></div>
                        </div>
                    </div>

                </div>

                {/* Group - right top */}
                <div className={groupStyle['right-box']}>

                    <div className={groupStyle['right-top']}>

                        <div className={`${groupStyle['list-wrap']} ${mainStyle['color-box']}`}>

                            <div className={groupStyle['list-top']}>

                                {/* <select name="sort" className={`${mainStyle['button']} ${mainStyle['select-button']}`}>
                                    <option value="select">등록순 ▼</option>
                                    <option value="javascript">이름순 ▼</option>
                                </select> */}
                                <button
                                    className={`${list["moim-top-btn1"]} ${mainStyle["button"]} ${list[`${nameBtn}`]}`}
                                    onClick={handleNameSort}
                                >
                                    {
                                        nameBtn ?
                                            '이름순 ▼' : '이름순 ▲'
                                    }
                                </button>


                                <div name="sort" className={`${mainStyle['button']} ${list["moim-top-btn1"]}`}
                                >
                                    친구 초대 +
                                    <div className={modal['btn-parent']}>
                                        {
                                            friendData ?
                                                <AddGroupMember gName={grouptitle} />
                                                : <div>로딩</div>
                                        }
                                    </div>
                                </div>

                            </div>

                            <ul className={groupStyle['friend-list']}>
                                {
                                    memArray &&
                                    memArray.map((f) =>
                                        <li key={f.id}>
                                            <div className={groupStyle['friend-list-box']}>
                                                <div className={`${modal['btn-parent']}`}>
                                                    {/* <FriendProfileModal name={f.name} /> */}
                                                    <FriendProfileModal friend={f} />
                                                </div>
                                            </div>
                                            <p>{f.name}</p>
                                            {/* <div>{f.photo}</div> */}
                                        </li>
                                    )}
                                {
                                    selectG &&
                                    <li>
                                        <div className={groupStyle['friend-list-box']}>
                                            <div className={`${modal['btn-parent']}`}>
                                                <FriendProfileModal friend={selectGroup && selectGroup.gBoss} />
                                            </div>
                                        </div>
                                        <p>{selectGroup && selectGroup.gBoss.nickname} ✨</p>
                                    </li>
                                }
                                {

                                    selectGroup &&
                                    realmem.map((m) =>
                                        // group.filter((g) => g.gName === gName)[0].member.map((m) =>
                                        <li key={m.fid}>
                                            <div className={groupStyle['friend-list-box']}>
                                                <div className={`${modal['btn-parent']}`}>
                                                    {/* <FriendProfileModal name={f.name} /> */}
                                                    <FriendProfileModal friend={{
                                                        fid: m.fid,
                                                        name: m.fName,
                                                        photo: m?.photo,
                                                        email: m.fEmail,
                                                        birthday: m?.birthday,
                                                        // 친구 캘린더 데이터는 그냥 친구 uid와 동일
                                                    }} />
                                                </div>
                                            </div>
                                            <p>{m.fName}</p>
                                            {/* <div>{f.photo}</div> */}
                                        </li>
                                    )}
                            </ul>

                        </div>

                        <div className={`${groupStyle['timeline']} ${mainStyle['color-box']}`}>

                            <ul className={homeStyle['all-timeline']}>
                                <p>모임 타임라인</p>
                                {
                                    groupTimeline.map((f) =>
                                        <li key={f.id}>
                                            <div className={`${modal['btn-parent']}`}>
                                                <FriendProfileModal friend={f} />
                                            </div>
                                            {f.date}
                                            <br />
                                            {f.text}
                                        </li>
                                    )
                                }
                            </ul>

                        </div>

                    </div>

                    <div className={`${groupStyle['gallery']} ${mainStyle['color-box']}`}>
                        <PhotoGallery />
                    </div>

                </div>


                {/* home-wrap - end */}
            </div>


            {/* mainStyle.warp - end */}
        </div>
    )
}
