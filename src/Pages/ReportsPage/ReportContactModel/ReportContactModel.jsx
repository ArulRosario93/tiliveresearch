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

    return (
        <div className="ModalOverlay">
            <div className="ModalContent">
                <div className="ModalHeader">
                    <h3>{getTitle()}</h3>
                    <button className="CloseBtn" onClick={onClose}>&times;</button>
                </div>
                <p className="ModalSub">Target Report: {reportTitle}</p>
                <form className="ModalForm">
                    <input type="text" placeholder="Full Name" required />
                    <input type="email" placeholder="Work Email" required />
                    {type === 'purchase' && (
                        <select className="ModalSelect">
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