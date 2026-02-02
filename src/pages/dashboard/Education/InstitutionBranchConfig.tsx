import React, { useState, useEffect } from "react";
import "./InstitutionBranchConfig.css";
import InstitutionAccessMode from "../../dashboard/Education/InstitutionAccessMode";

interface Props {
  onBack: () => void;
  institutionId: number | null; // ✅ ADDED
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
  // ✅ STEP STATE
  const [step, setStep] = useState<"step2" | "step3">("step2");

  const [branchesCount, setBranchesCount] = useState(1);

  const [academic, setAcademic] = useState({
    start: "",
    end: "",
  });

  const [branches, setBranches] = useState<Branch[]>([
    { name: "", city: "", code: "", head: "" },
  ]);

  // ✅ SAFE ACCESS TO INSTITUTION ID
  useEffect(() => {
    if (!institutionId) return;

    console.log("Institution ID in Branch Config:", institutionId);
    // 🔗 Later: use this institutionId for branch POST API
  }, [institutionId]);

  // Sync branches with count
  const updateBranchCount = (count: number) => {
    setBranchesCount(count);

    setBranches((prev) => {
      const updated = [...prev];
      if (count > prev.length) {
        while (updated.length < count) {
          updated.push({
            name: "",
            city: "",
            code: "",
            head: "",
          });
        }
      } else {
        updated.length = count;
      }
      return updated;
    });
  };

  const addBranch = () => {
    setBranchesCount((prev) => prev + 1);
    setBranches((prev) => [
      ...prev,
      { name: "", city: "", code: "", head: "" },
    ]);
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

  // ✅ STEP 3
  if (step === "step3") {
    return <InstitutionAccessMode onClose={onBack} />;
  }

  // ✅ STEP 2 UI (UNCHANGED)
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
            <div className="branchcfg-branchheader">
              <h4>Branch {index + 1}</h4>
            </div>

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

        <button className="branchcfg-add" onClick={addBranch}>
          + Add Another Branch
        </button>

        <div className="branchcfg-footer">
          <button className="secondary" onClick={onBack}>
            Back
          </button>
          <button
            className="primary"
            onClick={() => setStep("step3")}
          >
            Save & Continue
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default InstitutionBranchConfig;
