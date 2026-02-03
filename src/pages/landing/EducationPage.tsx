import { useEffect, useState, useRef } from "react";
import CommonHeader from "../../pages/landing/Header";
import FooterSection from "../../pages/landing/FooterSection";
import "../../pages/landing/FooterSection.css";
import "./EducationPage.css";
import {
  Users,
  Briefcase,
  Building2,
  BookOpen,
  GraduationCap,
  Wallet,
  Award,
  Code,
  BookText,
  Cpu,
  Globe,
  Video,
} from "lucide-react";

const Counter = ({ end, start }: { end: number; start: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let current = 0;
    const duration = 2000; // ms
    const increment = Math.ceil(end / (duration / 16));

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [start, end]);

  return <span className="stat-value">{count.toLocaleString()}+</span>;
};

const EducationPage = () => {
  const [startCount, setStartCount] = useState(false);
  const statsRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
          observer.disconnect(); // run only once
        }
      },
      { threshold: 0.3 },
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);
  return (
    <div className="sw-ep-classname-landing-container">
      <CommonHeader selectedKey="education" />

      <div className="page-container">
        {/* --- HERO SECTION --- */}
        <section className="hero-section full-vh">
          <div className="hero-overlay"></div>
          <div className="hero-content">
            {/* <span className="badge">● New Batches Starting Soon</span> */}
            <h1 className="hero-title">
              Skills to transform your <br />
              <span className="highlight-blue">career</span>{" "}
              <span className="highlight-orange">and life</span>
            </h1>
            <p className="hero-subtitle">
              Learn, upskill, and grow with our curated programs designed for IT
              professionals, academic excellence, and competitive exam success.
            </p>

            <div className="hero-buttons">
              <button
                className="btn-explore"
                onClick={() => {
                  if (
                    typeof window !== "undefined" &&
                    (window as any).openAuthModal
                  ) {
                    (window as any).openAuthModal("register");
                  } else {
                    console.warn("Auth modal opener not available on window.");
                  }
                }}
              >
                Explore Programs &rarr;
              </button>
              <button className="btn-secondary">View Success Stories</button>
            </div>

            {/* <div className="hero-features">
              <span>✔ Certified Courses</span>
              <span>✔ Expert Mentors</span>
              <span>✔ Job Assistance</span>
            </div> */}
          </div>
        </section>
        {/* --- STATS BAR --- */}
        <div className="sw-ep-stats-container" ref={statsRef}>
          <div className="sw-ep-stats-card">
            <div className="sw-ep-stat-item">
              <div className="stat-icon-box bg-blue">
                <Users size={20} />
              </div>
              <Counter end={15000} start={startCount} />
              <span>Students Enrolled</span>
            </div>

            <div className="sw-ep-stat-item">
              <div className="stat-icon-box bg-orange">
                <Briefcase size={20} />
              </div>
              <Counter end={2500} start={startCount} />
              <span>Internships Provided</span>
            </div>

            <div className="sw-ep-stat-item">
              <div className="stat-icon-box bg-blue">
                <Building2 size={20} />
              </div>
              <Counter end={500} start={startCount} />

              <span>Partner Companies</span>
            </div>

            <div className="sw-ep-stat-item">
              <div className="stat-icon-box bg-orange">
                <BookOpen size={20} />
              </div>
              <Counter end={150} start={startCount} />
              <span>Training Programs</span>
            </div>

            <div className="sw-ep-stat-item">
              <div className="stat-icon-box bg-blue">
                <GraduationCap size={20} />
              </div>
              <Counter end={75} start={startCount} />
              <span>Partner Institutions</span>
            </div>
          </div>
        </div>
        {/* --- CATEGORIES SECTION --- */}
        <section className="section-padding1">
          <div className="section-header">
            <h2 className="section-title">Categories</h2>
            <div className="section-underline"></div>
            <p className="section-description">
              Comprehensive training, certification, and resources tailored for
              professionals, students, and ambitious job seekers.
            </p>
          </div>
          <div className="category-grid">
            {/* Card 1: IT Training */}
            <div className="category-card">
              <div className="card-image-wrapper">
                <img
                  src="https://cdn.mos.cms.futurecdn.net/x8oyLJtDJBPmL59WUoa36C.jpg"
                  alt="IT Training"
                ></img>
                <div className="category-badge bg-blue">
                  <GraduationCap size={16} />
                </div>
              </div>
              <div className="card-content">
                <h3>Students</h3>
                <p>
                  Master the latest technologies including Full Stack
                  Development, Data Science, and AI.
                </p>

                <a
                  href="#"
                  className="learn-more"
                  onClick={(e) => {
                    e.preventDefault(); // stop page jump
                    if (
                      typeof window !== "undefined" &&
                      (window as any).openAuthModal
                    ) {
                      (window as any).openAuthModal("register");
                    } else {
                      console.warn(
                        "Auth modal opener not available on window.",
                      );
                    }
                  }}
                >
                  Learn More &rarr;
                </a>
              </div>
            </div>

            {/* Card 2: Internships*/}
            <div className="category-card">
              <div className="card-image-wrapper">
                <img
                  src="https://innovate.unc.edu/app/uploads/2021/09/student-workshop-hero-image-beam.jpg"
                  alt="Internships"
                />
                <div className="category-badge bg-blue">
                  <BookText size={16} />
                </div>
              </div>
              <div className="card-content">
                <h3>Interships</h3>
                <p>
                  Gain real-world experience through industry internships, live
                  projects, mentorship, and hands-on exposure to professional
                  work environments.
                </p>
                <a
                  href="#"
                  className="learn-more"
                  onClick={(e) => {
                    e.preventDefault(); // stop page jump
                    if (
                      typeof window !== "undefined" &&
                      (window as any).openAuthModal
                    ) {
                      (window as any).openAuthModal("register");
                    } else {
                      console.warn(
                        "Auth modal opener not available on window.",
                      );
                    }
                  }}
                >
                  Learn More &rarr;
                </a>
              </div>
            </div>

            {/* Card 3: companies */}
            <div className="category-card">
              <div className="card-image-wrapper">
                <img
                  src="https://cdn.sanity.io/images/uqxwe2qj/production/62db3c671745e98cb27690dff96f8033d2bb7f35-2048x1010.jpg"
                  alt="Companies"
                />
                <div className="category-badge bg-blue">
                  <Globe size={16} />
                </div>
              </div>
              <div className="card-content">
                <h3>Companies</h3>
                <p>
                  Partner with us to upskill your workforce, onboard fresh
                  talent, and implement customized training solutions for
                  business growth.
                </p>
                <a
                  href="#"
                  className="learn-more"
                  onClick={(e) => {
                    e.preventDefault(); // stop page jump
                    if (
                      typeof window !== "undefined" &&
                      (window as any).openAuthModal
                    ) {
                      (window as any).openAuthModal("register");
                    } else {
                      console.warn(
                        "Auth modal opener not available on window.",
                      );
                    }
                  }}
                >
                  Learn More &rarr;
                </a>
              </div>
            </div>

            {/* Card 4:Training */}
            <div className="category-card">
              <div className="card-image-wrapper">
                <img
                  src="https://images.squarespace-cdn.com/content/v1/5ec2a23f927e1e4c78193dc4/1591276760333-NRZ40JXALWIRBXISDMW0/M2E.jpg"
                  alt="Training"
                />

                <div className="category-badge bg-blue">
                  <Code size={16} />
                </div>
              </div>
              <div className="card-content">
                <h3>Training</h3>
                <p>
                  Practical training programs designed to bridge skill gaps
                  through hands-on sessions, real-time projects, and expert-led
                  instruction.
                </p>
                <a
                  href="#"
                  className="learn-more"
                  onClick={(e) => {
                    e.preventDefault(); // stop page jump
                    if (
                      typeof window !== "undefined" &&
                      (window as any).openAuthModal
                    ) {
                      (window as any).openAuthModal("register");
                    } else {
                      console.warn(
                        "Auth modal opener not available on window.",
                      );
                    }
                  }}
                >
                  Learn More &rarr;
                </a>
              </div>
            </div>

            {/* Card 5: Institutions */}
            <div className="category-card">
              <div className="card-image-wrapper">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/1/16/5th_Floor_Lecture_Hall.jpg"
                  alt="Institutions"
                />
                <div className="category-badge bg-blue">
                  <Cpu size={16} />
                </div>
              </div>
              <div className="card-content">
                <h3>Institutions</h3>
                <p>
                  Collaborate with us to deliver industry-aligned education,
                  certifications, and skill development programs for academic
                  excellence.
                </p>
                <a
                  href="#"
                  className="learn-more"
                  onClick={(e) => {
                    e.preventDefault(); // stop page jump
                    if (
                      typeof window !== "undefined" &&
                      (window as any).openAuthModal
                    ) {
                      (window as any).openAuthModal("register");
                    } else {
                      console.warn(
                        "Auth modal opener not available on window.",
                      );
                    }
                  }}
                >
                  Learn More &rarr;
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* --- WHY CHOOSE US --- */}
        <section className="why-choose-us section-padding">
          <div className="why-content">
            <h2>Why Choose Our Platform?</h2>
            <div className="features-grid">
              {/* Card 1 */}
              <div className="feature-item">
                <div className="feature-icon-box bg-blue">
                  <Users size={20} />
                </div>
                <div className="feature-info">
                  <h4>Expert Mentors</h4>
                  <p>
                    Learn from industry veterans with 10+ years of experience in
                    top MNCs.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="feature-item">
                <div className="feature-icon-box bg-orange">
                  <BookOpen size={20} />
                </div>
                <div className="feature-info">
                  <h4>Updated Curriculum</h4>
                  <p>
                    Course content updated every quarter to match current
                    industry standards.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="feature-item">
                <div className="feature-icon-box bg-blue">
                  <Video size={20} />
                </div>
                <div className="feature-info">
                  <h4>Recorded Sessions</h4>
                  <p>
                    Never miss a class. Access high-quality recordings of all
                    live sessions anytime.
                  </p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="feature-item">
                <div className="feature-icon-box bg-orange">
                  <Briefcase size={20} />
                </div>
                <div className="feature-info">
                  <h4>Placement Support</h4>
                  <p>
                    Dedicated placement cell to help you land your dream job
                    with mock interviews.
                  </p>
                </div>
              </div>

              {/* Card 5 */}
              <div className="feature-item">
                <div className="feature-icon-box bg-blue">
                  <Wallet size={20} />
                </div>
                <div className="feature-info">
                  <h4>Affordable Fees</h4>
                  <p>
                    Quality education shouldn't break the bank. Flexible EMI
                    options available.
                  </p>
                </div>
              </div>

              {/* Card 6 */}
              <div className="feature-item">
                <div className="feature-icon-box bg-orange">
                  <Award size={20} />
                </div>
                <div className="feature-info">
                  <h4>Certified Learning</h4>
                  <p>
                    Earn globally recognized certificates upon successful course
                    completion.
                  </p>
                </div>
              </div>
            </div>
            <div className="why-text">
              {/* <h2>Why Choose Our Platform?</h2> */}
              <p>
                We don't just teach; we transform. Our practical approach to
                learning ensures you are industry-ready from day one.
              </p>
              <ul className="check-list">
                <li>
                  <span className="check-icon"></span> Industry-aligned
                  curriculum
                </li>
                <li>
                  <span className="check-icon"></span> Hands-on project
                  experience
                </li>
                <li>
                  <span className="check-icon"></span> Lifetime access to
                  resources
                </li>
              </ul>
              <button
                className="btn-dark"
                onClick={() => {
                  if (
                    typeof window !== "undefined" &&
                    (window as any).openAuthModal
                  ) {
                    (window as any).openAuthModal("register");
                  } else {
                    console.warn("Auth modal opener not available on window.");
                  }
                }}
              >
                Start Your Journey
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <FooterSection selectedKey="education" />
    </div>
  );
};

export default EducationPage;
