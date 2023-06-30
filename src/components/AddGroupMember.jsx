import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import mainStyle from "../css/sass.module.scss";
import list from "../css/list.module.scss";
import mdl from '../css/modal.module.scss';
import { useDispatch, useSelector } from "react-redux";
import AddFriend from "../components/AddFriend";
import AddGroupSample from "../components/AddGroupSample";
import { deletefriendList, getfriendList, noSessionfriendList } from "../slice/friendSlice";
import { LuX } from "react-icons/lu";
import { updateBtn } from "../slice/listArrayslice";
import friendlist from '../css/friendlist.module.scss'
import { db } from "../database/firebase";
import { collection, doc, getDocs, or, query, updateDoc, where } from "firebase/firestore";
import { getgroupList } from "../slice/groupSlice";
import FriendCheckbox from "./FriendCheckbox";

export default function AddGroupMember() {
    const navigate = useNavigate("");

    const {gName} = useParams();

    // 리덕스 저장 정보
    const user = useSelector((state) => state.user.user);
    const friend = useSelector((state) => state.friend.friend);
    const group = useSelector((state) => state.group.group);
    const listArray = useSelector((state) => state.listArray.listArray);
    const dispatch = useDispatch();

    // 세션스토로지 저장 정보 (새.고 해도 OK인 정보 사용)
    const userData = JSON.parse(sessionStorage.getItem('user'));
    const friendData = JSON.parse(sessionStorage.getItem('friend'));
    const groupData = JSON.parse(sessionStorage.getItem('group'));
    const listArrayData = JSON.parse(sessionStorage.getItem('listArray'));

    useEffect(()=>{
        if(!groupData) {
            navigate('/')
        }
    },[])

    const selectG = groupData && groupData.filter((g) => g.gName === gName)[0];
    // console.log(selectG);
    const mem = selectG && selectG.member.map(it=>it.fid);
    // console.log(mem);

    // 그룹 만들 선택 친구 배열 (값 props로 넘겨주기)
    const [selectFriends, setSelectFriends] = useState([]);
    
    // 모달 on off
    const [openModal, setOpenModal] = useState(false);
    
    // 이름순 정렬
    const [nameBtn, setNameBtn] = useState(true);
    // const [mem, setMem] = useState(selectG ? selectG.member.map(it=>it.fid) : []);
    const member = friendData && friendData.filter((f) => !mem.includes(f.fid));
    const [memArray, setMemArray] = useState(member);
    // console.log(memArray)
    // const fid = (friendData.map(it=>it.fid));
    // console.log(mem, fid)
    // console.log(friendData.filter((f) => !mem.includes(f.fid) ));

    useEffect(()=>{
        setMemArray(friendData && friendData.filter((f) => !mem.includes(f.fid)));
    },[group])

    // 이름순 정렬 관리 함수
    const handleNameSort = () => {
        const nameUP = [...memArray].sort((a, b) => {
            return a.fName < b.fName ? -1 : a.fName > b.fName ? 1 : 0;
        });
        const nameDown = [...memArray].sort((a, b) => {
            return a.fName > b.fName ? -1 : a.fName < b.fName ? 1 : 0;
        });
        if (nameBtn) {
            setMemArray(nameUP);
            setNameBtn(!nameBtn);
        } else {
            setMemArray(nameDown);
            setNameBtn(!nameBtn);
        }
    }

    // 체크한 친구값 저장하기
    const checkFriends = (f, e) => {
        if (e) {
            return setSelectFriends([...selectFriends, f]);
        } else if (!e) {
            const newArray =
                selectFriends.filter(s => s.fid !== f.fid);
            return setSelectFriends(newArray);
        }
    }
    // console.log(selectFriends);

    // 그룹 데이터 갱신 (그룹 멤버 추가)
    const addGroupMember = async () => {
        try {
            const newArray = selectG.member.concat(selectFriends);
            // console.log(selectG.gid);
            const memberdoc = doc(db, "groups", selectG.gid);
            const newMemberArray = await updateDoc(memberdoc, {
                member: newArray
            });
            // console.log(newMemberArray);

            const getGroupData = async () => {
                let groupArray = [];
                const q = query(
                    collection(db, "groups"),
                    or(
                        where("member", "array-contains", user.uid),
                        where("gBoss.uid", "==", user.uid)
                    )
                );
                const querySnapshot = await getDocs(q);

                querySnapshot.forEach((doc) => {
                    groupArray.push({
                        gid: doc.id,
                        ...doc.data(),
                    });
                });
                dispatch(getgroupList(groupArray));
                // console.log(groupArray);

                const startdateDown = [...groupArray].sort((a, b) => {
                    const aDate = new Date(a.startDate.seconds * 1000 + a.startDate.nanoseconds / 1000000)
                    const bDate = new Date(b.startDate.seconds * 1000 + b.startDate.nanoseconds / 1000000)
                    // console.log(aDate - bDate);
                    // console.log(new Date(a.startDate) - new Date(b.startDate))
                    if (isNaN(aDate - bDate) == true) {
                        return new Date(a.startDate) - new Date(b.startDate);
                    } else {
                        return aDate - bDate;
                    }
                });
                // console.log(startdateDown);
                dispatch(getgroupList(startdateDown));
            };
            getGroupData();
            setMemArray(friendData.filter((f) => !mem.includes(f.fid)));
            setSelectFriends([]);
            setOpenModal(false);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }


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
            <div onClick={() => setOpenModal(true)} className={mdl["add-f-btn"]}></div>
            {
                openModal &&
                listArrayData &&
                <div className={`${list["wrap-groupmem"]}`}>
                    <div className={list["container-groupmem"]}>
                        <div>
                            {/**친구 상단버튼 */}
                            <div className={list["topbtn"]}>
                                <button
                                    className={`${list["moim-top-btn1"]} ${mainStyle["button"]} ${list[`${nameBtn}`]}`}
                                    onClick={handleNameSort}
                                >
                                    {
                                        nameBtn ?
                                            '이름순 ▼' : '이름순 ▲'
                                    }
                                </button>
                                <button
                                    className={`${list["delete-groupmem"]} ${mainStyle["button"]}`}
                                    onClick={() => { setOpenModal(false); setSelectFriends([]); }} >
                                    <LuX />
                                </button>
                            </div>
                            {/**친구별 */}
                            <div className={list["container2"]}>
                                {memArray &&
                                    (
                                        memArray
                                        .filter((friend) => (displayType === "" || (displayType === "A" && friend.showCalA) || (displayType === "B" && !friend.showCalA)))
                                        .map((friend) => (
                                            <div
                                                className={list["list-box-groupmem"]}
                                                key={friend.fid}
                                                style={{
                                                    // ShowCalA 를 이용하여 A캘린더에 등록된사람은 #5567b1
                                                    // B캘린더에 등록된 사람은 #9ddce8 으로 뜨게 하기
                                                    backgroundColor: friend.showCalA ? "#5567b1" : "#9ddce8",
                                                    color: "white",
//                                                    fontStyle: friend.fState ? "normal" : "italic"
                                                }}
                                            >
                                                    <div className={list['list-container']}>
                                                {/* <div className={friendlist["test2-groupmem"]}>
                                                    <input
                                                        type="checkbox"
                                                        className={`${friendlist["checkbox2"]}`}
                                                        onChange={(e) => {
                                                            checkFriends(e.target.checked, friend);
                                                        }}
                                                    />
                                                    <div>
                                                        {friend.fName}
                                                    </div>
                                                </div> */}
                                                <FriendCheckbox f={friend} checkFriends={checkFriends} selectFriends={selectFriends}/>
                                </div>
                                            </div>)
                                        ))}
                            </div>
                            {/** 친구 하단 버튼 */}
                            <div className={list["ttt-groupmem"]}>
                                <div className={list["fff"]}>
                                    <button
                                        className={`${list["eeee"]} ${mainStyle["button"]}`}
                                        onClick={() => handleButtonClickC("all")}
                                    >
                                        전체
                                    </button>
                                    <button
                                        className={`${list["eeee"]} ${mainStyle["button1"]}`}
                                        onClick={() => handleButtonClick("A")}
                                    >
                                        A
                                    </button>
                                    <button
                                        className={`${list["eeee"]} ${mainStyle["button2"]}`}
                                        onClick={() => handleButtonClick("B")}
                                    >
                                        B
                                    </button>
                                </div>

                                <div>
                                    <button className={`${list["eeee"]} ${mainStyle["button"]}`}
                                        onClick={addGroupMember}
                                    >
                                        선택 멤버 추가하기
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* {
                        isPopup &&
                        <div className={list['moim-popup']}>
                            <p>모임 멤버를 선택하고</p>
                            <p>모임 생성을 해주세요!</p>
                            <div onClick={() => setIsPopup(false)}>
                                <LuX />
                            </div>
                        </div>
                    } */}
                </div>
            }
        </div>
    );
}