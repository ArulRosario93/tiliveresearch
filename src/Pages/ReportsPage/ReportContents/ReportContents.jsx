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
            <CurrentPageLocation industry={reportData.industry} title={reportData.title} />

            <h2 className="ReportContentsHead">{reportData.title}</h2>

            {/* Displaying the new Admin fields */}
            <div style={{ display: 'flex', gap: '15px', color: '#666', fontSize: '13px', marginBottom: '15px' }}>
                {reportData.reportCode && <span><b>Code:</b> {reportData.reportCode}</span>}
                {reportData.publishedDate && (
                <span>
                    <b>Published:</b>{" "}
                    {new Date(reportData.publishedDate).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                    })}
                </span>
                )}                {reportData.industry?.length > 0 && <span><b>Industry:</b> {reportData.industry.join(', ')}</span>}
                {reportData.availableFormats?.includes('excel') && (
                    <span style={{display: 'flex', alignItems: 'center', gap: '5px'}}><b>Available Format:</b>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/60/Microsoft_Office_Excel_%282025%E2%80%93present%29.svg" alt="Excel" style={{ width: '18px' }} />
                    </span>
                )}
                {reportData.availableFormats?.includes('pdf') && (
                    <span style={{display: 'flex', alignItems: 'center', gap: '5px'}}><b></b>
                        {/* <picture title="PDF Format"> */}
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1280px-PDF_file_icon.svg.png" alt="PDF" style={{ width: '18px' }} />
                        {/* </picture> */}
                    </span>
                )}
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