import React from "react";
import type { Job, JobStatus } from "./employeeTypes";

interface JobCardProps {
  job: Job;
  updateJobStatus: (id: number, status: JobStatus, reason?: string) => void;
  getStatusColor: (status: JobStatus) => string;
  onViewDetails: (job: Job) => void;
  onOpenChat: (jobId: number) => void;
}

const JobCard: React.FC<JobCardProps> = ({
  job,
  updateJobStatus,
  getStatusColor,
  onViewDetails,
  onOpenChat,
}) => {
  const getDirectionsUrl = () => {
    if (job.latitude && job.longitude) {
      return `https://www.google.com/maps/dir/?api=1&destination=${job.latitude},${job.longitude}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      job.address
    )}`;
  };

  return (
    <div className="emp_job_card">
      <div className="emp_job_header">
        <div>
          <h4 className="emp_job_service">{job.service}</h4>
          {job.specialInstructions && (
            <p className="emp_job_instructions">ℹ️ {job.specialInstructions}</p>
          )}
        </div>
        <span
          className="emp_job_status"
          style={{
            backgroundColor: `${getStatusColor(job.status)}20`,
            color: getStatusColor(job.status),
          }}
        >
          {job.status}
        </span>
      </div>

      <div className="emp_job_details">
        <div className="emp_job_detail">
          <span className="emp_job_detail_icon">👤</span>
          <span>{job.customer}</span>
        </div>
        <div className="emp_job_detail">
          <span className="emp_job_detail_icon">📍</span>
          <span>{job.address}</span>
          {job.distance && (
            <span className="emp_distance"> ({job.distance.toFixed(1)} km)</span>
          )}
        </div>
        <div className="emp_job_detail">
          <span className="emp_job_detail_icon">📞</span>
          <a href={`tel:${job.phone}`} className="emp_phone_link">
            {job.phone}
          </a>
        </div>
        <div className="emp_job_detail">
          <span className="emp_job_detail_icon">🕒</span>
          <span>
            {new Date(job.scheduledDate).toLocaleDateString()} at {job.scheduledTime}
          </span>
          <span className="emp_duration"> ({job.duration} min)</span>
        </div>
        {job.rating && (
          <div className="emp_job_detail">
            <span className="emp_job_detail_icon">⭐</span>
            <span>
              {job.rating}/5 {job.review && `- "${job.review}"`}
            </span>
          </div>
        )}
      </div>

      <div className="emp_job_footer">
        <div className="emp_job_amount">
          ₹{job.amount}
          {job.tip && <span className="emp_tip"> + ₹{job.tip} tip</span>}
        </div>

        <div className="emp_job_actions">
          {/* Navigation Button */}
          {(job.status === "accepted" || job.status === "ongoing") && (
            <a
              href={getDirectionsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="emp_btn emp_btn_icon"
              title="Get Directions"
            >
              🗺️
            </a>
          )}

          {/* Chat Button */}
          {(job.status === "accepted" ||
            job.status === "ongoing" ||
            job.status === "completed") && (
            <button
              className="emp_btn emp_btn_icon"
              onClick={() => onOpenChat(job.id)}
              title="Chat with customer"
            >
              💬
            </button>
          )}

          {/* View Details Button */}
          <button
            className="emp_btn emp_btn_secondary"
            onClick={() => onViewDetails(job)}
          >
            View Details
          </button>

          {/* Status Action Buttons */}
          {job.status === "new" && (
            <>
              <button
                className="emp_btn emp_btn_primary"
                onClick={() => updateJobStatus(job.id, "accepted")}
              >
                Accept
              </button>
              <button
                className="emp_btn emp_btn_danger"
                onClick={() => {
                  const reason = prompt("Reason for rejection (optional):");
                  updateJobStatus(job.id, "cancelled", reason || "Declined");
                }}
              >
                Reject
              </button>
            </>
          )}

          {job.status === "accepted" && (
            <button
              className="emp_btn emp_btn_primary"
              onClick={() => updateJobStatus(job.id, "ongoing")}
            >
              Start Job
            </button>
          )}

          {job.status === "ongoing" && (
            <button
              className="emp_btn emp_btn_success"
              onClick={() => updateJobStatus(job.id, "completed")}
            >
              Complete Job
            </button>
          )}

          {job.status === "completed" && (
            <span className="emp_job_badge emp_badge_success">✓ Completed</span>
          )}

          {job.status === "cancelled" && (
            <span className="emp_job_badge emp_badge_error">
              ✕ Cancelled {job.cancelReason && `(${job.cancelReason})`}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
