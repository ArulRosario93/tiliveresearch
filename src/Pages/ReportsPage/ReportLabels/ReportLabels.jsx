
import React from 'react';
import './ReportLabels.css';
import ReportLabelsContainer from './ReportLabelsContainer/ReportLabelsContainer';

const ReportLabels = ({ changelabels, currentReportLabel }) => {

    return(
        <div className='ReportLabels'>

            <div className='ReportLabelsAbsolute'>


                <div className='ReportLabelsTopLayer'>
                    <ReportLabelsContainer handleClick={changelabels} text='Description' selected={currentReportLabel == 'description'} buy={false} showContentOnly={false} />
                    <ReportLabelsContainer handleClick={changelabels} text='Table Of Content' selected={currentReportLabel == 'tableofcontent'} buy={false} showContentOnly={false} />
                    <ReportLabelsContainer handleClick={changelabels} text='Segmentation' buy={false} selected={currentReportLabel == 'segmentation'} showContentOnly={false} />
                    <ReportLabelsContainer handleClick={() => console.log('Clicked Buy Now')} text='Buy Now' buy={true} showContentOnly={false} />
                </div>

                <div className='ReportLabelsBottomlayer'>

                    <ReportLabelsContainer handleClick={() => console.log('Clicked Buy Sample Reports')} text='Buy Sample Reports' buy={false} showContentOnly={true} />
                    <ReportLabelsContainer handleClick={() => console.log('Clicked Having trouble?')} text='Having Trouble?' subText='Contact Us' buy={false} showContentOnly={true} />

                </div>


                <div className='ReportLabelsAbsoluteMobile'>
                    <ReportLabelsContainer handleClick={() => console.log('Clicked Buy Now')} text='Buy Now' buy={true} showContentOnly={true} />
                </div>
                <div className='ReportLabelsAbsoluteMobileBottom'>
                    <ReportLabelsContainer handleClick={() => console.log('Clicked Buy Sample Reports')} text='Buy Sample Reports' buy={false} showContentOnly={true} />
                    <ReportLabelsContainer handleClick={() => console.log('Clicked Buy Now')} text='Buy Now' buy={true} showContentOnly={true} />
                    <ReportLabelsContainer handleClick={() => console.log('Clicked Having trouble?')} text='Having Trouble?' subText='Contact Us' buy={false} showContentOnly={true} />
                </div>
                
            </div>

        </div>
    );
}

export default ReportLabels;