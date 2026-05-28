import React, { useState, useEffect } from "react";
import './AdminPage.css';
import AddIcon from '@mui/icons-material/Add';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BookIcon from '@mui/icons-material/Book'; 
import CampaignIcon from '@mui/icons-material/Campaign'; 
import ArticleIcon from '@mui/icons-material/Article'; 
import LogoutIcon from '@mui/icons-material/Logout'; 
import AdminPageWriterHead from "./AdminPageWriterHead/AdminPageWriterHead";
import AdminPageWriterSection from "./AdminPageWriterSection/AdminPageWriterSection";

const AdminPage = () => {
    // --- AUTHENTICATION STATES ---
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    // --- CONTROL STATES FOR DASHBOARD & TYPES ---
    const [activeTab, setActiveTab] = useState('dashboard'); 
    const [contentType, setContentType] = useState('report'); 
    
    // Unified content lists
    const [allReports, setAllReports] = useState([]);
    const [allBlogs, setAllBlogs] = useState([]);
    const [allPRs, setAllPRs] = useState([]);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [originalTitle, setOriginalTitle] = useState(null); 

    // --- EDITOR STATES ---
    const [index, setIndex] = useState(0);
    const [editSectionIndex, setEditSectionIndex] = useState(null);
    const [editing, setEditing] = useState(false);
    const [selectedPreview, setSelectedPreview] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    // Root State Blueprints
    const emptyReportState = {
        title: '', description: '', publishedDate: '', reportSingleUserPrice: '', reportCorporatePrice: '', reportCode: '', industry: [], timestamp: '',
        reportSiteLicensePrice: '', availableFormats: [], sections: []
    };
    
    const emptyGenericPostState = {
        title: '', description: '', publishedDate: '', industry: [], timestamp: '', sections: []
    };

    const [data, setData] = useState(emptyReportState);
    const [section, setSection] = useState({ title: '', parts: [{ content: '', images: [] }] });

    // --- MONITOR AUTHENTICATION STATE CHANGE (UPDATED FOR BACKEND) ---
    useEffect(() => {
        // Check if a token already exists in local storage
        const storedToken = localStorage.getItem("adminToken");
        if (storedToken) {
            setUser({ token: storedToken });
        }
        setAuthLoading(false);
    }, []);

    // --- FETCH DATA FOR DASHBOARD ---
    useEffect(() => {
        if (user && activeTab === 'dashboard') {
            fetchAllData();
        }
    }, [activeTab, contentType, user]);
    
    // --- LOGIN LOGIC (UPDATED FOR BACKEND) ---
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError("");
        setAuthLoading(true);

        try {
            // Note the capital 'L' in adminLogin to match your backend file setup
            const response = await fetch("https://sprightly-jelly-d7e745.netlify.app/.netlify/functions/adminLogin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }) // Sends email/pass to Netlify
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Access Denied.");
            }

            // Save the secure token returned by Netlify
            localStorage.setItem("adminToken", result.token);
            setUser({ token: result.token });

        } catch (error) {
            setLoginError(error.message || "Invalid Email or Password.");
        } finally {
            setAuthLoading(false);
        }
    };

    // --- LOGOUT LOGIC (UPDATED FOR BACKEND) ---
    const handleLogout = async () => {
        if (window.confirm("Are you sure you want to log out?")) {
            localStorage.removeItem("adminToken"); // Clear the saved session
            setUser(null);
            setActiveTab('dashboard');
        }
    };

    const fetchAllData = async () => {
        setIsLoadingData(true);
        try {
            let endpoint = "";
            if (contentType === 'report') endpoint = "getreports";
            else if (contentType === 'blog') endpoint = "getblogs";
            else if (contentType === 'pr') endpoint = "getpressreleases";

            const response = await fetch(`https://sprightly-jelly-d7e745.netlify.app/.netlify/functions/${endpoint}`);
            const result = await response.json();
            const payload = result.response || result || [];

            if (contentType === 'report') setAllReports(payload);
            else if (contentType === 'blog') setAllBlogs(payload);
            else if (contentType === 'pr') setAllPRs(payload);
        } catch (error) {
            console.error(`Failed to fetch ${contentType}:`, error);
        } finally {
            setIsLoadingData(false);
        }
    };

    const handleRemovePartImage = (partIndex, imageIndex) => {
        setSection(prev => {
            const newParts = prev.parts.map((p, idx) => {
                if (idx === partIndex) {
                    const newImages = p.images.filter((_, i) => i !== imageIndex);
                    return { ...p, images: newImages };
                }
                return p;
            });
            return { ...prev, parts: newParts };
        });
    };

    const handleCreateNew = (type) => {
        setContentType(type);
        setData(type === 'report' ? emptyReportState : emptyGenericPostState);
        setOriginalTitle(null);
        setIndex(0);
        setActiveTab('editor');
    };

    const handleEditItem = (item, type) => {
        const itemData = JSON.parse(JSON.stringify(item));
        setContentType(type);
        setData(itemData);
        setOriginalTitle(itemData.title); 
        setIndex(0);
        setActiveTab('editor');
    };

    const handleDeleteItem = async (item, type) => {
        if (!item || !item.title) {
            alert(`Error: This ${type} does not have a valid title and cannot be deleted.`);
            return;
        }

        if (!window.confirm(`Are you sure you want to delete the ${type}: "${item.title}"?`)) {
            return;
        }

        try {
            let functionName = 'deletereport';
            if (type === 'blog') functionName = 'deleteblog';
            if (type === 'pr') functionName = 'deletepressrelease';

            const URL = `https://sprightly-jelly-d7e745.netlify.app/.netlify/functions/${functionName}?title=${encodeURIComponent(item.title)}`;
            
            const response = await fetch(URL, {
                method: 'GET', 
                headers: { 'Content-Type': 'application/json' }
            });

            const resData = await response.json();
            if (!response.ok) throw new Error(resData.error || "Failed to delete");
            
            alert(`${type.toUpperCase()} deleted successfully!`);
            
            if (type === 'report') setAllReports(prev => prev.filter(r => r.title !== item.title));
            else if (type === 'blog') setAllBlogs(prev => prev.filter(b => b.title !== item.title));
            else if (type === 'pr') setAllPRs(prev => prev.filter(p => p.title !== item.title));

        } catch (error) {
            alert(`Error deleting item: ${error.message}`);
        }
    };

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

    const handleFormatChange = (format, isChecked) => {
        setData((prev) => {
            let updatedFormats = prev.availableFormats || [];
            if (isChecked) {
                updatedFormats = [...updatedFormats, format];
            } else {
                updatedFormats = updatedFormats.filter(f => f !== format);
            }
            return { ...prev, availableFormats: updatedFormats };
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
            else alert(`Please enter a valid ${contentType.toUpperCase()} Title`);
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

    const submitToBackend = async () => {
        if (!data.sections || data.sections.length === 0) {
            alert("Please save at least one section before publishing!");
            return;
        }

        setIsUploading(true);
        const isUpdate = !!originalTitle;

        // Determine the correct Netlify function based on content type and whether it's an update
        let functionName = isUpdate ? 'updatereport' : 'uploadreport';
        if (contentType === 'blog') functionName = isUpdate ? 'updateblog' : 'uploadblog';
        if (contentType === 'pr') functionName = isUpdate ? 'updatepressrelease' : 'uploadpressrelease';

        // Construct dynamic URL and Method
        const URL = `https://sprightly-jelly-d7e745.netlify.app/.netlify/functions/${functionName}?title=${encodeURIComponent(originalTitle || '')}`;
        const method = isUpdate ? 'PUT' : 'POST';
        const payload = isUpdate ? data : { content: data };

        try {
            // 1. Get the current token directly from localStorage (your new auth system)
            const token = localStorage.getItem("adminToken");

            // 2. Send it to your backend using the dynamically created URL
            const response = await fetch(URL, {
                method: method,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(payload)        
            });

            const resData = await response.json();
            
            if (!response.ok) {
                throw new Error(resData.error || "Failed to finalize content processing on server.");
            }
            
            // 3. Clear acknowledgment alert upon confirmation return status
            alert(`${contentType.toUpperCase()} successfully saved!`);
            setActiveTab('dashboard');

        } catch (error) {
            console.error("Backend transmission failed:", error);
            alert(`Transmission Error: ${error.message}`);
        } finally {
            setIsUploading(false);
        }
    }

    const getActiveContextList = () => {
        if (contentType === 'report') return allReports;
        if (contentType === 'blog') return allBlogs;
        return allPRs;
    };

    // --- RENDER TIMEOUT SCREEN WHILE VERIFYING SESSION ---
    if (authLoading) {
        return (
            <div className="AdminLoadingOverlay">
                <div className="AdminSpinner"></div>
                <h2>Verifying Session Security...</h2>
            </div>
        );
    }

    // --- RENDER SECURE GATEWAY IF USER NOT LOGGED IN ---
    if (!user) {
        return (
            <div className="AdminLoginWrapper">
                <div className="LoginCard">
                    <h2>Master Terminal Authorization</h2>
                    <p>Access restricted to management entities only.</p>
                    {loginError && <p className="LoginErrorMsg">{loginError}</p>}
                    <form onSubmit={handleLogin}>
                        <div className="LoginGroup">
                            <label>Work Email Address</label>
                            <input type="email" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="LoginGroup">
                            <label>Access Password</label>
                            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button type="submit" className="LoginSubmitBtn">Request Access Privilege</button>
                    </form>
                </div>
            </div>
        );
    }

    // --- PROTECTED AUTHORIZED WORKSPACE ---
    return(
        <div className="AdminPage">
            {isUploading && (
                <div className="AdminLoadingOverlay">
                    <div className="AdminSpinner"></div>
                    <h2>{originalTitle ? `Updating ${contentType.toUpperCase()}...` : `Publishing ${contentType.toUpperCase()}...`}</h2>
                    <p>Processing data. Please do not close this window.</p>
                </div>
            )}

            <div className="AdminSidebar">
                <div className="AdminLogo">TILIVE INTERNATIONAL</div>
                <div className="AdminNav">
                    <p className={`NavItem ${activeTab === 'dashboard' ? 'Active' : ''}`} onClick={() => setActiveTab('dashboard')}>
                        <DashboardIcon className="NavIcon" /> Dashboard
                    </p>
                    <p className={`NavItem ${activeTab === 'editor' && contentType === 'report' && !originalTitle ? 'Active' : ''}`} onClick={() => handleCreateNew('report')}>
                        <ArticleIcon className="NavIcon" /> New Report
                    </p>
                    <p className={`NavItem ${activeTab === 'editor' && contentType === 'blog' && !originalTitle ? 'Active' : ''}`} onClick={() => handleCreateNew('blog')}>
                        <BookIcon className="NavIcon" /> New Blog Post
                    </p>
                    <p className={`NavItem ${activeTab === 'editor' && contentType === 'pr' && !originalTitle ? 'Active' : ''}`} onClick={() => handleCreateNew('pr')}>
                        <CampaignIcon className="NavIcon" /> New Press Release
                    </p>
                    
                    {/* Secure Log Out Control Link */}
                    <p className="NavItem LogoutBtn" onClick={handleLogout} style={{marginTop: 'auto', color: '#ef4444'}}>
                        <LogoutIcon className="NavIcon" /> Secure Logout
                    </p>
                </div>
            </div>

            <div className="AdminMain">
                {activeTab === 'dashboard' ? (
                    <>
                        <div className="AdminHeader">
                            <h1>Content Master Dashboard</h1>
                            <div style={{display: 'flex', gap: '10px'}}>
                                <button className={`BtnSecondary ${contentType === 'report' ? 'ActiveFilterBtn' : ''}`} onClick={() => setContentType('report')}>Reports</button>
                                <button className={`BtnSecondary ${contentType === 'blog' ? 'ActiveFilterBtn' : ''}`} onClick={() => setContentType('blog')}>Blogs</button>
                                <button className={`BtnSecondary ${contentType === 'pr' ? 'ActiveFilterBtn' : ''}`} onClick={() => setContentType('pr')}>Press Releases</button>
                            </div>
                        </div>
                        <div className="AdminWorkspace">
                            <div className="AdminCard DashboardCard">
                                {isLoadingData ? (
                                    <p className="DashboardLoading">Loading items from server...</p>
                                ) : getActiveContextList().length === 0 ? (
                                    <p className="DashboardLoading">No entries found for {contentType}s. Create one to get started!</p>
                                ) : (
                                    <table className="DashboardTable">
                                        <thead>
                                            <tr>
                                                <th>Title</th>
                                                {contentType === 'report' && <th>Code</th>}
                                                <th>Published Date</th>
                                                <th>Industries / Tags</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {getActiveContextList().map((item, i) => (
                                                <tr key={i}>
                                                    <td className="MainTitle">{item.title}</td>
                                                    {contentType === 'report' && <td>{item.reportCode || 'N/A'}</td>}
                                                    <td>{item.publishedDate || 'Draft'}</td>
                                                    <td>{(item.industry || []).join(', ') || 'None'}</td>
                                                    <td>
                                                        <button className="BtnSecondary" onClick={() => handleEditItem(item, contentType)}>
                                                            <EditIcon fontSize="small" style={{marginRight: '5px'}}/> Edit
                                                        </button>
                                                        <button className="BtnDanger" onClick={() => handleDeleteItem(item, contentType)} style={{marginLeft: '8px'}}>
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
                    <>
                        <div className="AdminHeader">
                            <h1>{originalTitle ? `Edit ${contentType.toUpperCase()}` : `Create New ${contentType.toUpperCase()}`}</h1>
                            <div style={{display: 'flex', gap: '10px'}}>
                                <button className="BtnSecondary" onClick={() => setActiveTab('dashboard')} disabled={isUploading}>Cancel</button>
                                <button className="BtnPrimary" onClick={submitToBackend} disabled={isUploading}>
                                    {isUploading ? 'Saving...' : (originalTitle ? 'Save Changes' : `Publish ${contentType}`)}
                                </button>
                            </div>
                        </div>

                        <div className="AdminWorkspace">
                            <div className="AdminCard WriterCard">
                                {index === 0 ? (
                                    <AdminPageWriterHead 
                                        data={data} 
                                        mode={contentType}
                                        handleFormatChange={handleFormatChange}
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
                                        <AddIcon className="BtnIcon" /> {editing ? 'Save Changes to Section' : (index === 0 ? 'Next: Add Sections' : 'Save Section')}
                                    </button>
                                </div>
                            </div>

                            {data.title && (
                                <div className="AdminCard PreviewCard">
                                    <div className="PreviewHeader">
                                        <h3>Live Preview Mirror</h3>
                                        <span className="Badge" style={{textTransform: 'uppercase'}}>{originalTitle ? 'Editing' : 'Draft'}</span>
                                    </div>
                                    <div className="PreviewContent">
                                        <div className="PreviewHeadSection">
                                            <h2 className="PreviewTitle">
                                                {data.title || "Untitled Entry"}
                                                <button className="IconBtn" onClick={handleEditHead}><EditIcon fontSize="small" /></button>
                                            </h2>
                                            <div className="PreviewMeta">
                                                {contentType === 'report' && data.reportCode && <span>Code: {data.reportCode}</span>}
                                                {data.publishedDate && <span>Date: {data.publishedDate}</span>}
                                                {(data.industry || []).length > 0 && <span>Tags: {data.industry.join(', ')}</span>}
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