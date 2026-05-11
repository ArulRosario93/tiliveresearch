import React, { useState, useEffect } from 'react';
import './AllReportsPage.css';
import NavBar from '../../Components/NavBar/NavBar';
import FootBar from '../../Components/FootBar/FootBar';
import AllReportsItemContainer from './AllReportsItemContainer/AllReportsItemContainer';
import AllReportsLabel from './AllReportsLabel/AllReportsLabel';
import DividerHori from '../../Components/Divider/DividerHori';
import AllReportsNumbers from './AllReportsNumbers/AllReportsNumbers';
import DeleteIcon from '@mui/icons-material/Delete';
const AllReportsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [allReports, setAllReports] = useState([]);
    const [isLoadingReports, setIsLoadingReports] = useState(false);
    const reportsPerPage = 10;

    const labels = [
        'All', 'Healthcare', 'Information & Communications Technology', 
        'Semiconductor & Electronics', 'Chemicals & Materials', 
        'Automotive & Transportation', 'Aerospace & Defense', 
        'Energy & Power', 'Food & Beverage',
    ];

    
    const fetchAllReports = async () => {
        setIsLoadingReports(true);
        try {
            // Adjust this URL to your actual endpoint that returns ALL reports
            const response = await fetch("https://sprightly-jelly-d7e745.netlify.app/.netlify/functions/getreports");
            const result = await response.json();
            
            // Handle however your backend returns the array (e.g., result.response or just result)
            setAllReports(result.response || result || []);
        } catch (error) {
            console.error("Failed to fetch reports:", error);
        } finally {
            setIsLoadingReports(false);
        }
    };
    
    const filterReportsByCategory = (category) => {
        if (category === 'All') {
            fetchAllReports();
        } else {
            setAllReports(allReports.filter(report => report.industry === category));
        }
    }

    useEffect(() => {
        fetchAllReports();
    }, []);

    // 2. Reset to page 1 whenever the category changes
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory]);

    // 3. Logic for Pagination (The 10-10-10 split)
    const indexOfLastReport = currentPage * reportsPerPage;
    const indexOfFirstReport = indexOfLastReport - reportsPerPage;
    const currentReports = allReports.slice(indexOfFirstReport, indexOfLastReport);
    const totalPages = Math.ceil(allReports.length / reportsPerPage);

    return (
        <div className='AllReportsPage'>
            <NavBar />
            <div className='AllReportsPageContainer'>
                <div className='AllReportsPageContainerLabel'>
                    <p className='AllReportsPageContainerLabelHead'>Reports of Industry</p>
                    {labels.map((item, i) => (
                        <React.Fragment key={i}>
                            <AllReportsLabel 
                                name={item} 
                                selected={selectedCategory === item} 
                                onClick={() => {
                                    setSelectedCategory(item);
                                    filterReportsByCategory(item);
                                    setCurrentPage(1);
                                }}
                            />
                            {i !== labels.length - 1 ? <DividerHori /> : null}
                        </React.Fragment>
                    ))}
                </div>

                <div className='AllReportsPageContainerContent'>
                    {
                        isLoadingReports ? <p className="DashboardLoading">Fetching Reports...</p> :
                        <>
                            <p className='AllReportsPageContainerContentHead'>
                                {selectedCategory} Research Reports
                            </p>

                            {
                                allReports.length > 0 ? (
                                allReports.map((item, i) => (
                                    <AllReportsItemContainer 
                                        key={i} 
                                        title={item.title} 
                                        category={item.industry}
                                        description={item.description} 
                                        date={item.publishedDate} 
                                        last={i === allReports.length - 1} 
                                    />
                                ))
                            ) : (
                                <div className='AllReportsPageContainerContentNotAvailable'>
                                    No Reports Available 
                                </div>
                            )}

                            <AllReportsNumbers 
                                totalPages={totalPages} 
                                currentPage={currentPage} 
                                setCurrentPage={setCurrentPage} 
                            />
                        </>
                    }


                </div>
            </div>
            <FootBar />
        </div>
    );
}

export default AllReportsPage;