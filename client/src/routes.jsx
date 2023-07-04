import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
    AddBankDetail,
    AttendanceWidget,
    BankDetail,
    EditUser,
    ForgotPassword,
    Home,
    LeaveRequest,
    LeaveWidget,
    Login,
    PaymentWidget,
    Profile,
    SignUp,
    User,
    VerifyEmail,
} from "./Pages";
import { PageNotFound } from "./components";
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
            <Route path={ROUTE_PATH.HOME} element={<Home />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/verify-email" element={<VerifyEmail user={user} />} />
            <Route path={ROUTE_PATH.USERS} element={<User />} />
            <Route path={ROUTE_PATH.PROFILE} element={<Profile />} />
            <Route path="/edit-user/:id" element={<EditUser />} />
            <Route
                path={ROUTE_PATH.BANK}
                element={<BankDetail user={user} />}
            />
            <Route
                path="/add-bank-detail/:id"
                element={<AddBankDetail user={user} />}
            />
            <Route
                path={ROUTE_PATH.PAYROLL}
                element={<PaymentWidget user={user} />}
            />
            <Route
                path={ROUTE_PATH.ATTENDANCE}
                element={<AttendanceWidget user={user} />}
            />
            <Route
                path={ROUTE_PATH.LEAVE}
                element={<LeaveWidget user={user} />}
            />
            <Route
                path="/leave-request/:id"
                element={<LeaveRequest user={user} />}
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};

export default RoutePages;
