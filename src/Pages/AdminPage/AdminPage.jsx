import React, { useState } from "react";
import './AdminPage.css';
import AddIcon from '@mui/icons-material/Add';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EditIcon from '@mui/icons-material/Edit';
import AdminPageWriterHead from "./AdminPageWriterHead/AdminPageWriterHead";
import AdminPageWriterSection from "./AdminPageWriterSection/AdminPageWriterSection";

const AdminPage = () => {
    const [index, setIndex] = useState(0);
    const [editSectionIndex, setEditSectionIndex] = useState(null);
    const [editing, setEditing] = useState(false);
    const [selectedPreview, setSelectedPreview] = useState(0);
    
    // NEW: Loading State
    const [isUploading, setIsUploading] = useState(false);

    // Root Data Payload
    const [data, setData] = useState({
        title: '',
        description: '',
        publishedDate: '',
        reportCode: '',
        industry: [],
        timestamp: '', 
        sections: [],
    });

    // Active Section being drafted
    const [section, setSection] = useState({
        title: '',
        parts: [{ content: '', images: [] }]
    });

    const handleDataChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    }

    const handleIndustryChange = (e) => {
        const { value, checked } = e.target;
        setData((prev) => {
            const currentIndustries = [...prev.industry];
            if (checked) {
                currentIndustries.push(value);
            } else {
                const idx = currentIndustries.indexOf(value);
                if (idx > -1) currentIndustries.splice(idx, 1);
            }
            return { ...prev, industry: currentIndustries };
        });
    };

    const handleSectionTitleChange = (e) => {
        setSection(prev => ({ ...prev, title: e.target.value }));
    }

    const handlePartContentChange = (partIndex, value) => {
        setSection(prev => {
            const newParts = prev.parts.map((p, idx) => {
                if (idx === partIndex) {
                    return { ...p, content: value };
                }
                return p;
            });
            return { ...prev, parts: newParts };
        });
    }

    const handlePartImageChange = async (partIndex, e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            const base64Promises = files.map(file => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = error => reject(error);
                });
            });

            try {
                const base64Images = await Promise.all(base64Promises);
                setSection(prev => {
                    const newParts = prev.parts.map((p, idx) => {
                        if (idx === partIndex) {
                            return { ...p, images: [...(p.images || []), ...base64Images] };
                        }
                        return p;
                    });
                    return { ...prev, parts: newParts };
                });
            } catch (error) {
                console.error("Failed to read image files:", error);
            }
        }
        e.target.value = ''; 
    }

    const handleAddPartToSection = () => {
        setSection(prev => ({
            ...prev,
            parts: [...prev.parts, { content: '', images: [] }]
        }));
    }

    const handleRemovePartFromSection = (partIndex) => {
        setSection(prev => {
            const newParts = prev.parts.filter((_, idx) => idx !== partIndex);
            return { ...prev, parts: newParts };
        });
    }

    const handleEditHead = () => {
        setEditing(true);
        setEditSectionIndex(null);
        setIndex(0);
    }

    const handleEditSection = (i) => {
        setIndex(1);
        setEditing(true);
        setEditSectionIndex(i);
        setSection(JSON.parse(JSON.stringify(data.sections[i])));
    }

    const handleSaveChanges = () => {
        if (editSectionIndex === null) {
            setEditing(false);
            setIndex(1);
            return;
        }

        setData((prev) => {
            const sectionDeepCopy = JSON.parse(JSON.stringify(section));
            return {
                ...prev,
                sections: prev.sections.map((item, i) => i === editSectionIndex ? sectionDeepCopy : item),
            };
        });
        
        resetSectionState();
    }

    const handleAddSection = () => {
        if (index === 0) {
            if (data.title.trim().length > 3) {
                setIndex(1);
            } else {
                alert('Please enter a valid Report Title');
            }
        } else {
            if (section.title.trim().length > 2 && section.parts[0].content.trim().length > 2) {
                setData((prev) => {
                    const sectionDeepCopy = JSON.parse(JSON.stringify(section));
                    const newSections = [...prev.sections, sectionDeepCopy];
                    return { ...prev, sections: newSections };
                });
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

    const submitToBackend = () => {
        if (data.sections.length === 0) {
            alert("Please save at least one section to the report before publishing!");
            return;
        }

        // TRIGGER LOADING SCREEN
        setIsUploading(true);

        const URL = "https://storied-paprenjak-0a4af7.netlify.app/.netlify/functions/uploadReport";
        const payload = { ...data };

        console.log("Sending Payload to Node.js:", payload);

        fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: payload })        
        })
        .then(async (response) => {
            const resData = await response.json();
            if (!response.ok) throw new Error(resData.error || "Failed to publish");
            return resData;
        })
        .then(resData => {
            console.log("Response from Node.js:", resData);
            alert("Report published successfully!");
            
            setData({
                title: '', description: '', publishedDate: '', reportCode: '', industry: [], timestamp: '', sections: []
            });
            setIndex(0);
        })
        .catch(error => {
            console.error("Error publishing report:", error);
            alert(`Error publishing report: ${error.message}`);
        })
        .finally(() => {
            // STOP LOADING SCREEN REGARDLESS OF SUCCESS OR FAILURE
            setIsUploading(false);
        });
    }

    return(
        <div className="AdminPage">
            {/* NEW: Loading Overlay UI */}
            {isUploading && (
                <div className="AdminLoadingOverlay">
                    <div className="AdminSpinner"></div>
                    <h2>Publishing Report...</h2>
                    <p>Uploading content and processing images. Please do not close this window.</p>
                </div>
            )}

            <div className="AdminSidebar">
                <div className="AdminLogo">Acme Corp</div>
                <div className="AdminNav">
                    <p className="NavItem"><DashboardIcon className="NavIcon" /> Dashboard</p>
                    <p className="NavItem Active"><AddIcon className="NavIcon" /> New Report</p>
                </div>
            </div>

            <div className="AdminMain">
                <div className="AdminHeader">
                    <h1>Create New Report</h1>
                    <button className="BtnPrimary" onClick={submitToBackend} disabled={isUploading}>
                        {isUploading ? 'Publishing...' : 'Publish Report'}
                    </button>
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
                                handleAddPartToSection={handleAddPartToSection}
                                handleRemovePartFromSection={handleRemovePartFromSection}
                            />
                        )}

                        <div className="WriterActions">
                            <button className="BtnPrimary" onClick={editing ? handleSaveChanges : handleAddSection}>
                                <AddIcon className="BtnIcon" /> {editing ? 'Save Changes' : (index === 0 ? 'Next: Add Sections' : 'Save Section to Report')}
                            </button>
                        </div>
                    </div>

                    {data.title && (
                        <div className="AdminCard PreviewCard">
                            <div className="PreviewHeader">
                                <h3>Live Preview</h3>
                                <span className="Badge">Draft</span>
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
                                        {data.industry.length > 0 && <span>Industries: {data.industry.join(', ')}</span>}
                                    </div>
                                    <p className="PreviewDescription">{data.description}</p>
                                </div>

                                <div className="PreviewSectionsNav">
                                    {data.sections.map((sec, i) => (
                                        <button 
                                            key={i} 
                                            className={`SectionTab ${selectedPreview === i ? 'ActiveTab' : ''}`}
                                            onClick={() => setSelectedPreview(i)}
                                        >
                                            {sec.title || `Section ${i + 1}`}
                                            <span className="EditTabIcon" onClick={(e) => { e.stopPropagation(); handleEditSection(i); }}>
                                                <EditIcon fontSize="inherit" />
                                            </span>
                                        </button>
                                    ))}
                                </div>

                                {data.sections[selectedPreview] && (
                                    <div className="PreviewSectionBody">
                                        {data.sections[selectedPreview].parts.map((part, pIndex) => (
                                            <div key={pIndex} className="PreviewPartBlock">
                                                <div 
                                                    className="SectionContentText ql-editor" 
                                                    dangerouslySetInnerHTML={{ __html: part.content }} 
                                                />                                                
                                                {part.images && part.images.length > 0 && (
                                                    <div className="SectionImageGrid">
                                                        {part.images.map((img, idx) => (
                                                            <img key={idx} src={img} alt={`part-attachment-${idx}`} /> 
                                                        ))}
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
            </div>
        </div>
    );
}

export default AdminPage;