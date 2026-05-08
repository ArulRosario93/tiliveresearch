import React from 'react';
import './ReportContactModel.css';

const ReportContactModal = ({ isOpen, onClose, type, reportTitle }) => {
    if (!isOpen) return null;

    const getTitle = () => {
        switch(type) {
            case 'purchase': return 'Purchase Request';
            case 'sample': return 'Request for Sample';
            case 'enquiry': return 'General Enquiry';
            default: return 'Contact Us';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = {
            name: e.target[0].value, // Captures the name from the form
            type: type,
            report: reportTitle,
            email: e.target[1].value, // Captures the email from the form
            message: e.target[2].value
        };

        console.log("Form Data to be sent:", formData);

        try {
            const response = await fetch('/sendEmail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                alert("Email sent successfully!");
                onClose();
            }
        } catch (error) {
            console.error("Error sending email:", error);
        }
    };

    return (
        <div className="ModalOverlay">
            <div className="ModalContent">
                <div className="ModalHeader">
                    <h3>{getTitle()}</h3>
                    <button className="CloseBtn" onClick={onClose}>&times;</button>
                </div>
                <p className="ModalSub">Target Report: {reportTitle}</p>
                <form className="ModalForm" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Full Name" required />
                    <input type="email" placeholder="Work Email" required />
                    {type === 'purchase' && (
                        <select className="ModalSelect" style={{padding: '10px'}}>
                            <option>Single User License ($4000)</option>
                            <option>Corporate License ($5500)</option>
                        </select>
                    )}
                    <textarea placeholder="Additional Notes" rows="4"></textarea>
                    <button type="submit" className="SubmitBtn">
                        {type === 'purchase' ? 'Proceed to Purchase' : 'Send Request'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReportContactModal;