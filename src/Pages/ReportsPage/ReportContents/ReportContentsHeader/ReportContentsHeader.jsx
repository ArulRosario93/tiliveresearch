import React from "react";
import './ReportContentsHeader.css';
import Divider from "../../../../Components/Divider/Divider";

const ReportContentsHeader = ({ handleClick, currentReportLabel }) => {
    return (
        <div className="ReportContentsHeader">

            <p onClick={() => handleClick("description")} className={currentReportLabel != "description"? "ReportContentsHeaderText": "ReportContentsHeaderTextSelected"}>Description</p>
            <Divider />
            <p onClick={() => handleClick("tableofcontent")} className={currentReportLabel != "tableofcontent"? "ReportContentsHeaderText": "ReportContentsHeaderTextSelected"}>Table Of Content</p>
            <Divider />
            <p onClick={() => handleClick("segmentation")} className={currentReportLabel != "segmentation"? "ReportContentsHeaderText": "ReportContentsHeaderTextSelected"}>Segmentation</p>

        </div>
    );
}

export default ReportContentsHeader;