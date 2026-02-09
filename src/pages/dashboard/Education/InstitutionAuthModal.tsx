import React, { useState } from "react";
import "./InstitutionAuthModal.css";


type Mode = "welcome" | "login" | "register";

interface Props {
  onClose: () => void;
  onLoginSuccess: () => void;
  onRegister: () => void;
}

const InstitutionAuthModal: React.FC<Props> = ({
  onClose,
  onLoginSuccess,
  onRegister,
}) => {
  const [mode, setMode] = useState<Mode>("welcome");

  // LOGIN STATES
  const [regNo, setRegNo] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  // ERRORS
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");

  /* ================= VALIDATION ================= */

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = (value: string) => {
    setEmail(value);

    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleOtpChange = (value: string) => {
    // allow only digits
    if (!/^\d*$/.test(value)) return;

    // max 6 digits
    if (value.length > 6) return;

    setOtp(value);

    if (value.length !== 6) {
      setOtpError("OTP must be exactly 6 digits");
    } else {
      setOtpError("");
    }
  };

  /* ================= ACTIONS ================= */

  const handleSendOtp = () => {
    if (!regNo || !email || emailError) return;

    console.log("Sending OTP to:", email);
    setOtpSent(true); // simulate OTP sent
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 6) return;

    console.log("OTP verified successfully");
    onLoginSuccess();
  };

  /* ================= UI ================= */

  return (
    <div className="inst-modal-backdrop">
      <div className="inst-auth-card">
        {/* HEADER */}
        <div className="inst-auth-header">
          {mode !== "welcome" && (
            <button className="inst-back" onClick={() => setMode("welcome")}>
              ←
            </button>
          )}
          <button className="inst-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* ================= WELCOME ================= */}
        {mode === "welcome" && (
          <div className="inst-welcome">
            <div className="inst-logo">🎓</div>
            <h1>University Portal</h1>
            <p>Excellence in Education</p>

            <h2>Welcome Back</h2>
            <p>Access your institutional resources.</p>

            <button
              className="inst-btn primary"
              onClick={() => setMode("login")}
            >
              Sign In
            </button>

            <button
              className="inst-btn secondary"
              onClick={() => setMode("register")}
            >
              Create Account
            </button>
          </div>
        )}

        {/* ================= LOGIN ================= */}
        {mode === "login" && (
          <div className="inst-login">
            <div className="inst-logo light">🎓</div>
            <h1>Institutional Login</h1>
            <p>Enter details to receive OTP.</p>

            {/* REG NO */}
            <label>REGISTRATION NUMBER</label>
            <input
              placeholder="e.g., REG-123456"
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
            />

            {/* EMAIL */}
            <label>EMAIL ADDRESS</label>
            <input
              placeholder="e.g., admin@institution.edu"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
            />
            {emailError && (
              <span className="inst-error">{emailError}</span>
            )}

            {/* OTP */}
            {otpSent && (
              <>
                <label>OTP</label>
                <input
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => handleOtpChange(e.target.value)}
                  inputMode="numeric"
                  maxLength={6}
                />
                {otpError && (
                  <span className="inst-error">{otpError}</span>
                )}
              </>
            )}

            {/* ACTION BUTTON */}
            {!otpSent ? (
              <button
                className="inst-btn primary"
                disabled={!regNo || !email || !!emailError}
                onClick={handleSendOtp}
              >
                Send OTP
              </button>
            ) : (
              <button
                className="inst-btn primary"
                disabled={otp.length !== 6}
                onClick={handleVerifyOtp}
              >
                Verify & Login
              </button>
            )}

            <span className="inst-help">
              Can’t find your registration number?
            </span>

            <div className="inst-divider">OR</div>

            <button className="inst-btn outline">
              🏢 Log in with SSO
            </button>
          </div>
        )}

        {/* ================= REGISTER ================= */}
        {mode === "register" && (
          <div className="inst-register">
            <div className="inst-logo light">🎓</div>
            <h1>Institution Registration</h1>
            <p>Register your institution to continue.</p>

            <button className="inst-btn primary" onClick={onRegister}>
              Proceed to Registration
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstitutionAuthModal;
