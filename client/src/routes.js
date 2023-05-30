import React from "react";
import { Route, Routes } from "react-router-dom";

import AddBankDetail from "./Pages/AddBankDetail";
import AddPayment from "./Pages/AddPayment";
import EditUser from "./Pages/EditUser";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import Home from "./Pages/Home";
import LeaveRequest from "./Pages/LeaveRequest";
import Login from "./Pages/Login/Login";
import PageNotFound from "./Pages/PageNotFound";
import SignUp from "./Pages/SignUp/SignUp";
import VerifyEmail from "./Pages/SignUp/VerifyEmail";
import User from "./Pages/Users";
import ViewPayment from "./Pages/ViewPayment";

export default function RoutePages() {
    return (
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/sign-in" element={<Login />} />
            <Route exact path="/sign-up" element={<SignUp />} />
            <Route exact path="/verify-email" element={<VerifyEmail />} />
            <Route exact path="/users" element={<User />} />
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
