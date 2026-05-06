import React from "react";
import './ReportLabelsContainer.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const ReportLabelsContainer = ({ text, sample, selected, buy, showContentOnly, subText, handleClick }) => {
    
    return (
        <div 
            onClick={() => handleClick(text)} 
            className={buy ? 'ReportLabelsContainerBuy' : selected ? "ReportLabelsContainerSelected" : 'ReportLabelsContainer'}
        >
            {buy ? (
                <div className="ReportLabelsContainerBuyLayer">
                    <p className="ReportLabelsContainerBuyLayerHeader">Purchase Options</p>
                    <div className="ReportLabelsContainerBuyLayerItem">
                        <input type="checkbox" name="Single User" id="single" />
                        <label htmlFor="single">Single User License ($4000)</label>
                    </div>
                    <div className="ReportLabelsContainerBuyLayerItem">
                        <input type="checkbox" name="Corporate" id="corp" />
                        <label htmlFor="corp">Corporate License ($5500)</label>
                    </div>
                    <p style={{ borderRadius: '0px' }} className="ReportLabelsContainerBuyLayerHeader">Buy Now</p>
                </div>
            ) : (
                <>
                    <p 
                        className={showContentOnly ? "ReportLabelsContainerTextBigger" : "ReportLabelsContainerText"} 
                        style={{ textAlign: showContentOnly ? 'center' : 'left' }}
                    >
                        {text}
                        {subText && (
                            <span className="ReportLabelsContainerSubText">
                                <br/><a href="mailto:tiliveresearch@gmail.com">{subText}</a>
                            </span>
                        )}
                    </p>
                    {!showContentOnly && (
                        <KeyboardArrowDownIcon 
                            style={{ transform: selected ? 'rotate(180deg)' : 'none', paddingRight: '15px' }} 
                            fontSize="large" 
                            className={selected ? "ReportLabelsContainerIconSelected" : 'ReportLabelsContainerIcon'} 
                        />
                    )}
                </>
            )}
        </div>
    );
}

export default ReportLabelsContainer;