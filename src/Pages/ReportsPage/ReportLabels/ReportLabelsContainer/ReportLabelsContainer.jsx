import React from "react";
import './ReportLabelsContainer.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const ReportLabelsContainer = ({ text, selected, buy, showContentOnly, subText, handleClick }) => {

    return(
        <div onClick={() => handleClick(text)} className={buy ? 'ReportLabelsContainerBuy' : selected ? "ReportLabelsContainerSelected" : 'ReportLabelsContainer'}>

            <p className={showContentOnly ? "ReportLabelsContainerTextBigger" : "ReportLabelsContainerText"} style={{textAlign: showContentOnly || buy ? 'center' : 'left'}}>{text}
                { subText ? <p className="ReportLabelsContainerSubText"><a href="mailto:tiliveresearch@gmail.com">{subText}</a></p> : null }
            </p>

            { showContentOnly ? null :buy ? null : <KeyboardArrowDownIcon style={{transform: selected? 'rotate(180deg)': null}} className={selected? "ReportLabelsContainerIconSelected" : 'ReportLabelsContainerIcon'} />}

        </div>
    );
}

export default ReportLabelsContainer;