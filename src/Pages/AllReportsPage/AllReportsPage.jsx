import React, { useState, useEffect } from 'react';
import './AllReportsPage.css';
import NavBar from '../../Components/NavBar/NavBar';
import FootBar from '../../Components/FootBar/FootBar';
import AllReportsItemContainer from './AllReportsItemContainer/AllReportsItemContainer';
import AllReportsLabel from './AllReportsLabel/AllReportsLabel';
import DividerHori from '../../Components/Divider/DividerHori';
import AllReportsNumbers from './AllReportsNumbers/AllReportsNumbers';

const AllReportsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const reportsPerPage = 10;

    const labels = [
        'All', 'Healthcare', 'Information & Communications Technology', 
        'Semiconductor & Electronics', 'Chemicals & Materials', 
        'Automotive & Transportation', 'Aerospace & Defense', 
        'Energy & Power', 'Food & Beverage',
    ];

    // Assuming 'reports' is your array of 40 objects
    const reports = [
        { name: 'Metaverse Market', description: 'Description for Report 1', publishedOn: '2024-01-01', category: 'Healthcare' },
        { name: 'Humanoid Robot Market', description: 'Description for Report 2', publishedOn: '2024-01-02', category: 'Information & Communications Technology' },
    ];

    // 1. Filter reports based on category
    const filteredReports = selectedCategory === 'All' 
        ? reports 
        : reports.filter(report => report.category === selectedCategory);

    // 2. Reset to page 1 whenever the category changes
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory]);

    // 3. Logic for Pagination (The 10-10-10 split)
    const indexOfLastReport = currentPage * reportsPerPage;
    const indexOfFirstReport = indexOfLastReport - reportsPerPage;
    const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);
    const totalPages = Math.ceil(filteredReports.length / reportsPerPage);

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
                                onClick={() => setSelectedCategory(item)}
                            />
                            {i !== labels.length - 1 ? <DividerHori /> : null}
                        </React.Fragment>
                    ))}
                </div>

                <div className='AllReportsPageContainerContent'>
                    <p className='AllReportsPageContainerContentHead'>
                        {selectedCategory} Research Reports
                    </p>

                    {currentReports.length > 0 ? (
                        currentReports.map((item, i) => (
                            <AllReportsItemContainer 
                                key={i} 
                                title={item.name} 
                                category={item.category}
                                description={item.description} 
                                date={item.publishedOn} 
                                last={i === currentReports.length - 1} 
                            />
                        ))
                    ) : (
                        <div className='AllReportsPageContainerContentNotAvailable'>
                            No Reports Available 
                        </div>
                    )}

                    {/* Pass pagination props to the numbers component */}
                    <AllReportsNumbers 
                        totalPages={totalPages} 
                        currentPage={currentPage} 
                        setCurrentPage={setCurrentPage} 
                    />
                </div>
            </div>
            <FootBar />
        </div>
    );
}

export default AllReportsPage;