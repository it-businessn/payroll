import React, { useState } from "react";

export default function Home() {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("profile") || "")
    );
    const userEmail = user.userDetails.data.name;
    return <div>Welcome {userEmail}</div>;
}
