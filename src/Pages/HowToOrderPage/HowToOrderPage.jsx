
import React from 'react';
import "./HowToOrderPage.css";
import CallIcon from '@mui/icons-material/Call';
import LockOutlineIcon from '@mui/icons-material/LockOutline';
import NavBar from "../../Components/NavBar/NavBar";
import FootBar from "../../Components/FootBar/FootBar";

const HowToOrderPage = () => {
    return (
        <>
            <NavBar />
            <div className='HowToOrderPage'>
                <h2 className='HowToOrderPageHead'>How To Order</h2>

                <p className='HowToOrderPageHeadPara'>At Tilive Research, we have developed a straightforward and effective ordering process to enable you to swiftly obtain the market intelligence and services you require.
</p>            
                <br />

                <h2 className='HowToOrderPageInHead'>1. Search for a Report or Service</h2>
                <p className='HowToOrderPageInPara'>Utilize the search bar or explore our categories to locate the market research report, consulting service, or business solution that meets your needs.
</p>
                <h2 className='HowToOrderPageInHead'>2. Request a Sample or Inquiry</h2>
                <p className='HowToOrderPageInPara'>For further information regarding the report's scope or customization options, you may:
</p>
                <p className='HowToOrderPageInPara'>Request a sample by clicking on "Request Sample"
</p>
                <p className='HowToOrderPageInPara'>Submit an inquiry for personalized services or any additional questions
</p>
                <p className='HowToOrderPageInPara'>A member of our team will reach out to you to comprehend your requirements.
</p>

                <h2 className='HowToOrderPageInHead'>3. Place Your Order</h2>
                <p className='HowToOrderPageInPara'>After you have made your selection:
</p>
                <p className='HowToOrderPageInPara'>Click on "Buy Now" or "Place Order"
</p>
                <p className='HowToOrderPageInPara'>Complete the order form with your information (name, company, contact details, etc.)
</p>
                <p className='HowToOrderPageInPara'>Choose your preferred payment method.
</p>

                <h2 className='HowToOrderPageInHead'>4. Make a Payment</h2>
                <p className='HowToOrderPageInPara'>We accept secure payments through:
</p>
                <p className='HowToOrderPageInPara'>Credit/Debit Cards
</p>
                <p className='HowToOrderPageInPara'>Bank Wire Transfers
</p>
                <p className='HowToOrderPageInPara'>UPI (for clients in India)
</p>
                <p className='HowToOrderPageInPara'>PayPal (for international clients)
</p>
                <p className='HowToOrderPageInPara'>An official invoice along with payment instructions will be provided upon confirmation.
</p>

                <h2 className='HowToOrderPageInHead'>5. Receive Your Report or Service
</h2>
                <p className='HowToOrderPageInPara'>Syndicated reports are dispatched within 24–48 business hours following payment confirmation.
</p>
                <p className='HowToOrderPageInPara'>Custom research and consulting projects adhere to a timeline that is discussed during the onboarding process.
</p>
                <p className='HowToOrderPageInPara'>All deliverables are sent in PDF or PPT format via email or through our client portal.
</p>
                <p className='HowToOrderPageInPara'>All deliverables are sent in PDF or PPT format via email or through our client portal.
</p>
                <br />
                <br />

                <h2 className='HowToOrderPageInHead'><LockOutlineIcon /> Confidentiality & Security
</h2>
                <p className='HowToOrderPageInPara'>All client interactions and data are handled with strict confidentiality. Payments are processed through secure, encrypted gateways.
</p>

                <h2 className='HowToOrderPageInHead'><CallIcon /> Need Help?
</h2>
                <p className='HowToOrderPageInPara'>Contact our support team for assistance at:
</p>
                <br />

                <p className='HowToOrderPageInPara'>📧 Email: sales@tiliveresearch.com
</p>
                <p className='HowToOrderPageInPara'>📞 Phone: +91 96234 41273
</p>


            </div>
            <FootBar /> 
        </>
    );
}

export default HowToOrderPage;