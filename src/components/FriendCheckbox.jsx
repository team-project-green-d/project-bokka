import React from "react";
import friendlist from "../css/friendlist.module.scss";
import list from '../css/list.module.scss'
import mainStyle from '../css/sass.module.scss'
import { useDispatch } from "react-redux";
import { deletefriendList } from "../slice/friendSlice";
import { LuX } from "react-icons/lu";

export default function FriendCheckbox({ f, checkFriends, selectFriends }) {
    // console.log(selectFriends)
    const selectFid = selectFriends.map((s) => s.fid);
    // console.log(selectFid)

    const dispatch = useDispatch();
    const friendData = JSON.parse(sessionStorage.getItem('friend'));
    
    // 친구 삭제
    const deleteFriend = (name, fid) => {
        if (window.confirm(`${name}님을 차단하시겠습니까?`)) {
            const findArr = friendData.findIndex(f => (f.fid === fid));
            // console.log(findArr);
            dispatch(deletefriendList(findArr));
        }
    };

    return (
        <div className={`${friendlist['check-wrap']}`}>
            <input
                id={f.fid}
                type="checkbox"
                className={`${friendlist["checkbox2"]}`}
                checked={selectFid.includes(f.fid)}
                onChange={(e) => checkFriends(f, e.target.checked)}
            />
            <label>{f.fName}</label>
            <button
                className={`${list["delete1"]} ${mainStyle["button"]}`}
                onClick={() => {
                    deleteFriend(f.fName, f.fid);
                }}
            >
                <LuX />
            </button>
        </div>
    );
}
