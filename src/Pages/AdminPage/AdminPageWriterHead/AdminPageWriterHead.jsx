
import React from "react";
import './AdminPageWriterHead.css';

const AdminPageWriterHead = ({ handleTitle, handleDescription, titleValue, descriptionValue }) => {

    return (
        <div className="AdminPageWriterHead">
            <h3 className="AdminPageContentContainerWriterHead">Report Title</h3>
            <input className="AdminPageContentContainerWriterHeadInput" value={titleValue} onChange={handleTitle} type="text" name="title" id="" />
        
            <br />
            <br />

            <h3 className="AdminPageContentContainerWriterHead">Report Description</h3>
            <textarea className="AdminPageContentContainerWriterHeadInput" value={descriptionValue} onChange={handleDescription} type="text" name="Description" id="" />
        </div>
    );
}

export default AdminPageWriterHead;