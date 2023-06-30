import { createSlice } from '@reduxjs/toolkit'
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from '../database/firebase';


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        seeAcal:true,
    },
    reducers: {
        // 로그인 했을 때, 값 넣는 리듀서
        userLogin: (state, action) => {
            state.user = action.payload;

            // 로그인 했을 때, 세션에 값 저장 (유저 로그인 정보는 세션 저장 필요)
            sessionStorage.setItem('user', JSON.stringify(action.payload))
        },
        // 로그아웃 했을 때, state의 값을 바꾸는 리듀서
        userLogout: (state) => {
            state.user = null;

            // 세션에 저장된 정보 삭제
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('friend');
            sessionStorage.removeItem('group');
            sessionStorage.removeItem('appointment');
            sessionStorage.removeItem('userMark');
            sessionStorage.removeItem('listArray');
        },
        //true이면 A캘린더가 볼 수 있도록 bool 값을 true로
        setTrue:(state)=>{
            state.seeAcal=true;
        },
        //false이면 B캘린더가 볼 수 있도록 bool 값을 false로
        setFalse:(state)=>{
            state.seeAcal=false;
        }
    }
})

// 유저 가입 여부 확인 함수 - firestore 작성
export const checkUser = (user) => async (dispatch) => {
    const docRef = await getDoc(doc(db, "users", user.uid))
    if (!docRef.exists()) {
        // 신규 회원가입 - firestore 작성
        await setDoc(doc(db, "users", user.uid), user);
    }
    else {
        // console.log('가입되어 있습니다.');
    }
    // 회원가입인지, 로그인인지 확인 후 로그인
    dispatch(userLogin(user));
}

// Action creators are generated for each case reducer function
export const { userLogin, userLogout,setFalse,setTrue } = userSlice.actions

export default userSlice.reducer