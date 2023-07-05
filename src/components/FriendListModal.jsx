import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import mainStyle from "../css/sass.module.scss";
import list from "../css/list.module.scss";
import mdl from '../css/modal.module.scss';
import homeStyle from '../css/home.module.scss'
import friendlist from '../css/friendlist.module.scss'

import AddFriend from "../components/AddFriend";
import AddGroupSample from "../components/AddGroupSample";
import FriendProfileModal from '../components/FriendProfileModal';
import { getfriendList } from "../slice/friendSlice";
import { updateBtn } from "../slice/listArrayslice";

import { LuX } from "react-icons/lu";
import FriendCheckbox from "./FriendCheckbox";

// 내용추가

export default function FriendListModal({ modal }) {
    const navigate = useNavigate("");

    // 리덕스 저장 정보
    const user = useSelector((state) => state.user.user);
    const friend = useSelector((state) => state.friend.friend);
    const listArray = useSelector((state) => state.listArray.listArray);

    const dispatch = useDispatch();

    // 세션스토로지 저장 정보 (새.고 해도 OK인 정보 사용)
    const userData = JSON.parse(sessionStorage.getItem('user'));
    const friendData = JSON.parse(sessionStorage.getItem('friend'));
    const listArrayData = JSON.parse(sessionStorage.getItem('listArray'));

    useEffect(() => {
        if (!userData) {
            navigate('/login')
        }
    }, []);

    // 그룹 만들 선택 친구 배열 (값 props로 넘겨주기)
    const [selectFriends, setSelectFriends] = useState([]);

    // 체크한 친구값 저장하기
    const checkFriends = (f, e) => {
        if (e) {
            setSelectFriends([...selectFriends, f]);
        } else if (!e) {
            const newArray =
                selectFriends.filter(s => s.fid !== f.fid);
            setSelectFriends(newArray);
        }
    }
    // console.log(selectFriends);


    // 친구 삭제
    // const deleteFriend = (name, index) => {
    //     if (window.confirm(`${name}님을 차단하시겠습니까?`)) {
    //         dispatch(deletefriendList(index));
    //     }
    // };

    // 등록순, 이름순 정렬
    const [startdateBtn, setStartdateBtn] = useState(true);
    const [nameBtn, setNameBtn] = useState(true);

    // 등록순 정렬 관리 함수
    const handleDateSort = () => {
        if (startdateBtn) {
            const startdateDown = [...friendData].sort((a, b) => {
                const aDate = new Date(a.startDate.seconds * 1000 + a.startDate.nanoseconds / 1000000)
                const bDate = new Date(b.startDate.seconds * 1000 + b.startDate.nanoseconds / 1000000)
                // console.log(aDate);
                // console.log(bDate);
                // console.log(new Date(a.startDate) - new Date(b.startDate))

                return new Date(a.startDate) - new Date(b.startDate);
            });
            dispatch(getfriendList(startdateDown));
            setStartdateBtn(!startdateBtn);
            dispatch(updateBtn({ ...listArrayData, friendD: true, friendDup: true, friendNup: true }));
        } else {
            const startdateUP = [...friendData].sort((a, b) => {
                return new Date(b.startDate) - new Date(a.startDate);
            });
            dispatch(getfriendList(startdateUP));
            setStartdateBtn(!startdateBtn);
            dispatch(updateBtn({ ...listArrayData, friendD: true, friendDup: false, friendNup: true }));
        }
    }
    // 이름순 정렬 관리 함수
    const handleNameSort = () => {
        const nameUP = [...friendData].sort((a, b) => {
            return a.fName < b.fName ? -1 : a.fName > b.fName ? 1 : 0;
        });
        const nameDown = [...friendData].sort((a, b) => {
            return a.fName > b.fName ? -1 : a.fName < b.fName ? 1 : 0;
        });
        if (nameBtn) {
            dispatch(getfriendList(nameUP));
            setNameBtn(!nameBtn);
            dispatch(updateBtn({ ...listArrayData, friendD: false, friendDup: true, friendNup: true }));
        } else {
            dispatch(getfriendList(nameDown));
            setNameBtn(!nameBtn);
            dispatch(updateBtn({ ...listArrayData, friendD: false, friendDup: true, friendNup: false }));
        }
    }


    // 안내 팝업
    const [isPopup, setIsPopup] = useState(true);

    // 기본 친구리스트 보여지는 함수 ture,false 두명 다
    const [displayType, setDisplayType] = useState("");

    // A,B 버튼 이용하여 true,false 값 나타내는 함수
    const handleButtonClick = (type) => {
        setDisplayType(type);
    };

    // A,B 캘린더에 들어간 모든 사람 보이게 하는 함수
    const handleButtonClickC = (type) => {
        if (type === "all") {
            setDisplayType("");
        } else {
            setDisplayType(type);
        }
    };

    return (
        <div>
            {
                modal &&
                listArrayData &&
                <div className={`${list["wrap1"]}`}>
                    <div className={list["wrap1"]}>
                        <div className={list["wrap"]}>
                            <div>
                                {/**친구 상단버튼 */}
                                <div className={list["topbtn"]}>
                                    <div>
                                        <button
                                            className={`${list["moim-top-btn1"]} ${mainStyle["button"]}
                                            ${listArrayData.friendD ? list['on'] : list['off']}`}
                                            onClick={handleDateSort}
                                        >
                                            {
                                                listArrayData.friendDup ?
                                                    '등록순 ▼' : '등록순 ▲'
                                            }
                                        </button>
                                        <button
                                            className={`${list["moim-top-btn1"]} ${mainStyle["button"]} ${list[`${nameBtn}`]}
                                            ${!listArrayData.friendD ? list['on'] : list['off']}`}
                                            onClick={handleNameSort}
                                        >
                                            {
                                                listArrayData.friendNup ?
                                                    '이름순 ▲' : '이름순 ▼'
                                            }
                                        </button>
                                    </div>
                                    <div>
                                        <div className={mdl['add-f-btn-parent']}>
                                            <div className={mdl['btn-parent']}>
                                                <AddFriend />
                                            </div>
                                            친구추가
                                        </div>
                                    </div>
                                </div>
                                {/**친구별 */}
                                <div className={list["container2"]}>
                                    {friendData &&
                                        friendData
                                            // filter를 이용해 A버튼을 눌리면 A캘린더에 등록된 사람, B버튼을 눌리면 B캘린더에 등록된 사람만 나타내게 함
                                            .filter((friend) => (displayType === "" || (displayType === "A" && friend.showCalA) || (displayType === "B" && !friend.showCalA)))
                                            .map((friend, index) => (
                                                <div
                                                    className={list["box22"]}
                                                    key={index}
                                                    style={{
                                                        // ShowCalA 를 이용하여 A캘린더에 등록된사람은 #5567b1
                                                        // B캘린더에 등록된 사람은 #9ddce8 으로 뜨게 하기
                                                        backgroundColor: friend.showCalA ? "#5567b1" : "#9ddce8",
                                                        color: "white",
                                                        // fontStyle: friend.fState ? "normal" : "italic"
                                                    }}
                                                >
                                                    {/* <div className={friendlist["test2"]}> */}
                                                    <div className={list["text-box"]}>
                                                            <div className={`${list['btn-parent-friend']}`}>
                                                                <FriendProfileModal friend={{
                                                                        fid:friend.fid,
                                                                        name:friend.fName,
                                                                        photo:friend?.photo,
                                                                        email:friend.fEmail,
                                                                        birthday:friend?.birthday,
                                                                        // 친구 캘린더 데이터는 그냥 친구 uid와 동일
                                                                    }}/>
                                                            </div>
                                                        <FriendCheckbox f={friend} checkFriends={checkFriends} selectFriends={selectFriends}/>
                                                        {/* <button
                                                            className={`${list["delete1"]} ${mainStyle["button"]}`}
                                                            onClick={() => {
                                                                deleteFriend(friend.fName, index);
                                                            }}
                                                        >
                                                            <LuX />
                                                        </button> */}
                                                    </div>
                                                </div>
                                            ))}
                                    {/** 친구 추가 예시 li */}
                                    {
                                        friendData &&
                                            friendData.length > 0 ?
                                            ''
                                            :
                                            <div className={list["box2"]}>
                                                <div className={list["test2"]}>
                                                    <span className={list["color-gray"]}>
                                                        친구를 추가해주세요!
                                                    </span>
                                                </div>
                                            </div>
                                    }
                                </div>
                                {/** 친구 하단 버튼 */}
                                <div className={list["f-list-bt-wrap"]}>
                                    <div>
                                        <button
                                            className={`${list["eeee"]} ${mainStyle["button"]}`}
                                            onClick={() => {handleButtonClickC("all")}}
                                        >
                                            전체
                                        </button>
                                        <button
                                            className={`${list["eeee"]} ${mainStyle["button1"]}`}
                                            onClick={() => {handleButtonClick("A")}}
                                        >
                                            A
                                        </button>
                                        <button
                                            className={`${list["eeee"]} ${mainStyle["button2"]}`}
                                            onClick={() => {handleButtonClick("B")}}
                                        >
                                            B
                                        </button>
                                    </div>

                                    <div className={mdl['add-m-btn-parent']}>
                                        <AddGroupSample memberSelect={selectFriends} />
                                        선택 친구 모임만들기
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        isPopup &&
                        <div className={list['moim-popup']}>
                            <p>모임 멤버를 선택하고</p>
                            <p>모임 생성을 해주세요!</p>
                            <div onClick={() => setIsPopup(false)}>
                                <LuX />
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    );
}