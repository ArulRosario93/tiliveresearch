
import React from 'react';
import './AllReportsLabel.css';
import { ArrowForward } from '@mui/icons-material';
import DividerHori from '../../../Components/Divider/DividerHori';

const AllReportsLabel = ({ name, selected }) => {

    return (
        <div className='AllReportsLabelContainerOuter'>
            <div className='AllReportsLabelContainer'>
                <ArrowForward fontSize='small' />
                <p className='AllReportsLabelContainerPara'>{name}</p>
            </div>
            
        </div>
    );
}

export default AllReportsLabel;