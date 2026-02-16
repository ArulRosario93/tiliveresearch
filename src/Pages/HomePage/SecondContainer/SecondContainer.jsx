
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
            icon: <ConstructionIcon fontSize="large" />
        },
        {
            name: 'PHARMA & BIOTECHNOLOGY',
            camelCased: 'Pharma & Biotechnology',
            icon: <BiotechIcon fontSize="large" />
        },
        {
            name: 'AUTOMOTIVE & TRANSPORTATION',
            camelCased: 'Automotive & Transportation',
            icon: <EmojiTransportationIcon fontSize="large" />
        },
        {
            name: 'AEROSPACE & DEFENSE',
            camelCased: 'Aerospace & Defense',
            icon: <ConnectingAirportsIcon fontSize="large" />
        },
        {
            name: 'PACKAGING',
            camelCased: 'Packaging',
            icon: <Inventory2Icon fontSize="large" />
        },
        {
            name: 'FOOD & BEVERAGE',
            camelCased: 'Food & Beverage',
            icon: <FastfoodIcon fontSize="large" />
        },
        {
            name: 'ENERGY & POWER',
            camelCased: 'Energy & Power',
            icon: <ElectricMeterIcon fontSize="large" />
        },
        {
            name: 'INFORMATION & COMMUNICATION TECHNOLOGY',
            camelCased: 'Information & Communication Technology',
            icon: <SatelliteAltIcon fontSize="large" />
        },
        {
            name: 'SEMICONDUCTOR & ELECTRONICS',
            camelCased: 'Semiconductor & Electronics',
            icon: <MemoryIcon fontSize="large" />
        },
        {
            name: 'HEALTHCARE',
            camelCased: 'Healthcare',
            icon: <HealthAndSafetyIcon fontSize="large" />
        },
        {
            name: 'CHEMICALS & MATERIALS',
            camelCased: 'Chemical & Materials',
            icon: <ScienceIcon fontSize="large" />
        },
        {
            name: 'MEDICALDEVICES',
            camelCased: 'Medical Devices',
            icon: <MonitorHeartIcon fontSize="large"/>
        },
    ];

    const navigate = (name) => {
        // cosol
        navigateIt(`/services/${name}`);
    }

    return (
        <div className="SecondContainer">

            <h2 className="SecondContainerHead">WHAT WE DO</h2>

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