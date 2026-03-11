import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CommonHeader from "../../pages/landing/Header";
import FooterSection from "../../pages/landing/FooterSection";
import "../../pages/landing/FooterSection.css";
import "./LandingPage.css";
import { useRef } from "react";
import swachifyvideo from "../../assets/swachifyvideo.mp4";

import {
  HomeOutlined,
  TruckOutlined,
  ShopOutlined,
  BuildOutlined,
  BookOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  CoffeeOutlined,
} from "@ant-design/icons";

/* IMAGES */
import img1 from "../../assets/cleaning and home.jpg";
import img2 from "../../assets/education1.jpg";
import img3 from "../../assets/transport.jpg";
import img4 from "../../assets/img4.jpg";
import img5 from "../../assets/health care.jpg";
import img6 from "../../assets/img6.jpg";
import img7 from "../../assets/img7.jpg";
import img8 from "../../assets/MyFood.jpg";

/* SERVICES */
const services = [
  {
    title: "Education",
    icon: <BookOutlined />,
    route: "/education",
    image: img2,
    gradient: "linear-gradient(135deg,#6366f1,#8b5cf6)",
  },
  {
    title: "Health Care",
    icon: <UserOutlined />,
    route: "/healthcare",
    image: img5,
    gradient: "linear-gradient(135deg,#ec4899,#f43f5e)",
  },
  {
    title: "Just Ride",
    icon: <TruckOutlined />,
    route: "/LandingPackers",
    image: img3,
    gradient: "linear-gradient(135deg,#0ea5e9,#38bdf8)",
  },
  {
    title: "Swachify Products",
    icon: <ShoppingCartOutlined />,
    route: "/swachifyproducts",
    image: img4,
    gradient: "linear-gradient(135deg,#22c55e,#4ade80)",
  },
  {
    title: "Cleaning & Home Services",
    icon: <HomeOutlined />,
    route: "/cleaningservice",
    image: img1,
    gradient: "linear-gradient(135deg,#f59e0b,#fbbf24)",
  },
  {
    title: "Buy / Sale / Rentals",
    icon: <ShopOutlined />,
    route: "/BuySaleProducts",
    image: img6,
    gradient: "linear-gradient(135deg,#14b8a6,#2dd4bf)",
  },
  {
    title: "Raw Materials",
    icon: <BuildOutlined />,
    route: "/Rawmaterials",
    image: img7,
    gradient: "linear-gradient(135deg,#64748b,#94a3b8)",
  },
  {
    title: "MyFood",
    icon: <CoffeeOutlined />,
    route: "/MyFood",
    image: img8,
    gradient: "linear-gradient(135deg,#ff6b35,#ff9f1c)",
  },
];

/* HERO BG */
const heroImages = [img2, img5, img4, img3, img1];
const LandingPage = () => {
  const navigate = useNavigate();
  const [muted, setMuted] = useState(true);
  const recognitionRef = useRef<any>(null);
  const [listening, setListening] = useState(false);

  /* ✅ hooks INSIDE component */
  const [activeIndex, setActiveIndex] = useState(0);
  const [bgIndex, setBgIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const voiceRoutes: { [key: string]: string } = {
    education: "/education",
    school: "/education",
    doctor: "/healthcare",
    hospital: "/healthcare",
    cleaning: "/cleaningservice",
    clean: "/cleaningservice",
    ride: "/LandingPackers",
    transport: "/LandingPackers",
    product: "/swachifyproducts",
    shop: "/swachifyproducts",
    buy: "/BuySaleProducts",
    rent: "/BuySaleProducts",
    raw: "/Rawmaterials",
  };
  const startListening = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      console.log("🎙️ Heard:", transcript);

      for (const keyword in voiceRoutes) {
        if (transcript.includes(keyword)) {
          navigate(voiceRoutes[keyword]);
          return;
        }
      }

      alert("Sorry, I didn’t understand. Try again.");
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  /* 🔁 auto rotate service images */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  /* 🔁 hero bg rotation */
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sw-landing-root">
      <CommonHeader selectedKey="landing" />

      {/* HERO */}
      <section className="sw-main-hero">
        <div
          className="sw-hero-bg"
          style={{ backgroundImage: `url(${heroImages[bgIndex]})` }}
        />

        <div className="sw-hero-content">
          <span className="sw-badge">
            Trusted by 1M+ Indians across 100+ cities
          </span>

          <h1>
            Your Life, <span>Simplified</span>
          </h1>

          <p>
            From education to healthcare, transport to home services –
            everything in one platform.
          </p>

          <div className="sw-hero-actions">
            <button
              className="primary-btn"
              onClick={() =>
                document
                  .querySelector("#services")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Services
            </button>
            <button className="secondary-btn">Download App</button>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="sw-uc-services">
        <div className="sw-uc-container">
          {/* LEFT */}
          <div className="sw-uc-left">
            <h2>What are you looking for?</h2>

            <div className="sw-uc-grid">
              {services.map((item, index) => (
                <div
                  key={index}
                  className={`sw-uc-card ${
                    activeIndex === index ? "active" : ""
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => navigate(item.route)}
                >
                  <div
                    className="sw-uc-icon-wrap"
                    style={{ background: item.gradient }}
                  >
                    <div className="sw-uc-icon">{item.icon}</div>
                  </div>
                  <div className="sw-uc-text">{item.title}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="sw-uc-right">
            <div className="sw-uc-image-grid">
              {services.map((s, i) => (
                <div
                  key={i}
                  className={`sw-uc-image-card ${
                    activeIndex === i ? "active" : ""
                  }`}
                >
                  <img src={s.image} alt={s.title} />
                  <div
                    className="sw-uc-image-glow"
                    style={{ background: s.gradient }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div>
        {/* SWACHIFY AI PROMO */}
        {/* SWACHIFY AI PROMO */}
        <section className="sw-ai">
          <div className="sw-ai-wrap">
            {/* LEFT CONTENT */}
            <div className="sw-ai-content">
              <span className="sw-ai-badge">Introducing Swachify AI</span>

              <h2>
                One App. <br />
                <span>Your entire life.</span>
              </h2>

              <p>
                Swachify AI understands your needs and connects you instantly to
                education, healthcare, transport, home services and more —
                automatically.
              </p>

              <div className="sw-ai-lines">
                <div>🎙️ “Book a doctor for today”</div>
                <div>🎙️ “Schedule home cleaning”</div>
                <div>🎙️ “Find a ride now”</div>
              </div>

              <button className="sw-ai-btn" onClick={startListening}>
                {listening ? "🎧 Listening..." : "🎙️ Speak to Swachify AI"}
              </button>
            </div>

            {/* RIGHT VIDEO + AUDIO */}
            <div className="sw-ai-visual">
              <div className="sw-device">
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted={muted}
                  playsInline
                  className="sw-ai-video"
                >
                  <source src={swachifyvideo} type="video/mp4" />
                </video>

                <button
                  className="unmute-btn"
                  onClick={() => setMuted((prev) => !prev)}
                >
                  {muted ? "🔇 Sound Off" : "🔊 Sound On"}
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <FooterSection selectedKey="LandingPackers" />
    </div>
  );
};

export default LandingPage;
