import React from 'react';
import './AllReportsLabel.css';
import { ChevronRight } from '@mui/icons-material';

const AllReportsLabel = ({ name, active, onClick }) => {
    return (
        <div 
            className={`AllReportsLabelContainerOuter ${active ? 'active' : ''}`} 
            onClick={onClick}
        >
            <div className='AllReportsLabelContainer'>
                <ChevronRight fontSize='small' className="icon" />
                <p className='AllReportsLabelContainerPara'>{name}</p>
            </div>
        </div>
    );
}

export default AllReportsLabel;