/**
 * ============================================================
 *  EDIT YOUR SITE CONTENT HERE
 * ============================================================
 * This is the only file you need to touch to update your
 * portfolio's text, skills, experience, and projects.
 * Save the file and refresh the page — no build step needed.
 * ============================================================
 */

const SITE_CONTENT = {

  // ---------- Site meta ----------
  meta: {
    title: "Vishal Sharma — Software Engineer",
    description: "Portfolio of Vishal Sharma, Senior AI Engineer specializing in Agentic AI and Computer Vision.",
    favicon: "assets/img/v_logo.png",
  },

  // ---------- Hero section ----------
  hero: {
    name: "Vishal Sharma",
    roles: ["Senior AI Engineer", "Agentic AI Architect"],
    tagline: "Building enterprise-grade Agentic AI and Computer Vision systems that solve real-world problems.",
    backgroundImage: "assets/img/bg.jpeg",
    resumeFile: "Resume_Agentic_AI.pdf",
    socialLinks: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/vishal-sharma-84b322216", icon: "linkedin" },
      { label: "GitHub", url: "https://github.com/vis-sha", icon: "github" },
      { label: "Email", url: "mailto:visinfo8@gmail.com", icon: "email" },
    ],
  },

  // ---------- Agent pipeline (drives the hero orchestration diagram) ----------
  pipeline: {
    supervisor: "Supervisor Agent",
    agents: [
      { id: "about", label: "Profile Agent", task: "Resolve identity & background", targetId: "about" },
      { id: "skills", label: "Capability Agent", task: "Enumerate skill graph", targetId: "skills" },
      { id: "resume", label: "History Agent", task: "Retrieve experience & education", targetId: "resume" },
      { id: "projects", label: "Delivery Agent", task: "Fetch shipped projects", targetId: "projects" },
      { id: "contact", label: "Handoff Agent", task: "Open contact channel", targetId: "contact" },
    ],
  },

  // ---------- Nav (order controls both top-bar links and section order) ----------
  nav: [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "resume", label: "Resume" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ],

  // ---------- About section ----------
  about: {
    heading: "Senior AI Engineer",
    subheading: "Coforge Limited, Pune",
    profileImage: "assets/img/profile.jpeg",
    paragraphs: [
      "I am a Software Engineer specializing in enterprise-grade Agentic AI systems, currently designing multi-agent architectures using Supervisor LLM orchestration patterns at Coforge Limited in Pune. I decompose complex workflows into specialized callable agents with defined input/output contracts, error recovery strategies, and stateless tool interfaces.",
      "My background spans Gen AI and Computer Vision — from building secure, multi-agent pipelines for financial and resource intelligence use cases, to leading Computer Vision teams at Optisol Business Solutions delivering object detection, segmentation, and classification systems for agriculture, construction, and manufacturing.",
      "I combine LLM-driven decision making with deterministic rule layers, ML forecasting (LightGBM, XGBoost, SHAP explainability), and rigorous data security controls to build AI solutions that are reliable and auditable in production. Let's connect to explore how we can leverage Agentic AI and Computer Vision to transform industries!",
    ],
  },

  // ---------- Skills section ----------
  skills: {
    groups: [
      {
        title: "Agentic AI & Gen AI",
        items: ["Supervisor LLM Orchestration", "Multi-Agent Pipelines", "Prompt Design", "Agent Tool Specification", "Cross-Agent Handoff Contracts"],
      },
      {
        title: "Machine Learning",
        items: ["Predictive Modelling", "Probability & Statistics", "Clustering", "Quantile Regression", "SHAP Explainability"],
      },
      {
        title: "Deep Learning & NLP",
        items: ["CNN", "RNN", "Encoder-Decoder Models", "Natural Language Processing"],
      },
      {
        title: "Computer Vision",
        items: ["Object Detection", "Semantic Segmentation", "Classification", "YOLOv5/v8", "SSD", "Detectron2"],
      },
      {
        title: "Languages & Frameworks",
        items: ["Python", "TensorFlow", "PyTorch", "Keras", "OpenCV", "LightGBM", "XGBoost", "Pandas", "NumPy", "SciPy", "NLTK", "Dash", "Matplotlib"],
      },
      {
        title: "Deployment & Tools",
        items: ["AWS", "SageMaker", "Docker", "Kubernetes", "OpenVINO", "Terraform", "GitHub", "MySQL"],
      },
    ],
    certifications: [
      "Applied AI Course by Srikant Verma",
    ],
  },

  // ---------- Resume section ----------
  resume: {
    education: [
      { degree: "Bachelor of Technology, Computer Science (CGPA: 8.4)", period: "2017 – 2021", place: "Jamia Hamdard, New Delhi, India" },
    ],
    experience: [
      {
        role: "Senior AI Engineer",
        period: "Present",
        place: "Coforge Limited, Pune",
        points: [
          "Designing enterprise-grade Agentic AI systems using Supervisor LLM orchestration, decomposing workflows into specialized callable agents with defined input/output contracts and error recovery strategies.",
          "Building secure, multi-agent pipelines for financial and resource intelligence use cases, integrating LLM-driven decision making with deterministic rule layers for reliability and auditability.",
          "Developing Gen AI applications end-to-end — LLM integration, prompt design, agent tool specification, and cross-agent handoff contract design.",
          "Architecting ML forecasting systems combining LightGBM and XGBoost with quantile regression and SHAP-based explainability, orchestrated within agentic pipelines.",
          "Implementing data security controls including IT-governed access management and role-based deployment across the AI workflow.",
        ],
      },
      {
        role: "Senior Machine Learning Engineer",
        period: "2022 – 2025",
        place: "Optisol Business Solutions, Coimbatore",
        points: [
          "Led the Computer Vision and ML team, building scalable AI solutions for industrial use cases in agriculture, construction, and manufacturing.",
          "Developed and deployed models for object detection, segmentation, and classification using YOLOv5/v8, SSD, Detectron2, and custom CNNs.",
          "Integrated AWS ML services — SageMaker, Lambda, S3, and Step Functions — to streamline the ML lifecycle from preprocessing to deployment.",
          "Implemented CI/CD pipelines for model training and deployment using SageMaker Pipelines and CodePipeline.",
          "Mentored junior engineers and coordinated with clients for technical discussions and solution validation.",
        ],
      },
      {
        role: "Machine Learning Engineer",
        period: "2021 – 2022",
        place: "Optisol Business Solutions, Coimbatore",
        points: [
          "Built and deployed Full Stack ML solutions using TensorFlow, PyTorch, OpenCV, and CUDA for real-time object detection, segmentation, and measurement systems.",
          "Designed vision-based automation for industrial clients with a focus on edge deployment using Docker and lightweight model architectures.",
          "Developed REST APIs using Flask to integrate ML models into production environments.",
          "Promoted to Team Lead for delivering successful POCs and managing end-to-end project workflows.",
        ],
      },
    ],
  },

  // ---------- Projects section ----------
  projects: [
    {
      title: "Project Resource Intelligence Platform",
      description: [
        "An end-to-end ML-based cost forecasting and budget risk prediction system built for project resource management, operating exclusively on capital cost data. The system predicts resource cost utilization for each remaining fiscal month and proactively flags budget risk, giving project managers 2–3 months of lead time for corrective action.",
        "Designed and implemented a 5-agent agentic pipeline orchestrated by a Supervisor LLM, where each agent is exposed as a callable tool with defined input/output contracts, error codes, and recovery strategies — including an Ingestion Agent, a Feature Engineering Agent (25 features across 5 groups with a 3-lag rule engine to prevent data leakage), and an ML Agent combining a quantile regression ensemble (LightGBM + XGBoost + Linear Regression) with a gradient boosted budget-risk classifier and SHAP explainability.",
        "Packaged as a secure, installable enterprise application accessible only to authorised managers with IT-governed permissions, protecting sensitive financial and resource data end-to-end.",
      ],
      technologies: ["Python", "LightGBM", "XGBoost", "scikit-learn", "SHAP", "pandas", "FastAPI", "MLflow", "Apache Airflow", "Power BI"],
      achievements: [
        "Designed cross-agent manifest-based handoff contracts enabling stateless, independently retryable, and testable tool invocations across the pipeline.",
        "Delivered 2–3 months of lead time for budget risk corrective action via automated forecasting.",
        "Packaged the entire system as a secure enterprise application restricted to authorised managers only.",
      ],
    },
    {
      title: "Utility Pole Project",
      role: "Project Lead",
      link: "assets/docs/Vishal_Sharma_Utility_Pole_Project.pdf",
      linkLabel: "View Presentation",
      description: [
        "Spearheaded a team of 12 engineers in delivering a comprehensive Utility Pole Inspection system using instance segmentation techniques, leveraging MMDetection and OpenCV to identify and analyze pole components in images.",
        "Designed a custom 3D pole dataset and a robust JSON parser for structured data handling. Key features included automated pole height estimation, super-resolution image enhancement, and synthetic blocky node generation for training augmentation.",
        "Engineered scalable Python modules using OOP for maintainability, while managing client communication and delivery milestones.",
      ],
      technologies: ["MMDetection", "OpenCV", "Python", "JSON"],
      achievements: [
        "Delivered a high-precision pole detection system aligned with client requirements and deadlines.",
        "Improved team productivity through structured planning, code reviews, and agile collaboration.",
        "Introduced techniques that enhanced the accuracy and speed of instance segmentation and feature extraction.",
      ],
    },
    {
      title: "Cogo Insurance — Driver Behavior Scoring",
      description: [
        "Developed a Usage-Based Insurance (UBI) system to evaluate driving behavior and determine insurance premiums, working with telematics data from trucks and heavy vehicles.",
        "Engineered features from raw data including hard braking, acceleration, and cornering, with weather API context factored in for hazardous conditions. ML models predicted accident probability and detected anomalies.",
        "Automated data pipelines using AWS Glue, stored driver scores in AWS RDS, and exposed a FastAPI service for quick score lookups.",
      ],
      technologies: ["AWS Glue", "AWS Databricks", "AWS RDS", "AWS S3", "FastAPI", "WeatherAPI"],
      achievements: [
        "Built a driver scoring system incorporating both behavioral and environmental factors.",
        "Deployed accident prediction models using boosting-based techniques.",
        "Integrated anomaly detection to flag abnormal vehicle behavior.",
        "Processed data for over 20,000 drivers daily via scalable AWS pipelines.",
        "Enabled real-time score retrieval via a FastAPI endpoint connected to AWS RDS.",
      ],
    },
  ],

  // ---------- Contact section ----------
  contact: {
    address: "Pune, India",
    phone: "+91 9634669943",
    email: "visinfo8@gmail.com",
  },

  // ---------- Footer ----------
  footer: {
    name: "Vishal Sharma",
    tagline: "You can connect with me through...",
  },
};
