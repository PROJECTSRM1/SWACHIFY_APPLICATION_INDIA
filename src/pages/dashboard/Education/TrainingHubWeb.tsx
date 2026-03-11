// import React from "react";
import "./TrainingHubWeb.css";

type Props = {
  onBack: () => void;
  onOpenGovernment: () => void;
  onOpenIT: () => void;
};

export default function TrainingHubWeb({
  onBack,
  onOpenGovernment,
  onOpenIT,
}: Props) {
  return (
    <div className="hub-wrapper">
      {/* Header */}
      <div className="hub-header">
        <button className="hub-back" onClick={onBack}>←</button>
        <div>
          <h1>Training Hub</h1>
          <p>Choose your learning path</p>
        </div>
      </div>

      {/* Banner */}
      <div className="hub-banner">
        🎓 60,000+ learners enrolled · Updated for 2025
      </div>

      {/* Cards */}
      <div className="hub-cards">

        {/* Government */}
        <div className="hub-card govt" onClick={onOpenGovernment}>
          <div className="accent-bar" />
          <div className="hub-card-body">
            <div className="hub-card-top">
              <div className="icon">🏛️</div>
              <div>
                <h3>Government Side</h3>
                <span>Public Sector & Civil Services</span>
              </div>
            </div>

            <p>
              Crack UPSC, SSC, Banking, Railway & State PSC exams with
              structured prep courses curated by top educators.
            </p>

            <div className="tags">
              {["UPSC","SSC","Banking","Railway","State PSC"].map(t=>(
                <span key={t}>{t}</span>
              ))}
            </div>

            <div className="stats">
              <div><b>18</b><span>Courses</span></div>
              <div><b>24,500+</b><span>Enrolled</span></div>
              <div><b>Certified</b><span>On completion</span></div>
            </div>

            <button className="hub-btn">Explore Government →</button>
          </div>
        </div>

        {/* IT */}
        <div className="hub-card it" onClick={onOpenIT}>
          <div className="accent-bar" />
          <div className="hub-card-body">
            <div className="hub-card-top">
              <div className="icon">💻</div>
              <div>
                <h3>IT Side</h3>
                <span>Tech & Software Development</span>
              </div>
            </div>

            <p>
              Master in-demand tech skills — Java, Python, Cloud,
              DevOps, AI/ML — and land top IT roles.
            </p>

            <div className="tags">
              {["Java","Python","Cloud","DevOps","AI/ML"].map(t=>(
                <span key={t}>{t}</span>
              ))}
            </div>

            <div className="stats">
              <div><b>24</b><span>Courses</span></div>
              <div><b>38,200+</b><span>Enrolled</span></div>
              <div><b>Certified</b><span>On completion</span></div>
            </div>

            <button className="hub-btn">Explore IT →</button>
          </div>
        </div>

      </div>

      <div className="hub-info">
        ℹ️ All courses come with lifetime access and certificate.
      </div>
    </div>
  );
}