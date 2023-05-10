import React, { useState } from "react";

export default function Home() {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("profile") || "")
    );
    // const userEmail = user?.userDetails?.data?.name || user.userDetails.newUser[1].name;
    return <div>Welcome </div>;
}
