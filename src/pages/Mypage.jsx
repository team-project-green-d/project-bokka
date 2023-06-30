import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyCalendar from "../pages/MyCalendar"
import main from '../css/sass.module.scss'
import mypage from '../css/mypage.module.scss'
import modal from '../css/modal.module.scss';


// react icon
import { LuCake, LuX, LuCheckSquare } from 'react-icons/lu';
import { FiEdit, FiPlus, FiAward } from "react-icons/fi";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import FriendProfileModal from '../components/FriendProfileModal';
import { useDispatch, useSelector } from 'react-redux';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../database/firebase';
import { userLogin, userLogout } from '../slice/userSlice';
import { deleteUser, signOut, updateProfile } from 'firebase/auth';
import MoimFriend from '../components/MoimFriend';
import FriendListModal from '../components/FriendListModal';
import GroupListModal from '../components/GroupListModal';

import ToDoList from '../components/TodoList'
import todo from '../css/todo.module.scss'


export default function MyPage() {
    //달력값
    const [nowdayA, setNowdayA] = useState(new Date());
    const [nowdayB, setNowdayB] = useState(new Date());

    const navigate = useNavigate('');

    // 유저 데이터 불러오기 - 리덕스
    const user = useSelector((state) => (state.user.user));
    const dispatch = useDispatch();

    // 세션스토로지 저장 정보 (새.고 해도 OK인 정보 사용)
    const userData = JSON.parse(sessionStorage.getItem('user'));
    const friendData = JSON.parse(sessionStorage.getItem('friend'));
    const groupData = JSON.parse(sessionStorage.getItem('group'));

    // 첫 페이지 유저 데이터 불러오기 - 파이어베이스
    useEffect(() => {
        //        console.log(user);
        if (userData) {
            getUserData();
        } else {
            navigate('/login')
        }
    }, [])

    // 파이어스토어 유저 데이터 불러오기
    async function getUserData() {
        const docSnap = await getDoc(doc(db, "users", userData.uid));
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            // 리덕스 업데이트
            dispatch(userLogin(docSnap.data()))
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    // profile 수정 버튼
    // 프로필 사진 업로드
    // firestore (실패! 이미지는 firebase에서 storage 따로 생성해 저장 필요한듯. 로컬에서는 변경됨)
    const uploadPhoto = (e) => {
        // 선택한 사진 값
        console.log(e.target.files[0]);
        // 선택 취소 시 오류 방지
        if (e.target.files[0] === undefined) { return -1; }

        const changePF = async () => {
            await updateDoc((doc(db, "users", userData.uid)), {
                // 문제점!!! 서버에 이미지 업로드 하려면 firebse storage 설정해야 하는듯
                // 이렇게는 로컬 주소만 업로드 되어서 이미지 안 나옴.
                photo: URL.createObjectURL(e.target.files[0])
            });
        }
        changePF();
        getUserData();

        setInputPhoto(URL.createObjectURL(e.target.files[0]));
    }

    // 프로필 닉네임, 생일 수정 버튼
    const [nameBtn, setNameBtn] = useState(false);
    const [birthBtn, setBirthBtn] = useState(false);
    // profile 수정 입력 (받아올 유저 데이터 초기값 입력)
    //const [inputName, setInputName] = useState(user.nickname);
    const [inputName, setInputName] = useState('');
    // const [inputBirth, setInputBirth] = useState(user.birthday);
    const [inputBirth, setInputBirth] = useState('');
    const [inputPhoto, setInputPhoto] = useState('');

    // 닉네임 변경 - firestore
    const changeName = async () => {
        if (inputName!='') {
            console.log(inputName);
            await updateDoc(doc(db, "users", userData.uid), {
                nickname: inputName,
            });
            getUserData();
            setNameBtn(!nameBtn); 
        } else {
            alert('이름은 비워둘 수 없습니다!')
        }
    }
    // 생일 변경 - firestore
    const changeBirth = async () => {
        console.log(inputBirth);
        await updateDoc(doc(db, "users", userData.uid), {
            birthday: inputBirth,
        });
        getUserData();
    }

    // 로그아웃 버튼 - 구글 & 보까 , 리덕스
    const onLogout = () => {
        signOut(auth).then(() => {
            // 리덕스에 있는 정보 삭제
            dispatch(userLogout());
            // 메인 화면으로 이동
            navigate('/');
        }).catch((error) => {
        });
    }

    // 회원 탈퇴
    const deleteUserId = () => {
        if (window.confirm('정말로 탈퇴하십니까?')) {
            const user = auth.currentUser;

            deleteUser(user).then(() => {
                // User deleted.
                dispatch(userLogout());
                navigate('/')
            }).catch((error) => {
                // An error ocurred
                // ...
            });
        }
        else {
        }
    }


    // 친구 많이/적게 만난 순 토글
    const [showBF, setShowBF] = useState(true);
    // 친구 프로필 모달 버튼
    const [showFP, setShowFP] = useState(false);

    const [friendSample, setFriendSample] = useState(friendData);

    const handleSort = () => {
        const sorted = [...friendSample].sort((a, b) => {
            return showBF ? b.meetCount - a.meetCount : a.meetCount - b.meetCount;
        });
        // console.log(sorted)
        setFriendSample(sorted);
        setShowBF(!showBF);
    };



    return (
        <div>
            {
                // 마이페이지 - 로그인 해야 볼 수 있음
                userData ?
                    <div className={`${main.wrap} ${mypage.mypage}`}>

                        <section className={mypage[`mypage-section`]}>

                            <div className={mypage[`mypage-section-content`]}>

                                {/** 왼쪽 묶음 (tablet 사이즈에서 보이는 구역)
                                프로필, 만난횟수, 캘린더A,B */}
                                <div className={mypage[`left-box`]}>

                                    {/** 프로필, 만난횟수 section - start */}
                                    <section className={mypage[`profile-section`]}>
                                        {/** 프로필 div */}
                                        <div className={`${main[`color-box`]} ${mypage.profile}`}>
                                            {/** 프로필 사진 영역 */}
                                            <div className={`${main[`color-box`]} ${mypage[`prof-img-wrap`]}`}>
                                                <img
                                                    // 서버의 user값에 업데이트 필요
                                                    src={userData.photo} alt="프로필사진"
                                                    className={`${mypage[`prof-img`]}`} />
                                                <div type="file" name="" id=""
                                                    className={`${mypage[`edit-btn-hover`]}`}
                                                >
                                                    <span>프로필 사진</span>
                                                    <span>
                                                        수정&nbsp;<FiEdit className={`${mypage[`edit-btn`]}`} />
                                                    </span>
                                                    <input type="file" name="profilePhoto" id="photo"
                                                        accept="image/png, image/jpeg, image/jpg"
                                                        className={`${mypage[`profile-photo-btn`]}`}
                                                        onChange={uploadPhoto}
                                                    />
                                                </div>
                                            </div>
                                            {/** 프로필 텍스트 영역 */}
                                            <div className={`${mypage[`prof-text`]}`}>
                                                <div>
                                                    <div className={mypage[`text-line`]}>
                                                        <input type="text" className={`${nameBtn ? mypage.on : mypage.off} ${mypage[`name-input`]}`}
                                                            style={{ height: '27px' }}
                                                            onChange={(e) => { setInputName(e.target.value); }}
                                                            placeholder='비워둘 수 없습니다'
                                                            value={inputName}
                                                        />
                                                        <span className={`${nameBtn ? mypage.off : mypage.on} ${mypage[`text-line-title`]}`}
                                                            style={{ height: '28px' }}
                                                        >{userData.nickname}&nbsp;</span>
                                                        <FiEdit
                                                            className={`${main[`main-color`]} ${mypage[`edit-btn`]} ${nameBtn ? mypage.off : mypage.on}`}
                                                            onClick={() => setNameBtn(!nameBtn)} />
                                                        <LuCheckSquare
                                                            className={`${main[`main-color`]} ${mypage[`edit-btn`]} ${nameBtn ? mypage.on : mypage.off} ${mypage[`check-btn`]}`}
                                                            onClick={() => { changeName(); }} />
                                                    </div>
                                                    <div className={mypage[`text-line`]}>
                                                        <span className={`${mypage.email}`}>{userData.email}</span>
                                                    </div>
                                                    <div className={mypage[`text-line`]}>
                                                        <LuCake style={{ fontSize: '17px' }} />
                                                        <input type="date" className={`${birthBtn ? mypage.on : mypage.off} ${mypage[`birthday-input`]}`}
                                                            style={{ height: '27px' }}
                                                            onChange={(e) => setInputBirth(e.target.value)}
                                                            value={inputBirth}
                                                            max="2030-12-31" min="1930-01-01" />
                                                        <span className={`${birthBtn ? mypage.off : mypage.on} ${mypage.birthday}`}
                                                            style={{ height: '25px' }}
                                                        >&nbsp;{userData.birthday}&nbsp;</span>
                                                        <FiEdit
                                                            className={`${main[`main-color`]} ${mypage[`edit-btn`]} ${birthBtn ? mypage.off : mypage.on}`}
                                                            onClick={() => setBirthBtn(!birthBtn)} />
                                                        <LuCheckSquare
                                                            className={`${main[`main-color`]} ${mypage[`edit-btn`]} ${birthBtn ? mypage.on : mypage.off} ${mypage[`check-btn`]}`}
                                                            onClick={() => { setBirthBtn(!birthBtn); changeBirth(); }} />
                                                    </div>
                                                </div>
                                                {/** 로그아웃 - 회원 탈퇴 버튼 */}
                                                <div className={`${mypage[`profile-btn`]}`}>
                                                    <div className={`${mypage[`quit-btn-wrap`]}`}>
                                                        <button className={`${mypage[`button`]} ${mypage[`quit-btn`]}`}
                                                            onClick={onLogout}
                                                        >로그아웃</button>
                                                    </div>
                                                    <div className={`${mypage[`quit-btn-wrap`]}`}>
                                                        <button className={`${mypage[`button`]} ${mypage[`quit-btn`]}`}
                                                            onClick={deleteUserId}
                                                        >회원탈퇴</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/** 만난횟수 div */}
                                        <div className={`${main[`color-box`]} ${mypage[`meet-count`]}`}>
                                            <button
                                                className={`${showBF ? mypage.on : mypage.off} ${mypage[`button`]}`}
                                                onClick={handleSort}
                                            >
                                                적게 만난순 ▲
                                            </button>
                                            <button
                                                className={`${showBF ? mypage.off : mypage.on} ${mypage[`button`]}`}
                                                onClick={handleSort}
                                            >
                                                많이 만난순 ▼

                                            </button>
                                            <ul className={`${mypage[`meet-list`]}`}>
                                                {
                                                    friendData ?
                                                    friendSample.map((friend, index) => (
                                                    <li key={index} className={`${mypage[`meet-list-li`]}`}>
                                                        {/* <div onClick={() => setShowFP(!showFP)}> */}
                                                        <div>
                                                            <span
                                                                className={`${main[`main-color`]}`}
                                                                onClick={() => setShowFP(!showFP)}
                                                            >
                                                                <div className={`${mypage['btn-parent']}`}>
                                                                    <FriendProfileModal friend={{
                                                                        fid:friend.fid,
                                                                        name:friend.fName,
                                                                        photo:friend?.photo,
                                                                        email:friend.fEmail,
                                                                        birthday:friend?.birthday,
                                                                        // 친구 캘린더 데이터는 그냥 친구 uid와 동일
                                                                    }}/>
                                                                </div>
                                                                {friend.fName}
                                                            </span>
                                                            님과 만난 횟수: {friend.meetCount}회&nbsp;
                                                        </div>
                                                        <FiAward style={{ display: 'none' }} className={`${mypage[`bf-icon`]}`} />
                                                    </li>
                                                ))
                                                :
                                                <li>친구가 없어요!</li>
                                            }
                                            </ul>
                                        </div>
                                    </section>
                                    {/** 프로필, 만난횟수 section - end */}

                                    {/** 캘린더 section - start */}
                                    <section className={`${mypage.calendar}`}>
                                        <div className={`${main[`main-color-box`]} ${mypage[`calendar-wrap`]}`}>
                                            <div className={`${mypage[`calendar-title-wrap`]}`}>
                                                <div
                                                    onClick={() => {
                                                        nowdayA.setDate(1)
                                                        setNowdayA(new Date(nowdayA.setMonth(nowdayA.getMonth() - 1)));
                                                    }}
                                                >
                                                    <RxDoubleArrowLeft />
                                                </div>
                                                <h4>캘린더 A</h4>
                                                <div
                                                    onClick={() => {
                                                        nowdayA.setDate(1)
                                                        setNowdayA(new Date(nowdayA.setMonth(nowdayA.getMonth() + 1)));
                                                    }}
                                                >
                                                    <RxDoubleArrowRight />
                                                </div>
                                            </div>
                                            <div className={`${mypage['calendar-box']} ${mypage.calendarA}`}>
                                                <MyCalendar nextmonth={nowdayA} choosecal={true} />
                                            </div>
                                            <div className={`${mypage[`calendar-list`]}`}></div>
                                        </div>
                                        <div className={`${main[`sub-color-box`]} ${mypage[`calendar-wrap`]}`}>
                                            <div className={`${mypage[`calendar-title-wrap`]} ${mypage[`calendar-b-box`]}`}>
                                                <div
                                                    onClick={() => {
                                                        nowdayB.setDate(1)
                                                        setNowdayB(new Date(nowdayB.setMonth(nowdayB.getMonth() - 1)));
                                                    }}
                                                >
                                                    <RxDoubleArrowLeft />
                                                </div>
                                                <h4>캘린더 B</h4>
                                                <div
                                                    onClick={() => {
                                                        nowdayB.setDate(1)
                                                        setNowdayB(new Date(nowdayB.setMonth(nowdayB.getMonth() + 1)));
                                                    }}
                                                >
                                                    <RxDoubleArrowRight />
                                                </div>
                                            </div>
                                            <div className={`${mypage['calendar-box']} ${mypage.calendarA}`}>
                                                <MyCalendar nextmonth={nowdayB} style={{ margin: 'auto' }} choosecal={false} />
                                            </div>
                                            {/* <div className={` ${mypage[`calendar-list`]}`}></div> */}
                                        </div>
                                    </section>
                                </div>
                                {/** 캘린더 section - end */}

                                {/** 오른쪽 묶음 (tablet 사이즈에서 내려가는 구역)
                            메모(투두리스트) */}
                                {/** 투두리스트 메모 section - start */}
                                <div className={todo['todo-app']}>
                                    <ToDoList />
                                </div>
                                {/** 투두리스트 메모 section - end */}

                            </div>

                        </section>


                        {/* 리스트 내용 => 메뉴로 이동 */}
                        {/* <section className={mypage[`mypage-section`]}>

                            <div className={mypage['my-list']}>
                                <div className={mypage['group-list']}>
                                    <GroupListModal modal={true} />
                                </div>
                                <div className={mypage['friend-list']}>
                                    <FriendListModal modal={true} />
                                </div>
                            </div>

                        </section> */}

                    </div>
                    :
                    <div className={`${mypage[`loading-mypage`]}`}>
                        <h1>LOADING...</h1>
                    </div>
            }
            {/* {
                // 친구 프로필 모달창 공간
                showFP ?
                    <div className={`${modal['btn-parent']}`}>
                        <FriendProfileModal fried={''} close={''} />
                    </div>
                    : ''
            } */}
        </div>
    )
}
