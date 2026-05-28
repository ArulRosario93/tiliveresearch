import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../../../Components/NavBar/NavBar';
import FootBar from '../../../Components/FootBar/FootBar';
import './SinglePRPage.css';

const SinglePRPage = () => {
    const { prtitle } = useParams();
    const navigate = useNavigate();
    const [pr, setPr] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchPR = async () => {
            try {
                const response = await fetch(`https://sprightly-jelly-d7e745.netlify.app/.netlify/functions/getpressreleases?title=${encodeURIComponent(prtitle)}`);
                const result = await response.json();
                
                if (!response.ok) throw new Error(result.error || 'Press Release not found');
                setPr(result);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (prtitle) fetchPR();
    }, [prtitle]);

    if (loading) return <div className="SinglePR"><NavBar /><div className="StatusMessage" style={{paddingTop: '150px'}}>Loading Press Release...</div></div>;
    if (error || !pr) return <div className="SinglePR"><NavBar /><div className="StatusMessage" style={{paddingTop: '150px'}}>Error: {error || "Press release not found"}</div></div>;

    return (
        <div className="SinglePR">
            <NavBar />
            
            <div className="SinglePRContainer">
                <div className="SinglePRHeader">
                    <div className="SinglePRBreadcrumbs">
                        <span onClick={() => navigate('/')}>Home</span> &gt; <span onClick={() => navigate('/pressrelease')}>Press Releases</span> &gt; {pr.title}
                    </div>
                    <h1 className="SinglePRTitle">{pr.title}</h1>
                    <div className="SinglePRDate">
                        {pr.publishedDate ? `Published on ${pr.publishedDate}` : 'Recent Release'} 
                        {pr.industry && pr.industry.length > 0 && ` | ${pr.industry.join(', ')}`}
                    </div>
                </div>

                <div className="SinglePRBody">
                    {pr.description && (
                        <div className="SinglePRLead">
                            {pr.description}
                        </div>
                    )}

                    {pr.sections && pr.sections.map((section, sIndex) => (
                        <div key={sIndex} className="PRSection">
                            {section.title && <h2 className="PRSectionTitle">{section.title}</h2>}
                            
                            {section.parts && section.parts.map((part, pIndex) => (
                                <div key={pIndex}>
                                    <div 
                                        className="PRPartContent ql-editor" 
                                        dangerouslySetInnerHTML={{ __html: part.content }} 
                                    />
                                    
                                    {part.images && part.images.length > 0 && (
                                        <div className="PRImageGrid">
                                            {part.images.map((imgUrl, iIndex) => (
                                                <img key={iIndex} src={imgUrl} alt={`PR attachment ${iIndex + 1}`} className="PRPartImage" />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                
                <div className="PRFooter">
                    <p>For more information, please contact our media relations team.</p>
                </div>
            </div>

            <FootBar />
        </div>
    );
}

export default SinglePRPage;