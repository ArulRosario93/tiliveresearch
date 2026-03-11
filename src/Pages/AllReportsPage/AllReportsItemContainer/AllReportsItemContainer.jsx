import React from "react";
import { useNavigate } from "react-router";
import './AllReportsItemContainer.css';
import Divider from "../../../Components/Divider/Divider";
import DividerHori from "../../../Components/Divider/DividerHori";

const AllReportsItemContainer = ({ title, description, date, last }) => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate(`/reports/${title}`);
    }

    return (
        <div className="AllReportsItemContainer" onClick={handleNavigation}>
            <h2 className="AllReportsItemContainerHead">{title}</h2>
            <p className="AllReportsItemContainerDescription">{description}...</p>
            {/* <p className="AllReportsItemContainerDate"><b>Published On: </b>{date}</p> */}
            <p className="AllReportsItemContainerDate"><b>Domain: </b>Semiconductor & Electronics</p>

            <br />
            {
                !last ? <DividerHori /> : null
            }

        </div>
    );
}

export default AllReportsItemContainer;