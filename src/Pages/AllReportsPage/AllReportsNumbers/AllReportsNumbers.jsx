import React from 'react';
import './AllReportsNumbers.css';

const AllReportsNumbers = ({ totalPages, currentPage, setCurrentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className='AllReportsNumbers'>
            {pageNumbers.map(number => (
                <p 
                    key={number}
                    className={`AllReportsNumbersPara ${currentPage === number ? 'activePage' : ''}`}
                    onClick={() => setCurrentPage(number)}
                >
                    {number}
                </p>
            ))}
        </div>
    );
}

export default AllReportsNumbers;