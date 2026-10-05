import React from "react";
import { useNavigate } from "react-router";
import './AllReportsItemContainer.css';
import DividerHori from "../../../Components/Divider/DividerHori";

const AllReportsItemContainer = ({ title, description, date, category, last }) => {
    const navigate = useNavigate();

    console.log("AllReportsItemContainer props:", { title, description, date, category, last });

    const slug = title?.replace(/\s+/g, "-");

    return (
        <div className="AllReportsItemContainer" onClick={() => navigate(`/reports/${slug}`)}>
            <h2 className="AllReportsItemContainerHead">{title}</h2>
            <p className="AllReportsItemContainerDescription">{description}</p>
            <div className="AllReportsItemMeta">
                <span className="Tag">{category}</span>
                <span className="Date">Published: {date}</span>
            </div>
            {!last && <DividerHori />}
        </div>
    );
}

export default AllReportsItemContainer;