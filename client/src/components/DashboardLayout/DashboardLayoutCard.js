import React from "react";
import "./DashboardLayoutCard.css";
function Card({ position, size, component }) {
    return (
        <div className={size} style={{ order: position }}>
            Component:{component} Position:{position} Size:{size}
        </div>
    );
}

export default Card;
