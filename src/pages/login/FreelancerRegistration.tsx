import { useState } from 'react';
import { Input, Button, Select, Modal } from 'antd';
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



const { Option } = Select;

export default function Registration() {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false); // for create account
  const [payLoading, setPayLoading] = useState(false); // for pay button
  const [paymentCompleted, setPaymentCompleted] = useState(false); // whether pay succeeded
  const [showPaymentSuccessModal, setShowPaymentSuccessModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    location: '',
    gender: '',
    userType: 'freelancer' as 'freelancer' | 'client',
    skills: [] as string[],
    panNumber: '',
    paymentMethod: '',
    upiId: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const skills = [
    'Plumbing', 'Electrical', 'Cleaning', 'Painting', 'Carpentry',
    'AC Repair', 'Moving', 'Gardening', 'Home Maintenance', 'Interior Design'
  ];

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName) newErrors.firstName = 'Please input your first name!';
    if (!formData.lastName) newErrors.lastName = 'Please input your last name!';
    if (!formData.gender) newErrors.gender = 'Please select your gender!';
    if (!formData.email) newErrors.email = 'Please input your email!';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email!';
    if (!formData.phone) newErrors.phone = 'Please input your phone!';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits!';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.password) newErrors.password = 'Please input your password!';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters!';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password!';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match!';
    if (!formData.location) newErrors.location = 'Please input your location!';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    if (formData.userType === 'freelancer' && formData.skills.length === 0) {
      newErrors.skills = 'Please select at least one skill!';
    }
    if (!formData.panNumber) newErrors.panNumber = 'Please enter your PAN number!';
    else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) {
      newErrors.panNumber = 'Please enter a valid PAN number!';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep4 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method!';
    }
    if (formData.paymentMethod === 'upi' && !formData.upiId) {
      newErrors.upiId = 'Please enter your UPI ID!';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) setCurrentStep(1);
  };

  const handleStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep2()) setCurrentStep(2);
  };

  const handleStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep3()) setCurrentStep(3);
  };

  const toggleSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
    if (errors.skills) setErrors({ ...errors, skills: '' });
  };

  // Simulate the payment processing
  const handlePay = () => {
    // validate payment method first
    if (!validateStep4()) {
      // make sure paymentMethod error is shown
      return;
    }

    // Already paid => do nothing
    if (paymentCompleted) return;

    setPayLoading(true);
    // Simulate payment network call
    setTimeout(() => {
      setPayLoading(false);
      setPaymentCompleted(true);
      setShowPaymentSuccessModal(true);
    }, 1600);
  };

  // Create account after payment
    const handleCreateAccount = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!paymentCompleted) {
        Modal.warning({
          title: 'Payment required',
          content: 'Please complete the payment (Pay ₹499) before creating the account.',
        });
        return;
      }

      // 🔥 Prepare final data to send to backend
      const payload = {
        ...formData,
        employeeId: 4,        // ✅ Always attach employee ID = 4
      };

      console.log("Sending to backend:", payload);

      // simulate backend request
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setShowSuccessModal(true);
      }, 1400);
    };

const navigate = useNavigate();
  const closeFinalSuccess = () => {
    setShowSuccessModal(false);
    // redirect to freelancer home (same behavior as before)
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
              <div className={`swc-fr-step-item ${currentStep >= 0 ? 'active' : ''} ${currentStep > 0 ? 'completed' : ''}`}>
                <div className="swc-fr-step-number">
                  {currentStep > 0 ? '✓' : '1'}
                </div>
                <div className="swc-fr-step-content">
                  <h3>Personal Information</h3>
                  <p>Tell us about yourself</p>
                </div>
              </div>

              <div className={`swc-fr-step-item ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
                <div className="swc-fr-step-number">
                  {currentStep > 1 ? '✓' : '2'}
                </div>
                <div className="swc-fr-step-content">
                  <h3>Account Security</h3>
                  <p>Create a secure password</p>
                </div>
              </div>

              <div className={`swc-fr-step-item ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
                <div className="swc-fr-step-number">
                  {currentStep > 2 ? '✓' : '3'}
                </div>
                <div className="swc-fr-step-content">
                  <h3>Skills & ID Proof</h3>
                  <p>Choose your expertise</p>
                </div>
              </div>

              <div className={`swc-fr-step-item ${currentStep >= 3 ? 'active' : ''}`}>
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
              <div className="progress-fill" style={{ width: `${((currentStep + 1) / 4) * 100}%` }}></div>
            </div>

            {currentStep === 0 && (
              <form onSubmit={handleStep1} className="swc-fr-registration-form">
                <div className="swc-fr-form-row">
                  <div className="swc-fr-form-group swc-fr-form-group-half">
                    <label className="swc-fr-form-label">First Name</label>
                    <Input
                      value={formData.firstName}
                      onChange={(e) => {
                        setFormData({ ...formData, firstName: e.target.value });
                        if (errors.firstName) setErrors({ ...errors, firstName: '' });
                      }}
                      placeholder="John"
                      className={`swc-fr-form-input ${errors.firstName ? 'form-input-error' : ''}`}
                    />
                    {errors.firstName && <div className="swc-fr-form-error">{errors.firstName}</div>}
                  </div>

                  <div className="swc-fr-form-group swc-fr-form-group-half">
                    <label className="swc-fr-form-label">Last Name</label>
                    <Input
                      value={formData.lastName}
                      onChange={(e) => {
                        setFormData({ ...formData, lastName: e.target.value });
                        if (errors.lastName) setErrors({ ...errors, lastName: '' });
                      }}
                      placeholder="Doe"
                      className={`swc-fr-form-input ${errors.lastName ? 'form-input-error' : ''}`}
                    />
                    {errors.lastName && <div className="swc-fr-form-error">{errors.lastName}</div>}
                  </div>
                </div>

                <div className="swc-fr-form-group">
                  <label className="swc-fr-form-label">Gender</label>
                  <Select
                    value={formData.gender || undefined}
                    onChange={(value) => {
                      setFormData({ ...formData, gender: value });
                      if (errors.gender) setErrors({ ...errors, gender: '' });
                    }}
                    placeholder="Select your gender"
                    className={`swc-fr-form-select ${errors.gender ? 'form-input-error' : ''}`}
                    style={{ width: '100%' }}
                  >
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                  </Select>
                  {errors.gender && <div className="swc-fr-form-error">{errors.gender}</div>}
                </div>

                <div className="swc-fr-form-group">
                  <label className="swc-fr-form-label">Email Address</label>
                  <Input
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    placeholder="you@example.com"
                    className={`swc-fr-form-input ${errors.email ? 'form-input-error' : ''}`}
                    type="email"
                  />
                  {errors.email && <div className="swc-fr-form-error">{errors.email}</div>}
                </div>

                <div className="swc-fr-form-group">
                  <label className="swc-fr-form-label">Phone Number</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    placeholder="9876543210"
                    className={`swc-fr-form-input ${errors.phone ? 'form-input-error' : ''}`}
                    type="tel"
                  />
                  {errors.phone && <div className="swc-fr-form-error">{errors.phone}</div>}
                </div>

                <Button htmlType="submit" className="swc-fr-btn btn-primary btn-block" type="primary">
                  Continue
                </Button>
              </form>
            )}

            {currentStep === 1 && (
              <form onSubmit={(e) => { e.preventDefault(); handleStep2(e); }} className="swc-fr-registration-form">
                <div className="swc-fr-form-group">
                  <label className="swc-fr-form-label">Password</label>
                  <Input.Password
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                      if (errors.password) setErrors({ ...errors, password: '' });
                    }}
                    placeholder="••••••••"
                    className={`swc-fr-form-input ${errors.password ? 'form-input-error' : ''}`}
                  />
                  {errors.password && <div className="swc-fr-form-error">{errors.password}</div>}
                </div>

                <div className="swc-fr-form-group">
                  <label className="swc-fr-form-label">Confirm Password</label>
                  <Input.Password
                    value={formData.confirmPassword}
                    onChange={(e) => {
                      setFormData({ ...formData, confirmPassword: e.target.value });
                      if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                    }}
                    placeholder="••••••••"
                    className={`swc-fr-form-input ${errors.confirmPassword ? 'form-input-error' : ''}`}
                  />
                  {errors.confirmPassword && <div className="swc-fr-form-error">{errors.confirmPassword}</div>}
                </div>

                <div className="swc-fr-form-group">
                  <label className="swc-fr-form-label">Location</label>
                  <Input
                    value={formData.location}
                    onChange={(e) => {
                      setFormData({ ...formData, location: e.target.value });
                      if (errors.location) setErrors({ ...errors, location: '' });
                    }}
                    placeholder="Hyderabad, India"
                    className={`swc-fr-form-input ${errors.location ? 'swc-fr-form-input-error' : ''}`}
                  />
                  {errors.location && <div className="swc-fr-form-error">{errors.location}</div>}
                </div>

                <Button htmlType="submit" className="swc-fr-btn btn-primary btn-block" type="primary">
                  Continue
                </Button>
              </form>
            )}

            {currentStep === 2 && (
              <form onSubmit={(e) => { e.preventDefault(); handleStep3(e); }} className="swc-fr-registration-form">
                {formData.userType === 'freelancer' && (
                  <div className="swc-fr-form-group">
                    <label className="swc-fr-form-label">Select Your Skills</label>
                    <div className="swc-fr-skills-grid">
                      {skills.map(skill => (
                        <Button
                          key={skill}
                          type={formData.skills.includes(skill) ? 'primary' : 'default'}
                          className={`swc-fr-skill-tag ${formData.skills.includes(skill) ? 'active' : ''}`}
                          onClick={() => toggleSkill(skill)}
                        >
                          {skill}
                        </Button>
                      ))}
                    </div>
                    {errors.skills && <div className="swc-fr-form-error">{errors.skills}</div>}
                  </div>
                )}

                <div className="swc-fr-form-group">
                  <label className="swc-fr-form-label">Government ID Proof</label>
                  <Input
                    value={formData.panNumber}
                    onChange={(e) => {
                      setFormData({ ...formData, panNumber: e.target.value.toUpperCase() });
                      if (errors.panNumber) setErrors({ ...errors, panNumber: '' });
                    }}
                    placeholder="Enter your PAN number"
                    className={`swc-fr-form-input ${errors.panNumber ? 'form-input-error' : ''}`}
                    maxLength={10}
                  />
                  {errors.panNumber && <div className="swc-fr-form-error">{errors.panNumber}</div>}
                </div>

                <Button htmlType="submit" className="swc-fr-btn btn-primary btn-block" type="primary">
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
                      className={`swc-fr-payment-option ${formData.paymentMethod === 'gpay' ? 'active' : ''} ${paymentCompleted ? 'disabled-option' : ''}`}
                      onClick={() => {
                        if (paymentCompleted) return;
                        setFormData({ ...formData, paymentMethod: 'gpay' });
                        if (errors.paymentMethod) setErrors({ ...errors, paymentMethod: '' });
                      }}
                    >
                      <div className="swc-fr-payment-icon">
                        <img src={gpayLogo} alt="Google Pay" />
                      </div>
                      <span>Google Pay</span>
                    </div>

                    <div
                      className={`swc-fr-payment-option ${formData.paymentMethod === 'phonepe' ? 'active' : ''} ${paymentCompleted ? 'disabled-option' : ''}`}
                      onClick={() => {
                        if (paymentCompleted) return;
                        setFormData({ ...formData, paymentMethod: 'phonepe' });
                        if (errors.paymentMethod) setErrors({ ...errors, paymentMethod: '' });
                      }}
                    >
                      <div className="swc-fr-payment-icon">
                        {/* exact PhonePe PNG */}
                        <img src={phonepeLogo} alt="PhonePe" />
                      </div>
                      <span>PhonePe</span>
                    </div>

                    <div
                      className={`swc-fr-payment-option ${formData.paymentMethod === 'paytm' ? 'active' : ''} ${paymentCompleted ? 'disabled-option' : ''}`}
                      onClick={() => {
                        if (paymentCompleted) return;
                        setFormData({ ...formData, paymentMethod: 'paytm' });
                        if (errors.paymentMethod) setErrors({ ...errors, paymentMethod: '' });
                      }}
                    >
                      <div className="swc-fr-payment-icon">
                        <img src={paytmLogo} alt="Paytm" />
                      </div>
                      <span>Paytm</span>
                    </div>

                    <div
                      className={`swc-fr-payment-option ${formData.paymentMethod === 'upi' ? 'active' : ''} ${paymentCompleted ? 'disabled-option' : ''}`}
                      onClick={() => {
                        if (paymentCompleted) return;
                        setFormData({ ...formData, paymentMethod: 'upi' });
                        if (errors.paymentMethod) setErrors({ ...errors, paymentMethod: '' });
                      }}
                    >
                      <div className="swc-fr-payment-icon">
                        <MobileOutlined style={{ fontSize: '32px', color: '#5f6368' }} />
                      </div>
                      <span>UPI ID</span>
                    </div>

                    <div
                      className={`swc-fr-payment-option ${formData.paymentMethod === 'netbanking' ? 'active' : ''} ${paymentCompleted ? 'disabled-option' : ''}`}
                      onClick={() => {
                        if (paymentCompleted) return;
                        setFormData({ ...formData, paymentMethod: 'netbanking' });
                        if (errors.paymentMethod) setErrors({ ...errors, paymentMethod: '' });
                      }}
                    >
                      <div className="swc-fr-payment-icon">
                        <BankOutlined style={{ fontSize: '32px', color: '#5f6368' }} />
                      </div>
                      <span>Net Banking</span>
                    </div>

                    <div
                      className={`swc-fr-payment-option ${formData.paymentMethod === 'card' ? 'active' : ''} ${paymentCompleted ? 'disabled-option' : ''}`}
                      onClick={() => {
                        if (paymentCompleted) return;
                        setFormData({ ...formData, paymentMethod: 'card' });
                        if (errors.paymentMethod) setErrors({ ...errors, paymentMethod: '' });
                      }}
                    >
                      <div className="swc-fr-payment-icon">
                        <CreditCardOutlined style={{ fontSize: '32px', color: '#5f6368' }} />
                      </div>
                      <span>Credit/Debit Card</span>
                    </div>
                  </div>
                  {errors.paymentMethod && <div className="swc-fr-form-error">{errors.paymentMethod}</div>}
                </div>

                {formData.paymentMethod === 'upi' && (
                  <div className="swc-fr-form-group">
                    <label className="swc-fr-form-label">Enter UPI ID</label>
                    <Input
                      value={formData.upiId}
                      onChange={(e) => {
                        setFormData({ ...formData, upiId: e.target.value });
                        if (errors.upiId) setErrors({ ...errors, upiId: '' });
                      }}
                      placeholder="yourname@upi"
                      className={`swc-fr-form-input ${errors.upiId ? 'form-input-error' : ''}`}
                    />
                    {errors.upiId && <div className="swc-fr-form-error">{errors.upiId}</div>}
                  </div>
                )}

                <div className="swc-fr-buttons-row" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>

                  <Button
                    onClick={handlePay}
                    type="primary"
                    className="swc-fr-btn btn-primary"
                    loading={payLoading}
                    disabled={payLoading || paymentCompleted}
                    style={{ minWidth: 160 }}
                  >
                    {paymentCompleted ? 'Paid ✓' : (payLoading ? 'Processing...' : 'Pay ₹499')}
                  </Button>

                  <Button
                    htmlType="button"
                    onClick={handleCreateAccount}
                    type="default"
                    className="swc-fr-btn btn-primary"
                    disabled={loading}
                    style={{ minWidth: 200, background: '#fff', color: '#374151', border: '1px solid #e5e7eb' }}
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

      {/* Payment success modal */}
      <Modal
        open={showPaymentSuccessModal}
        onOk={closePaymentSuccess}
        onCancel={closePaymentSuccess}
        okText="Continue"
        centered
      >
        <div style={{ textAlign: 'center', padding: 8 }}>
          <CheckCircleOutlined style={{ fontSize: 60, color: '#4ade80', marginBottom: 12 }} />
          <h2 style={{ marginTop: 8 }}>Payment Successful</h2>
          <p>Your payment of ₹499 has been received. You can now create your account.</p>
          <div style={{ marginTop: 12 }}>
          </div>
        </div>
      </Modal>

      {/* Final success modal (registration complete) */}
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
            Your account has been created successfully. You will be redirected to the home page shortly.
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
