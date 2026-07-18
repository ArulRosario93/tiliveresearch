
import React from "react";
import { useNavigate } from "react-router";
import './FirstContainer.css'

const FirstContainer = () => {

    const navigate = useNavigate();

    const handleGoToResearch = () => {
    
        navigate('/reports/')

    }

    const handleGoToAboutUs = () => {
        navigate('/aboutUs/')
    }

    const handleGoToContactUs = () => {
        navigate('/contactus/')
    }

    return (
        <div className="FirstContainer">

            <h2 className="FirstContainerHead">Global Intelligence. Strategic Clarity. Sustainable Success.</h2>
            <p className="FirstContainerPara">Delivering rigorous research and forward-thinking analysis across industries.</p>

            <div className="FirstContainerLists">
                <p className="FirstContainerListsPara" onClick={handleGoToResearch}>View Research</p>
                <p className="FirstContainerListsPara" onClick={handleGoToAboutUs}>About Us</p>
                <p className="FirstContainerListsPara" onClick={handleGoToContactUs}>Contact Us</p>
            </div>

        </div>
    );
}

export default FirstContainer;