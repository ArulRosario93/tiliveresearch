import React from 'react';
import './ReportContents.css';
import CurrentPageLocation from "../../../Components/CurrentPageLocation/CurrentPageLocation";
import ReportContentsHeader from "./ReportContentsHeader/ReportContentsHeader";

const ReportContents = ({ reportData, currentReportLabel, changelabels }) => {

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
                            
                            {/* FIX: Render the rich text HTML string correctly */}
                            <div 
                                className="SectionContentText ql-editor" 
                                dangerouslySetInnerHTML={{ __html: part.content }} 
                            />
                            
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