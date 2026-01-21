import "./ApplicationSuccess.css";

type Props = {
  onExplore?: () => void;
  onViewStatus?: () => void;
};

const ApplicationSuccess = ({ onExplore, onViewStatus }: Props) => {
  return (
    <div className="success-page">
      <div className="success-container">

        {/* Check Icon */}
        <div className="check-circle">✓</div>

        <h1>Application Submitted</h1>
        <p className="subtitle">
          Your application for the <strong>UI/UX Design Intern</strong> role has
          been submitted successfully.
        </p>

        {/* Details Card */}
        <div className="success-card">
          <div className="row">
            <span>Position</span>
            <strong>UI/UX Design Intern</strong>
          </div>

          <div className="row">
            <span>Company</span>
            <strong>TechVision Studio</strong>
          </div>

          <div className="row">
            <span>Application ID</span>
            <strong className="app-id">INT-2024-8832</strong>
          </div>

          <span className="status-pill">Received</span>
        </div>

        {/* Actions */}
        <button className="primary-btn" onClick={onViewStatus}>
          View Application Status →
        </button>

        <button className="secondary-btn" onClick={onExplore}>
          Explore More Internships
        </button>
      </div>
    </div>
  );
};

export default ApplicationSuccess;
