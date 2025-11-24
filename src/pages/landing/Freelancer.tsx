//import React from "react";
import "./Freelancer.css";
import { useNavigate } from "react-router-dom";
import freelancerHeroImg from '../../assets/landingimages/freelancer.png';



const Freelancer = () => {

    const navigate = useNavigate();
    return (
        <div className="dashboard-container">

            {/* HEADER */}
            <header className="freelancer-header">
                <div className="logo">
                    <h2>Swachify Freelance</h2>
                </div>

                <nav>
                    <button className="btn-login" onClick={() => navigate("/freelancerlogin")}>
                        Login
                    </button>
                </nav>
            </header>
            <div className="back-btn-container">
                <button className="back-btn" onClick={() => navigate("/landing")}>
                    &larr; Back
                </button>
            </div>


            {/* HERO */}
            {/* <section
                className="find-workers"
                style={{
                    backgroundImage: `url(${freelancerHeroImg})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right center',
                }}
            >
                <h1>Find the Right Tasks That Fit Your Skills</h1>
                <p className="hero-sub">Book services and let verified workers accept nearby requests.</p>
                <button className="view-requests">View Live Requests</button>
            </section> */}

            <section
                className="find-workers"
                style={{
                    backgroundImage: `url(${freelancerHeroImg})`,
                    // backgroundSize: 'cover',      // Make image cover entire section
                    backgroundRepeat: 'no-repeat',
                    height:400,
                    

                    backgroundPosition: 'center', // Center the image
                    color: '#111827',             // Ensure text color is visible
                }}
            >
                <h1>Find the Right Tasks That Fit Your Skills</h1>
                <p className="hero-sub">Book services and let verified workers accept nearby requests.</p>
                <button className="view-requests">View Live Requests</button>
            </section>



            {/* LIVE REQUESTS */}
            <section className="live-requests">
                <h3>Live Service Requests Near You</h3>

                <div className="cards-container">

                    {/* CARD 1 */}
                    <div className="request-card">
                        <div className="request-left">
                            <div className="request-title">House Shifting - Packing</div>
                            <div className="request-meta">Gachibowli, Hyderabad • ₹1200</div>
                            <div className="request-desc">
                                Need help packing and loading luggage for a 2BHK.
                            </div>
                            <button className="view-btn">View</button>
                        </div>

                        <div className="request-right">
                            <div className="time-text">10 min ago</div>
                            <button className="accept-btn">Accept</button>
                        </div>
                    </div>

                    {/* CARD 2 */}
                    <div className="request-card">
                        <div className="request-left">
                            <div className="request-title">Deep Cleaning - Apartment</div>
                            <div className="request-meta">Banjara Hills, Hyderabad • ₹1200</div>
                            <div className="request-desc">
                                Deep cleaning required for 3BHK apartment.
                            </div>
                            <button className="view-btn">View</button>
                        </div>

                        <div className="request-right">
                            <div className="time-text">35 min ago</div>
                            <button className="accept-btn">Accept</button>
                        </div>
                    </div>

                    {/* CARD 3 */}
                    <div className="request-card">
                        <div className="request-left">
                            <div className="request-title">Office Sanitization</div>
                            <div className="request-meta">Madhapur, Hyderabad • ₹3000</div>
                            <div className="request-desc">
                                Full office sanitization after renovation.
                            </div>
                            <button className="view-btn">View</button>
                        </div>

                        <div className="request-right">
                            <div className="time-text">1 hour ago</div>
                            <button className="accept-btn">Accept</button>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default Freelancer;
