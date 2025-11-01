export const interviewQuestions = {
  developer: [
    {
      id: 0,
      question: "Tell them about yourself",
      answer:
        "I'm a Full-Stack Developer with a strong front-end focus. I have over five years of experience in React and Next.js, building high-performance applications with a keen eye for UI/UX. My background in design helps me create intuitive and visually polished interfaces. At DigitalVertex, I work on online applications, optimizing performance and usability. I enjoy solving complex problems and building seamless user experiences. I'm always looking to improve my skills and take on new challenges that push me further as a developer.",
    },
    {
      id: 1,
      question: "What is your recent achievement?",
      answer:
        "Recently, I built an online store using React and Next.js, managing global state with Context. I focused on performance optimization, improving load times with server-side rendering and efficient state management. As a result, the site's loading time improved by 40%, enhancing user experience and conversion rates.",
    },
    {
      id: 2,
      question: "Why did you leave your last job?",
      answer:
        "I was laid off due to company downsizing, with several team members affected. Additionally, I felt there were no more growth opportunities, and I wanted to take on bigger challenges.",
    },
    {
      id: 3,
      question: "What is your weakness?",
      answer:
        "I prefer a quiet environment because my work requires deep focus and attention to detail. Also, I tend to solve problems on my own, but I'm learning to ask for feedback earlier to ensure alignment and save time. I've been actively improving by engaging in more team discussions and leveraging peer reviews.",
    },
    {
      id: 4,
      question: "Where do you see yourself in 5 years?",
      answer:
        "In five years, I see myself growing as a developer, taking on more complex projects, and deepening my expertise in front-end and full-stack development. I want to keep improving my skills, stay updated with new technologies, and contribute to building high-quality applications.",
    },
    {
      id: 5,
      question: "What are your salary expectations?",
      answer:
        "I'm open to discussing a fair salary based on the role, my experience, and industry standards. I'd love to learn more about the responsibilities before we align on a number.",
    },
    {
      id: 6,
      question:
        "Describe a time when you had to explain technical issues to a non-technical person",
      answer:
        "A client once asked why their website was slow. I explained it using an elevator analogy—too many people trying to get in at once slows it down. I told them optimizing images and reducing scripts would help the 'elevator' move faster. This simple explanation helped them understand the issue and the solution.",
    },
    {
      id: 7,
      question: "What strategies do you use to manage stress?",
      answer:
        "I focus on solving the problem instead of stressing about it. I plan my tasks so I know what to prioritize first. I also stay active to keep my mind fresh. Managing my time well helps me stay calm and handle challenges better. For example, in a recent project with a tight deadline, I broke down tasks, collaborated with my team efficiently, and we successfully delivered ahead of schedule.",
    },
  ],
  devops: [
    {
      id: 0,
      question: "Tell them about yourself",
      answer:
        "I'm a DevOps Engineer with extensive experience in cloud infrastructure, CI/CD pipelines, and automation. I specialize in AWS, Docker, Kubernetes, and Terraform. I'm passionate about streamlining deployment processes, improving system reliability, and implementing infrastructure as code. I've successfully reduced deployment times by 60% and improved system uptime to 99.9% in my previous roles.",
    },
    {
      id: 1,
      question: "What is your recent achievement?",
      answer:
        "I recently implemented a full CI/CD pipeline using Jenkins and GitLab CI, integrating automated testing and deployment to Kubernetes clusters. This reduced our deployment time from hours to minutes and eliminated manual errors. The pipeline handles over 50 deployments per day with zero downtime.",
    },
    {
      id: 2,
      question: "Explain infrastructure as code and why it's important",
      answer:
        "Infrastructure as Code (IaC) is managing and provisioning infrastructure through code rather than manual processes. I use tools like Terraform and Ansible to define infrastructure in version-controlled files. This ensures consistency across environments, enables quick disaster recovery, makes infrastructure reproducible, and allows teams to collaborate effectively using Git workflows.",
    },
    {
      id: 3,
      question: "How do you handle system failures in production?",
      answer:
        "I follow incident response protocols: first, I acknowledge the issue and communicate with stakeholders. Then I assess the impact, isolate the problem using monitoring tools like Prometheus and Grafana, implement a fix or rollback, and document the incident. Post-mortem analysis helps prevent recurrence. I also maintain runbooks for common issues to enable quick resolution.",
    },
    {
      id: 4,
      question: "What's your experience with container orchestration?",
      answer:
        "I have extensive experience with Kubernetes, managing production clusters with hundreds of pods. I've implemented auto-scaling policies, set up monitoring with Prometheus, managed secrets with Vault, and optimized resource allocation. I also work with Helm for package management and have experience with service mesh technologies like Istio for microservices communication.",
    },
    {
      id: 5,
      question: "How do you ensure security in DevOps practices?",
      answer:
        "Security is integrated throughout the pipeline (DevSecOps). I implement security scanning in CI/CD, use tools like SonarQube for code analysis, Trivy for container scanning, and enforce least-privilege access with IAM policies. I automate security patching, use secrets management tools, implement network policies in Kubernetes, and conduct regular security audits.",
    },
  ],
  uiux: [
    {
      id: 0,
      question: "Tell them about yourself",
      answer:
        "I'm a UI/UX Designer with 5+ years of experience creating user-centered digital experiences. I specialize in user research, wireframing, prototyping, and visual design. I'm proficient in Figma, Adobe XD, and Sketch, and I understand front-end development which helps me collaborate effectively with developers. My designs have improved user engagement by 45% and reduced bounce rates significantly.",
    },
    {
      id: 1,
      question: "What is your design process?",
      answer:
        "My process starts with understanding user needs through research and interviews. I create user personas and journey maps, then move to wireframing low-fidelity concepts. After validating ideas with stakeholders, I create high-fidelity mockups and interactive prototypes. I conduct usability testing, iterate based on feedback, and work closely with developers during implementation to ensure design integrity.",
    },
    {
      id: 2,
      question: "How do you handle conflicting feedback from stakeholders?",
      answer:
        "I facilitate discussions to understand the root concerns behind each viewpoint. I present data from user research and usability testing to support decisions. If conflicts persist, I create multiple design variations and conduct A/B testing or user testing to let data guide the decision. The goal is always to align stakeholder business objectives with user needs.",
    },
    {
      id: 3,
      question: "Explain your approach to accessibility in design",
      answer:
        "Accessibility is fundamental, not an afterthought. I follow WCAG 2.1 guidelines, ensuring proper color contrast ratios (4.5:1 minimum), keyboard navigation support, screen reader compatibility, and descriptive alt text for images. I design for various disabilities including visual, auditory, motor, and cognitive impairments. I use tools like Stark and axe DevTools to validate accessibility compliance.",
    },
    {
      id: 4,
      question: "How do you measure design success?",
      answer:
        "I define success metrics before starting a project: task completion rates, time on task, error rates, user satisfaction scores (NPS/CSAT), and business metrics like conversion rates or engagement. I use analytics tools like Google Analytics and Hotjar for quantitative data, and conduct user interviews for qualitative insights. Regular usability testing validates design decisions throughout the process.",
    },
    {
      id: 5,
      question: "Describe a challenging design problem you solved",
      answer:
        "I redesigned a complex dashboard that users found overwhelming. Through research, I discovered users only needed 20% of features regularly. I reorganized the interface using progressive disclosure, created customizable widgets, and implemented a clear visual hierarchy. Post-launch, user satisfaction increased by 60%, task completion time decreased by 40%, and support tickets dropped by 35%.",
    },
  ],
  ml: [
    {
      id: 0,
      question: "Tell them about yourself",
      answer:
        "I'm a Machine Learning Engineer with expertise in developing and deploying ML models at scale. I specialize in deep learning, NLP, and computer vision using frameworks like TensorFlow, PyTorch, and scikit-learn. I have experience with the full ML lifecycle: data collection, feature engineering, model training, evaluation, and production deployment. I've built models that improved prediction accuracy by 35% and reduced processing time by 50%.",
    },
    {
      id: 1,
      question: "Explain the bias-variance tradeoff",
      answer:
        "The bias-variance tradeoff describes the balance between a model's ability to fit training data and generalize to new data. High bias means the model is too simple and underfits (high training error). High variance means the model is too complex and overfits (low training error but high test error). The goal is finding the sweet spot through techniques like regularization, cross-validation, and ensemble methods.",
    },
    {
      id: 2,
      question: "How do you handle imbalanced datasets?",
      answer:
        "I use several techniques depending on the problem: resampling methods (SMOTE for oversampling minority class, random undersampling for majority class), adjusting class weights in the loss function, using ensemble methods like balanced random forests, and choosing appropriate evaluation metrics (F1-score, precision-recall curves, ROC-AUC) instead of accuracy. I also collect more minority class data when possible.",
    },
    {
      id: 3,
      question: "What's your experience with model deployment?",
      answer:
        "I deploy models using Docker containers, Flask/FastAPI for REST APIs, and cloud platforms like AWS SageMaker or GCP AI Platform. I implement monitoring for model performance, data drift, and latency. I use MLflow for experiment tracking and model versioning, set up CI/CD pipelines for automated retraining, and implement A/B testing for model comparison in production.",
    },
    {
      id: 4,
      question: "Explain regularization and when to use it",
      answer:
        "Regularization prevents overfitting by adding a penalty term to the loss function. L1 regularization (Lasso) promotes sparsity and feature selection by shrinking some coefficients to zero. L2 regularization (Ridge) shrinks coefficients but keeps all features. Elastic Net combines both. I use regularization when I have high-dimensional data, suspect overfitting, or want feature selection. The regularization strength is tuned using cross-validation.",
    },
    {
      id: 5,
      question: "How do you evaluate model performance?",
      answer:
        "I use multiple metrics depending on the problem: classification (accuracy, precision, recall, F1-score, ROC-AUC), regression (MAE, RMSE, R²), and custom business metrics. I always use cross-validation to ensure robustness. For production models, I monitor performance over time, track prediction distribution shifts, and set up alerts for degradation. I also conduct error analysis to understand failure modes and improve the model.",
    },
  ],
};
