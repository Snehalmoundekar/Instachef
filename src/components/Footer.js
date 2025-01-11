import React from "react";
import { Link } from "react-router-dom";  

const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-text">
                        <h2><span>Recreate</span> a Recipe</h2>
                        <p>Ever wondered how to make a commercial food product at home? Discover the secrets behind your favorite foods! With our professional techniques, you can easily recreate any recipe from the nutrition label.</p>
                    </div>
                </div>
            </footer>
            <div>
                <div className="footer-nav">
                    <ul>
                        <li><Link to="/recipesCard">Recipes</Link></li>
                        <li><Link to="/categories">Categories</Link></li>
                        <li><Link to="/favorites">Favorite</Link></li>
                        <li><Link to="/"><img src="/assets/fried-rice.gif" alt="Logo" style={{width:"100px",height:"100px"}}/></Link></li>
                        <li><Link to="/help">Help</Link></li>
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                        <li><Link to="/terms">Terms</Link></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="footer-Copyright">
                    <p>&copy; 2024 <span>InstaChef</span></p>
                </div>
                <div className="footer-social">
                    <Link to="/"><i className="fa-brands fa-facebook"></i></Link>
                    <Link to="/"><i className="fa-brands fa-youtube"></i></Link>
                    <Link to="/"><i className="fa-brands fa-instagram"></i></Link>
                </div>
            </div>
        </>
    );
};

export default Footer;
