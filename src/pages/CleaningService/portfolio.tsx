import "./Portfolio.css";
import CleaningHeader from "../CleaningService/CleaningHeader";

const portfolioData = [
  {
    date: "23 OCT, 20",
    title: "Car Cleaning",
    author: "Terrance Tyler",
    description:
      "Project details: Rob's house Date: 24th March 2022 Author: Marilyn De Aragon Tags: Cleaning, Plumbing Value: $125 Farhan Rio Agent Manager Car Cleaning Outdoor Cleaning Furniture Cleaning Kitchen Cleaning Clean Water Pipe Door Cleaning Car Cleaning for Rob As a app web crawler expert, I help organizations adjust to the expanding significance [...]",
  },
  {
    date: "23 OCT, 20",
    title: "Dishes Cleaning",
    author: "Terrance Tyler",
    description:
      "Project details: Rob's house Date: 24th March 2022 Author: Marilyn De Aragon Tags: Cleaning, Plumbing Value: $125 Farhan Rio Agent Manager Dishes Cleaning Car Cleaning Outdoor Cleaning Furniture Cleaning Kitchen Cleaning [...]",
  },
  {
    date: "23 OCT, 20",
    title: "Outdoor Cleaning",
    author: "Terrance Tyler",
    description:
      "Project details: Rob's house Date: 24th March 2022 Author: Marilyn De Aragon Tags: Cleaning, Plumbing Value: $125 Outdoor Cleaning Car Cleaning Furniture Cleaning [...]",
  },
  {
    date: "23 OCT, 20",
    title: "Furniture Cleaning",
    author: "Terrance Tyler",
    description:
      "Project details: Rob's house Date: 24th March 2022 Author: Marilyn De Aragon Tags: Cleaning, Plumbing Value: $125 Furniture Cleaning Sofa Cleaning [...]",
  },
];

const Portfolio = () => {
  return (
    <>
      <CleaningHeader />

      {/* HERO */}
      <section className="portfolio-hero">
        <div className="portfolio-hero-content">
          <h1>Portfolio</h1>
          <p>
            Home <span>›</span> Portfolio
          </p>
        </div>
      </section>

      {/* LIST */}
      <section className="portfolio-section">
        <div className="portfolio-container">
          {portfolioData.map((item, index) => (
            <div key={index} className="portfolio-card">
              <div className="portfolio-date">
                <span>{item.date}</span>
              </div>

              <div className="portfolio-body">
                <div className="portfolio-meta">
                  <span className="portfolio-author">
                    👤 {item.author}
                  </span>
                </div>

                <h3 className="portfolio-title">{item.title}</h3>
                <p className="portfolio-desc">{item.description}</p>

                <div className="portfolio-actions">
                  <button className="portfolio-read">
                    Read more <span>+</span>
                  </button>
                  <span className="portfolio-share">🔗</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Portfolio;
