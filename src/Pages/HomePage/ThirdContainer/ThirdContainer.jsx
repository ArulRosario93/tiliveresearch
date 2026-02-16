import React from "react";
import './ThirdContainer.css';
import ThirdContainerService from "./ThirdContainerService/ThirdContainerService";

const ThirdContainer = () => {

    const services = ['Business Sector Reports', 'Full Time Engagement (FTE) Services', 'Consulting & Strategic Advisory'];

    return (
        <div className="ThirdContainer">
                <h2 className="ThirdContainerHead">Our Services</h2>
                <h4 className="ThirdContainerHeadSmall">Comprehensive Research. Strategic Insights. Actionable Intelligence.</h4>
                <p className="ThirdContainerPara">At Tilive Research, we provide a complete range of market research and consulting services specifically designed to address the changing requirements of businesses, governments, and investors. Our services aim to assist clients in anticipating shifts, uncovering opportunities, and fostering sustainable growth within competitive landscapes.</p>

                <p className="ThirdContainerPara">We integrate thorough research methodologies with extensive industry expertise and a consultative approach, ensuring that each deliverable aligns directly with our clients' strategic objectives.</p>

                <ThirdContainerService services={services} />
        </div>
    );
}

export default ThirdContainer;