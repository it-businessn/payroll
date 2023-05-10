import React from "react";
import { Route, Routes } from "react-router-dom";

import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import Home from "./Pages/Home";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import VerifyEmail from "./Pages/ForgotPassword/VerifyEmail";

export default function RoutePages() {
    return (
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/sign-in" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
        </Routes>
    );
}
