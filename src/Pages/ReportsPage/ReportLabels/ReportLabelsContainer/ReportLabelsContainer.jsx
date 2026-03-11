import React from "react";
import './ReportLabelsContainer.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const ReportLabelsContainer = ({ text, sample, selected, buy, showContentOnly, enquire, subText, handleClick }) => {

    

    return(
        <div onClick={() => handleClick(text)} className={buy ? 'ReportLabelsContainerBuy' : selected ? "ReportLabelsContainerSelected" : 'ReportLabelsContainer'}>

        {
            buy? <div className="ReportLabelsContainerBuyLayer">
                <p className="ReportLabelsContainerBuyLayerHeader">Purchase Options</p>
                <div className="ReportLabelsContainerBuyLayerItem">
                    <input type="checkbox" name="Single User" id="" />
                    <p id="Single User">Single User License ($4000)</p>
                </div>
                <div className="ReportLabelsContainerBuyLayerItem">
                    <input type="checkbox" name="Single User" id="" />
                    <p id="Single User">Corporate License ($5500)</p>
                </div>
            </div>: <></>
        }

        {
            // false ?
            // <p className="ReportLabelsContainerBuyContainer">
            //     {text}
            // </p> : <>
            //     <p className={showContentOnly ? "ReportLabelsContainerTextBigger" : "ReportLabelsContainerText"} style={{textAlign: showContentOnly || buy ? 'center' : 'left'}}>{text}
            //     { subText ? <p className="ReportLabelsContainerSubText"><a href="mailto:tiliveresearch@gmail.com">{subText}</a></p> : null }
            //     </p>
            //     { showContentOnly ? null :buy ? null : <KeyboardArrowDownIcon style={{transform: selected? 'rotate(180deg)': null,  paddingRight: '15px',}} fontSize="large" className={selected? "ReportLabelsContainerIconSelected" : 'ReportLabelsContainerIcon'} />}
            // </>
        }
        {
            sample ?
            <p className="ReportLabelsContainerBuyContainer">
                {text}
            </p> : <>
                <p className={showContentOnly ? "ReportLabelsContainerTextBigger" : "ReportLabelsContainerText"} style={{textAlign: showContentOnly || buy ? 'center' : 'left'}}>{text}
                { subText ? <p className="ReportLabelsContainerSubText"><a href="mailto:tiliveresearch@gmail.com">{subText}</a></p> : null }
                </p>
                { showContentOnly ? null :buy ? null : <KeyboardArrowDownIcon style={{transform: selected? 'rotate(180deg)': null,  paddingRight: '15px',}} fontSize="large" className={selected? "ReportLabelsContainerIconSelected" : 'ReportLabelsContainerIcon'} />}
            </>
        }



        </div>
    );
}

export default ReportLabelsContainer;