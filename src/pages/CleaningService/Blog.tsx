import React from "react";
import "./Blog.css";
import CleaningHeader from "./CleaningHeader";
import Footer from "../../../src/pages/CleaningService/CleaningServiceFooter";
import blog1 from "../../assets/CleaningServices/LR2.jpg";
import blog2 from "../../assets/CleaningServices/KItchen1.jpg";
import blog3 from "../../assets/CleaningServices/Cleaning1.png";

const blogs = [
  {
    title: "5 Tips for Deep Cleaning Your Home",
    image: blog1,
    date: "March 12, 2024",
    description:
      "Discover expert tips to keep your home spotless and hygienic all year round.",
  },
  {
    title: "Why Professional Cleaning Matters",
    image: blog2,
    date: "April 02, 2024",
    description:
      "Professional cleaning services save time and ensure long-lasting freshness.",
  },
  {
    title: "Office Cleaning Checklist",
    image: blog3,
    date: "May 18, 2024",
    description:
      "Maintain a productive workspace with our complete office cleaning checklist.",
  },
];

const Blog: React.FC = () => {
  return (
    <>
      <CleaningHeader />

      <section className="blog-hero">
        <h1>Our Blog</h1>
        <p>Latest updates & cleaning tips</p>
      </section>

      <section className="blog-container">
        <div className="blog-grid">
          {blogs.map((blog, i) => (
            <div key={i} className="blog-card">
              <img src={blog.image} alt={blog.title} />
              <div className="blog-content">
                <span className="blog-date">{blog.date}</span>
                <h3>{blog.title}</h3>
                <p>{blog.description}</p>
                <button className="blog-read-btn">Read More</button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer></Footer>
    </>
  );
};

export default Blog;
