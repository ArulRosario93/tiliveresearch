import React, { useState, useRef, useEffect } from "react";
import './AdminPageWriterHead.css';

const AdminPageWriterHead = ({ data, mode, handleDataChange, handleIndustryChange, handleFormatChange }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const availableIndustries = [
        "Construction & Mining", "Pharma & Biotechnology", "Automotive & Transportation", "Aerospace & Defense", "Food & Beverage", "Energy & Power", "Information & Communication Technology", "Semiconductor & Electronics", "Healthcare", "Chemical & Materials",
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="WriterForm">
            <div className="FormGroup">
                <label>{mode ? mode.toUpperCase() : 'Content'} Title</label>
                <input 
                    className="FormInput" 
                    value={data.title} 
                    name="title"
                    onChange={handleDataChange} 
                    type="text" 
                    placeholder={`Enter ${mode} title...`} 
                />
            </div>

            <div className="FormRow">
                {/* Only render complex report specifications if typing structure mode is a Report */}
                {mode === 'report' && (
                    <div className="FormGroup">
                        <label>Report Code</label>
                        <input 
                            className="FormInput" 
                            value={data.reportCode} 
                            name="reportCode"
                            onChange={handleDataChange} 
                            type="text" 
                            placeholder="e.g. REP-2026-001" 
                        />
                    </div>
                )}
                <div className="FormGroup">
                    <label>Published Date</label>
                    <input 
                        className="FormInput" 
                        value={data.publishedDate} 
                        name="publishedDate"
                        onChange={handleDataChange} 
                        type="date" 
                    />
                </div>
            </div>

            {/* Conditionally reveal commercial metrics only if mode evaluates directly to report */}
            {mode === 'report' && (
                <>
                    <div className="FormGroup">
                        <label>Available Formats</label>
                        <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <input type="checkbox" checked={data.availableFormats?.includes('pdf')} onChange={(e) => handleFormatChange('pdf', e.target.checked)} /> PDF
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <input type="checkbox" checked={data.availableFormats?.includes('excel')} onChange={(e) => handleFormatChange('excel', e.target.checked)} /> Excel
                            </label>
                        </div>
                    </div>

                    <div className="FormRow">
                        <div className="FormGroup">
                            <label>Single User Price In USD</label>
                            <input className="FormInput" value={data.reportSingleUserPrice} name="reportSingleUserPrice" onChange={handleDataChange} type="number" placeholder="eg: 4999" />
                        </div>
                        <div className="FormGroup">
                            <label>Corporate Price In USD</label>
                            <input className="FormInput" value={data.reportCorporatePrice} name="reportCorporatePrice" onChange={handleDataChange} type="number" placeholder="eg: 5999" />
                        </div>
                    </div>
                </>
            )}

            <div className="FormGroup" ref={dropdownRef}>
                <label>Industry Segment / Tags</label>
                <div className="CustomDropdown">
                    <div className="DropdownHeader" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <span className="DropdownSelectedText">
                            {data.industry?.length > 0 ? data.industry.join(", ") : "Select Categories..."}
                        </span>
                        <span className={`DropdownArrow ${isDropdownOpen ? 'Open' : ''}`}>▼</span>
                    </div>
                    {isDropdownOpen && (
                        <div className="DropdownMenu">
                            {availableIndustries.map((ind) => (
                                <label key={ind} className="DropdownItem">
                                    <input type="checkbox" value={ind} checked={(data.industry || []).includes(ind)} onChange={handleIndustryChange} />
                                    {ind}
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="FormGroup">
                <label>{mode === 'report' ? 'Report Summary' : 'Short Snippet/Introduction Description'}</label>
                <textarea 
                    className="FormInput TextArea" 
                    value={data.description} 
                    name="description"
                    onChange={handleDataChange} 
                    rows="4"
                    placeholder="Brief description introduction..." 
                />
            </div>
        </div>
    );
};

export default AdminPageWriterHead;