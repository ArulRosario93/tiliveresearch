import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../../../Components/NavBar/NavBar';
import FootBar from '../../../Components/FootBar/FootBar';
import './SingleBlogPage.css';

const SingleBlogPage = () => {
    const { blogtitle } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchBlog = async () => {
            try {
                const response = await fetch(`https://sprightly-jelly-d7e745.netlify.app/.netlify/functions/getblogs?title=${encodeURIComponent(blogtitle)}`);
                const result = await response.json();
                
                if (!response.ok) throw new Error(result.error || 'Blog not found');
                setBlog(result);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (blogtitle) fetchBlog();
    }, [blogtitle]);

    if (loading) return <div className="SingleBlog"><NavBar /><div className="StatusMessage">Loading blog content...</div></div>;
    if (error || !blog) return <div className="SingleBlog"><NavBar /><div className="StatusMessage">Error: {error || "Blog not found"}</div></div>;

    return (
        <div className="SingleBlog">
            <NavBar />
            
            <div className="SingleBlogContainer">
                <div className="SingleBlogHero">
                    <div className="SingleBlogBreadcrumbs">
                        <span onClick={() => navigate('/')}>Home</span> &gt; <span onClick={() => navigate('/blogs')}>Blogs</span> &gt; {blog.title}
                    </div>
                    <h1 className="SingleBlogTitle">{blog.title}</h1>
                    <div className="SingleBlogMeta">
                        {blog.publishedDate && <span>Published: {blog.publishedDate}</span>}
                        {blog.industry && blog.industry.length > 0 && <span>Tags: {blog.industry.join(', ')}</span>}
                    </div>
                </div>

                <div className="SingleBlogBody">
                    {blog.description && (
                        <div className="SingleBlogDescription">
                            {blog.description}
                        </div>
                    )}

                    {blog.sections && blog.sections.map((section, sIndex) => (
                        <div key={sIndex} className="BlogSection">
                            {section.title && <h2 className="BlogSectionTitle">{section.title}</h2>}
                            
                            {section.parts && section.parts.map((part, pIndex) => (
                                <div key={pIndex}>
                                    <div 
                                        className="BlogPartContent ql-editor" 
                                        dangerouslySetInnerHTML={{ __html: part.content }} 
                                    />
                                    
                                    {part.images && part.images.length > 0 && (
                                        <div className="BlogImageGrid">
                                            {part.images.map((imgUrl, iIndex) => (
                                                <img key={iIndex} src={imgUrl} alt={`Section illustration ${iIndex + 1}`} className="BlogPartImage" />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <FootBar />
        </div>
    );
}

export default SingleBlogPage;