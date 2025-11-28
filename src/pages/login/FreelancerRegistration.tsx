import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  Phone,
  MapPin,
  Check,
  Loader2,
} from "lucide-react";
import "antd/dist/reset.css";
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Button,
  Checkbox,
  Upload,
  Tag,
  Space,
  Progress,
  message,
} from "antd";
import type { UploadFile } from "antd/es/upload/interface";

import "./FreelancerRegistration.css";

type UserType = "freelancer" | "client";

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  location: string;
  skills: string[];
  userType: UserType;
  summary: string;
  experienceDoc: File | null;
  govId: File | null;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_DOC_TYPES = ["application/pdf", "image/png", "image/jpeg"];

const SKILLS = [
  "Plumbing",
  "Electrical",
  "Cleaning",
  "Painting",
  "Carpentry",
  "AC Repair",
  "Moving",
  "Gardening",
  "Home Maintenance",
  "Interior Design",
];

export default function FreelancerRegistration() {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<FormState>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    location: "",
    skills: [],
    userType: "freelancer",
    summary: "",
    experienceDoc: null,
    govId: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [expFileList, setExpFileList] = useState<UploadFile[]>([]);
  const [govFileList, setGovFileList] = useState<UploadFile[]>([]);

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone must be 10 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm password is required";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.location) newErrors.location = "Location is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    if (formData.userType === "freelancer" && formData.skills.length === 0) {
      newErrors.skills = "Please select at least one skill";
    }
    if (!formData.experienceDoc)
      newErrors.experienceDoc = "Please upload your experience document";
    if (!formData.govId) newErrors.govId = "Please upload a government ID";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };

  const toggleSkill = (skill: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
    if (errors.skills) setErrors((p) => ({ ...p, skills: "" }));
  };

  const beforeUpload = (file: File) => {
    if (!ALLOWED_DOC_TYPES.includes(file.type)) {
      message.error("Unsupported file type");
      return Upload.LIST_IGNORE;
    }
    if (file.size > MAX_FILE_SIZE) {
      message.error("File too large (max 5MB)");
      return Upload.LIST_IGNORE;
    }
    return true;
  };

  const handleExpChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setExpFileList(fileList.slice(-1));
    const f = fileList[0]?.originFileObj as File | undefined;
    setFormData((p) => ({ ...p, experienceDoc: f ?? null }));
    if (errors.experienceDoc) setErrors((p) => ({ ...p, experienceDoc: "" }));
  };

  const handleGovChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setGovFileList(fileList.slice(-1));
    const f = fileList[0]?.originFileObj as File | undefined;
    setFormData((p) => ({ ...p, govId: f ?? null }));
    if (errors.govId) setErrors((p) => ({ ...p, govId: "" }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validateStep3()) return;
    setIsLoading(true);

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "skills") payload.append(key, JSON.stringify(value));
        else if (value instanceof File) payload.append(key, value);
        else payload.append(key, value as string);
      });

      // Fake API call
      setTimeout(() => {
        setIsLoading(false);
        message.success("Account created");
        navigate("/");
      }, 1200);
    } catch {
      setIsLoading(false);
      setErrors({ form: "Something went wrong" });
    }
  };

  const progressPercent = Math.round((step / 3) * 100);

  return (
    <div className="registration-page">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() =>
          step === 1 ? navigate("/freelancer") : setStep(step - 1)
        }
        className="back-btn"
      >
        <ArrowLeft /> {step === 1 ? "Back to Home" : "Previous"}
      </motion.button>

      <Row gutter={24} justify="center">
        {/* Left branding */}
        <Col lg={10} className="branding-col">
          <Card className="branding-card">
            <div className="branding-header">
              <Check className="branding-icon" />
              <h2>Swachify</h2>
            </div>
            <h3>Join Our Community</h3>
            <p>Start your freelancing journey and unlock opportunities.</p>
            <div className="steps-list">
              {[
                "Personal Info",
                "Account Security",
                "Skills & Preferences",
              ].map((label, idx) => (
                <div key={idx} className="step-item">
                  <div className={`step-circle ${step > idx ? "active" : ""}`}>
                    {step > idx ? <Check /> : idx + 1}
                  </div>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        {/* Form */}
        <Col xs={24} lg={12}>
          <Card className="reg-card">
            <h1>Create Account</h1>
            <Progress percent={progressPercent} showInfo={false} />

            <Form layout="vertical" onFinish={handleSubmit}>
              {/* Step 1 */}
              {step === 1 && (
                <div className="step-container">
                  <Form.Item label="Full Name" required>
                    <Input
                      prefix={<User />}
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, fullName: e.target.value }))
                      }
                    />
                    {errors.fullName && (
                      <div className="form-error">{errors.fullName}</div>
                    )}
                  </Form.Item>
                  <Form.Item label="Email" required>
                    <Input
                      prefix={<Mail />}
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, email: e.target.value }))
                      }
                    />
                    {errors.email && (
                      <div className="form-error">{errors.email}</div>
                    )}
                  </Form.Item>
                  <Form.Item label="Phone" required>
                    <Input
                      prefix={<Phone />}
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, phone: e.target.value }))
                      }
                    />
                    {errors.phone && (
                      <div className="form-error">{errors.phone}</div>
                    )}
                  </Form.Item>
                  <Button block type="primary" onClick={handleNext}>
                    Continue
                  </Button>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="step-container">
                  <Form.Item label="Password" required>
                    <Input.Password
                      prefix={<Lock />}
                      value={formData.password}
                      iconRender={() => null}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, password: e.target.value }))
                      }
                      addonAfter={
                        <Button
                          type="text"
                          onClick={() => setShowPassword((s) => !s)}
                        >
                          {showPassword ? <EyeOff /> : <Eye />}
                        </Button>
                      }
                    />
                    {errors.password && (
                      <div className="form-error">{errors.password}</div>
                    )}
                  </Form.Item>
                  <Form.Item label="Confirm Password" required>
                    <Input.Password
                      prefix={<Lock />}
                      value={formData.confirmPassword}
                      iconRender={() => null}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          confirmPassword: e.target.value,
                        }))
                      }
                      addonAfter={
                        <Button
                          type="text"
                          onClick={() => setShowConfirmPassword((s) => !s)}
                        >
                          {showConfirmPassword ? <EyeOff /> : <Eye />}
                        </Button>
                      }
                    />
                    {errors.confirmPassword && (
                      <div className="form-error">{errors.confirmPassword}</div>
                    )}
                  </Form.Item>
                  <Form.Item label="Location" required>
                    <Input
                      prefix={<MapPin />}
                      value={formData.location}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, location: e.target.value }))
                      }
                    />
                    {errors.location && (
                      <div className="form-error">{errors.location}</div>
                    )}
                  </Form.Item>
                  <Button block type="primary" onClick={handleNext}>
                    Continue
                  </Button>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                // <div className=" step-container step3">
                  <div className="step-container step3">
                    <Form.Item label="Skills">
                      <Space wrap>
                        {SKILLS.map((skill) => (
                          <Tag
                            key={skill}
                            color={
                              formData.skills.includes(skill)
                                ? "purple"
                                : "default"
                            }
                            onClick={() => toggleSkill(skill)}
                          >
                            {skill}
                          </Tag>
                        ))}
                      </Space>
                      {errors.skills && (
                        <div className="form-error">{errors.skills}</div>
                      )}
                    </Form.Item>
                    <Form.Item label="Summary / About You">
                      <Input.TextArea
                        value={formData.summary}
                        onChange={(e) =>
                          setFormData((p) => ({
                            ...p,
                            summary: e.target.value,
                          }))
                        }
                        maxLength={180}
                        rows={3}
                      />
                    </Form.Item>
                    <Row gutter={16}>
                      <Col xs={24} md={12}>
                        <Form.Item label="Experience Doc">
                          <Upload
                            accept=".pdf,.jpg,.jpeg,.png"
                            beforeUpload={beforeUpload}
                            onChange={handleExpChange}
                            fileList={expFileList}
                            onRemove={() => {
                              setExpFileList([]);
                              setFormData((p) => ({
                                ...p,
                                experienceDoc: null,
                              }));
                            }}
                            customRequest={({ onSuccess }) =>
                              setTimeout(() => onSuccess && onSuccess("ok"), 0)
                            }
                          >
                            <Button>Choose file</Button>
                          </Upload>
                          {errors.experienceDoc && (
                            <div className="form-error">
                              {errors.experienceDoc}
                            </div>
                          )}
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item label="Government ID">
                          <Upload
                            accept=".pdf,.jpg,.jpeg,.png"
                            beforeUpload={beforeUpload}
                            onChange={handleGovChange}
                            fileList={govFileList}
                            onRemove={() => {
                              setGovFileList([]);
                              setFormData((p) => ({ ...p, govId: null }));
                            }}
                            customRequest={({ onSuccess }) =>
                              setTimeout(() => onSuccess && onSuccess("ok"), 0)
                            }
                          >
                            <Button>Choose file</Button>
                          </Upload>
                          {errors.govId && (
                            <div className="form-error">{errors.govId}</div>
                          )}
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item>
                      <Checkbox required>
                        I agree to <a href="#">Terms</a> and{" "}
                        <a href="#">Privacy</a>
                      </Checkbox>
                    </Form.Item>
                    <Form.Item>
                      <Button
                        block
                        type="primary"
                        htmlType="submit"
                        loading={isLoading}
                      >
                        {isLoading ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          "Create Account"
                        )}
                      </Button>
                    </Form.Item>
                  </div>
                // </div>
              )}
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
