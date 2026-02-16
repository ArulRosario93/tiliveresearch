import React, { useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import ReportContents from "./ReportContents/ReportContents";
import ReportLabels from "./ReportLabels/ReportLabels";
import './ReportsPage.css'
import { data } from "../../Storage/Reports";
import FootBar from "../../Components/FootBar/FootBar";

const ReportsPage = ({ report }) => {

    const [currentReportLabel, setCurrentReportLabel] = useState('description');
    
    const reportsPageStyle = {
        description: data[0].Sections[0].sectionDescription,
        tableofcontent: data[0].Sections[0].sectiontoc,
        segmentation: data[0].Sections[0].sectionSegmentation,
    };

    const handleChangeLabel = (e) => {
        
        const value = (e).replaceAll(' ', '').toLowerCase();

        if(reportsPageStyle[value]){
            setCurrentReportLabel((value).replaceAll(' ', '').toLowerCase());
        }
    }


    console.log(data[0].title);

    return(
        <div className="ReportsPage">

                <NavBar />

            <div className="ReportsPageContainer">

                <ReportContents changelabels={handleChangeLabel} currentReportLabel={currentReportLabel} content={reportsPageStyle} />
                <ReportLabels changelabels={handleChangeLabel} currentReportLabel={currentReportLabel} />

                
            </div>
            {/* <FootBar /> */}
        </div>
    );
}

export default ReportsPage;