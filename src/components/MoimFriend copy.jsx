import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import mainStyle from "../css/sass.module.scss";
import list from "../css/list.module.scss";

import { useDispatch, useSelector } from "react-redux";

import FriendListModal from '../components/FriendListModal'
import GroupListModal from '../components/GroupListModal';

export default function MoimFriend() {
    const navigate = useNavigate("");

    // 리덕스 저장 정보
    const user = useSelector((state) => state.user.user);
    const friend = useSelector((state) => state.friend.friend);
    const group = useSelector((state) => state.group.group);

    const dispatch = useDispatch();

    // 세션스토로지 저장 정보 (새.고 해도 OK인 정보 사용)
    const userData = JSON.parse(sessionStorage.getItem('user'));
    const friendData = JSON.parse(sessionStorage.getItem('friend'));
    const groupData = JSON.parse(sessionStorage.getItem('group'));

    useEffect(() => {
        if (!userData) {
            navigate('/login')
        }
        // 첫 랜딩 페이지 데이터 불러오기... 였는데 일단 필요 없어짐!!!
        // 혹시 몰라서 주석으로는 남겨둡니다.
        //     if (userData) {
        //         // 로그인 시에만 데이터 보임
        //         // 파이어베이스 친구 리스트 불러오기 (최초)
        //         // console.log(userData.uid)
        //         const getFriendData = async () => {
        //             let friendArray = [];
        //             const q = query(collection(db, "friends", userData.uid, "friendList"));
        //             const querySnapshot = await getDocs(q);

        //             querySnapshot.forEach((doc) => {
        //                 friendArray.push({
        //                     ...doc.data(),
        //                 });
        //             });
        //             dispatch(getfriendList(friendArray));
        //             console.log(friendArray);
        //             //    setFriendList(friendArray);
        //         };
        //         getFriendData();
        //         // 해당 유저가 속한 그룹 데이터 들고오기 - 최초 (파이어베이스)
        //         const getGroupData = async () => {
        //             let groupArray = [];
        //             const q = query(
        //                 collection(db, "groups"),
        //                 or(
        //                     where("member", "array-contains", userData.uid),
        //                     where("gBoss", "==", userData.uid)
        //                 )
        //             );
        //             const querySnapshot = await getDocs(q);

        //             querySnapshot.forEach((doc) => {
        //                 groupArray.push({
        //                     ...doc.data(),
        //                 });
        //             });
        //             dispatch(getgroupList(groupArray));
        //             console.log(group);
        //         };
        //         getGroupData();
        //     }
    }, []);

    // 삭제 할 친구 리스트
    const [deleteF, setDeleteF] = useState();

    // // 친구 추가 시 업데이트
    // 이게 무한루프 걸렸을 가능성 99퍼!!!
    // useEffect(() => {
    //     getFriendData(); // 파이어베이스
    //     // 리덕스의 값을 setState
    // }, [friend])

    // 선택 모임 배열
    const [selectGroups, setSelectGroups] = useState();
    // 선택 친구 배열
    const [selectFriends, setSelectFriends] = useState();

    // const examplelist=["NsI1G1WVO1BHePB7O0WI","PTew9hWX5uDkxDxmhwBy"]
    // 선택 친구, 모임 삭제 - 영환씨 담당
    /*
    const deleteFriend = async () => { 
        for(let i=0;i<examplelist.length;i++)
        {await deleteDoc(doc(db,"/friends/pbBFVLt1UFWEFCqEOS35X4DT2lJ2/friendList",examplelist[i]))}
    };
    */
    return (
        <div className={`${list["moim-wrap-box"]}`}>
            <GroupListModal />
            <FriendListModal />
        </div>
    );
    /////////////////// 원래 있던 모임+친구 전체 리스트 내용 (각 컴포넌트로 옮겨서 삭제해도 되는 내용입니다. 머지 충돌 오류 백업용으로 남겨둠.)
    // return (
    //     <div className={`${list["wrap1"]} ${list["wrap-box"]}`}>
    //         <div className={list["wrap"]}>
    //             <div className={list[""]}>
    //                 {/**모임 상단버튼 */}
    //                 <div className={list["topbtn"]}>
    //                     <button
    //                         className={`${list["moim-top-btn1"]} ${mainStyle["button"]}`}
    //                     >
    //                         등록순 ▲
    //                     </button>
    //                     <div>
    //                         <button
    //                             className={`${list["moim-top-btn1"]} ${mainStyle["button"]}`}
    //                         >
    //                             이름순 ▼
    //                         </button>
    //                     </div>
    //                     <div>
    //                         <button
    //                             className={`${list["moim-top-btn1"]} ${mainStyle["button"]}`}
    //                         >
    //                             ♥
    //                         </button>
    //                     </div>
    //                     {/* <div>
    //                         <button className={`${list['moim-top-btn1']} ${list['moim-top-btn5']} ${mainStyle['button']}`}>
    //                             모임 추가
    //                         </button>
    //                     </div> */}
    //                 </div>
    //                 {/**모임별 */}
    //                 <div className={list["container"]}>
    //                     {
    //                         groupData &&
    //                         groupData.map((group) => (
    //                         <div className={list["box"]} key={group.gid}>
    //                             <div className={list["test"]}>
    //                                 <input type="checkbox" className={list["checkbox1"]} />
    //                                 {group.gName}
    //                                 <button className={`${list["heart"]} ${mainStyle["button"]}`}>
    //                                     ♡
    //                                 </button>
    //                             </div>
    //                         </div>
    //                     ))}

    //                     {/** 모임 추가 예시 li */}
    //                     <div className={list["box"]}>
    //                         <div className={list["test"]}>
    //                             <input type="checkbox" className={list["checkbox1"]} disabled />
    //                             <span className={list["color-gray"]}>모임을 추가해주세요!</span>
    //                             <button
    //                                 className={`${list["heart"]} ${mainStyle["button"]}`}
    //                                 disabled
    //                             >
    //                                 ♡
    //                             </button>
    //                         </div>
    //                     </div>
    //                 </div>

    //                 {/** 모임 하단 버튼 */}
    //                 <div className={list["moim-under-btn"]}>
    //                     <button
    //                         className={`${list["moim-under-btn7"]} ${mainStyle["button"]}`}
    //                     >
    //                         선택 삭제
    //                     </button>
    //                 </div>
    //             </div>
    //         </div>
    //         <div className={list["wrap1"]}>
    //             <div className={list["wrap"]}>
    //                 <div className={list[""]}>
    //                     {/**친구 상단버튼 */}
    //                     <div className={list["topbtn"]}>
    //                         <button
    //                             className={`${list["moim-top-btn1"]} ${mainStyle["button"]}`}
    //                         >
    //                             등록순 ▲
    //                         </button>
    //                         <div>
    //                             <button
    //                                 className={`${list["moim-top-btn1"]} ${mainStyle["button"]}`}
    //                             >
    //                                 이름순 ▼
    //                             </button>
    //                         </div>
    //                         <div>
    //                             <button
    //                                 className={`${list["moim-top-btn1"]} ${mainStyle["button"]}`}
    //                             >
    //                                 ♥
    //                             </button>
    //                         </div>
    //                         <div>
    //                             <div className={`${mainStyle['button']} ${list['moim-top-btn1']} ${list['moim-top-btn5']} ${modal['list-add-f-btn-parent']}`}
    //                             >
    //                                 <div className={modal['btn-parent']}>
    //                                     <AddFriend/>
    //                                 </div>
    //                                 친구추가
    //                             </div>
    //                         </div>
    //                     </div>
    //                     {/**친구별 */}

    //                     <div className={list["container2"]}>
    //                         {
    //                             friendData &&
    //                             friendData.map((friend) => (
    //                                 <div
    //                                     className={list["box2"]}
    //                                     key={friend.fid}
    //                                     style={
    //                                         friend.fState
    //                                             ? { color: "#4a4b4d" }
    //                                             : { color: "#d4d4d4", fontStyle: "italic" }
    //                                     }
    //                                 >
    //                                     <div className={list["test2"]}>
    //                                         <input
    //                                             type="checkbox"
    //                                             className={`${list["checkbox2"]}`}
    //                                         />
    //                                         {friend.fName}
    //                                         <button
    //                                             className={`${list["heart"]} ${mainStyle["button"]}`}
    //                                         >
    //                                             ♡
    //                                         </button>
    //                                     </div>
    //                                 </div>
    //                             ))}
    //                         {/** 친구 추가 예시 li */}
    //                         <div className={list["box2"]}>
    //                             <div className={list["test2"]}>
    //                                 <input
    //                                     type="checkbox"
    //                                     className={`${list["checkbox2"]}`}
    //                                     disabled
    //                                 />
    //                                 <span className={list["color-gray"]}>
    //                                     친구를 추가해주세요!
    //                                 </span>
    //                                 <button
    //                                     className={`${list["heart"]} ${mainStyle["button"]}`}
    //                                     disabled
    //                                 >
    //                                     ♡
    //                                 </button>
    //                             </div>
    //                         </div>
    //                     </div>
    //                     {/** 친구 하단 버튼 */}
    //                     <div className={list["ttt"]}>
    //                         <div className={list["fff"]}>
    //                             <button className={`${list["eeee"]} ${mainStyle["button"]}`}>
    //                                 A
    //                             </button>
    //                             <button className={`${list["eeee"]} ${mainStyle["button"]}`}>
    //                                 B
    //                             </button>
    //                         </div>
    

    //                        <div className={list["chingu-under-btn"]}>
    //                           <button className={`${list["eeee"]} ${mainStyle["button"]}`}>
    //                               <AddGroupSample />
    //                           </button>
    //                           <button className={mainStyle["button"]}
    //                           //onClick={()=>deleteFriend()}
    //                           >선택 삭제</button>
    //                       </div>
    //                   </div>
    //               </div>
    //           </div>
    //       </div>
    //   </div>
    //   );

}
