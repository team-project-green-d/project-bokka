import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import mainStyle from "../css/sass.module.scss";
import list from "../css/list.module.scss";

import mdl from '../css/modal.module.scss';

import { useDispatch, useSelector } from "react-redux";
import AddFriend from "../components/AddFriend";
import AddGroupSample from "../components/AddGroupSample";
import { deletefriendList } from "../slice/friendSlice";
import { LuX } from "react-icons/lu";

export default function MoimFriend({ modal }) {
    const navigate = useNavigate("");

    // 리덕스 저장 정보
    const user = useSelector((state) => state.user.user);
    const friend = useSelector((state) => state.friend.friend);

    const dispatch = useDispatch();

    // 세션스토로지 저장 정보 (새.고 해도 OK인 정보 사용)
    const userData = JSON.parse(sessionStorage.getItem('user'));
    const friendStorage = JSON.parse(sessionStorage.getItem('friend'));
    const [friendData, setFriendData] = useState(friendStorage);
    console.log(friendData)


    // 그룹 만들 선택 친구 배열 (값 props로 넘겨주기)
    const [selectFriends, setSelectFriends] = useState([]);
    // 넘겨줘야할정보
    //    const groupMemberSelect = [{ uid: "rKh1SQpdUfUpZRn44IsxgXWk5Qs1", nickname: "멤버이름1" }, { uid: "qiGFTWPHGrUUaO3BT6LnXJVKyer2", nickname: "멤버이름2" }];

    // 체크한 친구값 저장하기
    const checkFriends = (e, f) => {
        if (e == true) {
            let checkArray = selectFriends;
            const checkNew = {
                fid: f.fid,
                fName: f.fName,
            };
            checkArray.push(checkNew);
            return setSelectFriends(checkArray);
        } else {
            const newArray =
                selectFriends.filter(s => s.fid !== f.fid);
            return setSelectFriends(newArray);
        }
    }
    // console.log(selectFriends);

    // 등록순, 이름순 정렬
    const [startdateBtn, setStartdateBtn] = useState(true);
    const [nameBtn, setNameBtn] = useState(true);

    // 등록순 정렬 관리 함수
    const handleDateSort = () => {
        if (startdateBtn) {
            const startdateDown = [...friendData].sort(function (a, b) {
                console.log(new Date(a.startDate) - new Date(b.startDate))
                return a.startDate - b.startDate
            });
            // sessionStorage.setItem('friend', JSON.stringify(startdateDown));
            setFriendData(startdateDown);
            setStartdateBtn(!startdateBtn);
        } else {
            const startdateUP = [...friendData].sort(function (a, b) {
                return new Date(b.startDate) - new Date(a.startDate)
            });
            //   sessionStorage.setItem('friend', JSON.stringify(startdateUP));
            setFriendData(startdateUP);
            setStartdateBtn(!startdateBtn);
        }
    }
    // 이름순 정렬 관리 함수
    const handleNameSort = () => {
        const nameUP = [...friendData].sort(function (a, b) {
            return a.fName < b.fName ? -1 : a.fName > b.fName ? 1 : 0;
        });
        const nameDown = [...friendData].sort(function (a, b) {
            return a.fName < b.fName ? -1 : a.fName > b.fName ? 1 : 0;
        });
        if (nameBtn) {
            // sessionStorage.setItem('friend', JSON.stringify(nameUP));
            setFriendData(nameUP);
            setNameBtn(!nameBtn);
        } else {
            // sessionStorage.setItem('friend', JSON.stringify(nameDown));
            setFriendData(nameDown);
            setNameBtn(!nameBtn);
        }
    }


    // 친구 삭제
    const deleteFriend = (name, index) => {
        if (window.confirm(`${name}님을 차단하시겠습니까?`)) {
            dispatch(deletefriendList(index));
            setFriendData(JSON.parse(sessionStorage.getItem('friend')));
        }
    }
    return (
        <div>
            {
                modal &&
                <div className={`${list["wrap1"]}`}>
                    <div className={list["wrap1"]}>
                        <div className={list["wrap"]}>
                            <div>
                                {/**친구 상단버튼 */}
                                <div className={list["topbtn"]}>
                                    <div>
                                        <button
                                            style={startdateBtn ? { display: 'block' } : { display: 'none' }}
                                            className={`${list["moim-top-btn1"]} ${mainStyle["button"]} ${startdateBtn ? list['on'] : list['off']}`}
                                            onClick={handleDateSort}
                                        >
                                            등록순 ▼
                                        </button>
                                        <button
                                            style={startdateBtn ? { display: 'none' } : { display: 'block' }}
                                            className={`${list["moim-top-btn1"]} ${mainStyle["button"]} ${startdateBtn ? list['on'] : list['off']}`}
                                            onClick={handleDateSort}
                                        >
                                            등록순 ▲
                                        </button>
                                        <button
                                            style={nameBtn ? { display: 'block' } : { display: 'none' }}
                                            className={`${list["moim-top-btn1"]} ${mainStyle["button"]} ${list[`${nameBtn}`]}`}
                                            onClick={handleNameSort}
                                        >
                                            이름순 ▲
                                        </button>
                                        <button
                                            style={nameBtn ? { display: 'none' } : { display: 'block' }}
                                            className={`${list["moim-top-btn1"]} ${mainStyle["button"]} ${list[`${nameBtn}`]}`}
                                            onClick={handleNameSort}
                                        >
                                            이름순 ▼
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
                                    {
                                        friendData &&
                                        friendData.map((friend, index) => (
                                            <div
                                                className={list["box2"]}
                                                key={index}
                                                style={
                                                    friend.fState
                                                        ? { color: "#4a4b4d" }
                                                        : { color: "#d4d4d4", fontStyle: "italic" }
                                                }
                                            >
                                                <div className={list["test2"]}>
                                                    <input
                                                        type="checkbox"
                                                        className={`${list["checkbox2"]}`}
                                                        onChange={(e) => { checkFriends(e.target.checked, friend) }}
                                                    />
                                                    {friend.fName}
                                                    <button
                                                        className={`${list["delete"]} ${mainStyle["button"]}`}
                                                        onClick={() => { deleteFriend(friend.fName, friend.fid) }}
                                                    >
                                                        <LuX />
                                                    </button>
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
                                                    {/* <input
                                                    type="checkbox"
                                                    className={`${list["checkbox2"]}`}
                                                    disabled
                                                /> */}
                                                    <span className={list["color-gray"]}>
                                                        친구를 추가해주세요!
                                                    </span>
                                                    {/* <button
                                                    className={`${list["delete"]} ${mainStyle["button"]}`}
                                                    disabled
                                                >
                                                    <LuX />
                                                </button> */}
                                                </div>
                                            </div>
                                    }
                                </div>
                                {/** 친구 하단 버튼 */}
                                <div className={list["ttt"]}>
                                    <div className={list["fff"]}>
                                        <button className={`${list["eeee"]} ${mainStyle["button"]}`}>
                                            A
                                        </button>
                                        <button className={`${list["eeee"]} ${mainStyle["button"]}`}>
                                            B
                                        </button>
                                    </div>

                                    <div className={list["chingu-under-btn"]}>
                                        <button className={`${list["eeee"]} ${mainStyle["button"]}`}>
                                            <AddGroupSample memberSelect={selectFriends} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}