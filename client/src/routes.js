import React from "react";
import { Route, Routes } from "react-router-dom";
import AddBankDetail from "./Pages/AddBankDetail";
import AddPayment from "./Pages/AddPayment";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import Home from "./Pages/Home/Home";
import LeaveRequest from "./Pages/LeaveRequest";
import Login from "./Pages/Login/Login";
import PageNotFound from "./Pages/PageNotFound";
import SignUp from "./Pages/SignUp/SignUp";
import VerifyEmail from "./Pages/SignUp/VerifyEmail";
import EditUser from "./Pages/UserList/EditUser/EditUser";
import User from "./Pages/UserList/Users";
import ViewPayment from "./Pages/ViewPayment";
import Payment from "./Pages/Payment/Payment";
import Attendance from "./Pages/Attendance/Attendance";
import UserDetail from "./Pages/UserList/UserDetail";

export default function RoutePages() {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/sign-in" element={<Login />} />
            <Route exact path="/sign-up" element={<SignUp />} />
            <Route exact path="/verify-email" element={<VerifyEmail />} />
            <Route exact path="/users" element={<User />} />
            <Route exact path="/profile" element={<UserDetail />} />
            <Route exact path="/payments" element={<Payment />} />
            <Route exact path="/attendance" element={<Attendance />} />
            <Route exact path="/edit-user/:id" element={<EditUser />} />
            <Route
                exact
                path="/add-bank-detail/:id"
                element={<AddBankDetail />}
            />
            <Route exact path="/add-payment/:id" element={<AddPayment />} />
            <Route exact path="/view-payment/:id" element={<ViewPayment />} />
            <Route exact path="/leave-request/:id" element={<LeaveRequest />} />
            <Route exact path="forgot-password" element={<ForgotPassword />} />
            <Route exact path="*" element={<PageNotFound />} />
        </Routes>
    );
}
