import React from 'react';
import './ReportContents.css';
import CurrentPageLocation from "../../../Components/CurrentPageLocation/CurrentPageLocation";
import ReportContentsHeader from "./ReportContentsHeader/ReportContentsHeader";

// (Keep your imageLibrary imports here if you still need local fallbacks)
// import picture1 from '../../../assets/Picture1.png'; ...

const ReportContents = ({ reportData, currentReportLabel, changelabels }) => {

    const formatBold = (text) => {
        if (!text) return null;
        const parts = text.split(/'([^']+)'/g);
        return parts.map((part, i) => (
            i % 2 === 1 ? <strong key={i}>{part}</strong> : part
        ));
    };

    const BULLETS = ["•", "◦", "▪", "▫", "–", "→"];
    const TAB_SIZE = 24;

    // Helper function to render text with bullets/images like your original logic
    const renderContentBlocks = (contentString, isTOC = false) => {
        if (!contentString) return null;
        const lines = contentString.split('\n');

        return lines.map((line, index) => {
            const trimmedLine = line.trim();

            if (trimmedLine === "") {
                return <div key={index} style={{ height: '1.2em' }} />;
            }

            if (isTOC) {
                const tocMatch = trimmedLine.match(/^(\d+(\.\d+)*\.?)\s+(.*)/);
                if (tocMatch) {
                    const numberPart = tocMatch[1];
                    const textPart = tocMatch[3];
                    const dotCount = (numberPart.match(/\./g) || []).length;
                    const indent = dotCount * 20; 

                    return (
                        <div key={index} style={{ display: 'flex', paddingLeft: `${indent}px`, marginBottom: '4px' }}>
                            <span style={{ minWidth: '60px', display: 'inline-block', color: '#666', flexShrink: 0 }}>
                                {numberPart}
                            </span>
                            <span style={{ textAlign: 'left' }}>{textPart}</span>
                        </div>
                    );
                }
            }

            if (trimmedLine.startsWith('•')) {
                const level = (trimmedLine.match(/•/g) || []).length;
                const bullet = BULLETS[(level - 1) % BULLETS.length] || "•";
                const cleanText = trimmedLine.replace(/•+/g, "").trim();
                const hasLabel = cleanText.match(/^([^:]+):/);

                if (hasLabel) {
                    return (
                        <li key={index} style={{ marginLeft: `${level * TAB_SIZE}px`, marginBottom: '8px' }}>
                            <strong>{hasLabel[1]}:</strong> {formatBold(cleanText.replace(/^[^:]+:/, ""))}
                        </li>
                    );
                }
                return (
                    <div key={index} style={{ paddingLeft: `${level * TAB_SIZE}px`, display: "flex", alignItems: "flex-start", marginBottom: '8px' }}>
                        <span style={{ marginRight: 8 }}>{bullet}</span>
                        <span>{formatBold(cleanText)}</span>
                    </div>
                );
            }

            return <p key={index} style={{ margin: 0, paddingBottom: '4px' }}>{formatBold(trimmedLine)}</p>;
        });
    };


    // Find if the current label matches a dynamic section
    const activeSection = reportData.sections?.find(
        sec => sec.title.replaceAll(' ', '').toLowerCase() === currentReportLabel
    );

    return(
        <div className="ReportContents">
            <CurrentPageLocation />

            <h2 className="ReportContentsHead">{reportData.title}</h2>
            
            {/* Displaying the new Admin fields */}
            <div style={{ display: 'flex', gap: '15px', color: '#666', fontSize: '13px', marginBottom: '15px' }}>
                {reportData.reportCode && <span><b>Code:</b> {reportData.reportCode}</span>}
                {reportData.publishedDate && <span><b>Published:</b> {reportData.publishedDate}</span>}
                {reportData.industry?.length > 0 && <span><b>Industry:</b> {reportData.industry.join(', ')}</span>}
            </div>

            <p className="ReportContentsText">{reportData.description}</p>

            <ReportContentsHeader 
                sections={reportData.sections || []} 
                handleClick={changelabels} 
                currentReportLabel={currentReportLabel} 
            />
            
            <div className="ReportContentsLongText">
                {activeSection ? (
                    activeSection.parts.map((part, pIndex) => (
                        <div key={pIndex} style={{ marginBottom: '20px' }}>
                            {renderContentBlocks(part.content, currentReportLabel.includes('tableofcontent'))}
                            
                            {/* Render Images if they exist from the backend payload */}
                            {part.images && part.images.map((imgUrl, iIdx) => (
                                <div key={iIdx} style={{ textAlign: 'center', margin: '15px 0' }}>
                                    <img 
                                        className='ReportContentsImage'
                                        src={imgUrl} 
                                        alt={`Content attachment ${iIdx}`} 
                                    />
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <p>No content available for this section.</p>
                )}
            </div>
        </div>
    );
}

export default ReportContents;