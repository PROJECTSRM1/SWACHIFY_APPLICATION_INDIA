import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from 'antd';
import 'antd/dist/reset.css'; // You can move this import to src/index.tsx if you already import antd globally
// import './FreelancerRegistration.css';

export default function Registration() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    location: '',
    userType: 'freelancer' as 'freelancer' | 'client',
    skills: [] as string[]
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const skills = [
    'Plumbing', 'Electrical', 'Cleaning', 'Painting', 'Carpentry',
    'AC Repair', 'Moving', 'Gardening', 'Home Maintenance', 'Interior Design'
  ];

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName) newErrors.fullName = 'Please input your full name!';
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

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;
    setLoading(true);
    console.log('Registration data:', formData);
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 2000);
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

  return (
    <div className="sw-fr-registration-page">
      <a
        href="#"
        className="sw-fr-back-link"
        onClick={() => navigate('/login')}
        aria-label="Go back"
      >
        ← Back
      </a>

      <div className="sw-fr-registration-container">
        {/* Left Side - Progress */}
        <div className="sw-fr-registration-branding">
          <div className="sw-fr-branding-card">
            <div className="sw-fr-branding-header">
              {/* <div className="branding-logo">⚡</div> */}
              <span className="sw-fr-branding-title">Swachify</span>
            </div>

            <h2 className="sw-fr-branding-heading">Join Our Community</h2>
            <p className="sw-fr-branding-text">
              Start your freelancing journey today and unlock endless opportunities.
            </p>

            <div className="sw-fr-steps-container">
              <div className={`sw-fr-step-item ${currentStep >= 0 ? 'active' : ''} ${currentStep > 0 ? 'completed' : ''}`}>
                <div className="sw-fr-step-number">
                  {currentStep > 0 ? '✓' : '1'}
                </div>
                <div className="sw-fr-step-content">
                  <h3>Personal Information</h3>
                  <p>Tell us about yourself</p>
                </div>
              </div>

              <div className={`sw-fr-step-item ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
                <div className="sw-fr-step-number">
                  {currentStep > 1 ? '✓' : '2'}
                </div>
                <div className="sw-fr-step-content">
                  <h3>Account Security</h3>
                  <p>Create a secure password</p>
                </div>
              </div>

              <div className={`sw-fr-step-item ${currentStep >= 2 ? 'active' : ''}`}>
                <div className="sw-fr-step-number">3</div>
                <div className="sw-fr-step-content">
                  <h3>Skills & Preferences</h3>
                  <p>Choose your expertise</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="sw-fr-registration-form-section">
          <div className="sw-fr-registration-card">
            <div className="sw-fr-registration-header">
              <h1 className="sw-fr-registration-title">Create Your Account</h1>
              <p className="sw-fr-registration-subtitle">Step {currentStep + 1} of 3</p>
            </div>

            <div className="sw-fr-progress-bar">
              <div className="progress-fill" style={{ width: `${((currentStep + 1) / 3) * 100}%` }}></div>
            </div>

            {/* Step 1: Personal Info */}
            {currentStep === 0 && (
              <form onSubmit={handleStep1} className="sw-fr-registration-form">
                <div className="sw-fr-form-group">
                  <label className="sw-fr-form-label">Full Name</label>
                  <Input
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value });
                      if (errors.fullName) setErrors({ ...errors, fullName: '' });
                    }}
                    placeholder="John Doe"
                    className={`sw-fr-form-input ${errors.fullName ? 'form-input-error' : ''}`}
                  />
                  {errors.fullName && <div className="form-error">{errors.fullName}</div>}
                </div>

                <div className="sw-fr-form-group">
                  <label className="sw-fr-form-label">Email Address</label>
                  <Input
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    placeholder="you@example.com"
                    className={`sw-fr-form-input ${errors.email ? 'form-input-error' : ''}`}
                    type="email"
                  />
                  {errors.email && <div className="sw-fr-form-error">{errors.email}</div>}
                </div>

                <div className="sw-fr-form-group">
                  <label className="sw-fr-form-label">Phone Number</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    placeholder="9876543210"
                    className={`sw-fr-form-input ${errors.phone ? 'form-input-error' : ''}`}
                    type="tel"
                  />
                  {errors.phone && <div className="sw-fr-form-error">{errors.phone}</div>}
                </div>

                <Button htmlType="submit" className="sw-fr-btn btn-primary btn-block" type="primary">
                  Continue
                </Button>
              </form>
            )}

            {/* Step 2: Security */}
            {currentStep === 1 && (
              <form onSubmit={handleStep2} className="sw-fr-registration-form">
                <div className="sw-fr-form-group">
                  <label className="sw-fr-form-label">Password</label>
                  <Input.Password
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                      if (errors.password) setErrors({ ...errors, password: '' });
                    }}
                    placeholder="••••••••"
                    className={`sw-fr-form-input ${errors.password ? 'form-input-error' : ''}`}
                  />
                  {errors.password && <div className="sw-fr-form-error">{errors.password}</div>}
                </div>

                <div className="sw-fr-form-group">
                  <label className="sw-fr-form-label">Confirm Password</label>
                  <Input.Password
                    value={formData.confirmPassword}
                    onChange={(e) => {
                      setFormData({ ...formData, confirmPassword: e.target.value });
                      if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                    }}
                    placeholder="••••••••"
                    className={`sw-fr-form-input ${errors.confirmPassword ? 'form-input-error' : ''}`}
                  />
                  {errors.confirmPassword && <div className="sw-fr-form-error">{errors.confirmPassword}</div>}
                </div>

                <div className="sw-fr-form-group">
                  <label className="sw-fr-form-label">Location</label>
                  <Input
                    value={formData.location}
                    onChange={(e) => {
                      setFormData({ ...formData, location: e.target.value });
                      if (errors.location) setErrors({ ...errors, location: '' });
                    }}
                    placeholder="Hyderabad, India"
                    className={`sw-fr-form-input ${errors.location ? 'sw-fr-form-input-error' : ''}`}
                  />
                  {errors.location && <div className="sw-fr-form-error">{errors.location}</div>}
                </div>

                <Button htmlType="submit" className="sw-fr-btn btn-primary btn-block" type="primary">
                  Continue
                </Button>
              </form>
            )}

            {/* Step 3: Skills */}
            {currentStep === 2 && (
              <form onSubmit={handleFinalSubmit} className="sw-fr-registration-form">
                {/* <div className="form-group">
                  <label className="form-label">I want to</label>
                  <div className="user-type-group">
                    <Button
                      type="default"
                      className={`user-type-option ${formData.userType === 'freelancer' ? 'active' : ''}`}
                      onClick={() => setFormData({ ...formData, userType: 'freelancer' })}
                    >
                      <span className="icon">💼</span>
                      <span>Work as Freelancer</span>
                    </Button>
                    <Button
                      type="default"
                      className={`user-type-option ${formData.userType === 'client' ? 'active' : ''}`}
                      onClick={() => setFormData({ ...formData, userType: 'client' })}
                    >
                      <span className="icon">👤</span>
                      <span>Hire Freelancers</span>
                    </Button>
                  </div>
                </div> */}

                {formData.userType === 'freelancer' && (
                  <div className="sw-fr-form-group">
                    <label className="sw-fr-form-label">Select Your Skills</label>
                    <div className="sw-fr-skills-grid">
                      {skills.map(skill => (
                        <Button
                          key={skill}
                          type="default"
                          className={`sw-fr-skill-tag ${formData.skills.includes(skill) ? 'active' : ''}`}
                          onClick={() => toggleSkill(skill)}
                        >
                          {skill}
                        </Button>
                      ))}
                    </div>
                    {errors.skills && <div className="sw-fr-form-error">{errors.skills}</div>}
                  </div>
                )}

                <Button htmlType="submit" className="sw-fr-btn btn-primary btn-block" type="primary" loading={loading} disabled={loading}>
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
            )}

            <p className="sw-fr-login-link">
              Already have an account?{' '}
              <a onClick={() => navigate('/freelancerlogin')}>Login here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
