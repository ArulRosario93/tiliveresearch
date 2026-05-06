import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../Components/NavBar/NavBar";
import ReportContents from "./ReportContents/ReportContents";
import ReportLabels from "./ReportLabels/ReportLabels";
import FootBar from "../../Components/FootBar/FootBar";
import './ReportsPage.css';
import ReportContactModal from "./ReportContactModel/ReportContactModel";

const ReportsPage = () => {
    // Assuming your route is setup like /reports/:reportTitle
    const { reportid } = useParams(); 
    
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentReportLabel, setCurrentReportLabel] = useState("");
    const [modalConfig, setModalConfig] = useState({ isOpen: false, type: '' });

    const openModal = (type) => {
        setModalConfig({ isOpen: true, type });
    };

    useEffect(() => {
        // Scroll to top on load
        window.scroll(0, 0);

        const fetchReportData = async () => {
            try {
                // Adjust URL to your actual endpoint to get a single report or all reports
                // Send the reportTitle as a query param if your backend supports it for better performance
                const URL = `https://storied-paprenjak-0a4af7.netlify.app/.netlify/functions/getReports?title=${reportid}`;
                const response = await fetch(URL);
                const data = await response.json();
                
                // Assuming the API returns an array, find the matching report
                // In production, it's better to fetch by ID directly from the server
                const matchedReport = data['title'] === reportid ? data : null;
                
                setReportData(matchedReport);
                setLoading(false);
                setCurrentReportLabel(matchedReport ? matchedReport.sections && matchedReport.sections.length > 0 ? matchedReport.sections[0].title.replaceAll(' ', '').toLowerCase() : 'description' : 'description'); // Set default label to description

                    
            } catch (error) {
                console.error("Failed to fetch report data:", error);
                setLoading(false);
            }
        };

        fetchReportData();
    }, [reportid]);

    const handleChangeLabel = (label) => {
        const formattedLabel = label.replaceAll(' ', '').toLowerCase();
        setCurrentReportLabel(formattedLabel);
    };

    if (loading) {
        return (
            <div className="ReportsPage">
                <NavBar />
                <div style={{ height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>Loading Report Data...</h2>
                </div>
            </div>
        );
    }

    if (!reportData) {
        return (
            <div className="ReportsPage">
                <NavBar />
                <div style={{ height: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>Report Not Found</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="ReportsPage">
            <NavBar />
            <div className="ReportsPageContainer">
                <ReportContents 
                    reportData={reportData} 
                    currentReportLabel={currentReportLabel} 
                    changelabels={handleChangeLabel} 
                />
                <ReportLabels 
                    reportData={reportData} 
                    changelabels={handleChangeLabel} 
                    currentReportLabel={currentReportLabel}
                    onOpenModal={openModal} // Pass this down
                />
            </div>

            <ReportContactModal 
                isOpen={modalConfig.isOpen} 
                type={modalConfig.type} 
                reportTitle={reportData.title}
                onClose={() => setModalConfig({ isOpen: false, type: '' })}
            />
        </div>
    );
}

export default ReportsPage;