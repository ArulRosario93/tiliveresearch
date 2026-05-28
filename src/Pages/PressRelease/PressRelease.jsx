import React, { useState, useEffect } from 'react';
import './PressRelease.css';
import NavBar from '../../Components/NavBar/NavBar';
import FootBar from '../../Components/FootBar/FootBar';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from 'react-router-dom';

const PressRelease = () => {
    const [prs, setPrs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const industries = [
        "Construction & Mining", 
        "Pharma & Biotechnology", 
        "Automotive & Transportation", 
        "Aerospace & Defense", 
        "Food & Beverage", 
        "Energy & Power", 
        "Information & Communication Technology", 
        "Semiconductor & Electronics", 
        "Healthcare", 
        "Chemical & Materials"
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchPRs = async () => {
            try {
                const response = await fetch("https://sprightly-jelly-d7e745.netlify.app/.netlify/functions/getpressreleases");
                const result = await response.json();
                setPrs(result.response || result || []);
            } catch (error) {
                console.error("Failed to fetch Press Releases:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPRs();
    }, []);

    const filteredPRs = prs.filter(pr => 
        pr.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        pr.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
        pr.industry.some(ind => ind.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="PressRelease">
            <NavBar />
            
            <div className="PRHero">
                <h1>Press Releases</h1>
                <div className="PRBreadcrumbs">
                    <span onClick={() => navigate('/')}>Home</span> &gt; Press Releases
                </div>
            </div>

            <div className="PRContainer">
                <div className="PRMain">
                    <div className="PRSearchBar">
                        <input 
                            type="text" 
                            className="PRSearchInput" 
                            placeholder="Search press release..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="PRSearchBtn">
                            <SearchIcon style={{color: 'black'}} />
                        </button>
                    </div>

                    {loading ? (
                        <p className="LoadingText">Loading press releases...</p>
                    ) : filteredPRs.length === 0 ? (
                        <p className="LoadingText">No press releases found.</p>
                    ) : (
                        filteredPRs.map((pr, index) => (
                            <div key={index} className="PRCard">
                                <h2 className="PRCardTitle">{pr.title}</h2>
                                <p className="PRCardDesc">{pr.description}</p>
                                <button className="PRViewBtn" onClick={() => navigate(`/pressrelease/${pr.title}`)}>
                                    View More
                                </button>
                            </div>
                        ))
                    )}
                </div>

                <div className="PRSidebar">
                    <div className="PRSidebarHeader">Our Industry</div>
                    <ul className="PRSidebarList">
                        {industries.map((ind, idx) => (
                            <li key={idx} className="PRSidebarItem" onClick={() => setSearchTerm(ind)}>
                                {ind} <KeyboardArrowRightIcon fontSize="small" style={{color: '#94a3b8'}}/>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            
            <FootBar />
        </div>
    );
}

export default PressRelease;