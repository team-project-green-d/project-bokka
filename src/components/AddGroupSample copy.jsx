import React, { useEffect, useState } from "react";
// import tgl from "../css/tgl.module.scss";
import tgl from "../css/tgl-sample.module.scss";
import mainStyle from '../css/sass.module.scss'


// 닫기버튼 아이콘
import { GrClose } from "react-icons/gr";
import { addDoc, collection, doc, getDocs, or, query, where } from "firebase/firestore";
import { db } from "../database/firebase";
import { useDispatch, useSelector } from "react-redux";
import { addgroupList, getgroupList } from "../slice/groupSlice";
import { userLogin } from "../slice/userSlice";


//** 모임 만들기 모달창 */
const Modal = () => {
    // 유저, 그룹 리덕스 가져오기
    const user = useSelector((state) => (state.user.user));
    const group = useSelector((state) => (state.group.group))
    const friend = useSelector((state) => (state.friend.friend));
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setInputGroupTitle('');
        setSelectGroupTitle('');
    };

    // 모임명 입력
    const [inputGroupTitle, setInputGroupTitle] = useState('');
    const [selectGroupTitle, setSelectGroupTitle] = useState('');
    // 더미데이터 선택친구
    const groupMemberSelect = [{ uid: "rKh1SQpdUfUpZRn44IsxgXWk5Qs1", nickname: "멤버이름1" }, { uid: "qiGFTWPHGrUUaO3BT6LnXJVKyer2", nickname: "멤버이름2" }];

    // 해당 유저가 속한 그룹 데이터 들고오기 - 최초 (파이어베이스)
    const getGroupData = async () => {
        let groupArray = [];
        const q = query(collection(db, "groups"), or(where("member", "array-contains", user.uid), where("gBoss", "==", user.uid)));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            groupArray.push({
                ...doc.data(),
            });
        });
        //        console.log(group)
        dispatch(getgroupList(groupArray));
    };

    // 모임 이름 중복 확인
    const checkMoimName = () => {
//        console.log(group);
        const check = group.filter((group) => group.gName == inputGroupTitle);
//        console.log(check[0])
        if (check[0]) {
            setInputGroupTitle('');
            alert('중복된 모임명입니다');
        }
        else if (inputGroupTitle=='') {
            alert('모임명을 입력해 주세요')
        }
        else {
            alert('사용 가능한 모임명입니다.');
            setSelectGroupTitle(inputGroupTitle);
        }
    }

    // 선택 친구로 모임 만들기
    const addMoim = async () => {
        if (selectGroupTitle=='') {
            alert('모임명을 입력해 주세요')
        } else {
            try {
                // 모임명 (내 모임 중에서) 중복 확인하기
                const groupRef = collection(db, "groups");
                await addDoc(groupRef, {
                    gName: selectGroupTitle,
                    member: groupMemberSelect,
                    startDate: new Date(), // 그룹 생성일
                    gAppoint: [], // 그룹 약속
                    gChat: [], // 그룹 채팅
                    gPhoto: [], // 그룹 앨범 사진
                    gCal: user.uid, // user.myCid, // 그룹 캘린더 시작값 (방장 캘린더 myCid 넣어야함, 유저 로그인 시 myCid도 불러오기)
                    gBoss: user, // 그룹 방장 (생성자 uid) 
                });
                // console.log("Document written with ID: ", groupRef);
                getGroupData();
                closeModal();
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    }

    return (
        <div>
            <div onClick={openModal}>모임 만들기</div>
            {isOpen && (
                <div className={tgl["modal-m"]}>
                    <div className={tgl["modal-background"]}>
                        <div className={tgl["modal-content"]}>
                            <div onClick={closeModal} className={tgl["modal-close"]}><GrClose /></div>
                            <div className={`${tgl["modal-container"]}`}>
                                <div className={`${tgl["content"]}`}>
                                    <div className={tgl['modal-title']}>모임만들기</div>
                                    <div className={tgl['modal-form']}>
                                        <div>
                                            <label htmlFor="" className={tgl['moim-label']}>모임명</label>
                                            <input type="text"
                                                onChange={(e) => { setInputGroupTitle(e.target.value) }} required/>
                                            <button className={`${mainStyle['search-btn']} ${mainStyle['button']}`}
                                                onClick={checkMoimName}
                                            >중복확인</button>
                                        </div>
                                        <div className={`${tgl['moim-member']}`}>
                                            <label htmlFor="" className={tgl['moim-label']}>모임 멤버</label>
                                            <ul className={`${tgl['moim-member-list']}`}>
                                                {
                                                    groupMemberSelect &&
                                                    groupMemberSelect.map((member) =>
                                                        <li key={member.uid}>
                                                            {member.nickname}
                                                        </li>
                                                    )
                                                }
                                                <li>dd</li>
                                                <li>dd</li>
                                                <li>dd</li>
                                                <li>dd</li>
                                            </ul>
                                            {/* css 보이는 게 애매해서 여유 되면 만들기 
                                            <button className={`${mainStyle['search-btn']} ${mainStyle['button']}`}>추가하기</button> */}
                                        </div>
                                    </div>
                                    <div className={tgl['make-group']}>
                                        {
                                            selectGroupTitle ?
                                            <p className={`${tgl['modal-quest']}`}><b>'{selectGroupTitle}' 모임</b>을 만드시겠습니까?</p>
                                            :
                                            <p className={`${tgl['modal-quest']}`}>생성할 모임명을 적어주세요.</p>
                                        }
                                        <button className={`${tgl['last-btn']} ${mainStyle['button']}`}
                                            onClick={addMoim}
                                        >모임만들기</button>
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
