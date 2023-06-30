import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import chat from '../css/chat.module.scss';
import seeMoin from "../css/seeMoin.module.scss";
import mdl from '../css/modal.module.scss';
import tgl from '../css/tgl-sample.module.scss'

import { AiOutlineUser } from "react-icons/ai";
import { GrClose } from "react-icons/gr";


import { addDoc, collection, doc, getDoc, getDocs, or, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../database/firebase';

import { getgroupList } from '../slice/groupSlice';
import { addappointmentList, getappointmentList } from '../slice/appointmentSlice';
import FriendListModal from '../components/FriendListModal'


const Modal = ({ date }) => {


    const navigate = useNavigate('');
    const { gName } = useParams();
    // console.log(gName)

    // 로그인 안 되어있을 때 페이지X & 생성한 그룹이 없을 때 고려!!
    useEffect(() => {
        if (!group) {
            navigate('/login')
        }
    }, [])

    //////////////////////////// 약속 신청 모달
    const user = useSelector((state) => state.user.user)
    const group = useSelector((state) => state.group.group);
    const appoint = useSelector((state) => state.appointment.appointment)
    const dispatch = useDispatch();

    const groupData = JSON.parse(sessionStorage.getItem('group'));
    const listArray = JSON.parse(sessionStorage.getItem('listArray'));

    // // 약속을 잡을 (선택한) 그룹 아이디 들고오기 - 더미 데이터
    // 실제 :: useParams로 그룹의 주소값 들고오기 (친구 캘린더는 나중에)

    const selectGName = group.filter((g) => g.gName === gName);
    // console.log(selectGName[0])
    const [selectG, setSelectG] = useState(selectGName[0]);
    // console.log(selectG)

    // useState 데이터
    const [formData, setFormData] = useState({
        appointment: '',
        place: ''
    });

    useEffect(()=>{
        setSelectG(selectGName[0])
    },[group])

    // 더미 프로필 사진 데이터
    const photo = '/img/user_profile_photo.png';

    const { appointment, place } = formData;

    // input onChange
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // 약속 신청하기
    // 1. 친구 캘린더에서 빈 날짜 선택
    // 2. 그룹 캘린더에서 빈 날짜 선택
    const addAppointment = async () => {
        try {
            const isFormValid = () => {
                if ((appointment !== '') && (place !== '')) {
                    return false;
                }
                else {
                    return true;
                }
            };
            if (isFormValid()) {
                // console.log(isFormValid())
                alert('빈칸 없이 입력해 주세요!')
            } else {
                const appointdoc = doc(db, "groups", selectG.gid);
                console.log(appointdoc.id)
                console.log(selectG.gAppoint);
                const newAppointArray = selectG.gAppoint.concat({
                    title: appointment,
                    time: date,
                    place: place,
                    gName: selectG.gName,
                    gBoss: selectG.gBoss,
                    member: selectG.member
                }
                );
                console.log(newAppointArray);
                const newgroupAppoint = await updateDoc(appointdoc, {
                    gAppoint: newAppointArray
                });
                console.log(newgroupAppoint);
                // getAppointData();
                // console.log(formData);
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
                        console.log(aDate - bDate);
                        console.log(new Date(a.startDate) - new Date(b.startDate))
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
                alert('약속이 생성되었습니다.');
                closeModal();
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <div onClick={openModal} className={chat['chat-modal']}></div>

            {isOpen && (

                <div className={tgl["modal-m"]}>

                    <div className={tgl["modal-background"]}></div>

                    <div className={`${tgl["modal-content"]} ${mdl["appoint-modal-box"]}`}>

                        <div onClick={closeModal} className={tgl["modal-close"]}><GrClose /></div>

                        <div className={tgl["modal-container"]}>

                            <div className={tgl["content"]}>

                            <div className={chat['chat-form']}>
                                <div className={seeMoin['chat-div']}>
                                    <label>약속명</label>
                                    <input
                                        type="text"
                                        name="appointment"
                                        value={appointment}
                                        onChange={handleInputChange}
                                        className={chat['chat-form-text']}
                                        placeholder='비워둘 수 없습니다'
                                    />
                                </div>

                                {
                                    selectG.gName &&
                                    <div className={seeMoin['chat-div']}>
                                        <label>모임명</label>
                                        <input
                                            type="text"
                                            name="group"
                                            value={selectG.gName}
                                            disabled
                                            className={`${chat['chat-form-text']} ${chat['chat-group-name']}`}
                                        />
                                    </div>
                                }

                                <div className={seeMoin['chat-div']}>
                                    <label htmlFor="">참석자</label>
                                    <ul className={`${chat['people']}`}>
                                        <li>
                                            <div className={chat['people-photo-wrap']}
                                            // 방장
                                            >
                                                <img src={process.env.PUBLIC_URL + (selectG.gBoss.photo ? selectG.gBoss.photo : photo)} alt="" className={chat['people-photo']} />
                                            </div>
                                            <p className={chat['member-nick']}>{selectG.gBoss.nickname ? selectG.gBoss.nickname : ''}</p>
                                        </li>
                                        {
                                            // 멤버
                                            selectG.member.map((member) =>
                                                <li key={member.uid}>
                                                    <div className={chat['people-photo-wrap']}>
                                                        <img src={process.env.PUBLIC_URL + (member.photo ? member.photo : photo)} alt="" className={chat['people-photo']} />
                                                    </div>
                                                    <p className={`${chat['member-nick']}`}>{member.fName && member.fName}</p>
                                                </li>
                                            )
                                        }
                                    </ul>
                                </div>

                                <div className={seeMoin['chat-div']}>
                                    <label>날짜</label>
                                    <input
                                        type="date"
                                        name="time"
                                        value={date}
                                        // onChange={handleInputChange}
                                        className={chat['chat-form-text']}
                                        disabled
                                    // 날짜 임의로 바꿀 수 없게함 (등록된 날짜일 수도 있으니까)
                                    />
                                </div>
                                <div className={seeMoin['chat-div']}>
                                    <label>장소</label>
                                    <input
                                        type="text"
                                        name="place"
                                        value={place}
                                        onChange={handleInputChange}
                                        className={chat['chat-form-text']}
                                        placeholder='비워둘 수 없습니다'
                                    />
                                </div>
                            </div>

                            <div>
                                <button className={chat['last-btn']} onClick={addAppointment} type="button">
                                    <b>약속만들기</b>
                                </button>
                            </div>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

export default Modal;