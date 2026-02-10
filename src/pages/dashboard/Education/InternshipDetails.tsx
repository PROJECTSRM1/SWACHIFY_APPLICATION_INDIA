import "./InternshipDetails.css";

export interface Internship {
  id: number;
  title: string;
  company: string;
  logoColor: string;
  location: string;
  duration: string;
  type: string | null;
  isRemote: boolean;
  description: string;
  category: string;
}

type Props = {
  internship: Internship;
  onBack?: () => void;
  onApply?: () => void;
};

const InternshipDetails = ({ internship, onBack, onApply }: Props) => {
  return (
    <div className="details-page">
      {/* Header */}
      <div className="details-header">
        <button className="details-back-btn" onClick={onBack}>
  ←
</button>

        <h2>Internship Details</h2>
        <div className="spacer" />
      </div>

      {/* Content */}
      <div className="details-content">
        {/* Company Info */}
        <div className="company-section">
          <div
            className="company-logo"
            style={{ backgroundColor: internship.logoColor }}
          >
            {internship.company[0]}
          </div>

          <div className="company-info">
            <h1>{internship.title}</h1>
            <p className="company-name">{internship.company}</p>
            <p className="location">
              {internship.location}
              {internship.isRemote ? " (Remote)" : ""}
            </p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="info-grid">
          <InfoCard label="Duration" value={internship.duration} color="blue" />
          {internship.type && (
            <InfoCard label="Stipend" value={internship.type} color="green" />
          )}
          <InfoCard
            label="Location"
            value={internship.isRemote ? "Remote" : "On-site"}
            color="purple"
          />
          <InfoCard
            label="Category"
            value={internship.category}
            color="orange"
          />
        </div>

        {/* About */}
        <h3 className="section-title">About the role</h3>
        <p className="paragraph">{internship.description}</p>

        {/* Requirements */}
        <h3 className="section-title">Requirements</h3>
        <ul className="requirements">
          <li>Strong understanding of design principles</li>
          <li>Excellent communication and collaboration skills</li>
          <li>Ability to work in a fast-paced environment</li>
          <li>Portfolio demonstrating relevant experience</li>
        </ul>

        {/* Alert */}
        <div className="alert-box">
          <strong>Action Required</strong>
          <p>
            Please check the details before applying. Once submitted, the
            application is final and cannot be edited.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="details-footer">
        <button className="apply-btn" onClick={onApply}>
          Apply Now →
        </button>
      </div>
    </div>
  );
};

const InfoCard = ({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: "blue" | "green" | "purple" | "orange";
}) => (
  <div className={`info-card ${color}`}>
    <span className="label">{label}</span>
    <span className="value">{value}</span>
  </div>
);

export default InternshipDetails;
