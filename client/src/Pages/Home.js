import { useNavigate } from "react-router-dom";

import React, { useEffect } from "react";
function Home() {
    const navigate = useNavigate();
    const user = localStorage.getItem("profile");
    const navigatePage = (profile) =>
        profile ? navigate("/users") : navigate("/sign-in");
    useEffect(() => {
        navigatePage(user);
    }, []);
    return <></>;
}

export default Home;
