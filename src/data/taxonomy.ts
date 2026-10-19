import { CareerSpec, TargetRole } from '../types';

export const CAREER_TAXONOMY: Record<TargetRole, CareerSpec> = {
  'AI Engineer': {
    title: 'AI Engineer',
    tagline: 'Productionize generative AI, fine-tune models, and architect RAG vector pipelines',
    description: 'Bridges foundational machine learning research and enterprise software systems, deploying Large Language Models (LLMs), agentic workflows, and semantic search architectures into scalable cloud infrastructure.',
    coreSkills: ['Python', 'PyTorch', 'LangChain', 'Vector Databases (Chroma/Pinecone)', 'Transformers & HuggingFace', 'FastAPI'],
    secondarySkills: ['Docker', 'Kubernetes', 'Prompt Engineering & Evals', 'ONNX Runtime', 'Triton Inference Server', 'vLLM'],
    medianJuniorSalary: '$110,000 / ₹14,50,000 per annum',
    interviewFocus: [
      'Attention Mechanisms & Multi-Head Query-Key-Value Math',
      'Retrieval-Augmented Generation (RAG) Chunking & Re-ranking',
      'Token Throughput, TTFT, and Quantization (4-bit/8-bit QLoRA)',
      'Hallucination Mitigation and Agent Guardrails'
    ],
    curatedResources: [
      {
        title: 'Hugging Face NLP & Transformers Official Course',
        provider: 'Hugging Face',
        url: 'https://huggingface.co/learn/nlp-course',
        type: 'course',
        badge: 'Industry Standard'
      },
      {
        title: 'LangChain & LangGraph Conceptual Guide',
        provider: 'LangChain Docs',
        url: 'https://python.langchain.com/docs/get_started/introduction',
        type: 'doc',
        badge: 'Official Docs'
      },
      {
        title: 'Pinecone Vector Database Architecture & RAG Handbook',
        provider: 'Pinecone Learning Center',
        url: 'https://www.pinecone.io/learn',
        type: 'course',
        badge: 'Free Curriculum'
      },
      {
        title: 'FastAPI Production Async Tutorial',
        provider: 'Tiangolo FastAPI',
        url: 'https://fastapi.tiangolo.com/tutorial',
        type: 'doc',
        badge: 'Backend API'
      }
    ]
  },
  'Machine Learning Engineer': {
    title: 'Machine Learning Engineer',
    tagline: 'Design mathematical predictive models and deploy automated MLOps pipelines',
    description: 'Develops predictive, classification, and statistical models from raw enterprise data, establishing automated feature stores, continuous retraining pipelines, and low-latency inference services.',
    coreSkills: ['Python', 'Scikit-Learn', 'PyTorch / TensorFlow', 'Pandas & NumPy', 'MLflow / Weights & Biases', 'Docker'],
    secondarySkills: ['Kubeflow', 'C++', 'Distributed Training (DDP)', 'Feature Stores (Feast)', 'DVC (Data Version Control)', 'SQL'],
    medianJuniorSalary: '$102,000 / ₹12,80,000 per annum',
    interviewFocus: [
      'Mathematical Derivation of Gradient Descent & Backprop',
      'Bias-Variance Tradeoff, Regularization (L1/L2), and Overfitting',
      'Distributed Data Parallel (DDP) vs Model Parallelism',
      'Data Leakage Prevention in Time-Series and Feature Engineering'
    ],
    curatedResources: [
      {
        title: 'Stanford CS229: Machine Learning Course Materials',
        provider: 'Stanford University (Andrew Ng)',
        url: 'https://cs229.stanford.edu',
        type: 'course',
        badge: 'Academic Gold Standard'
      },
      {
        title: 'Made With ML: Production MLOps Course',
        provider: 'Goku Mohandas',
        url: 'https://madewithml.com',
        type: 'course',
        badge: 'Production MLOps'
      },
      {
        title: 'PyTorch Deep Learning Fundamentals',
        provider: 'Linux Foundation / PyTorch',
        url: 'https://pytorch.org/tutorials',
        type: 'doc',
        badge: 'Official Tutorials'
      },
      {
        title: 'Scikit-Learn User Guide & Algorithm Cheatsheet',
        provider: 'Scikit-Learn Org',
        url: 'https://scikit-learn.org/stable/user_guide.html',
        type: 'doc',
        badge: 'Reference Manual'
      }
    ]
  },
  'Data Scientist': {
    title: 'Data Scientist',
    tagline: 'Extract mathematical signals, run causal experiments, and lead data storytelling',
    description: 'Combines computational statistics, experimental design, and machine learning to test business hypotheses, quantify uncertainties, and deliver high-impact predictive insights to decision-makers.',
    coreSkills: ['Python', 'SQL (Advanced Window Functions)', 'Pandas & Polars', 'Hypothesis Testing & A/B Testing', 'Statistical Inference', 'Scikit-Learn'],
    secondarySkills: ['R', 'Tableau / PowerBI', 'Causal Inference', 'BigQuery / Snowflake', 'Bayesian Statistics', 'Git'],
    medianJuniorSalary: '$96,000 / ₹11,20,000 per annum',
    interviewFocus: [
      'p-value Interpretation, Type I/II Errors, and Sample Size Calculation',
      'A/B Test Design: Minimum Detectable Effect and Variance Reduction',
      'Multicollinearity Diagnostics (VIF) and Dimensionality Reduction (PCA)',
      'Business KPI Translation to Objective Functions'
    ],
    curatedResources: [
      {
        title: 'StatQuest with Josh Starmer: Statistics & Machine Learning',
        provider: 'StatQuest',
        url: 'https://statquest.org',
        type: 'course',
        badge: 'Visual Intuition'
      },
      {
        title: 'Kaggle Micro-Courses for Data Science',
        provider: 'Kaggle (Google)',
        url: 'https://www.kaggle.com/learn',
        type: 'practice',
        badge: 'Interactive Labs'
      },
      {
        title: 'PostgreSQL Advanced Data Analysis Guide',
        provider: 'PostgreSQL Org',
        url: 'https://www.postgresql.org/docs/current/tutorial-window.html',
        type: 'doc',
        badge: 'SQL Mastery'
      }
    ]
  },
  'Data Analyst': {
    title: 'Data Analyst',
    tagline: 'Transform raw datasets into actionable operational dashboards and executive insights',
    description: 'Ingests, sanitizes, and models complex operational datasets to compute core key performance indicators, building automated business intelligence dashboards and diagnostic reports.',
    coreSkills: ['SQL (Joins, CTEs, Aggregations)', 'Excel / Google Sheets (VBA, PowerQuery)', 'Tableau / PowerBI', 'Python Basics (Pandas)', 'Data Cleansing & ETL', 'Data Storytelling'],
    secondarySkills: ['dbt (data build tool)', 'Snowflake', 'Statistics & Distributions', 'Looker Studio', 'Git', 'Airflow Basics'],
    medianJuniorSalary: '$78,000 / ₹8,20,000 per annum',
    interviewFocus: [
      'Complex Window Functions (ROW_NUMBER, RANK, LAG/LEAD)',
      'Star Schema vs Snowflake Schema Data Modeling',
      'Handling Missing and Anomalous Records in Data Pipelines',
      'Dashboard UX Principles for Non-Technical Stakeholders'
    ],
    curatedResources: [
      {
        title: 'Mode Analytics: Interactive SQL Tutorial for Data Analysis',
        provider: 'Mode Analytics',
        url: 'https://mode.com/sql-tutorial',
        type: 'practice',
        badge: 'Interactive SQL'
      },
      {
        title: 'Microsoft Power BI Guided Learning Paths',
        provider: 'Microsoft Learn',
        url: 'https://learn.microsoft.com/power-bi/guided-learning',
        type: 'course',
        badge: 'Certification Track'
      },
      {
        title: 'Storytelling with Data: A Data Visualization Guide',
        provider: 'Cole Nussbaumer Knaflic',
        url: 'https://www.storytellingwithdata.com',
        type: 'doc',
        badge: 'Visualization Theory'
      }
    ]
  },
  'Software Development Engineer': {
    title: 'Software Development Engineer',
    tagline: 'Build high-concurrency microservices, robust backends, and fault-tolerant architectures',
    description: 'Designs and builds dependable distributed systems, low-latency APIs, and scalable backend infrastructure with rigorous algorithmic complexity, concurrency management, and clean object-oriented architecture.',
    coreSkills: ['Data Structures & Algorithms', 'Java / C++ / Go', 'System Design (Caching, Queuing)', 'Relational Databases & SQL', 'Linux & Shell Scripting', 'Git & CI/CD'],
    secondarySkills: ['Redis Caching', 'Apache Kafka / RabbitMQ', 'Docker & Containerization', 'gRPC & REST APIs', 'Spring Boot / Gin', 'Unit & Integration Testing'],
    medianJuniorSalary: '$108,000 / ₹13,50,000 per annum',
    interviewFocus: [
      'Asymptotic Time & Space Complexity Proofs (LeetCode Hard/Medium)',
      'Database Indexing Internals (B-Trees, LSM-Trees, Hash Indexes)',
      'Concurrency, Race Conditions, Mutexes, and Thread Pools',
      'High-Level System Design (Rate Limiters, URL Shorteners, Sharding)'
    ],
    curatedResources: [
      {
        title: 'NeetCode 150: Systematic DSA Curriculum',
        provider: 'NeetCode',
        url: 'https://neetcode.io/practice',
        type: 'practice',
        badge: 'Coding Interview'
      },
      {
        title: 'Designing Data-Intensive Applications (DDIA Notes)',
        provider: 'Martin Kleppmann / O\'Reilly',
        url: 'https://dataintensive.net',
        type: 'doc',
        badge: 'System Design Bible'
      },
      {
        title: 'Refactoring Guru: Design Patterns & Clean Code',
        provider: 'Refactoring Guru',
        url: 'https://refactoring.guru/design-patterns',
        type: 'doc',
        badge: 'OOP Architecture'
      }
    ]
  },
  'Web Developer': {
    title: 'Web Developer',
    tagline: 'Engineer responsive modern frontends, performant full-stack apps, and clean APIs',
    description: 'Develops user-facing web applications, responsive component design systems, stateful client architectures, and server-side rendered platforms with modern TypeScript and modern framework toolchains.',
    coreSkills: ['TypeScript', 'React / Next.js', 'Tailwind CSS', 'Node.js / Express', 'REST & GraphQL APIs', 'PostgreSQL / Prisma ORM'],
    secondarySkills: ['WebSockets', 'Jest / Vitest / Playwright', 'Cloudflare Workers', 'State Management (Zustand/Redux)', 'Web Vitals Optimization', 'OAuth & Security'],
    medianJuniorSalary: '$88,000 / ₹9,80,000 per annum',
    interviewFocus: [
      'React Reconciliation, Virtual DOM, and Fiber Tree Scheduling',
      'Browser Rendering Pipeline (DOM, CSSOM, Layout, Paint, Composite)',
      'Web Security Protocols (CORS, CSP, XSS, CSRF, SameSite Cookies)',
      'SSR, SSG, ISR, and Hydration Mechanics in Next.js'
    ],
    curatedResources: [
      {
        title: 'The Odin Project: Full-Stack JavaScript Curriculum',
        provider: 'The Odin Project Open Source',
        url: 'https://www.theodinproject.com',
        type: 'course',
        badge: 'Comprehensive Track'
      },
      {
        title: 'Next.js Official Documentation & Interactive Learn',
        provider: 'Vercel',
        url: 'https://nextjs.org/learn',
        type: 'practice',
        badge: 'App Router'
      },
      {
        title: 'Web.dev by Google: Core Web Vitals & Web Standards',
        provider: 'Google Chrome Team',
        url: 'https://web.dev',
        type: 'doc',
        badge: 'Google Standards'
      }
    ]
  },
  'Cybersecurity Analyst': {
    title: 'Cybersecurity Analyst',
    tagline: 'Audit vulnerabilities, configure SIEM defenses, and protect critical cloud infrastructure',
    description: 'Monitors corporate networks, conducts vulnerability assessments, investigates security incident telemetry, and fortifies systems against modern attack vectors following zero-trust principles.',
    coreSkills: ['Network Security & Protocols (TCP/IP, DNS, TLS)', 'Linux Administration & Hardening', 'SIEM & Log Analysis (Splunk/ELK)', 'Python & Bash Security Scripting', 'Wireshark Packet Analysis', 'OWASP Top 10 Vulnerabilities'],
    secondarySkills: ['Metasploit & Burp Suite', 'Cryptography Fundamentals', 'Incident Response Playbooks', 'IAM & Active Directory', 'Cloud Security (AWS IAM)', 'NIST / ISO 27001'],
    medianJuniorSalary: '$92,000 / ₹10,80,000 per annum',
    interviewFocus: [
      'TCP 3-Way Handshake, SYN Flood Attacks, and Firewall Rules',
      'SQL Injection and Cross-Site Scripting Exploits & Sanitization',
      'Public Key Infrastructure (PKI), TLS 1.3 Handshake, and Digital Signatures',
      'Live Incident Triage and Memory Forensics Workflow'
    ],
    curatedResources: [
      {
        title: 'PortSwigger Web Security Academy',
        provider: 'PortSwigger (Burp Suite)',
        url: 'https://portswigger.net/web-security',
        type: 'practice',
        badge: 'Hands-on Labs'
      },
      {
        title: 'TryHackMe: Pre-Security & SOC Level 1 Pathways',
        provider: 'TryHackMe',
        url: 'https://tryhackme.com',
        type: 'course',
        badge: 'Gamified Security'
      },
      {
        title: 'MITRE ATT&CK Framework Enterprise Matrix',
        provider: 'MITRE Corporation',
        url: 'https://attack.mitre.org',
        type: 'doc',
        badge: 'Threat Taxonomy'
      }
    ]
  },
  'Cloud Engineer': {
    title: 'Cloud Engineer',
    tagline: 'Automate Infrastructure as Code, administer Kubernetes clusters, and scale CI/CD',
    description: 'Provisions and optimizes resilient multi-region cloud environments, codifies infrastructure with Terraform, orchestrates microservices via Kubernetes, and establishes continuous deployment pipelines.',
    coreSkills: ['AWS / GCP / Azure Core Services', 'Terraform / Infrastructure as Code', 'Docker & Kubernetes (K8s)', 'CI/CD Automation (GitHub Actions)', 'Linux System Internals & Bash', 'Cloud Networking (VPC, Subnets, DNS, CIDR)'],
    secondarySkills: ['Prometheus & Grafana Observability', 'Helm Package Manager', 'ArgoCD (GitOps)', 'Python / Go Automation', 'Serverless (Lambda/Cloud Functions)', 'Cost Optimization (FinOps)'],
    medianJuniorSalary: '$100,000 / ₹11,80,000 per annum',
    interviewFocus: [
      'Terraform State Locking, Drift Detection, and Module Composition',
      'Kubernetes Pod Lifecycle, Scheduling, Services, and Ingress Controllers',
      'VPC Peering, NAT Gateways, and CIDR Subnet Division Math',
      'Zero-Downtime Deployment Strategies (Blue-Green, Canary, Rolling)'
    ],
    curatedResources: [
      {
        title: 'AWS Skill Builder: Cloud Foundations & Solutions Architecture',
        provider: 'Amazon Web Services',
        url: 'https://explore.skillbuilder.aws',
        type: 'course',
        badge: 'Official AWS'
      },
      {
        title: 'Kubernetes The Hard Way by Kelsey Hightower',
        provider: 'GitHub Open Source',
        url: 'https://github.com/kelseyhightower/kubernetes-the-hard-way',
        type: 'practice',
        badge: 'Cluster Deep Dive'
      },
      {
        title: 'HashiCorp Terraform Official Tutorials',
        provider: 'HashiCorp Developer',
        url: 'https://developer.hashicorp.com/terraform/tutorials',
        type: 'doc',
        badge: 'IaC Mastery'
      }
    ]
  }
};
