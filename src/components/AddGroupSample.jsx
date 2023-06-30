import React, { useEffect, useState } from "react";
// import tgl from "../css/tgl.module.scss";
import tgl from "../css/tgl-sample.module.scss";
import mdl from '../css/modal.module.scss';
import mainStyle from '../css/sass.module.scss'


// 닫기버튼 아이콘
import { GrClose } from "react-icons/gr";
import { addDoc, collection, doc, getDoc, getDocs, or, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../database/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addgroupList, getgroupList } from "../slice/groupSlice";
import { userLogin } from "../slice/userSlice";
import { useNavigate } from "react-router-dom";
import { addfriendList } from "../slice/friendSlice";


//** 모임 만들기 모달창 */
const Modal = ({ memberSelect }) => {
    // 유저, 그룹 리덕스 가져오기
    const user = useSelector((state) => (state.user.user));
    const group = useSelector((state) => (state.group.group))
    const friend = useSelector((state) => (state.friend.friend));
    const dispatch = useDispatch();
    const navigate = useNavigate('');

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setInputGroupTitle('');
        setSelectGroupTitle('');
        setInputNick('');
        setSearchF('');
    };

    // 모임명 입력
    const [inputGroupTitle, setInputGroupTitle] = useState('');
    const [selectGroupTitle, setSelectGroupTitle] = useState('');

    const [searchF, setSearchF] = useState();
    const [newSelectMember, setNewSelectMember] = useState(memberSelect == undefined ? [] : memberSelect);
    const [inputNick, setInputNick] = useState('');


    useEffect(() => {
        setNewSelectMember(memberSelect == undefined ? [] : memberSelect);
    }, [memberSelect]);


    // 모임 이름 중복 확인
    const checkMoimName = () => {
        //        console.log(group);
        const check = group.filter((group) => group.gName == inputGroupTitle);
        //        console.log(check[0])
        if (check[0]) {
            setInputGroupTitle('');
            alert('중복된 모임명입니다');
        }
        else if (inputGroupTitle == '') {
            alert('모임명을 입력해 주세요')
        }
        else {
            alert('사용 가능한 모임명입니다.');
            setSelectGroupTitle(inputGroupTitle);
        }
    }


    // 친구 리스트에서 검색
    const searchFriend = async () => {
        const friendRef = collection(db, "friends", user.uid, "friendList");
        const q = query(friendRef, where("fName", "==", inputNick));
        const fRef = await getDocs(q);

        let dataArray = [];
        fRef.forEach((doc) => {
            dataArray.push({
                id: doc.id,
                ...doc.data()
            });
        });
        if (dataArray[0]) {
            // console.log(dataArray[0]);
            setSearchF(dataArray[0]);
        }
        else {
            alert('친구 목록에 없는 유저입니다!')
        }
    }


    // 검색하고 추가하기
    const addMember = () => {
        const checkFriend = () => {
            const check = newSelectMember.filter((f) => f.fName == searchF.fName )
            // console.log(check)
            if (check[0]) {
                alert('이미 추가된 멤버입니다');
            } else {
                const newArray = newSelectMember.concat(searchF);
                setNewSelectMember(newArray);
            }
        }
        checkFriend();
        // const totalArray = memberSelect.concat(newArray);
        // setTotalMember(totalArray);
    }
    // console.log(newSelectMember);


    // 선택 친구로 모임 만들기
    const addMoim = async () => {
        if (selectGroupTitle == '') {
            alert('모임명을 입력해 주세요')
        } else if (memberSelect && memberSelect.length < 1) {
            alert('그룹 멤버로 추가할 친구를 선택해 주세요!');
        } else {
            try {
                // 모임명 (내 모임 중에서) 중복 확인하기
                const groupRef = collection(db, "groups");
                const newDoc = await addDoc(groupRef, {
                    gid: '',
                });
                // console.log("Document written with ID: ", newDoc.id);
                await setDoc(newDoc, {
                    gid: newDoc.id,
                    gName: selectGroupTitle,
                    member: newSelectMember,
                    startDate: new Date(), // 그룹 생성일
                    gAppoint: [], // 그룹 약속
                    gChat: [], // 그룹 채팅
                    gPhoto: [], // 그룹 앨범 사진
                    gCal: '', // user.myCid, // 그룹 캘린더 시작값 (방장 캘린더 myCid 넣어야함, 유저 로그인 시 myCid도 불러오기)
                    gBoss: user, // 그룹 방장 (생성자 uid) 
                })
                dispatch(addgroupList({
                    gid: newDoc.id,
                    gName: selectGroupTitle,
                    member: newSelectMember,
                    startDate: new Date(), // 그룹 생성일
                    gAppoint: [], // 그룹 약속
                    gChat: [], // 그룹 채팅
                    gPhoto: [], // 그룹 앨범 사진
                    gCal: '', // user.myCid, // 그룹 캘린더 시작값 (방장 캘린더 myCid 넣어야함, 유저 로그인 시 myCid도 불러오기)
                    gBoss: user, // 그룹 방장 (생성자 uid) 
                }))
                closeModal();
                navigate(`/group/${selectGroupTitle}`)
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    }


    // 선택 멤버 삭제
    const memberDel = (fid) => {
        // ------------------------------------- 멤버 삭제 버튼 내용 넣어야함 ----------------------------------
        let newMemberlist = [];
        newMemberlist = newSelectMember.filter((m) => m.fid != fid);
        // console.log(newMemberlist);
        setNewSelectMember(newMemberlist);
    }

    return (
        <div className={mdl['btn-box']}>

            <div onClick={openModal} className={mdl["add-moim-btn"]}></div>

            {isOpen && (

                <div className={tgl["modal-m"]}>

                    <div className={tgl["modal-background"]}></div>

                    <div className={`${tgl["modal-content-group"]} ${tgl["accept-a-modal-box"]}`}>

                        <div onClick={closeModal} className={tgl["modal-close"]}><GrClose /></div>

                        <div className={tgl["modal-container"]}>

                            <div className={tgl["addmoim-conwrap"]}>

                                <div className={tgl['modal-title']}>모임만들기</div>

                                <div className={`${tgl['modal-form']} ${tgl['modal-form-group']}`} style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <label htmlFor="" className={tgl['moim-label']}>모임명</label>
                                        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                                            <input type="text" onChange={(e) => { setInputGroupTitle(e.target.value) }} required />
                                            <button className={`${mainStyle['select-button']} ${mainStyle['button']} ${tgl['search-btn']}`}
                                                onClick={checkMoimName}>중복확인
                                            </button>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <label htmlFor="" className={tgl['moim-label']}>친구 이름</label>
                                        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                                            <input type="text" onChange={(e) => { setInputNick(e.target.value) }} required />
                                            <button className={`${mainStyle['select-button']} ${mainStyle['button']} ${tgl['search-btn']}`}
                                                onClick={searchFriend}
                                            >검색하기</button>
                                        </div>
                                    </div>
                                    {
                                        // 친구 이름 검색 결과
                                        searchF &&
                                        <div className={`${tgl['add-f-search-list']} ${tgl['groupadd-search-list']}`}>
                                            <label htmlFor="">검색 결과</label>
                                            <p>{searchF.fName}</p>
                                            <button
                                                onClick={() => { addMember() }}
                                                className={`${tgl['add-f-btn']} ${mainStyle['button']}`}
                                            >추가</button>
                                        </div>
                                    }
                                    <div className={`${tgl['moim-member']}`}>
                                        <label htmlFor="" className={tgl['moim-label']}>모임 멤버</label>
                                        <ul className={`${tgl['moim-member-list']}`}>
                                            {
                                                newSelectMember &&
                                                    newSelectMember.length < 1 ?
                                                    <li className={tgl['moim-member-list-ex']}>
                                                        <p>추가된 모임 멤버가 없습니다.</p>
                                                        <p>친구 이름을 검색해 멤버로</p>
                                                        <p>추가해보세요.</p>
                                                    </li>
                                                    :
                                                    newSelectMember.map((member) => (
                                                        <li key={member.fid}>
                                                            {member.fName}
                                                            <div onClick={()=>memberDel(member.fid)}>
                                                                <GrClose />
                                                            </div>
                                                        </li>
                                                    ))
                                            }
                                        </ul>
                                    </div>
                                </div>

                                <div className={tgl['make-group']}>
                                    {
                                        selectGroupTitle ?
                                            <p className={`${tgl['modal-text-group']}`}><b>'{selectGroupTitle}' 모임</b>을 만드시겠습니까?</p>
                                            :
                                            <p className={`${tgl['modal-text-group']}`}>생성할 모임명을 적어주세요.</p>
                                    }

                                    <div className={mdl['accept-btn-wrap']}>
                                        <button className={`${tgl['last-btn']} ${mainStyle['button']}`}
                                            onClick={addMoim}
                                        >
                                            모임만들기
                                        </button>
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

export default Modal;