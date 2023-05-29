import React from "react";
import { Route, Routes } from "react-router-dom";

import AddEmployee from "./Pages/AddEmployee";
import AddPayment from "./Pages/AddPayment";
import EditEmployee from "./Pages/EditEmployee";
import Employee from "./Pages/Employee";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import VerifyEmail from "./Pages/ForgotPassword/VerifyEmail";
import Home from "./Pages/Home";
import LeaveRequest from "./Pages/LeaveRequest";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import ViewPayment from "./Pages/ViewPayment";

export default function RoutePages() {
    return (
        <Routes>
            <Route exact path="/" element={<Employee />} />
            <Route exact path="/add-employee" element={<AddEmployee />} />
            <Route exact path="/edit-employee/:id" element={<EditEmployee />} />
            <Route exact path="/add-payment" element={<AddPayment />} />
            <Route exact path="/view-payment" element={<ViewPayment />} />
            <Route exact path="/leave-request" element={<LeaveRequest />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
        </Routes>
    );
}
