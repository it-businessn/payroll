import React from "react";
import Sidebar from "../Home/Sidebar";
function UserDetail() {
    const user = JSON.parse(localStorage.getItem("profile"));
    return <Sidebar user={user.userDetails.data}>profile</Sidebar>;
}

export default UserDetail;
