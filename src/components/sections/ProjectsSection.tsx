import SectionWrapper from "@/components/shared/SectionWrapper";
import ProjectCard from "@/components/shared/ProjectCard";

const projects = [
  {
    title: "Data Analysis for Allagash Brewing Company",
    description: "Optimized packaging strategies through sales trend analysis.",
    problem: "Inefficient packaging and inventory management leading to potential revenue loss and waste.",
    tools: ["Data Analysis", "Sales Trend Analysis", "Inventory Optimization"],
    outcome: "20% increased taproom revenue, identified 15% higher demand for seasonal to-go packs, reduced waste.",
    imageUrl: "https://picsum.photos/seed/allagash/400/250",
    imageHint: "brewery data",
    // liveLink: "#", // Placeholder
  },
  {
    title: "ML for Adverse Events after Cardiac Surgery",
    description: "Developed and validated models to predict complications post-cardiac surgery.",
    problem: "Timely prediction of critical complications like kidney failure to enable faster interventions.",
    tools: ["Machine Learning", "Medical Data Analysis", "Predictive Modeling", "Python"],
    outcome: "Improved prediction accuracy, outperformed national STS model, enabling better resource allocation for high-risk cases.",
    imageUrl: "https://picsum.photos/seed/cardiacml/400/250",
    imageHint: "medical technology",
    // paperLink: "#", // Placeholder for paper
  },
  {
    title: "World Happiness Analysis (2015-2019)",
    description: "Analyzed data from 155+ countries to identify key drivers of national happiness.",
    problem: "Understanding complex factors contributing to happiness disparities across nations.",
    tools: ["Data Analysis", "Statistical Modeling", "Python", "Plotly/Bokeh (implied for HTML report)"],
    outcome: "Identified GDP & social support as key to 73% of national happiness. Presented insights via interactive HTML report.",
    repoLink: "https://github.com/Venkatesh188", // Link to main GitHub, specific repo not provided
    imageUrl: "https://picsum.photos/seed/happiness/400/250",
    imageHint: "global data",
  },
  {
    title: "Pharmaceutical Demand Forecasting & Churn Reduction",
    description: "Developed a time-series forecasting model for a pharmaceutical client.",
    problem: "Inaccurate demand forecasting leading to stock issues and customer churn.",
    tools: ["Time-Series Forecasting", "Python", "Scikit-learn", "Pandas"],
    outcome: "Drove 15% revenue growth & 20% churn reduction. Ensured 98% medication availability for high-value customers.",
    imageUrl: "https://picsum.photos/seed/pharma/400/250",
    imageHint: "pharmaceutical supply chain",
  },
  {
    title: "Sports Talent Identification Using ML",
    description: "Built an ML model to identify promising sports talent from performance metrics.",
    problem: "Time-consuming and subjective traditional scouting methods.",
    tools: ["Machine Learning", "Performance Metrics Analysis", "Python", "Data Visualization"],
    outcome: "Reduced scouting time by 40% with an 84%-accurate model, enabling faster, data-driven, and fairer talent evaluation.",
    imageUrl: "https://picsum.photos/seed/sportstalent/400/250",
    imageHint: "sports analytics",
  },
];

export default function ProjectsSection() {
  return (
    <SectionWrapper id="projects" title="My Projects" subtitle="Showcasing Innovation & Expertise">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </SectionWrapper>
  );
}
