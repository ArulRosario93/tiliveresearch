import React, { useState, useEffect } from "react";
import './AdminPage.css';
import AddIcon from '@mui/icons-material/Add';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EditIcon from '@mui/icons-material/Edit';
import AdminPageWriterHead from "./AdminPageWriterHead/AdminPageWriterHead";
import AdminPageWriterSection from "./AdminPageWriterSection/AdminPageWriterSection";
import DeleteIcon from '@mui/icons-material/Delete';
const AdminPage = () => {
    // --- NEW STATES FOR DASHBOARD NAVIGATION ---
    const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' or 'editor'
    const [allReports, setAllReports] = useState([]);
    const [isLoadingReports, setIsLoadingReports] = useState(false);
    const [originalReportTitle, setOriginalReportTitle] = useState(null); // Tracks if we are updating

    // --- EDITOR STATES (Existing) ---
    const [index, setIndex] = useState(0);
    const [editSectionIndex, setEditSectionIndex] = useState(null);
    const [editing, setEditing] = useState(false);
    const [selectedPreview, setSelectedPreview] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    // Root Data Payload
    const emptyReportState = {
        title: '', description: '', publishedDate: '', reportCode: '', industry: [], timestamp: '', sections: []
    };
    const [data, setData] = useState(emptyReportState);

    const [section, setSection] = useState({ title: '', parts: [{ content: '', images: [] }] });

    // --- FETCH REPORTS FOR DASHBOARD ---
    useEffect(() => {
        if (activeTab === 'dashboard') {
            fetchAllReports();
        }
    }, [activeTab]);

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

    const handleRemovePartImage = (partIndex, imageIndex) => {
        setSection(prev => {
            const newParts = prev.parts.map((p, idx) => {
                if (idx === partIndex) {
                    // Filter out the image at the specific index
                    const newImages = p.images.filter((_, i) => i !== imageIndex);
                    return { ...p, images: newImages };
                }
                return p;
            });
            return { ...prev, parts: newParts };
        });
    };

    // --- NAVIGATION HANDLERS ---
    const handleCreateNew = () => {
        setData(emptyReportState);
        setOriginalReportTitle(null);
        setIndex(0);
        setActiveTab('editor');
    };

    const handleEditReport = (report) => {
        // Deep copy to avoid mutating the list state
        const reportData = JSON.parse(JSON.stringify(report));
        setData(reportData);
        setOriginalReportTitle(reportData.title); // Remember the original title for the PUT request
        setIndex(0);
        setActiveTab('editor');
    };

    // --- EXISTING EDITOR HANDLERS ---
    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    }

    const handleIndustryChange = (e) => {
        const { value, checked } = e.target;
        setData((prev) => {
            const currentIndustries = [...(prev.industry || [])];
            if (checked) {
                currentIndustries.push(value);
            } else {
                const idx = currentIndustries.indexOf(value);
                if (idx > -1) currentIndustries.splice(idx, 1);
            }
            return { ...prev, industry: currentIndustries };
        });
    };

    const handleSectionTitleChange = (e) => setSection(prev => ({ ...prev, title: e.target.value }));

    const handlePartContentChange = (partIndex, value) => {
        setSection(prev => {
            const newParts = prev.parts.map((p, idx) => idx === partIndex ? { ...p, content: value } : p);
            return { ...prev, parts: newParts };
        });
    }

    const handlePartImageChange = async (partIndex, e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            const base64Promises = files.map(file => new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            }));

            try {
                const base64Images = await Promise.all(base64Promises);
                setSection(prev => {
                    const newParts = prev.parts.map((p, idx) => idx === partIndex ? { ...p, images: [...(p.images || []), ...base64Images] } : p);
                    return { ...prev, parts: newParts };
                });
            } catch (error) {
                console.error("Failed to read image files:", error);
            }
        }
        e.target.value = ''; 
    }

    const handleAddPartToSection = () => setSection(prev => ({ ...prev, parts: [...prev.parts, { content: '', images: [] }] }));
    const handleRemovePartFromSection = (partIndex) => setSection(prev => ({ ...prev, parts: prev.parts.filter((_, idx) => idx !== partIndex) }));

    const handleEditHead = () => { setEditing(true); setEditSectionIndex(null); setIndex(0); }
    const handleEditSection = (i) => { setIndex(1); setEditing(true); setEditSectionIndex(i); setSection(JSON.parse(JSON.stringify(data.sections[i]))); }

    const handleSaveChanges = () => {
        if (editSectionIndex === null) {
            setEditing(false);
            setIndex(1);
            return;
        }
        setData((prev) => ({
            ...prev,
            sections: prev.sections.map((item, i) => i === editSectionIndex ? JSON.parse(JSON.stringify(section)) : item),
        }));
        resetSectionState();
    }

    const handleAddSection = () => {
        if (index === 0) {
            if (data.title.trim().length > 3) setIndex(1);
            else alert('Please enter a valid Report Title');
        } else {
            if (section.title.trim().length > 2 && section.parts[0].content.trim().length > 2) {
                setData((prev) => ({ ...prev, sections: [...prev.sections, JSON.parse(JSON.stringify(section))] }));
                resetSectionState();
            } else {
                alert('Section must have a title and at least one part with content.');
            }
        }
    }

    const resetSectionState = () => {
        setSection({ title: '', parts: [{ content: '', images: [] }] });
        setSelectedPreview(editing ? editSectionIndex : data.sections.length); 
        setEditing(false);
        setIndex(1);
    }

    const handleDeleteReport = async (report) => {
        // 1. Add a safety check to ensure the report actually has a title
        if (!report || !report.title) {
            alert("Error: This report does not have a valid title and cannot be deleted.");
            return;
        }

        if (!window.confirm(`Are you sure you want to delete the report: "${report.title}"?`)) {
            return;
        }

        try {
            const URL = `https://sprightly-jelly-d7e745.netlify.app/.netlify/functions/deletereport?title=${encodeURIComponent(report.title)}`;
            
            const response = await fetch(URL, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            console.log("Delete response status:", response);

            const resData = await response.json();
            
            if (!response.ok) throw new Error(resData.error || "Failed to delete");
            
            alert("Report deleted successfully!");
            setAllReports(prev => prev.filter(r => r.title !== report.title));

        } catch (error) {
            alert(`Error deleting report: ${error.message}`);
        }
    };

    // --- SUBMIT: Handles both CREATE and UPDATE ---
    const submitToBackend = () => {
        if (!data.sections || data.sections.length === 0) {
            alert("Please save at least one section to the report before publishing!");
            return;
        }

        setIsUploading(true);

        const isUpdate = !!originalReportTitle;
        
        // Define endpoints based on action
        const URL = `https://sprightly-jelly-d7e745.netlify.app/.netlify/functions/updatereport?title=${encodeURIComponent(originalReportTitle)}`
        
        const method = isUpdate ? 'PUT' : 'POST';
        const payload = isUpdate ? data : { content: data };

        fetch(URL, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)        
        })
        .then(async (response) => {
            const resData = await response.json();
            if (!response.ok) throw new Error(resData.error || "Failed to publish");
            return resData;
        })
        .then(resData => {
            alert(isUpdate ? "Report updated successfully!" : "Report published successfully!");
            setActiveTab('dashboard'); // Send back to dashboard on success
        })
        .catch(error => alert(`Error saving report: ${error.message}`))
        .finally(() => setIsUploading(false));
    }

    return(
        <div className="AdminPage">
            {isUploading && (
                <div className="AdminLoadingOverlay">
                    <div className="AdminSpinner"></div>
                    <h2>{originalReportTitle ? 'Updating Report...' : 'Publishing Report...'}</h2>
                    <p>Processing data. Please do not close this window.</p>
                </div>
            )}

            <div className="AdminSidebar">
                <div className="AdminLogo">TILIVE INTERNATIONAL LLP</div>
                <div className="AdminNav">
                    <p className={`NavItem ${activeTab === 'dashboard' ? 'Active' : ''}`} onClick={() => setActiveTab('dashboard')}>
                        <DashboardIcon className="NavIcon" /> Dashboard
                    </p>
                    <p className={`NavItem ${activeTab === 'editor' && !originalReportTitle ? 'Active' : ''}`} onClick={handleCreateNew}>
                        <AddIcon className="NavIcon" /> New Report
                    </p>
                </div>
            </div>

            <div className="AdminMain">
                {activeTab === 'dashboard' ? (
                    // ---------------- DASHBOARD VIEW ----------------
                    <>
                        <div className="AdminHeader">
                            <h1>Reports Dashboard</h1>
                            <button className="BtnPrimary" onClick={handleCreateNew}>
                                <AddIcon className="BtnIcon" /> Create New
                            </button>
                        </div>
                        <div className="AdminWorkspace">
                            <div className="AdminCard DashboardCard">
                                {isLoadingReports ? (
                                    <p className="DashboardLoading">Loading reports from server...</p>
                                ) : allReports.length === 0 ? (
                                    <p className="DashboardLoading">No reports found. Create one to get started!</p>
                                ) : (
                                    <table className="DashboardTable">
                                        <thead>
                                            <tr>
                                                <th>Title</th>
                                                <th>Code</th>
                                                <th>Published Date</th>
                                                <th>Industries</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {allReports.map((r, i) => (
                                                <tr key={i}>
                                                    <td className="MainTitle">{r.title}</td>
                                                    <td>{r.reportCode || 'N/A'}</td>
                                                    <td>{r.publishedDate || 'Draft'}</td>
                                                    <td>{(r.industry || []).join(', ') || 'None'}</td>
                                                    <td>
                                                        <button className="BtnSecondary" onClick={() => handleEditReport(r)}>
                                                            <EditIcon fontSize="small" style={{marginRight: '5px'}}/> Edit
                                                        </button>
                                                        <button className="BtnDanger" onClick={() => handleDeleteReport(r)} style={{marginLeft: '8px'}}>
                                                            <DeleteIcon fontSize="small" style={{marginRight: '5px'}}/> Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    // ---------------- EDITOR VIEW (Existing Code) ----------------
                    <>
                        <div className="AdminHeader">
                            <h1>{originalReportTitle ? 'Edit Report' : 'Create New Report'}</h1>
                            <div style={{display: 'flex', gap: '10px'}}>
                                <button className="BtnSecondary" onClick={() => setActiveTab('dashboard')} disabled={isUploading}>Cancel</button>
                                <button className="BtnPrimary" onClick={submitToBackend} disabled={isUploading}>
                                    {isUploading ? 'Saving...' : (originalReportTitle ? 'Save Changes' : 'Publish Report')}
                                </button>
                            </div>
                        </div>

                        <div className="AdminWorkspace">
                            <div className="AdminCard WriterCard">
                                {index === 0 ? (
                                    <AdminPageWriterHead 
                                        data={data} 
                                        handleDataChange={handleDataChange} 
                                        handleIndustryChange={handleIndustryChange}
                                    />
                                ) : (
                                    <AdminPageWriterSection 
                                        section={section} 
                                        handleSectionTitleChange={handleSectionTitleChange}
                                        handlePartContentChange={handlePartContentChange}
                                        handlePartImageChange={handlePartImageChange}
                                        handleRemovePartImage={handleRemovePartImage}
                                        handleAddPartToSection={handleAddPartToSection}
                                        handleRemovePartFromSection={handleRemovePartFromSection}
                                    />
                                )}

                                <div className="WriterActions">
                                    <button className="BtnPrimary" onClick={editing ? handleSaveChanges : handleAddSection}>
                                        <AddIcon className="BtnIcon" /> {editing ? 'Save Changes to Section' : (index === 0 ? 'Next: Add Sections' : 'Save Section to Report')}
                                    </button>
                                </div>
                            </div>

                            {data.title && (
                                <div className="AdminCard PreviewCard">
                                    {/* Preview Code Remains Exactly the Same */}
                                    <div className="PreviewHeader">
                                        <h3>Live Preview</h3>
                                        <span className="Badge">{originalReportTitle ? 'Editing' : 'Draft'}</span>
                                    </div>
                                    <div className="PreviewContent">
                                        <div className="PreviewHeadSection">
                                            <h2 className="PreviewTitle">
                                                {data.title || "Untitled Report"}
                                                <button className="IconBtn" onClick={handleEditHead}><EditIcon fontSize="small" /></button>
                                            </h2>
                                            <div className="PreviewMeta">
                                                {data.reportCode && <span>Code: {data.reportCode}</span>}
                                                {data.publishedDate && <span>Date: {data.publishedDate}</span>}
                                                {(data.industry || []).length > 0 && <span>Industries: {data.industry.join(', ')}</span>}
                                            </div>
                                            <p className="PreviewDescription">{data.description}</p>
                                        </div>

                                        <div className="PreviewSectionsNav">
                                            {(data.sections || []).map((sec, i) => (
                                                <button key={i} className={`SectionTab ${selectedPreview === i ? 'ActiveTab' : ''}`} onClick={() => setSelectedPreview(i)}>
                                                    {sec.title || `Section ${i + 1}`}
                                                    <span className="EditTabIcon" onClick={(e) => { e.stopPropagation(); handleEditSection(i); }}><EditIcon fontSize="inherit" /></span>
                                                </button>
                                            ))}
                                        </div>

                                        {(data.sections || [])[selectedPreview] && (
                                            <div className="PreviewSectionBody">
                                                {data.sections[selectedPreview].parts.map((part, pIndex) => (
                                                    <div key={pIndex} className="PreviewPartBlock">
                                                        <div className="SectionContentText ql-editor" dangerouslySetInnerHTML={{ __html: part.content }} />                                                
                                                        {part.images && part.images.length > 0 && (
                                                            <div className="SectionImageGrid">
                                                                {part.images.map((img, idx) => <img key={idx} src={img} alt={`part-attachment-${idx}`} /> )}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>  
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default AdminPage;