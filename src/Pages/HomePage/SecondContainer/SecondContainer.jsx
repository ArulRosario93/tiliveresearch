
import React from "react";
import './SecondContainer.css';
import { useNavigate } from "react-router";
import picture from "../../../assets/picture7.png";
import DepartmentContainer from "./DepartmentContainer/DepartmentContainer";
import ConstructionIcon from '@mui/icons-material/Construction';
import BiotechIcon from '@mui/icons-material/Biotech';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ElectricMeterIcon from '@mui/icons-material/ElectricMeter';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import MemoryIcon from '@mui/icons-material/Memory';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import ScienceIcon from '@mui/icons-material/Science';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

const SecondContainer = () => {

    const navigateIt = useNavigate();

    const departments = [
        {
            name: 'CONSTRUCTION & MINING',
            camelCased: 'Construction & Mining',
            icon: <ConstructionIcon sx={{ fontSize: '90px' }} />
        },
        {
            name: 'PHARMA & BIOTECHNOLOGY',
            camelCased: 'Pharma & Biotechnology',
            icon: <BiotechIcon sx={{ fontSize: '90px' }} />
        },
        {
            name: 'AUTOMOTIVE & TRANSPORTATION',
            camelCased: 'Automotive & Transportation',
                icon: <EmojiTransportationIcon sx={{ fontSize: '90px' }} />
        },
        {
            name: 'AEROSPACE & DEFENSE',
            camelCased: 'Aerospace & Defense',
            icon: <ConnectingAirportsIcon sx={{ fontSize: '90px' }} />
        },
        {
            name: 'FOOD & BEVERAGE',
            camelCased: 'Food & Beverage',
            icon: <FastfoodIcon sx={{ fontSize: '90px' }} />
        },
        {
            name: 'ENERGY & POWER',
            camelCased: 'Energy & Power',
            icon: <ElectricMeterIcon sx={{ fontSize: '90px' }} />
        },
        {
            name: 'INFORMATION & COMMUNICATION TECHNOLOGY',
            camelCased: 'Information & Communication Technology',
            icon: <SatelliteAltIcon sx={{ fontSize: '90px' }} />
        },
        {
            name: 'SEMICONDUCTOR & ELECTRONICS',
            camelCased: 'Semiconductor & Electronics',
            icon: <MemoryIcon sx={{ fontSize: '90px' }} />
        },
        {


            name: 'HEALTHCARE',
            camelCased: 'Healthcare',
            icon: <HealthAndSafetyIcon sx={{ fontSize: '90px' }} />
        },
        {
            name: 'CHEMICALS & MATERIALS',
            camelCased: 'Chemical & Materials',
            icon: <ScienceIcon sx={{ fontSize: '90px' }} />
        },
    ];

    const navigate = (name) => {
        // cosol
        navigateIt(`/services/${name}`);
    }

    return (
        <div className="SecondContainer">

            <h2 className="SecondContainerHead">Industries we serve</h2>

            <div className="SecondContainerLists">

                {
                    departments.map((item, i) => {
                        return (
                            <DepartmentContainer handleClick={navigate} key={i} department={item} />
                        )
                    })
                }


            </div> 

        </div>
    );
}

export default SecondContainer;