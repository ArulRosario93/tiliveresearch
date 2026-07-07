import React from 'react';
import './ReportContactModel.css';

const ReportContactModal = ({ isOpen, onClose, type, reportTitle, price }) => {
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
        
        // Using form element names to safely gather data
        const formData = {
            name: e.target.name.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            company: e.target.company.value,
            jobTitle: e.target.jobTitle.value,
            country: e.target.country.value,
            message: e.target.message.value,
            license: type === 'purchase' ? e.target.license.value : 'N/A',
            type,
            report: reportTitle,
        };

        try {
            const response = await fetch('https://sprightly-jelly-d7e745.netlify.app/.netlify/functions/sendemail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            

            if (response.ok) {
                alert("Request sent successfully! Our team will get back to you shortly.");
                onClose();
            } else {
                alert("Something went wrong. Please try again later.");
            }
        } catch (error) {
            console.error("Error sending email:", error);
            alert("Error connecting to the server.");
        }
    };

    return (
        <div className="ModalOverlay">
            <div className="ModalContent">
                <div className="ModalHeader">
                    <h3>{getTitle()}</h3>
                    <button className="CloseBtn" onClick={onClose}>&times;</button>
                </div>
                <p className="ModalSub">Target Report: <strong>{reportTitle}</strong></p>
                
                <form className="ModalForm" onSubmit={handleSubmit}>
                    
                    {/* Row 1: Name & Email */}
                    <div className="FormRowGrid">
                        <div className="InputGroup">
                            <label>Full Name <span className="Required">*</span></label>
                            <input type="text" name="name" placeholder="John Doe" required />
                        </div>
                        <div className="InputGroup">
                            <label>Work Email <span className="Required">*</span></label>
                            <input type="email" name="email" placeholder="john@company.com" required />
                        </div>
                    </div>

                    {/* Row 2: Company & Phone */}
                    <div className="FormRowGrid">
                        <div className="InputGroup">
                            <label>Company Name <span className="Required">*</span></label>
                            <input type="text" name="company" placeholder="Company Ltd." required />
                        </div>
                        <div className="InputGroup">
                            <label>Phone Number <span className="Required">*</span></label>
                            <input type="tel" name="phone" placeholder="+1 234 567 8900" required />
                        </div>
                    </div>

                    {/* Row 3: Job Title & Country (Optional) */}
                    <div className="FormRowGrid">
                        <div className="InputGroup">
                            <label>Job Title <span className="Optional">(Optional)</span></label>
                            <input type="text" name="jobTitle" placeholder="e.g. Marketing Manager" />
                        </div>
                        <div className="InputGroup">
                            <label>Country <span className="Optional">(Optional)</span></label>
                            <input type="text" name="country" placeholder="e.g. United States" />
                        </div>
                    </div>

                    {/* License Type (Only for Purchases) */}
                    {type === 'purchase' && (
                        <div className="InputGroup">
                            <label>License Type <span className="Required">*</span></label>
                            <select name="license" className="ModalSelect" required>
                                <option value={`Single User License ($${price?.reportSingleUserPrice || '4999'})`}>
                                    Single User License (${price?.reportSingleUserPrice || '4999'})
                                </option>
                                <option value={`Corporate License ($${price?.reportCorporatePrice || '5999'})`}>
                                    Corporate License (${price?.reportCorporatePrice || '5999'})
                                </option>
                            </select>
                        </div>
                    )}

                    {/* Message / Notes */}
                    <div className="InputGroup">
                        <label>
                            Additional Notes / Requirements 
                            {type === 'enquiry' ? <span className="Required"> *</span> : <span className="Optional"> (Optional)</span>}
                        </label>
                        <textarea 
                            name="message" 
                            placeholder="Please detail your specific requirements or questions here..." 
                            rows="3" 
                            required={type === 'enquiry'}
                        ></textarea>
                    </div>
                    
                    <button type="submit" className="SubmitBtn">
                        {type === 'purchase' ? 'Proceed to Purchase' : 'Submit Request'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReportContactModal;