import React, { useState } from 'react';
import tgl from '../css/tgl-sample.module.scss';
import mdl from '../css/modal.module.scss';
import mainStyle from '../css/sass.module.scss';
import { useSelector, useDispatch } from 'react-redux';

import { addfriendList, getfriendList } from '../slice/friendSlice'

// 닫기버튼 아이콘
import { GrClose } from "react-icons/gr";
import { db } from '../database/firebase';
import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';

//** 친구추가 모달창 */
const Modal = () => {
    // 유저 리덕스, 파이어스토어 정보 가져오기
    const user = useSelector((state) => (state.user.user));
    const friend = useSelector((state) => (state.friend.friend));
    const dispatch = useDispatch();

    // 모달 상태
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setSearchF('');
        setSelectF('');
        setSelectA(true);
    };

    // 친구 검색 입력
    const [inputId, setInputId] = useState('');
    const [searchF, setSearchF] = useState('');
    // 친구 추가 상태 선택
    const [selectF, setSelectF] = useState('');
    const [selectA, setSelectA] = useState(true);

    // 친구 검색 함수 - firestore
    const searchFriend = async () => {
        const userRef = collection(db, "users");

        const q = query(userRef, where("email", "==", inputId));
        const querySnapshot = await getDocs(q);

        let dataArray = [];
        querySnapshot.forEach((doc) => {
            dataArray.push({
                id: doc.id,
                ...doc.data()
            });
        });
        //        console.log(dataArray[0]);

        if (dataArray[0] == undefined) {
            alert('존재하지 않는 아이디입니다');
        }
        else {
            setSearchF(dataArray[0]);
        }
    }

    // 검색한 친구 선택 함수
    const selectFriend = () => {
        // 이미 추가된 친구일 경우 추가(선택) 안 됨. 메세지 띄우기
        // console.log(searchF.email);
        const checkFriend = async () => {
            const friendRef = collection(db, "friends", user.uid, "friendList");
            const q = query(friendRef, where("fEmail", "==", searchF.email));
            const fRef = await getDocs(q);

            let dataArray = [];
            fRef.forEach((doc) => {
                dataArray.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            if (dataArray[0]) {
                alert('이미 등록한 친구입니다');
            }
            else {
                setSelectF(searchF);
                setSearchF('');
            }
        }
        checkFriend();
    }

    // 파이어베이스 친구 리스트 불러오기 (최초)
    const getFriendData = async () => {
        let friendArray = [];
        const q = query(collection(db, "friends", user.uid, "friendList"));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            friendArray.push({
                ...doc.data(),
            });
        });
        // console.log(friend)
        //        setFriendList(friendArray);
    };


    // 친구 추가 함수 (친구(컬렉션) > 유저uid(문서) > 친구리스트(컬렉션))
    const addFriend = async () => {
        try {
            const friendRef = doc(collection(db, "friends", user.uid, 'friendList'));
            await setDoc(friendRef, {
                uid: user.uid,
                fid: selectF.uid,
                fName: selectF.nickname,
                fEmail: selectF.email,
                photo: selectF.photo,
                birthday: (selectF.birthday ? selectF.birthday : ''),
                showCalA: selectA,
                lastDate: null,
                meetCount: 0,
                fState: false, // 친구 수락하면 true가 된다
                startDate: new Date(), // 친구 등록일은 친구가 수락하면 생성
            });
            // console.log("Document written with ID: ", friendRef);
            // 리덕스 친구 리스트에 추가
            dispatch(addfriendList({
                uid: user.uid,
                fid: selectF.uid,
                fName: selectF.nickname,
                fEmail: selectF.email,
                photo: selectF.photo,
                birthday: (selectF.birthday ? selectF.birthday : ''),
                showCalA: selectA,
                lastDate: null,
                meetCount: 0,
                fState: false, // 친구 수락하면 true가 된다
                startDate: new Date(), // 친구 등록일은 친구가 수락하면 생성
            }))
            getFriendData();
            // console.log(friend);
            closeModal();
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }


    return (
        <div>   
            {/* <div onClick={openModal} className={`${modal["add-f-btn"]}`}></div> */}
            <div onClick={openModal} className={mdl["add-f-btn"]}></div>

            {isOpen && (

                <div className={tgl["modal-m"]}>

                    <div className={tgl["modal-background"]}></div>

                    <div className={`${tgl["modal-content"]} ${tgl["accept-a-modal-box"]}`}>

                            <div onClick={closeModal} className={tgl["modal-close"]}><GrClose/></div>
                            
                            <div className={tgl["modal-container"]}>

                                <div className={tgl["content"]}>

                                    <div className={tgl['modal-title']}>친구 신청</div>
                                    
                                    <div className={tgl['make-group']}>

                                        <div className={tgl['add-f-modal-form']}>
                                            
                                            <div className={tgl['add-f-modal-input']}>
                                                <label htmlFor="">친구 Email</label>
                                                <input type="text"
                                                    onChange={(e) => { setInputId(e.target.value) }}
                                                />
                                                <button className={`${tgl['search-btn']} ${mainStyle['button']}`}
                                                    onClick={searchFriend}
                                                >검색</button>
                                            </div>
                                            {
                                                // 친구 이름 검색 결과
                                                // css는 고치려니 오래 걸려서 나중에 고칠 것임
                                                searchF &&
                                                <div className={tgl['add-f-search-list']}>
                                                    <p>{searchF.nickname}</p>
                                                    <button
                                                        onClick={() => { selectFriend() }}
                                                        className={`${tgl['add-f-select-btn']} ${mainStyle['button']}`}
                                                    >선택</button>
                                                </div>
                                            }

                                            <div className={`${tgl['add-f-cal-btns']}`}>
                                                <button className={`${mainStyle['button3']}
                                                    ${selectA ? tgl['add-f-a-select'] : tgl['add-f-no-c-select']}
                                                `}
                                                    onClick={() => { setSelectA(true); }}
                                                >A 캘린더</button>
                                                <button className={`${mainStyle['button4']}
                                                    ${selectA ? tgl['add-f-no-c-select'] : tgl['add-f-b-select']}
                                                `}
                                                    onClick={() => { setSelectA(false); }}
                                                >B 캘린더</button>
                                            </div>

                                        </div>

                                        <div className={`${mdl['add-f-modal-text']}`}>
                                            {
                                                selectF ?
                                                    <p className={`${tgl['add-f-addfriend']}`}><b>{selectF.nickname}님</b>에게 친구신청을 하시겠습니까?</p>
                                                    :
                                                    <p className={`${tgl['add-f-addfriend']}`}>Email을 검색 후 친구신청을 해보세요</p>
                                            }
                                        </div>

                                        {/* <button className={`${tgl['last-btn']} ${mainStyle['button']}`}>모임만들기</button> */}
                                        <div className={mdl['accept-btn-wrap']}>
                                            <button className={`${tgl['add-f-last-btn']} ${mainStyle['button']}`}
                                                onClick={addFriend}
                                            >신청</button>
                                            <button className={`${tgl['add-f-last-btn']} ${mainStyle['button']}`}
                                                onClick={closeModal}
                                            >취소</button>
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