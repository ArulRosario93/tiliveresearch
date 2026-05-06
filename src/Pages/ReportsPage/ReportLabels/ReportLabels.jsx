import React from 'react';
import './ReportLabels.css';
import ReportLabelsContainer from './ReportLabelsContainer/ReportLabelsContainer';

const ReportLabels = ({ reportData, changelabels, currentReportLabel, onOpenModal }) => {
    const dynamicSections = reportData.sections || [];

    return (
        <div className='ReportLabels'>
            <div className='ReportLabelsAbsolute'>
                <div className='ReportLabelsTopLayer'>
                    {/* Navigation Sections */}
                    {dynamicSections.map((sec, i) => {
                        const secId = sec.title.replaceAll(' ', '').toLowerCase();
                        return (
                            <ReportLabelsContainer 
                                key={i}
                                handleClick={changelabels} 
                                text={sec.title} 
                                selected={currentReportLabel === secId} 
                                buy={false} 
                                showContentOnly={false} 
                            />
                        )
                    })}
                    
                    {/* Fixed Buy Now Button */}
                    <ReportLabelsContainer 
                        handleClick={() => onOpenModal('purchase')} 
                        text='Buy Now' 
                        buy={true} 
                        showContentOnly={false} 
                    />
                </div>

                <div className='ReportLabelsBottomlayer'>
                    <ReportLabelsContainer 
                        handleClick={() => onOpenModal('enquiry')} 
                        text='Enquire Before Buying' 
                        buy={false} 
                        showContentOnly={true} 
                    />
                    <ReportLabelsContainer 
                        handleClick={() => onOpenModal('sample')} 
                        text='Request for Sample' 
                        buy={false} 
                        showContentOnly={true} 
                    />
                    <ReportLabelsContainer 
                        handleClick={() => console.log('Help Clicked')} 
                        text='Having Trouble?' 
                        subText='Contact Us' 
                        buy={false} 
                        showContentOnly={true} 
                    />
                </div>

                {/* Mobile View - Unified for clarity */}
                <div className='ReportLabelsAbsoluteMobileBottom'>
                    <ReportLabelsContainer 
                        handleClick={() => onOpenModal('sample')} 
                        text='Request Sample' 
                        buy={false} 
                        showContentOnly={true} 
                    />
                    <ReportLabelsContainer 
                        handleClick={() => onOpenModal('purchase')} 
                        text='Buy Now' 
                        buy={true} 
                        showContentOnly={true} 
                    />
                </div>
            </div>
        </div>
    );
}

export default ReportLabels;