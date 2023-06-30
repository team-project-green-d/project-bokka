import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import mainStyle from "../css/sass.module.scss";
import list from "../css/list.module.scss";

import { useDispatch, useSelector } from "react-redux";

import FriendListModal from '../components/FriendListModal'
import GroupListModal from '../components/GroupListModal';

export default function MoimFriend() {

    return (
        <div className={list['m-f-wrap']}>
            <div className={`${list["moim-wrap-box"]}`}>
                <div>
                    <GroupListModal modal={true} />
                </div>
                <div>
                    <FriendListModal modal={true}/>
                </div>
            </div>
        </div>
    );
}
