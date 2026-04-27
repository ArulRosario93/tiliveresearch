import React from 'react';
import './ReportLabels.css';
import ReportLabelsContainer from './ReportLabelsContainer/ReportLabelsContainer';

const ReportLabels = ({ reportData, changelabels, currentReportLabel }) => {

    const dynamicSections = reportData.sections || [];

    return(
        <div className='ReportLabels'>
            <div className='ReportLabelsAbsolute'>
                <div className='ReportLabelsTopLayer'>
                    
                    
                    {/* Render Admin Created Sections */}
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
                    
                    <ReportLabelsContainer handleClick={() => console.log('Clicked Buy Now')} text='Buy Now' buy={true} showContentOnly={false} />
                </div>

                <div className='ReportLabelsBottomlayer'>
                    <ReportLabelsContainer handleClick={() => console.log('Clicked Enquire')} enquire={true} text='Enquire Before Buying' buy={false} showContentOnly={true} />
                    <ReportLabelsContainer handleClick={() => console.log('Clicked Sample')} sample={true} text='Request for Sample' buy={false} showContentOnly={true} />
                    <ReportLabelsContainer handleClick={() => console.log('Clicked Help')} text='Having Trouble?' subText='Contact Us' buy={false} showContentOnly={true} />
                </div>

                {/* Mobile Views */}
                <div className='ReportLabelsAbsoluteMobile'>
                    <ReportLabelsContainer handleClick={() => console.log('Clicked Buy Now')} text='Buy Now' buy={true} showContentOnly={true} />
                </div>
                <div className='ReportLabelsAbsoluteMobileBottom'>
                    <ReportLabelsContainer handleClick={() => console.log('Clicked Sample')} sample={true} text='Request for Sample' buy={false} showContentOnly={true} />
                    <ReportLabelsContainer handleClick={() => console.log('Clicked Buy Now')} text='Buy Now' buy={true} showContentOnly={true} />
                    <ReportLabelsContainer handleClick={() => console.log('Clicked Help')} text='Having Trouble?' subText='Contact Us' buy={false} showContentOnly={true} />
                </div>
            </div>
        </div>
    );
}

export default ReportLabels;