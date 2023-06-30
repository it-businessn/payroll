import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AddPayment from "./Pages/AddPayment";
import AttendanceWidget from "./Pages/Attendance/AttendanceWidget";
import AddBankDetail from "./Pages/Bank/AddBankDetail";
import BankDetail from "./Pages/Bank/BankDetail";
import { ForgotPassword } from "./Pages/ForgotPassword/ForgotPassword";
import Home from "./Pages/Home/Home";
import LeaveWidget from "./Pages/Leave/LeaveWidget";
import LeaveRequest from "./Pages/LeaveRequest";
import { Login } from "./Pages/Login/Login";
import PageNotFound from "./Pages/PageNotFound";
import PaymentWidget from "./Pages/Payment/PaymentWidget";
import { SignUp } from "./Pages/SignUp/SignUp";
import { VerifyEmail } from "./Pages/SignUp/VerifyEmail";
import EditUser from "./Pages/User/EditUser/EditUser";
import Profile from "./Pages/User/Profile";
import User from "./Pages/User/Users";
import ViewPayment from "./Pages/ViewPayment";
import { ROUTE_PATH } from "./constants/constant";

const user = JSON.parse(localStorage.getItem("profile"));
const token = user && user?.userDetails?.token;

const RoutePages = () => {
    return (
        <Routes>
            <Route
                exact
                path="/"
                element={token ? <Home /> : <Navigate to="/sign-in" replace />}
            />
            <Route exact path={ROUTE_PATH.HOME} element={<Home />} />
            <Route exact path="/sign-in" element={<Login />} />
            <Route exact path="/sign-up" element={<SignUp />} />
            <Route
                exact
                path="/verify-email"
                element={<VerifyEmail user={user} />}
            />
            <Route exact path={ROUTE_PATH.USERS} element={<User />} />
            <Route exact path={ROUTE_PATH.PROFILE} element={<Profile />} />
            <Route exact path="/edit-user/:id" element={<EditUser />} />
            <Route
                exact
                path={ROUTE_PATH.BANK}
                element={<BankDetail user={user} />}
            />
            <Route
                exact
                path="/add-bank-detail/:id"
                element={<AddBankDetail user={user} />}
            />
            <Route
                exact
                path={ROUTE_PATH.PAYROLL}
                element={<PaymentWidget user={user} />}
            />
            <Route
                exact
                path={ROUTE_PATH.ATTENDANCE}
                element={<AttendanceWidget user={user} />}
            />
            <Route
                exact
                path={ROUTE_PATH.LEAVE}
                element={<LeaveWidget user={user} />}
            />
            <Route exact path="/add-payment/:id" element={<AddPayment />} />
            <Route exact path="/view-payment/:id" element={<ViewPayment />} />
            <Route
                exact
                path="/leave-request/:id"
                element={<LeaveRequest user={user} />}
            />
            <Route exact path="/forgot-password" element={<ForgotPassword />} />
            <Route exact path="*" element={<PageNotFound />} />
        </Routes>
    );
};

export default RoutePages;
