import React, { useState, useRef, useEffect } from "react";
import './AdminPageWriterHead.css';

const AdminPageWriterHead = ({ data, handleDataChange, handleIndustryChange }) => {
    
    // State for managing the custom dropdown
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Placeholder industries - you can replace this with your dynamic list later
    const availableIndustries = [
        "Technology", "Healthcare", "Finance", "Automotive", "Energy", "Retail"
    ];

    // Close dropdown when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    return (
        <div className="WriterForm">
            <div className="FormGroup">
                <label>Report Title</label>
                <input 
                    className="FormInput" 
                    value={data.title} 
                    name="title"
                    onChange={handleDataChange} 
                    type="text" 
                    placeholder="Enter report title..." 
                />
            </div>

            <div className="FormRow">
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

            {/* NEW: Custom Multi-Select Dropdown */}
            <div className="FormGroup" ref={dropdownRef}>
                <label>Industry Segments</label>
                <div className="CustomDropdown">
                    <div className="DropdownHeader" onClick={toggleDropdown}>
                        <span className="DropdownSelectedText">
                            {/* FIX: Added ?. to safely check length */}
                            {data.industry?.length > 0 
                                ? data.industry.join(", ") 
                                : "Select Industries..."}
                        </span>
                        <span className={`DropdownArrow ${isDropdownOpen ? 'Open' : ''}`}>▼</span>
                    </div>
                    
                    {isDropdownOpen && (
                        <div className="DropdownMenu">
                            {availableIndustries.map((ind) => (
                                <label key={ind} className="DropdownItem">
                                    <input
                                        type="checkbox"
                                        value={ind}
                                        checked={(data.industry || []).includes(ind)}
                                        onChange={handleIndustryChange}
                                    />
                                    {ind}
                                </label>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="FormGroup">
                <label>Report Description</label>
                <textarea 
                    className="FormInput TextArea" 
                    value={data.description} 
                    name="description"
                    onChange={handleDataChange} 
                    rows="4"
                    placeholder="Brief summary of the report..." 
                />
            </div>
        </div>
    );
}

export default AdminPageWriterHead;