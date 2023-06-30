import React from 'react'
import mainStyle from '../css/sass.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import Toggle from "../components/Toggle";

import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../slice/userSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../database/firebase';

export default function Header() {

    const user = useSelector((state) => (state.user.user));
    const dispatch = useDispatch();

    const navigate = useNavigate('');

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

    return (
        <div className={mainStyle.header}>
            <div className={mainStyle['header-wrap']}>
                <div className={mainStyle['header-logo']}>
                    <Link to='/home'>
                        <img src="/img/bokka logo_kor01.jpg" alt="이미지" />
                    </Link>
                </div>

                <ul className={mainStyle['header-menu']}>
                    <li className={mainStyle['header-menu-li']}><Link to='/'>BOKKA</Link></li>
                    <li className={`${user?'':mainStyle['header-menu-li-pop']} ${mainStyle['header-menu-li']}`}><Link to='/list'>LIST</Link></li>
                    <li className={`${user?'':mainStyle['header-menu-li-pop']} ${mainStyle['header-menu-li']}`}><Link to='/mypage'>MYPAGE</Link></li>
                    {
                        user ?
                            <li className={mainStyle['header-menu-li']}
                                onClick={onLogout}
                            >LOGOUT</li>
                            : <li className={mainStyle['header-menu-li']}><Link to='/login'>LOGIN</Link></li>
                    }
                    <li><Toggle /></li>
                </ul>
            </div>
            {/* <Toggle/> */}
        </div>
    )
}