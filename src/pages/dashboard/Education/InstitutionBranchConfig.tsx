import React, { useState, useEffect } from "react";
import "./InstitutionBranchConfig.css";
import InstitutionAccessMode from "../../dashboard/Education/InstitutionAccessMode";
import axios from "axios";

const API_BASE = "https://swachify-india-be-1-mcrb.onrender.com";

interface Props {
  onBack: () => void;
  institutionId: number | null;
}

interface Branch {
  name: string;
  city: string;
  code: string;
  head: string;
}

const InstitutionBranchConfig: React.FC<Props> = ({
  onBack,
  institutionId,
}) => {
  const [step, setStep] = useState<"step2" | "step3">("step2");
  const [branchesCount, setBranchesCount] = useState(1);
  const [loading, setLoading] = useState(false);

  const [academic, setAcademic] = useState({
    start: "",
    end: "",
  });

  const [branches, setBranches] = useState<Branch[]>([
    { name: "", city: "", code: "", head: "" },
  ]);

  useEffect(() => {
    if (institutionId) {
      console.log("Institution ID:", institutionId);
    }
  }, [institutionId]);

  const updateBranchCount = (count: number) => {
    setBranchesCount(count);
    setBranches((prev) => {
      const updated = [...prev];
      while (updated.length < count) {
        updated.push({ name: "", city: "", code: "", head: "" });
      }
      updated.length = count;
      return updated;
    });
  };

  const updateBranch = (
    index: number,
    field: keyof Branch,
    value: string
  ) => {
    setBranches((prev) =>
      prev.map((b, i) =>
        i === index ? { ...b, [field]: value } : b
      )
    );
  };

  /* ================= SAVE BRANCHES ================= */

  const handleSaveBranches = async () => {
    if (!institutionId) {
      alert("Institution ID missing");
      return;
    }

    // Basic validation
    for (const b of branches) {
      if (!b.name || !b.city || !b.code || !b.head) {
        alert("Please fill all branch fields");
        return;
      }
    }

    setLoading(true);

    try {
      for (const branch of branches) {
        const payload = {
          institution_id: institutionId,
          branch_name: branch.name,
          city: branch.city,
          branch_code: branch.code,
          branch_head: branch.head,
          is_active: true,
        };

        await axios.post(
          `${API_BASE}/institution/student/branch`,
          payload,
          { headers: { "Content-Type": "application/json" } }
        );
      }

      // ✅ All branches saved
      setStep("step3");
    } catch (err) {
      console.error(err);
      alert("Failed to save branches");
    } finally {
      setLoading(false);
    }
  };

  /* ================= STEP 3 ================= */

  if (step === "step3") {
    return <InstitutionAccessMode onClose={onBack} />;
  }

  /* ================= UI ================= */

  return (
      <div className="branchcfg-wrapper">
    <div className="branchcfg-page">
      <div className="branchcfg-container">
        <div className="branchcfg-header">
          <button onClick={onBack}>←</button>
          <h2>Branch Configuration</h2>
          <span className="branchcfg-step">Step 2 of 3</span>
        </div>

        <div className="branchcfg-progress">
          <div />
        </div>

        <h3>Operational Details</h3>

        <div className="branchcfg-card">
          <div className="branchcfg-branchcount">
            <div>
              <h4>Number of Branches</h4>
              <p>Total operational sites</p>
            </div>

            <div className="branchcfg-counter">
              <button
                onClick={() =>
                  updateBranchCount(Math.max(1, branchesCount - 1))
                }
              >
                −
              </button>
              <span>{branchesCount}</span>
              <button
                onClick={() => updateBranchCount(branchesCount + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="branchcfg-grid-2">
            <div>
              <label>Academic Year Start</label>
              <input
                type="date"
                value={academic.start}
                onChange={(e) =>
                  setAcademic({ ...academic, start: e.target.value })
                }
              />
            </div>

            <div>
              <label>Academic Year End</label>
              <input
                type="date"
                value={academic.end}
                onChange={(e) =>
                  setAcademic({ ...academic, end: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <h3>Define your branches</h3>
        <p className="branchcfg-sub">
          Add the specific locations and administrative heads.
        </p>

        {branches.map((branch, index) => (
          <div key={index} className="branchcfg-branchcard">
            <h4>Branch {index + 1}</h4>

            <div className="branchcfg-grid-2">
              <input
                placeholder="Branch Name"
                value={branch.name}
                onChange={(e) =>
                  updateBranch(index, "name", e.target.value)
                }
              />
              <input
                placeholder="Location / City"
                value={branch.city}
                onChange={(e) =>
                  updateBranch(index, "city", e.target.value)
                }
              />
              <input
                placeholder="Branch Code"
                value={branch.code}
                onChange={(e) =>
                  updateBranch(index, "code", e.target.value)
                }
              />
              <input
                placeholder="Branch Head"
                value={branch.head}
                onChange={(e) =>
                  updateBranch(index, "head", e.target.value)
                }
              />
            </div>
          </div>
        ))}

        <div className="branchcfg-footer">
          <button className="secondary" onClick={onBack}>
            Back
          </button>
          <button
            className="primary"
            onClick={handleSaveBranches}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save & Continue"}
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default InstitutionBranchConfig;
