import React, { useState, useEffect } from "react";
import "./Blogs.css";
import NavBar from "../../Components/NavBar/NavBar";
import FootBar from "../../Components/FootBar/FootBar";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchBlogs = async () => {
            try {
                const response = await fetch("https://sprightly-jelly-d7e745.netlify.app/.netlify/functions/getblogs");
                const result = await response.json();
                setBlogs(result.response || result || []);
            } catch (error) {
                console.error("Failed to fetch blogs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    // Helper to get first image from section parts, or a default placeholder
    const getThumbnail = (blog) => {
        if (blog.sections && blog.sections[0] && blog.sections[0].parts[0] && blog.sections[0].parts[0].images?.length > 0) {
            return blog.sections[0].parts[0].images[0];
        }
        return "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1000&auto=format&fit=crop"; // Professional default fallback
    };

    return (
        <div className="Blogs">
            <NavBar />
            <div className="BlogsContainer">
                <h1 className="BlogsHeader">Latest Insights & Blogs</h1>
                
                {loading ? (
                    <p className="LoadingText">Fetching latest blogs...</p>
                ) : blogs.length === 0 ? (
                    <p className="LoadingText">No blogs published yet.</p>
                ) : (
                    <div className="BlogsGrid">
                        {blogs.map((blog, index) => (
                            <div key={index} className="BlogCard" onClick={() => navigate(`/blogs/${blog.title}`)}>
                                <div className="BlogImageContainer">
                                    <img src={getThumbnail(blog)} alt={blog.title} className="BlogImage" />
                                    <div className="BlogDateBadge">{blog.publishedDate || "Recent"}</div>
                                </div>
                                <div className="BlogContent">
                                    <h3 className="BlogTitle">{blog.title}</h3>
                                    <p className="BlogDescription">{blog.description}</p>
                                    <span className="BlogReadMore">READ MORE &rarr;</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <FootBar />
        </div>
    );
}

export default Blogs;