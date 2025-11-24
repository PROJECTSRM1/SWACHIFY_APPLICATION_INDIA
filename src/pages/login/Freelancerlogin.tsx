// import React, { useState } from "react";
import { useState } from "react";
import "./Freelancerlogin.css";

export default function Login() {
    const [activeTab, setActiveTab] = useState("login");

    return (
        <div className="modal-container">
            <div className="modal-box">
                <div className="header">
                    <span
                        className={`tab ${activeTab === "login" ? "active" : ""}`}
                        onClick={() => setActiveTab("login")}
                    >
                        Login
                    </span>
                    <span
                        className={`tab ${activeTab === "register" ? "active" : ""}`}
                        onClick={() => setActiveTab("register")}
                    >
                        Register
                    </span>
                </div>

                {activeTab === "login" && (
                    <form className="form">
                        <label className="label">Email / Phone <span className="req">*</span></label>
                        <input type="text" className="input" placeholder="john@example.com" />

                        <label className="label">Password <span className="req">*</span></label>
                        <input type="password" className="input" placeholder="Password" />

                        <div className="remember-row">
                            <input type="checkbox" /> <span>Remember me</span>
                        </div>

                        <button className="login-btn">Login</button>
                    </form>
                )}

                {activeTab === "register" && (
                    <form className="form">
                        <label className="label">Full name <span className="req">*</span></label>
                        <input type="text" className="input" placeholder="Enter full name" />

                        <label className="label">Mobile <span className="req">*</span></label>
                        <input type="text" className="input" placeholder="Enter mobile" />

                        <label className="label">Email <span className="req">*</span></label>
                        <input type="email" className="input" placeholder="Enter email" />

                        <label className="label">Password <span className="req">*</span></label>
                        <input type="password" className="input" placeholder="Enter password" />

                        <label className="label">Skills / Experience Summary</label>
                        <textarea className="textarea" placeholder="Describe your skills / experience"></textarea>

                        {/* HORIZONTAL FILE INPUT ROW */}
                        <div className="file-row">

                            <div className="file-group">
                                <label className="label">Experience Docs (PDF/JPG/PNG)</label>
                                <input type="file" className="file-input" multiple />
                            </div>

                            <div className="file-group">
                                <label className="label">Government ID (Aadhar/PAN/License)</label>
                                <input type="file" className="file-input" />
                            </div>

                        </div>


                        <button className="login-btn">Register & Continue</button>
                    </form>
                )}
            </div>
        </div>
    );
}