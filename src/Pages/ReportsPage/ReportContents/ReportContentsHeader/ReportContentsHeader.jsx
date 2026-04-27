import React from "react";
import './ReportContentsHeader.css';
import Divider from "../../../../Components/Divider/Divider";

const ReportContentsHeader = ({ sections, handleClick, currentReportLabel }) => {
    
    // Default tab
    const tabs = [];

    // Add dynamic tabs from Admin sections
    if (sections && sections.length > 0) {
        sections.forEach(sec => {
            tabs.push({
                title: sec.title,
                id: sec.title.replaceAll(' ', '').toLowerCase()
            });
        });
    }
    

    return (
        <div className="ReportContentsHeader">
            {tabs.map((tab, index) => (
                <React.Fragment key={tab.id}>
                    <p 
                        onClick={() => handleClick(tab.id)} 
                        className={currentReportLabel !== tab.id ? "ReportContentsHeaderText" : "ReportContentsHeaderTextSelected"}
                    >
                        {tab.title}
                    </p>
                    {index < tabs.length - 1 && <Divider />}
                </React.Fragment>
            ))}
        </div>
    );
}

export default ReportContentsHeader;