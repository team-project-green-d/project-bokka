import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import mainStyle from "../css/sass.module.scss";
import list from "../css/list.module.scss";

import { useDispatch, useSelector } from "react-redux";

import { deletegroupList, getgroupList } from '../slice/groupSlice';
import { LuX } from "react-icons/lu";
import { updateMark } from "../slice/markSlice";
import { FaHeart } from 'react-icons/fa'
import { FiHeart } from 'react-icons/fi'
import { updateBtn } from "../slice/listArrayslice";

export default function GroupListModal() {
    const navigate = useNavigate("");

    // 리덕스 저장 정보
    const user = useSelector((state) => state.user.user);
    const friend = useSelector((state) => state.friend.friend);
    const group = useSelector((state) => state.group.group);
    const userMark = useSelector((state) => state.userMark.userMark);
    const listArray = useSelector((state) => state.listArray.listArray);

    const dispatch = useDispatch();

    // 세션스토로지 저장 정보 (새.고 해도 OK인 정보 사용)
    const userData = JSON.parse(sessionStorage.getItem('user'));
    const groupData = JSON.parse(sessionStorage.getItem('group'));
    const markData = JSON.parse(sessionStorage.getItem('userMark'));
    const listArrayData = JSON.parse(sessionStorage.getItem('listArray'));

    useEffect(() => {
        if (!userData) {
            navigate('/login')
        }
    }, []);

    const deleteGroup = (gName, index) => {
        if (window.confirm(`정말로 ${gName} 모임에서 나가시겠습니까?`)) {
            const newArray = markData.filter(s => s !== gName);
            dispatch(updateMark(newArray));
            dispatch(deletegroupList(index));
        }
    }

    const markGroup = (gName) => {
        if (markData.length < 4) {
            const newArray = markData.concat(gName);
            dispatch(updateMark(newArray));
            alert('관심 모임으로 등록되었습니다!')
            navigate('/home')
        } else {
            alert('관심 모임은 최대 4개까지 설정할 수 있습니다');
        }
    }

    const unmarkGroup = (gName) => {
        const newArray = markData.filter(s => s !== gName);
        dispatch(updateMark(newArray));
    }
    // console.log(userMark);

    // 등록순, 이름순 정렬
    const [startdateBtn, setStartdateBtn] = useState(true);
    const [nameBtn, setNameBtn] = useState(true);

    // 등록순 정렬 관리 함수
    const handleDateSort = () => {
        if (startdateBtn) {
            const startdateDown = [...groupData].sort((a, b) => {
                const aDate = new Date(a.startDate.seconds * 1000 + a.startDate.nanoseconds / 1000000)
                const bDate = new Date(b.startDate.seconds * 1000 + b.startDate.nanoseconds / 1000000)
                console.log(aDate - bDate);
                console.log(new Date(a.startDate) - new Date(b.startDate))
                if (isNaN(aDate - bDate) == true) {
                    return new Date(a.startDate) - new Date(b.startDate);
                } else {
                    return aDate - bDate;
                }
            });
            dispatch(getgroupList(startdateDown));
            setStartdateBtn(!startdateBtn);
            dispatch(updateBtn({ ...listArrayData, groupD: true, groupDup: true, groupNup: true }));

        } else {
            const startdateUP = [...groupData].sort((a, b) => {
                const aDate = new Date(a.startDate.seconds * 1000 + a.startDate.nanoseconds / 1000000)
                const bDate = new Date(b.startDate.seconds * 1000 + b.startDate.nanoseconds / 1000000)
                if (isNaN(bDate - aDate) == true) {
                    return new Date(b.startDate) - new Date(a.startDate);
                } else {
                    return bDate - aDate;
                }
            });
            dispatch(getgroupList(startdateUP));
            setStartdateBtn(!startdateBtn);
            dispatch(updateBtn({ ...listArrayData, groupD: true, groupDup: false, groupNup: true }));
        }
    }
    // 이름순 정렬 관리 함수
    const handleNameSort = () => {
        const nameUP = [...groupData].sort((a, b) => {
            return a.gName < b.gName ? -1 : a.gName > b.gName ? 1 : 0;
        });
        const nameDown = [...groupData].sort((a, b) => {
            return a.gName > b.gName ? -1 : a.gName < b.gName ? 1 : 0;
        });
        if (nameBtn) {
            dispatch(getgroupList(nameUP));
            setNameBtn(!nameBtn);
            dispatch(updateBtn({ ...listArrayData, groupD: false, groupDup: true, groupNup: true }));

        } else {
            dispatch(getgroupList(nameDown));
            setNameBtn(!nameBtn);
            dispatch(updateBtn({ ...listArrayData, groupD: false, groupDup: true, groupNup: false }));

        }
    }

    return (
        markData &&
        <div className={`${list["wrap1"]} ${list['group-wrap']}`}>
            <div className={list["wrap"]}>
                <div>
                    {/**모임 상단버튼 */}
                    <div className={list["topbtn"]}>
                        <div>
                            <button
                                className={`${list["moim-top-btn1"]} ${mainStyle["button"]}
                                ${listArrayData.groupD ? list['on'] : list['off']}`}
                                onClick={handleDateSort}
                            >
                                {
                                    listArrayData.groupDup ?
                                        '등록순 ▼' : '등록순 ▲'
                                }
                            </button>
                            <button
                                className={`${list["moim-top-btn1"]} ${mainStyle["button"]} ${list[`${nameBtn}`]}
                                ${!listArrayData.groupD ? list['on'] : list['off']}`}
                                onClick={handleNameSort}
                            >
                                {
                                    listArrayData.groupNup ?
                                        '이름순 ▲' : '이름순 ▼'
                                }
                            </button>
                        </div>
                    </div>
                    {/**모임별 */}
                    <div className={list["container"]}>
                        {
                            groupData &&
                            groupData.map((group, index) => (
                                <div className={`${list["box"]}`} key={index}>
                                    <div className={list["test"]}>
                                        <button className={`${list["heart"]} ${mainStyle["button"]}`}
                                            onClick={() => { markGroup(group.gName) }}
                                            style={
                                                group.gName == markData[0] ? { display: 'none' }
                                                    : group.gName == markData[1] ? { display: 'none' }
                                                        : group.gName == markData[2] ? { display: 'none' }
                                                            : group.gName == markData[3] ? { display: 'none' }
                                                                : { display: 'inline-block' }
                                            }
                                        >
                                            <FiHeart />
                                        </button>
                                        <button className={`${list["heart"]} ${mainStyle["button"]}`}
                                            onClick={() => { unmarkGroup(group.gName) }}
                                            style={
                                                group.gName == markData[0] ? { display: 'inline-block' }
                                                    : group.gName == markData[1] ? { display: 'inline-block' }
                                                        : group.gName == markData[2] ? { display: 'inline-block' }
                                                            : group.gName == markData[3] ? { display: 'inline-block' }
                                                                : { display: 'none' }
                                            }
                                        >
                                            <FaHeart />
                                        </button>
                                        <Link to={`/group/${group.gName}`} className={list['group-link']}>
                                            <span>{group.gName}</span>
                                        </Link>

                                        <button className={`${list["delete"]} ${mainStyle["button"]}`}
                                            onClick={() => { deleteGroup(group.gName, index) }}
                                        >
                                            <LuX />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        {/** 모임 추가 예시 li */}
                        {
                            groupData &&
                                groupData.length > 0 ?
                                ''
                                :
                                <div className={`${list["box"]}`}>
                                    <div className={list["test"]}>
                                        <span className={list["color-gray"]}>모임을 추가해주세요!</span>
                                    </div>
                                </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}
