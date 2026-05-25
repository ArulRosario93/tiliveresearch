import React from "react";
import './CurrentPageLocation.css';

const CurrentPageLocation = ({ industry, title }) => {

    return (
        <div className="CurrentPageLocation">
            <a style={{textDecoration: 'none'}} href="/"><p className="CurrentPageLocationPara">Home &gt; {industry} &gt; {title}</p></a>
        </div>
    );
}

export default CurrentPageLocation;