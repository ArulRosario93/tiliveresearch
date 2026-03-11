import React, { useState } from 'react';
import './FootBar.css';
import { useNavigate } from 'react-router';

const FootBar = () => {
    const navigate = useNavigate();

    const handleNavigatetoAboutUs = () => {
        navigate("/aboutus/")
        window.scroll(0, 0)
    }
    const handleNavigatetoContactUs = () => {
        navigate("/contactus/");
        window.scroll(0, 0)
    }
    const handleNavigatetoDisclaimer = () => {
        navigate('/disclaimer/')
        window.scroll(0, 0)
    }
    const handleNavigatetoHowToOrder = () => {
        navigate('/howtoorder/')
        window.scroll(0, 0)
    }
    const handleNavigatetoTermsAndConditions = () => {
        navigate('/termsCondition/')
        window.scroll(0, 0)
    }

    return (
        <div className='FootBar'>
            <div className='FootBarQuickLinks'>
                <h3 className='FootBarHead'>Quick Links</h3>
                <p className='FootBarPara' onClick={handleNavigatetoAboutUs}>About Us</p>
                <p className='FootBarPara' onClick={handleNavigatetoContactUs}>Contact Us</p>
                <p className='FootBarPara' onClick={handleNavigatetoDisclaimer}>Disclaimer</p>
                <p className='FootBarPara'>Services</p>
            </div>
            <div className='FootBarFindHelp'>
                <h3 className='FootBarHead'>Find Help</h3>
                <p className='FootBarPara' onClick={handleNavigatetoHowToOrder}>How To Order</p>
                <p className='FootBarPara'>Privacy Policy</p>
                <p className='FootBarPara' onClick={handleNavigatetoTermsAndConditions}>Terms and Condition</p>
            </div>
            <div className='FootBarContactUs'>
                <h3 className='FootBarHead'>Contact Us</h3>
                <p className='FootBarPara'>Office 4/27, Example Area, Pune. 411014</p>

                <br />
                <p className='FootBarPara'><b>Phone:</b> +91 1234567890</p>
                <p className='FootBarPara'><b>Email:</b> example@example.com</p>
            </div>
        </div>
    );
}

export default FootBar;