import React, { useState, useEffect } from 'react';
import { Input, Button, Select, Modal, message } from 'antd';
import {
  CreditCardOutlined,
  MobileOutlined,
  BankOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import 'antd/dist/reset.css';
import './Registration.css';

import gpayLogo from "../../assets/Google_Pay_Logo.svg";
import phonepeLogo from "../../assets/phonepe.webp";
import paytmLogo from "../../assets/Paytm.svg";
import { useNavigate } from 'react-router-dom';
import { freelancerRegister } from "../../api/freelancerAuth";

const { Option } = Select;

type UserType = 'freelancer' | 'client';

interface FormDataType {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  location: string;
  gender: string;
  userType: UserType;
  skills: string[];
  panNumber: string;
  paymentMethod: string;
  upiId: string;
}

type Errors = Partial<{
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  location: string;
  gender: string;
  skills: string;
  panNumber: string;
  paymentMethod: string;
  upiId: string;
}>;

type TouchedFields = Partial<{
  firstName: boolean;
  lastName: boolean;
  email: boolean;
  phone: boolean;
  password: boolean;
  confirmPassword: boolean;
  location: boolean;
  gender: boolean;
  skills: boolean;
  panNumber: boolean;
  paymentMethod: boolean;
  upiId: boolean;
}>;

export default function Registration() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [payLoading, setPayLoading] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [showPaymentSuccessModal, setShowPaymentSuccessModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState<FormDataType>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    location: '',
    gender: '',
    userType: 'freelancer',
    skills: [],
    panNumber: '',
    paymentMethod: '',
    upiId: ''
  });

  const [touched, setTouched] = useState<TouchedFields>({});
  const [errors, setErrors] = useState<Errors>({});
  const [isStep1Valid, setIsStep1Valid] = useState(false);
  const [isStep2Valid, setIsStep2Valid] = useState(false);
  const [isStep3Valid, setIsStep3Valid] = useState(false);

  const skills = [
    'Plumbing', 'Electrical', 'Cleaning', 'Painting', 'Carpentry',
    'AC Repair', 'Moving', 'Gardening', 'Home Maintenance', 'Interior Design'
  ];

  const markFieldTouched = (fieldName: keyof TouchedFields) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
  };

  useEffect(() => {
    const stepErrors: Errors = {};
    let valid = true;

    if (!formData.firstName.trim()) {
      stepErrors.firstName = 'Please input your first name!';
      valid = false;
    }
    if (!formData.lastName.trim()) {
      stepErrors.lastName = 'Please input your last name!';
      valid = false;
    }
    if (!formData.gender) {
      stepErrors.gender = 'Please select your gender!';
      valid = false;
    }

    if (!formData.email) {
      stepErrors.email = 'Please input your email!';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      stepErrors.email = 'Please enter a valid email!';
      valid = false;
    }

    if (!formData.phone) {
      stepErrors.phone = 'Please input your phone!';
      valid = false;
    } else if (!/^\d{10}$/.test(formData.phone)) {
      stepErrors.phone = 'Phone must be 10 digits!';
      valid = false;
    }

    setErrors(prev => {
      const { firstName, lastName, gender, email, phone, ...rest } = prev;
      return { ...rest, ...stepErrors };
    });

    setIsStep1Valid(valid);
  }, [formData.firstName, formData.lastName, formData.gender, formData.email, formData.phone]);

  useEffect(() => {
    const stepErrors: Errors = {};
    let valid = true;

    const pass = formData.password;
    const hasUpper = /[A-Z]/.test(pass);
    const hasLower = /[a-z]/.test(pass);
    const hasNumber = /[0-9]/.test(pass);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    const isLongEnough = pass.length >= 8;

    if (!pass) {
      stepErrors.password = 'Please input your password!';
      valid = false;
    } else if (!isLongEnough || !hasUpper || !hasLower || !hasNumber || !hasSpecial) {
      stepErrors.password =
        'Password must contain uppercase, lowercase, number, special char & be at least 8 characters!';
      valid = false;
    }

    if (!formData.confirmPassword) {
      stepErrors.confirmPassword = 'Please confirm your password!';
      valid = false;
    } else if (formData.confirmPassword !== pass) {
      stepErrors.confirmPassword = 'Passwords do not match!';
      valid = false;
    }

    const hasNumberInAddress = /[0-9]/.test(formData.location);
    if (!formData.location.trim()) {
      stepErrors.location = 'Please input your location!';
      valid = false;
    } else if (formData.location.trim().length < 10) {
      stepErrors.location = 'Address must be at least 10 characters!';
      valid = false;
    } else if (!hasNumberInAddress) {
      stepErrors.location = 'Address must include at least one number!';
      valid = false;
    }

    setErrors(prev => {
      const { password, confirmPassword, location, ...rest } = prev;
      return { ...rest, ...stepErrors };
    });

    setIsStep2Valid(valid);
  }, [formData.password, formData.confirmPassword, formData.location]);

  useEffect(() => {
    const stepErrors: Errors = {};
    let valid = true;

    if (formData.userType === 'freelancer' && formData.skills.length === 0) {
      stepErrors.skills = 'Please select at least one skill!';
      valid = false;
    }

    if (!formData.panNumber) {
      stepErrors.panNumber = 'Please enter your PAN number!';
      valid = false;
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) {
      stepErrors.panNumber = 'Please enter a valid PAN number!';
      valid = false;
    }

    setErrors(prev => {
      const { skills, panNumber, ...rest } = prev;
      return { ...rest, ...stepErrors };
    });

    setIsStep3Valid(valid);
  }, [formData.skills, formData.panNumber, formData.userType]);

  const validateStep4 = () => {
    const stepErrors: Errors = {};
    let valid = true;

    if (!formData.paymentMethod) {
      stepErrors.paymentMethod = 'Please select a payment method!';
      valid = false;
    }
    if (formData.paymentMethod === 'upi' && !formData.upiId.trim()) {
      stepErrors.upiId = 'Please enter your UPI ID!';
      valid = false;
    }

    setErrors(prev => {
      const { paymentMethod, upiId, ...rest } = prev;
      return { ...rest, ...stepErrors };
    });

    setTouched(prev => ({
      ...prev,
      paymentMethod: true,
      upiId: formData.paymentMethod === 'upi' ? true : prev.upiId
    }));

    return valid;
  };

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex < currentStep) {
      setCurrentStep(stepIndex);
      return;
    }

    if (paymentCompleted) {
      setCurrentStep(stepIndex);
      return;
    }

    if (stepIndex === 1 && isStep1Valid) {
      setCurrentStep(1);
    } else if (stepIndex === 2 && isStep1Valid && isStep2Valid) {
      setCurrentStep(2);
    } else if (stepIndex === 3 && isStep1Valid && isStep2Valid && isStep3Valid) {
      setCurrentStep(3);
    }
  };

  const handleStep1 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({
      ...touched,
      firstName: true,
      lastName: true,
      gender: true,
      email: true,
      phone: true
    });
    if (isStep1Valid) setCurrentStep(1);
  };

  const handleStep2 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({
      ...touched,
      password: true,
      confirmPassword: true,
      location: true
    });
    if (isStep2Valid) setCurrentStep(2);
  };

  const handleStep3 = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({
      ...touched,
      skills: true,
      panNumber: true
    });
    if (isStep3Valid) setCurrentStep(3);
  };

  const toggleSkill = (skill: string) => {
    markFieldTouched('skills');
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handlePay = () => {
    if (!validateStep4()) return;
    if (paymentCompleted) return;

    setPayLoading(true);
    setTimeout(() => {
      setPayLoading(false);
      setPaymentCompleted(true);
      setShowPaymentSuccessModal(true);
    }, 1600);
  };

  const handleCreateAccount = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!paymentCompleted) {
      Modal.warning({
        title: "Payment required",
        content: "Please complete payment before account creation."
      });
      return;
    }

    const payload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      mobile: formData.phone,
      password: formData.password,
      confirm_password: formData.confirmPassword,
      gender_id: formData.gender === "male" ? 1 : formData.gender === "female" ? 2 : 3,
      state_id: 1,
      district_id: 1,
      skill_id: formData.skills.length > 0 ? 1 : 2,
      government_id_type: "PAN",
      government_id_number: formData.panNumber,
      address: formData.location
    };

    try {
      setLoading(true);
      const res = await freelancerRegister(payload);

      if (res?.data?.data) {
        localStorage.setItem("freelancerToken", res.data?.data?.token);
        localStorage.setItem("freelancer", JSON.stringify(res.data?.data));
      }

      message.success("Freelancer registration successful!");
      setShowSuccessModal(true);
    } catch (error: any) {
      console.error("Freelancer Registration Error", error);
      message.error(error?.response?.data?.detail || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const closeFinalSuccess = () => {
    setShowSuccessModal(false);
    window.location.href = '/Freelancer';
  };

  const closePaymentSuccess = () => {
    setShowPaymentSuccessModal(false);
  };

  return (
    <div className="swc-fr-registration-page">
      <a
        href="#"
        className="swc-fr-back-link"
        onClick={() => navigate('/freelancer')}
        aria-label="Go back"
      >
        ← Back
      </a>

      <div className="swc-fr-registration-container">
        <div className="swc-fr-registration-branding">
          <div className="swc-fr-branding-card">
            <div className="swc-fr-branding-header">
              <span className="swc-fr-branding-title">Swachify</span>
            </div>

            <h2 className="swc-fr-branding-heading">Join Our Community</h2>
            <p className="swc-fr-branding-text">
              Start your freelancing journey today and unlock endless opportunities.
            </p>

            <div className="swc-fr-steps-container">
              <div
                className={`swc-fr-step-item ${currentStep >= 0 ? 'active' : ''} ${currentStep > 0 ? 'completed' : ''}`}
                onClick={() => handleStepClick(0)}
              >
                <div className="swc-fr-step-number">
                  {currentStep > 0 ? '✓' : '1'}
                </div>
                <div className="swc-fr-step-content">
                  <h3>Personal Information</h3>
                  <p>Tell us about yourself</p>
                </div>
              </div>

              <div
                className={`swc-fr-step-item ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}
                onClick={() => handleStepClick(1)}
              >
                <div className="swc-fr-step-number">
                  {currentStep > 1 ? '✓' : '2'}
                </div>
                <div className="swc-fr-step-content">
                  <h3>Account Security</h3>
                  <p>Create a secure password</p>
                </div>
              </div>

              <div
                className={`swc-fr-step-item ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}
                onClick={() => handleStepClick(2)}
              >
                <div className="swc-fr-step-number">
                  {currentStep > 2 ? '✓' : '3'}
                </div>
                <div className="swc-fr-step-content">
                  <h3>Skills & ID Proof</h3>
                  <p>Choose your expertise</p>
                </div>
              </div>

              <div
                className={`swc-fr-step-item ${currentStep >= 3 ? 'active' : ''}`}
                onClick={() => handleStepClick(3)}
              >
                <div className="swc-fr-step-number">4</div>
                <div className="swc-fr-step-content">
                  <h3>Payment</h3>
                  <p>Complete registration fee</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="swc-fr-registration-form-section">
          <div className="swc-fr-registration-card">
            <div className="swc-fr-registration-header">
              <h1 className="swc-fr-registration-title">Create Your Account</h1>
              <p className="swc-fr-registration-subtitle">Step {currentStep + 1} of 4</p>
            </div>

            <div className="swc-fr-progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${((currentStep + 1) / 4) * 100}%` }}
              />
            </div>

            {currentStep === 0 && (
              <form onSubmit={handleStep1} className="swc-fr-registration-form">
                <div className="swc-fr-form-row">
                  <div className="swc-fr-form-group swc-fr-form-group-half">
                    <label className="swc-fr-form-label">First Name</label>
                    <Input
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      onBlur={() => markFieldTouched('firstName')}
                      placeholder="John"
                      className={`swc-fr-form-input ${touched.firstName && errors.firstName ? 'form-input-error' : ''}`}
                    />
                    {touched.firstName && errors.firstName && (
                      <div className="swc-fr-form-error">{errors.firstName}</div>
                    )}
                  </div>

                  <div className="swc-fr-form-group swc-fr-form-group-half">
                    <label className="swc-fr-form-label">Last Name</label>
                    <Input
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      onBlur={() => markFieldTouched('lastName')}
                      placeholder="Doe"
                      className={`swc-fr-form-input ${touched.lastName && errors.lastName ? 'form-input-error' : ''}`}
                    />
                    {touched.lastName && errors.lastName && (
                      <div className="swc-fr-form-error">{errors.lastName}</div>
                    )}
                  </div>
                </div>

                <div className="swc-fr-form-group">
                  <label className="swc-fr-form-label">Gender</label>
                  <Select
                    value={formData.gender || undefined}
                    onChange={(value) => {
                      setFormData({ ...formData, gender: value });
                      markFieldTouched('gender');
                    }}
                    onBlur={() => markFieldTouched('gender')}
                    placeholder="Select your gender"
                    className={`swc-fr-form-select ${touched.gender && errors.gender ? 'form-input-error' : ''}`}
                    style={{ width: '100%' }}
                  >
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                  </Select>
                  {touched.gender && errors.gender && (
                    <div className="swc-fr-form-error">{errors.gender}</div>
                  )}
                </div>

                <div className="swc-fr-form-group">
                  <label className="swc-fr-form-label">Email Address</label>
                  <Input
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    onBlur={() => markFieldTouched('email')}
                    placeholder="you@example.com"
                    className={`swc-fr-form-input ${touched.email && errors.email ? 'form-input-error' : ''}`}
                    type="email"
                  />
                  {touched.email && errors.email && (
                    <div className="swc-fr-form-error">{errors.email}</div>
                  )}
                </div>

                <div className="swc-fr-form-group">
                  <label className="swc-fr-form-label">Phone Number</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    onBlur={() => markFieldTouched('phone')}
                    placeholder="9876543210"
                    className={`swc-fr-form-input ${touched.phone && errors.phone ? 'form-input-error' : ''}`}
                    type="tel"
                  />
                  {touched.phone && errors.phone && (
                    <div className="swc-fr-form-error">{errors.phone}</div>
                  )}
                </div>

                <Button
                  htmlType="submit"
                  className="swc-fr-btn btn-primary btn-block"
                  type="primary"
                  disabled={!isStep1Valid}
                >
                  Continue
                </Button>
              </form>
            )}

            {currentStep === 1 && (
              <form onSubmit={handleStep2} className="swc-fr-registration-form">
                <div className="swc-fr-form-group">
                  <label className="swc-fr-form-label">Password</label>
                  <Input.Password
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    onBlur={() => markFieldTouched('password')}
                    placeholder="••••••••"
                    className={`swc-fr-form-input ${touched.password && errors.password ? 'form-input-error' : ''}`}
                  />
                  {touched.password && errors.password && (
                    <div className="swc-fr-form-error">{errors.password}</div>
                  )}
                </div>

                <div className="swc-fr-form-group">
                  <label className="swc-fr-form-label">Confirm Password</label>
                  <Input.Password
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, confirmPassword: e.target.value })
                    }
                    onBlur={() => markFieldTouched('confirmPassword')}
                    placeholder="••••••••"
                    className={`swc-fr-form-input ${touched.confirmPassword && errors.confirmPassword ? 'form-input-error' : ''}`}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <div className="swc-fr-form-error">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>

                <div className="swc-fr-form-group">
                  <label className="swc-fr-form-label">Location</label>
                  <Input
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    onBlur={() => markFieldTouched('location')}
                    placeholder="Hyderabad, India"
                    className={`swc-fr-form-input ${touched.location && errors.location ? 'swc-fr-form-input-error' : ''}`}
                  />
                  {touched.location && errors.location && (
                    <div className="swc-fr-form-error">{errors.location}</div>
                  )}
                </div>

                <Button
                  htmlType="submit"
                  className="swc-fr-btn btn-primary btn-block"
                  type="primary"
                  disabled={!isStep2Valid}
                >
                  Continue
                </Button>
              </form>
            )}

            {currentStep === 2 && (
              <form onSubmit={handleStep3} className="swc-fr-registration-form">
                {formData.userType === 'freelancer' && (
                  <div className="swc-fr-form-group">
                    <label className="swc-fr-form-label">Select Your Skills</label>
                    <div className="swc-fr-skills-grid">
                      {skills.map(skill => (
                        <Button
                          key={skill}
                          type={formData.skills.includes(skill) ? 'primary' : 'default'}
                          className={`swc-fr-skill-tag ${formData.skills.includes(skill) ? 'active' : ''}`}
                          onClick={(e) => {
                            e.preventDefault();
                            toggleSkill(skill);
                          }}
                        >
                          {skill}
                        </Button>
                      ))}
                    </div>
                    {touched.skills && errors.skills && (
                      <div className="swc-fr-form-error">{errors.skills}</div>
                    )}
                  </div>
                )}

                <div className="swc-fr-form-group">
                  <label className="swc-fr-form-label">Government ID Proof</label>
                  <Input
                    value={formData.panNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        panNumber: e.target.value.toUpperCase()
                      })
                    }
                    onBlur={() => markFieldTouched('panNumber')}
                    placeholder="Enter your PAN number"
                    className={`swc-fr-form-input ${touched.panNumber && errors.panNumber ? 'form-input-error' : ''}`}
                    maxLength={10}
                  />
                  {touched.panNumber && errors.panNumber && (
                    <div className="swc-fr-form-error">{errors.panNumber}</div>
                  )}
                </div>

                <Button
                  htmlType="submit"
                  className="swc-fr-btn btn-primary btn-block"
                  type="primary"
                  disabled={!isStep3Valid}
                >
                  Continue
                </Button>
              </form>
            )}

            {currentStep === 3 && (
              <form onSubmit={handleCreateAccount} className="swc-fr-registration-form">
                <div className="swc-fr-payment-header">
                  <h2 className="swc-fr-payment-title">Payment Category</h2>
                  <div className="swc-fr-platform-fee">
                    <span className="swc-fr-fee-label">Platform Fee:</span>
                    <span className="swc-fr-fee-amount">₹499</span>
                  </div>
                </div>

                <div className="swc-fr-form-group">
                  <label className="swc-fr-form-label">Select Payment Method</label>
                  <div className="swc-fr-payment-methods">
                    <div
                      className={`swc-fr-payment-option ${
                        formData.paymentMethod === 'gpay' ? 'active' : ''
                      } ${paymentCompleted ? 'disabled-option' : ''}`}
                      onClick={() => {
                        if (paymentCompleted) return;
                        setFormData({ ...formData, paymentMethod: 'gpay' });
                        markFieldTouched('paymentMethod');
                      }}
                    >
                      <div className="swc-fr-payment-icon">
                        <img src={gpayLogo} alt="Google Pay" />
                      </div>
                      <span>Google Pay</span>
                    </div>

                    <div
                      className={`swc-fr-payment-option ${
                        formData.paymentMethod === 'phonepe' ? 'active' : ''
                      } ${paymentCompleted ? 'disabled-option' : ''}`}
                      onClick={() => {
                        if (paymentCompleted) return;
                        setFormData({ ...formData, paymentMethod: 'phonepe' });
                        markFieldTouched('paymentMethod');
                      }}
                    >
                      <div className="swc-fr-payment-icon">
                        <img src={phonepeLogo} alt="PhonePe" />
                      </div>
                      <span>PhonePe</span>
                    </div>

                    <div
                      className={`swc-fr-payment-option ${
                        formData.paymentMethod === 'paytm' ? 'active' : ''
                      } ${paymentCompleted ? 'disabled-option' : ''}`}
                      onClick={() => {
                        if (paymentCompleted) return;
                        setFormData({ ...formData, paymentMethod: 'paytm' });
                        markFieldTouched('paymentMethod');
                      }}
                    >
                      <div className="swc-fr-payment-icon">
                        <img src={paytmLogo} alt="Paytm" />
                      </div>
                      <span>Paytm</span>
                    </div>

                    <div
                      className={`swc-fr-payment-option ${
                        formData.paymentMethod === 'upi' ? 'active' : ''
                      } ${paymentCompleted ? 'disabled-option' : ''}`}
                      onClick={() => {
                        if (paymentCompleted) return;
                        setFormData({ ...formData, paymentMethod: 'upi' });
                        markFieldTouched('paymentMethod');
                      }}
                    >
                      <div className="swc-fr-payment-icon">
                        <MobileOutlined style={{ fontSize: '32px', color: '#5f6368' }} />
                      </div>
                      <span>UPI ID</span>
                    </div>

                    <div
                      className={`swc-fr-payment-option ${
                        formData.paymentMethod === 'netbanking' ? 'active' : ''
                      } ${paymentCompleted ? 'disabled-option' : ''}`}
                      onClick={() => {
                        if (paymentCompleted) return;
                        setFormData({ ...formData, paymentMethod: 'netbanking' });
                        markFieldTouched('paymentMethod');
                      }}
                    >
                      <div className="swc-fr-payment-icon">
                        <BankOutlined style={{ fontSize: '32px', color: '#5f6368' }} />
                      </div>
                      <span>Net Banking</span>
                    </div>

                    <div
                      className={`swc-fr-payment-option ${
                        formData.paymentMethod === 'card' ? 'active' : ''
                      } ${paymentCompleted ? 'disabled-option' : ''}`}
                      onClick={() => {
                        if (paymentCompleted) return;
                        setFormData({ ...formData, paymentMethod: 'card' });
                        markFieldTouched('paymentMethod');
                      }}
                    >
                      <div className="swc-fr-payment-icon">
                        <CreditCardOutlined style={{ fontSize: '32px', color: '#5f6368' }} />
                      </div>
                      <span>Credit/Debit Card</span>
                    </div>
                  </div>
                  {touched.paymentMethod && errors.paymentMethod && (
                    <div className="swc-fr-form-error">{errors.paymentMethod}</div>
                  )}
                </div>

                {formData.paymentMethod === 'upi' && (
                  <div className="swc-fr-form-group">
                    <label className="swc-fr-form-label">Enter UPI ID</label>
                    <Input
                      value={formData.upiId}
                      onChange={(e) =>
                        setFormData({ ...formData, upiId: e.target.value })
                      }
                      onBlur={() => markFieldTouched('upiId')}
                      placeholder="yourname@upi"
                      className={`swc-fr-form-input ${touched.upiId && errors.upiId ? 'form-input-error' : ''}`}
                    />
                    {touched.upiId && errors.upiId && (
                      <div className="swc-fr-form-error">{errors.upiId}</div>
                    )}
                  </div>
                )}

                <div
                  className="swc-fr-buttons-row"
                  style={{ display: 'flex', gap: 12, alignItems: 'center' }}
                >
                  <Button
                    onClick={handlePay}
                    type="primary"
                    className="swc-fr-btn btn-primary"
                    loading={payLoading}
                    disabled={payLoading || paymentCompleted}
                    style={{ minWidth: 160 }}
                  >
                    {paymentCompleted
                      ? 'Paid ✓'
                      : payLoading
                      ? 'Processing...'
                      : 'Pay ₹499'}
                  </Button>

                  <Button
                    htmlType="button"
                    onClick={handleCreateAccount}
                    type="default"
                    className="swc-fr-btn btn-primary"
                    disabled={loading}
                    style={{
                      minWidth: 200,
                      background: '#fff',
                      color: '#374151',
                      border: '1px solid #e5e7eb'
                    }}
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </div>
              </form>
            )}

            <p className="swc-fr-login-link">
              Already have an account?{' '}
              <a href="/freelancerlogin">Login here</a>
            </p>
          </div>
        </div>
      </div>

      <Modal
        open={showPaymentSuccessModal}
        onOk={closePaymentSuccess}
        onCancel={closePaymentSuccess}
        okText="Continue"
        centered
      >
        <div style={{ textAlign: 'center', padding: 8 }}>
          <CheckCircleOutlined
            style={{ fontSize: 60, color: '#4ade80', marginBottom: 12 }}
          />
          <h2 style={{ marginTop: 8 }}>Payment Successful</h2>
          <p>Your payment of ₹499 has been received. You can now create your account.</p>
        </div>
      </Modal>

      <Modal
        open={showSuccessModal}
        footer={null}
        closable={false}
        centered
        className="swc-fr-success-modal"
      >
        <div className="swc-fr-success-content">
          <CheckCircleOutlined className="swc-fr-success-icon" />
          <h2 className="swc-fr-success-title">Thank You for Registering!</h2>
          <p className="swc-fr-success-message">
            Your account has been created successfully. You will be redirected to the home
            page shortly.
          </p>
          <Button
            type="primary"
            size="large"
            onClick={closeFinalSuccess}
            className="swc-fr-success-button"
          >
            Go to Home
          </Button>
        </div>
      </Modal>
    </div>
  );
}
