import React from "react";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import ReactQuill from 'react-quill'; // IMPORT QUILL
import 'react-quill/dist/quill.snow.css'; // IMPORT QUILL STYLES
import "./AdminPageWriterSection.css";

const AdminPageWriterSection = ({ 
    section, 
    handleSectionTitleChange, 
    handlePartContentChange, 
    handlePartImageChange, 
    handleAddPartToSection,
    handleRemovePartFromSection
}) => {
    
    // Optional: Customize the toolbar options
    const modules = {
        toolbar: [
          [{ 'header': [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link'],
          ['clean'] // remove formatting button
        ],
      };

    return(
        <div className="WriterForm">
            <div className="FormGroup">
                <label>Section Title (e.g., Methodology, TOC)</label>
                <input 
                    className="FormInput" 
                    value={section.title} 
                    onChange={handleSectionTitleChange} 
                    type="text" 
                    placeholder="Enter Section Title..." 
                />
            </div>

            <div className="PartsContainer">
                <label>Section Content Parts</label>
                
                {section.parts.map((part, index) => (
                    <div key={index} className="SectionEditorContainer">
                        <div className="PartHeader">
                            <span className="PartLabel">Part {index + 1}</span>
                            {section.parts.length > 1 && (
                                <button className="RemovePartBtn" onClick={() => handleRemovePartFromSection(index)}>
                                    <DeleteOutlineIcon fontSize="small"/> Remove Part
                                </button>
                            )}
                        </div>
                        
                        {/* REPLACED TEXTAREA WITH REACT QUILL */}
                        <div className="QuillContainer" style={{ backgroundColor: 'white', marginBottom: '15px' }}>
                            <ReactQuill 
                                theme="snow"
                                value={part.content} 
                                onChange={(content) => handlePartContentChange(index, content)} 
                                placeholder="Write or paste formatted content here..."
                                modules={modules}
                            />
                        </div>
                        
                        <div className="MediaToolbar">
                            <div className="ThumbnailRow">
                                {part.images?.map((img, i) => (
                                    <img className="ImgThumb" src={img} key={i} alt="thumb" />
                                ))}
                            </div>
                            <input 
                                onChange={(e) => handlePartImageChange(index, e)} 
                                type="file" 
                                accept="image/*" 
                                hidden 
                                multiple 
                                id={`partImage-${index}`} 
                            />
                            <label htmlFor={`partImage-${index}`} className="AddMediaBtn">
                                <AddPhotoAlternateIcon fontSize="small"/> Add Images to Part {index + 1}
                            </label>
                        </div>
                    </div>
                ))}

                <button className="BtnSecondary AddPartBtn" onClick={handleAddPartToSection}>
                    <AddIcon fontSize="small" /> Add Another Part
                </button>
            </div>
        </div>
    );
}

export default AdminPageWriterSection;