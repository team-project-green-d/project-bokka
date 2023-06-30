import React, { useState } from 'react'
import mainStyle from '../css/sass.module.scss'
import loginStyle from '../css/login.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth, db } from '../database/firebase';
import { checkUser } from '../slice/userSlice';
import { useNavigate } from 'react-router-dom';
import { getgroupList } from '../slice/groupSlice';
import { getfriendList } from '../slice/friendSlice';
import { collection, getDocs, or, orderBy, query, where } from 'firebase/firestore';
import { getappointmentList } from '../slice/appointmentSlice';
import MainBg from '../components/MainBg';
import { updateMark } from '../slice/markSlice';
import { updateBtn } from '../slice/listArrayslice';

export default function Login() {

    const user = useSelector((state) => (state.user.user));
    const friend = useSelector((state) => state.friend.friend);
    const group = useSelector((state) => state.group.group);
    const appoint = useSelector((state) => state.appointment.appointment);
    const dispatch = useDispatch();

    const groupData = JSON.parse(sessionStorage.getItem('group'));

    const navigate = useNavigate('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // 파이어베이스 친구 데이터 들고오기 함수
    const getFriendData = async (uid) => {
        let friendArray = [];
        const q = query(collection(db, "friends", uid, "friendList"), orderBy("startDate"));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            friendArray.push({
                ...doc.data(),
                startDate : new Date(doc.data().startDate.seconds * 1000 + doc.data().startDate.nanoseconds / 1000000)
            });
        });
        dispatch(getfriendList(friendArray));
        // console.log(friendArray);
    };
    // 파이어베이스 그룹 데이터 들고오기 함수
    const getGroupData = async (uid) => {
        let groupArray = [];
        const q = query(
            collection(db, "groups"),
            or(
                where("member", "array-contains", uid),
                where("gBoss.uid", "==", uid)
            )
        );
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            groupArray.push({
                gid: doc.id,
                ...doc.data(),
                startDate : new Date(doc.data().startDate.seconds * 1000 + doc.data().startDate.nanoseconds / 1000000)
            });
        });
        dispatch(getgroupList(groupArray));
        // console.log(groupArray);

        const handleDateSort = () => {
            const groupData = JSON.parse(sessionStorage.getItem('group'));
                const startdateDown = [...groupData].sort((a, b) => {
                    const aDate = new Date(a.startDate.seconds * 1000 + a.startDate.nanoseconds / 1000000)
                    const bDate = new Date(b.startDate.seconds * 1000 + b.startDate.nanoseconds / 1000000)
                    // console.log(aDate-bDate);
                    // console.log(new Date(a.startDate) - new Date(b.startDate))
                    if (isNaN(aDate - bDate)==true) {
                        return new Date(a.startDate) - new Date(b.startDate);
                    } else {
                        return aDate - bDate;
                    }
                });
                dispatch(getgroupList(startdateDown));
        }
        handleDateSort();
    };


    // 구글 회원가입 + 로그인
    const onGoogleLogin = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // 구글로 로그인 후 정보값 가져옴
                const user = result.user;
                // console.log(user);
                // 로그인 했다면, uid를 확인 후 firestore에 저장
                dispatch(checkUser({
                    uid: user.uid,
                    email: user.email,
                    nickname: user.displayName,
                    photo: user.photoURL,
                }));

                getFriendData(user.uid);

                getGroupData(user.uid);

                // 유저 관심 그룹 데이터
                const markArray = [];
                dispatch(updateMark(markArray));

                // 유저 등록순 이름순 버튼 데이터
                dispatch(updateBtn({
                    groupD: true, // 그룹 리스트 등록순으로 정렬 (초기값)
                    groupDup: true, // 그룹 리스트 등록순
                    groupNup: true,  // 그룹 리스트 이름순
                    friendD: true,
                    friendDup: true,
                    friendNup: true,
                }));
                navigate('/home');
            }).catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;
                // const email = error.customData.email;
                // const credential = GoogleAuthProvider.credentialFromError(error);
                // console.log(errorCode, errorMessage, email, credential);
                alert('구글 로그인에 실패했습니다.');
            });
    }

    // 보까 회원가입 로그인
    const onBokkaCreate = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // 로그인 했다면, uid를 확인 후 firestore에 저장
                dispatch(checkUser({
                    uid: user.uid,
                    email: user.email,
                    nickname: 'user1',
                    photo: `${process.env.PUBLIC_URL}/img/user_profile_photo.png`,
                    birthday: '',
                    likeGroup: [], // 관심 모임
                    friendList: [], // 친구 uid 컬렉션
                    groupList: [], // 그룹 gid 컬렉션
                    myCid: user.uid, // 마이캘린더 컬렉션
                    todoid: user.uid, // 투두 메모 컬렉션
                }));

                getFriendData(user.uid);

                getGroupData(user.uid);

                // 유저 관심 그룹 데이터
                const markArray = [];
                dispatch(updateMark(markArray));

                // 유저 등록순 이름순 버튼 데이터
                dispatch(updateBtn({
                    groupD: true,
                    groupDup: true,
                    groupNup: true,
                    friendD: true,
                    friendDup: true,
                    friendNup: true,
                }));
                navigate('/home');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                if (errorCode=='auth/weak-password') {
                    alert('6자리 이상의 비밀번호를 사용해 주세요!')
                } else if (errorCode=='auth/email-already-in-use') {
                    alert('이미 가입한 유저입니다!');
                } 
            });
    }

    // 보까 로그인
    const onBokkaLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch(checkUser({
                    uid: user.uid,
                    email: user.email,
                    nickname: user.nickname,
                    photo: user.photo,
                    birthday: user.birthday,
                    likeGroup: user.likeGroup,
                    friendList: user.friendList,
                    groupList: user.groupList,
                    myCid: user.myCid,
                    todoid: user.todoid,
                }));

                getFriendData(user.uid);

                getGroupData(user.uid);

                // 유저 관심 그룹 데이터
                const markArray = [];
                dispatch(updateMark(markArray));

                // 유저 등록순 이름순 버튼 데이터
                dispatch(updateBtn({
                    groupD: true, // 그룹 리스트 등록순으로 정렬 (초기값)
                    groupDup: true, // 그룹 리스트 등록순
                    groupNup: true,  // 그룹 리스트 이름순
                    friendD: true,
                    friendDup: true,
                    friendNup: true,
                }));
                navigate('/home');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('로그인 실패')
                alert('아이디나 비밀번호가 잘못되었습니다!');
            });
    }

    return (
        <div>

            <div className={loginStyle['main-bg']}><MainBg/></div>

            {/* <div className={`${mainStyle['wrap']} ${loginStyle['login-content']}`}> */}
            <div className={loginStyle['login-content']}>

                <div className={`${loginStyle['login-box']} ${mainStyle['color-box']}`}>

                    <form className={loginStyle['login-wrap']}
                        onSubmit={onBokkaCreate}
                    // 회원가입 form
                    >

                        <div className={loginStyle['login-wrap-div']}
                        >
                            <div className={loginStyle['login-label']}><label htmlFor="">Email</label></div>
                            <input type="email"
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                        </div>

                        <div className={loginStyle['login-wrap-div']}
                        >
                            <div className={loginStyle['login-label']}><label htmlFor="">Password</label></div>
                            <input type="password"
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                        </div>

                        <button className={`${loginStyle['join-btn']}`}

                        >회원가입</button>
                        <button type='button' className={`${loginStyle['login-btn']}`}
                            onClick={onBokkaLogin}
                        >로그인</button>

                    </form>

                    <div className={loginStyle['google-login']}
                        onClick={onGoogleLogin}
                    >
                        <div className={loginStyle['google-text']}>
                            <img src={process.env.PUBLIC_URL + '/img/google_logo.png'} alt="이미지" />
                            <span>구글로그인</span>
                        </div>
                    </div>


                </div>
            </div>

        </div>
    )
}
