
import React from "react";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import "./AdminPageWriterSection.css";

const AdminPageWriterSection = ({ images, handleDescriptionChange, handleTitleChange, titleValue, descriptionValue, handleImageChange }) => {
    return(
        <div className="AdminPageWriterSection">
            <h3 className="AdminPageContentContainerWriterHead">Section Title</h3>
            <input className="AdminPageContentContainerWriterHeadInput" value={titleValue} onChange={handleTitleChange} type="text" name="" id="" />

            <br />
            <br />

            <h3 className="AdminPageContentContainerWriterHead">Section Description</h3>
            <div className="AdminPageWriterSectionWriterContainer">
                <textarea  className="AdminPageContentContainerWriterHeadInput AdminPageContentContainerWriterHeadInputTextArea" value={descriptionValue} onChange={handleDescriptionChange} type="text" name="" id="" />
                <div className="AdminPageWriterSectionAddImageContainer">

                    <div className="AdminPageWriterSectionAddImageContainerImages">
                        {
                            images?.map((item, i) => {
                                return (
                                    <img className="AdminPageWriterSectionAddImageContainerImagesImg" src={URL.createObjectURL(item)} key={i} />
                                );
                            })
                        }
                    </div>

                    <input onChange={handleImageChange} type="file" accept="image/*" name="sectionImage" hidden multiple id="sectionImage" />
                    <label htmlFor="sectionImage">
                        <div className="AdminPageWriterSectionAddImage">
                            <p className="AdminPageWriterSectionAddImageText">Add Images</p>
                            <AddCircleOutlineIcon style={{color: '#3D2BE2'}} fontSize="16px"/>
                        </div>
                    </label>
                </div>
            </div>

        </div>
    );
}

export default AdminPageWriterSection;