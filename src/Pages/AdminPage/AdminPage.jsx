import React, { useState } from "react";
import './AdminPage.css';
import AddIcon from '@mui/icons-material/Add';
import AdminPageWriterHead from "./AdminPageWriterHead/AdminPageWriterHead";
import AdminPageWriterSection from "./AdminPageWriterSection/AdminPageWriterSection";
import DashboardIcon from '@mui/icons-material/Dashboard';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import EditIcon from '@mui/icons-material/Edit';

const AdminPage = () => {

    const [index, setIndex] = useState(0);
    const [editSectionIndex, setEditSectionIndex] = useState(null);
    const [editing, setEditing] = useState(false);

    const [data, setData] = useState({
        title: '',
        description: '',
        sections: [],
        sampleReportPDF: null,
    });

    const [sampleReportPDF, setSampleReportPDF] = useState(null);

    const [section, setSection] = useState({
        sectionTitle: '',
        sectionImage: [],
        sectionDescription: '',
    });

    const [selectedPreview, setSelectedPreview] = useState(null);

    const handleTitleChange = (e) => {
        setData((preV) => ({
            ...preV,
            title: e.target.value,
        }));

    }

    const handleDescriptionChange = (e) => {
        setData((preV) => ({
            ...preV,
            description: e.target.value,
        }));
    }

    const handleSectionTitleChange = (e) => {
        setSection((preV) => ({
            ...preV,
            sectionTitle: e.target.value,
        }));

    }

    const handleSectionDescriptionChange = (e) => {
        setSection((preV) => ({
            ...preV,
            sectionDescription: e.target.value,
        }));


    }

    const handleSectionImageChange = (e) => {

        const file = e.target.files;
        if (file) {

            setSection((preV) => ({
                ...preV,
                sectionImage: [...preV.sectionImage, ...file],
            }));

        }

    }

    const handleSampleReportChange = (e) => {

        const file = e.target.files;
        if (file) {
            setSampleReportPDF(file[0]);
            setData((preV) => ({
                ...preV,
                sampleReportPDF: file[0],
            }));
        }
    }

    const handleChangePreviewDescription = (i) => {
        setSelectedPreview(i)
    }

    const handleChangeInTitle = () => {
        setEditing(true);
        
        var currentDataSection = data;
        
        setData((preV) => ({
            ...preV,
            title: currentDataSection.title,
            description: currentDataSection.description,
        }));
        
        setIndex(0);
    }

    const handleSectionChangeWithindex = (i) => {

        setIndex(1);
        setEditing(true);
        setEditSectionIndex(i);
        var currentDataSection = data.sections[i];

        setSection(() => ({
            sectionTitle: currentDataSection.sectionTitle,
            sectionImage: currentDataSection.sectionImage,
            sectionDescription: currentDataSection.sectionDescription,
        }));

    }

    const handleSaveChanges = () => {
        if(editSectionIndex === 0){
            setData((preV) => ({
                ...preV,
                title: data.title,
                description: data.description,
            }));
            setEditing(false);
            return;
        }

        setData((preV) => ({
            ...preV,
            sections: preV.sections.map((item, i) => i === editSectionIndex ? section : item),
        }));
        setSection(() => ({
            sectionTitle: '',
            sectionImage: [],
            sectionDescription: '',
        }));
        setSelectedPreview(0);
        setEditing(false);

        setIndex(index + 1);
    }

    const handleAddSection = () => {

        if (index === 0){

            if(data.title.trim().length > 3 && data.description.trim().length > 3){

                setIndex(index + 1);

            }else{
                alert('Title and Description should be above 3 characters');
            }

        }else {

            if(section.sectionTitle.trim().length > 2 && section.sectionDescription.trim().length > 3){

                setData((preV) => ({
                    ...preV,
                    sections: [...preV.sections, section]
                }));

                setSection(() => ({
                    sectionTitle: '',
                    sectionImage: [],
                    sectionDescription: '',
                }));

                setSelectedPreview(0);

                setIndex(index + 1);
            } else{
                alert('Title and Description should be above 3 characters');
            }
        }

    }

    const handleCurrentSection = () => {

        return index == 0 ? 
            <AdminPageWriterHead handleTitle={handleTitleChange} titleValue={data.title} descriptionValue={data.description} handleDescription={handleDescriptionChange} /> : 
                <AdminPageWriterSection images={section.sectionImage} handleImageChange={handleSectionImageChange} handleDescriptionChange={handleSectionDescriptionChange} titleValue={section.sectionTitle} descriptionValue={section.sectionDescription} handleTitleChange={handleSectionTitleChange}  />

    }

    return(
        <div className="AdminPage">

            <div className="AdminPageLabel">

                <div className="AdminPageLabelLogo">
                    logo
                </div>

                <p className="AdminPageLabelText AdminPageLabelTextSelected">
                    <DashboardIcon />
                    Dashboard</p>
                <p className="AdminPageLabelText">
                    <AddIcon />
                    New Report</p>
            </div>

            <div className="AdminPageContent">

                <h1 className="AdminPageContentHead">New Report</h1>

                <div className="AdminPageContentContainer">

                    <div className="AdminPageContentContainerWriter">

                        {
                            handleCurrentSection()
                        }

                        <br />

                        <div className="AdminPageContentContainerWriterAdminBtns">
                            <div className="AdminPageContentContainerWriterAdminSection" onClick={editing ? handleSaveChanges :handleAddSection}>
                                <h3 className="AdminPageContentContainerWriterAdminSectionBtn">{editing ? 'Edit Section' : 'Add Section'}</h3>
                                <AddIcon style={{color: 'white'}}/>
                            </div>
                                <input type="file" accept="pdf*/" name="PDF" hidden id="PDF" onChange={handleSampleReportChange} />
                                <label htmlFor="PDF">
                                <div className="AdminPageContentContainerWriterAdminSection">
                                    <h3 className="AdminPageContentContainerWriterAdminSectionBtn">Add Sample PDF</h3>
                                    <AddIcon style={{color: 'white'}}/>
                                </div>
                            </label>
                        </div>

                    </div>

                    {
                        data.title.length > 5 && data.description.length > 5 ? 
                        <div className="AdminPageContentContainerPreview">

                            <h3 className="AdminPageContentContainerPreviewHead">Preview</h3>

                            <h4 className="AdminPageContentContainerPreviewTitle AdminPageContentContainerPreviewFlexIt">{data.title}
                                <p onClick={handleChangeInTitle}>
                                    <EditIcon fontSize="14px" style={{color: '#3D2BE2'}} />
                                    </p>
                            </h4>
                            <p className="AdminPageContentContainerPreviewDescription AdminPageContentContainerPreviewFlexIt">{data.description}
                                <p onClick={handleChangeInTitle}>
                                    <EditIcon fontSize="14px" style={{color: '#3D2BE2'}} />
                                </p>
                            </p>

                            <div className="AdminPageContentContainerPreviewSections">
                                {
                                    data?.sections?.map((item, i) => {
                                        return (
                                            <div key={i}>
                                                <p onClick={() => handleChangePreviewDescription(i)} style={{textDecoration: selectedPreview == i? 'underline': 'none'}} className="AdminPageContentContainerPreviewSectionTitle AdminPageContentContainerPreviewFlexIt">{item.sectionTitle}
                                                    <p onClick={() => handleSectionChangeWithindex(i)}>
                                                        <EditIcon fontSize="14px" style={{color: '#3D2BE2'}} />
                                                    </p>
                                                </p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="AdminPageContentContainerPreviewSectionImageContainer">
                                <p className="AdminPageContentContainerPreviewSectionDescription">{data?.sections[selectedPreview]?.sectionDescription}</p>
                                {
                                    data?.sections[selectedPreview]?.sectionImage?.map((item, i) => {
                                        return(
                                            <img className="AdminPageContentContainerPreviewSectionImage" src={URL.createObjectURL(item)} key={i} />
                                        )
                                    })
                                }
                            </div>

                            {
                                sampleReportPDF && (
                                    <div>
                                        <h4>Sample Report PDF:</h4>
                                        <object width="100%" height="400px" data={URL.createObjectURL(sampleReportPDF)} type="application/pdf"></object>
                                    </div>
                                )
                            }

                        </div> : null
                    
                    }

                </div>

            </div>

        </div>
    );
}

export default AdminPage;