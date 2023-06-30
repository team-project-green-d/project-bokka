import './App.css';
import { Route, Routes } from 'react-router-dom'
import Mypage from './pages/Mypage';
import List from './pages/List';
import Calender from './pages/Calender';
import Home from './pages/Home';
import Header from './components/Header';
import Login from './pages/Login';
import Join from './pages/Join';
import About from './pages/About';
import GroupDetail from './pages/GroupDetail';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { userLogin } from './slice/userSlice';
import { getgroupList } from './slice/groupSlice';
import { getfriendList } from './slice/friendSlice';
import Footer from './components/Footer'
import MainBg from './components/MainBg';
import Cursor from './components/CustomCursor';
import FriendCalendarModal from './components/FriendCalendarModal';


// 아이콘 라이브러리
// https://react-icons.github.io/react-icons/icons?name=bi
// https://react-icons.github.io/react-icons/icons?name=fi


function App() {

  // 로그인
  const dispatch = useDispatch();

  // 새로고침 할 때마다 확인 (f5)
  // app 컴포넌트는 한 번 마운트되고
  // 새로고침 또는 꺼질 때까지 마운트되지 않는다
  useEffect(() => {
    // 세션스톨로지에 저장된 'user'값은 객체가 아닌 String 값
    // 객체로 불러오기 위해선 JSON 파싱이 필요
    const user = JSON.parse(sessionStorage.getItem('user'));
    const friend = JSON.parse(sessionStorage.getItem('friend'));
    const group = JSON.parse(sessionStorage.getItem('group'));
    if (user) {
      dispatch(userLogin(user));
      dispatch(getgroupList(group));
      dispatch(getfriendList(friend));
    }
  }, [])


  return (
    <div className="App">

      {/* 마우스커서 변경 중 */}
      {/* <Cursor /> */}

      <Header />

      <Routes>

        {/* 은희 */}
        <Route path='/' element={<About/>} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/join' element={<Join />} />
        <Route path='/group/:gName' element={<GroupDetail />} />
        <Route path='/mainbg' element={<MainBg/>}/>

        {/* 슬린 */}
        <Route path='/mypage' element={<Mypage />} />

        {/* 대욱 */}
        <Route path='/list' element={<List />} />
        

        {/* 영환 */}
        <Route path='/calender' element={<Calender />} />
        <Route path='/fcalendar' element={<FriendCalendarModal/>}/>
      </Routes>

      {/* <Footer/> */}

    </div>
  );
}

export default App;
