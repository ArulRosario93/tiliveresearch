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
            setLoading(true);
            try {
                const URL = `https://sprightly-jelly-d7e745.netlify.app/.netlify/functions/getreports?title=${encodeURIComponent(reportid)}`;
                const response = await fetch(URL);
                const data = await response.json();
                
                console.log("Fetched report data:", data, response);
                // Check if the server actually returned an error
                if (!response.ok) {
                    throw new Error(data.error || "Server Error");
                }

                // If data is the object itself, use it; if it's an array, find it.
                const matchedReport = data.title === reportid ? data : null;
                
                setReportData(matchedReport);

                if (matchedReport?.sections?.length > 0) {
                    setCurrentReportLabel(matchedReport.sections[0].title.replace(/\s+/g, '').toLowerCase());
                } else {
                    setCurrentReportLabel('description');
                }
            } catch (error) {
                console.error("Failed to fetch report data:", error);
                setReportData(null);
            } finally {
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
            <FootBar />
        </div>
    );
}

export default ReportsPage;