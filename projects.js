// Single source of truth for project facts, shared by the 3D world (index.html) and recruiter.html.
// Every number here is verified against the project's own code, manifests or benchmark output.
const GH = "https://github.com/Nalam-Karthik/";
const PROJECTS = [
  {
    id: "relay", title: "Relay — Production LLM Gateway", featured: true,
    date: "Nov 2026", cats: ["GenAI", "Backend", "Distributed"],
    tagline: "OpenAI-compatible gateway that adds auth, budgets, rate limits, PII redaction, semantic caching and failover in front of any LLM provider.",
    stack: ["Python", "FastAPI", "SSE", "SQLite", "Prometheus", "Docker", "PyTest", "LLM APIs"],
    bullets: [
      "Drop-in OpenAI-compatible API: any OpenAI SDK can point at it unchanged; routes to Anthropic, OpenAI, vLLM/Ollama or mock providers.",
      "Per-tenant model allow-lists, monthly budgets (402) and token-bucket rate limits (429 + Retry-After).",
      "PII redaction runs before any prompt leaves the network; exact and embedding-based semantic response cache.",
      "Router with jittered exponential retries, a fallback chain and per-provider circuit breakers; SSE streaming fails over before the first token.",
      "SQLite usage ledger, cost reports and Prometheus metrics; every response carries x-relay-provider / -cache / -attempts headers.",
    ],
    flow: ["Auth", "Allow-list", "Budget", "Rate limit", "PII redact", "Cache", "Router + breakers", "Ledger"],
    metrics: [["38", "tests, < 1 s"], ["4", "provider adapters"], ["2", "cache tiers"]],
    demo: "p-relay",
    repo: GH + "relay",
  },
  {
    id: "ledgerly", title: "Ledgerly — Double-Entry Payments API", featured: true,
    date: "Nov 2026", cats: ["Backend", "Distributed"],
    tagline: "Wallet & payments API with idempotent money movement, a transactional outbox to Kafka and HMAC-signed webhooks.",
    stack: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy", "Alembic", "Redis", "Kafka", "Prometheus", "Grafana", "Docker", "PyTest", "JWT"],
    bullets: [
      "Double-entry posting engine: every transaction's legs sum to zero, balances always equal the sum of entries, and a DB CHECK prevents overdrafts. A reconcile job re-checks all of it.",
      "Deadlock-free concurrency: SELECT … FOR UPDATE in ascending account-id order, with the balance check made under the lock, so concurrent withdrawals can't double-spend.",
      "Idempotency-Key support on money-moving endpoints: a replayed request returns the stored response, and a key reused with a different body is rejected.",
      "Transactional outbox → relay worker → Redpanda/Kafka; webhook dispatcher commits offsets only after terminal delivery, retries with backoff + jitter, and sends failures to a DLQ.",
      "JWT auth with Argon2 hashing, Redis token-bucket rate limiting, request-ID structured logs, Prometheus metrics and a provisioned Grafana dashboard.",
    ],
    flow: ["API", "Postgres txn + outbox row", "Outbox relay", "Kafka", "Webhook dispatcher", "Signed POST / DLQ"],
    metrics: [["31", "tests incl. concurrency"], ["7", "Compose services"], ["0", "double-spends under race"]],
    demo: "p-ledger",
  },
  {
    id: "recsys", title: "Real-Time Two-Stage Recommender", featured: true,
    date: "Nov 2026", cats: ["ML", "Backend"],
    tagline: "PyTorch two-tower retrieval + FAISS HNSW + LightGBM re-ranker, served by FastAPI with a Redis feature store and live event stream.",
    stack: ["Python", "PyTorch", "FAISS", "LightGBM", "FastAPI", "Redis", "Prometheus", "Docker", "PyTest", "Feature Engineering"],
    bullets: [
      "Two-tower model (in-batch softmax, temperature 0.05, user-ID dropout for cold start) trained in 15 s on MovieLens; item embeddings indexed with FAISS HNSW.",
      "LightGBM re-ranker over 200 candidates, using 11 features (retrieval rank, recency similarity, genre affinity, popularity windows…).",
      "Two-tower + ranker gets 2.5× the popularity baseline's Recall@10 (0.089 vs 0.036) and 2× its NDCG@10.",
      "Sub-millisecond inference: 0.23 ms retrieval + 0.66 ms re-rank per user; ANN keeps 96% recall vs exact search.",
      "Redis Streams consumer group (2 replicas) updates user histories in real time; versioned model artifacts with a manifest; Prometheus per-stage latency histograms; GitHub Actions CI.",
    ],
    flow: ["Event", "Redis Stream", "Feature store", "Two-tower", "FAISS HNSW", "LightGBM rank", "Top-K"],
    metrics: [["0.089", "Recall@10"], ["0.096", "NDCG@10"], ["< 1 ms", "per-user inference"], ["15", "tests"]],
    demo: "p-recsys",
  },
  {
    id: "graphrag", title: "Autonomous Multi-Agent GraphRAG Engine", date: "Jul 2026", cats: ["GenAI", "Backend"],
    tagline: "A 5-agent LangGraph pipeline that turns PDFs into a Neo4j knowledge graph and answers multi-hop questions with cited answers.",
    stack: ["Python", "LangGraph", "Neo4j", "ChromaDB", "FastAPI", "Streamlit", "Gemini API", "NLP", "Docker", "RAG"],
    bullets: [
      "Triage, ingestion, knowledge-architect, synthesis and master-QA agents orchestrated as a LangGraph state machine.",
      "Language detection, conditional neural machine translation, classification and sentiment on every document.",
      "An NER-driven agent writes entities and relations to Neo4j via Cypher, building a live knowledge graph.",
      "Hybrid retrieval (ChromaDB vectors + Neo4j traversals); every citation is tagged source: vector or source: graph.",
      "Streamlit dashboard with upload, document library, QA chat, interactive graph viewer and per-agent execution timeline.",
    ],
    flow: ["PDF", "Triage agent", "NER → Neo4j", "Chunks → ChromaDB", "Hybrid retrieve", "Cited answer"],
    repo: GH + "autonomous-multi-agent-graphrag",
  },
  {
    id: "autoprd", title: "autoPRD — Requirements-to-Test Generator", date: "Oct 2026", cats: ["GenAI", "Backend"],
    tagline: "Parses PRDs into testable requirements, reads your code's AST, and has an LLM write and then judge PyTest suites.",
    stack: ["Python", "FastAPI", "Pydantic", "SQLite", "PyTest", "LLM APIs", "Docker"],
    bullets: [
      "FastAPI service + drag-and-drop UI that parses PDF/Markdown PRDs into structured, JSON-schema-validated requirements.",
      "Python AST analysis extracts function signatures and structure, so generated tests target real code.",
      "An LLM-judge checks the generated tests against acceptance criteria and reports coverage gaps before the suite is accepted.",
      "Every parsed document is stored in SQLite for review; Dockerfile + Compose stack.",
    ],
    flow: ["PRD", "Parser", "AST context", "Prompt engine", "LLM tests", "LLM judge"],
    repo: GH + "autoPRD",
  },
  {
    id: "fraud", title: "Real-Time Distributed Fraud & Risk Engine", date: "Oct 2026", cats: ["ML", "Backend", "Distributed"],
    tagline: "Async risk scoring with gradient boosting, SHAP explanations and a Redis-decoupled forensic audit worker.",
    stack: ["Python", "FastAPI", "Scikit-Learn", "SHAP", "Redis", "PostgreSQL", "Docker", "PyTest", "Feature Engineering"],
    bullets: [
      "HistGradientBoostingClassifier on imbalanced transaction data, with velocity, IP and device-trust features and cost-sensitive thresholds.",
      "Edge API scores in real time and hands events to Redis; a separate worker daemon writes the forensic audit trail.",
      "SHAP explanations are stored per decision for traceability; async batch processing of settlement files.",
      "Edge API, worker and Redis broker containerized with Docker Compose.",
    ],
    flow: ["Txn", "FastAPI scorer", "Redis", "Audit worker", "SHAP + vault"],
    repo: GH + "fraud_risk_engine",
  },
  {
    id: "rings", title: "Fraud-Ring Detection with Neo4j", date: "Nov 2026", cats: ["Distributed", "Backend"],
    tagline: "Case study showing why graphs beat SQL joins for multi-hop fraud queries, with a reproducible benchmark.",
    stack: ["Python", "Neo4j", "PostgreSQL", "FastAPI", "Docker", "PyTest", "Cypher"],
    bullets: [
      "Seeder generates 10k customers and 50k–500k transfers with 5 planted fraud rings (shared devices, phones, addresses + money loops).",
      "Cypher + APOC detection finds connected components and circular money flows; recovered all 5 planted rings with 100% member precision and recall.",
      "Benchmark vs PostgreSQL recursive CTEs: Neo4j is 17.8× faster at depth 10, and both return identical results at every depth.",
      "Also documents when not to use a graph database.",
    ],
    flow: ["Seeder", "Neo4j + Postgres", "Ring detection", "Benchmark", "FastAPI"],
    metrics: [["17.8×", "faster @ 10 hops"], ["5 / 5", "rings recovered"], ["500k", "transfers"]],
    demo: "p-graph",
  },
  {
    id: "shardsql", title: "ShardSQL — Distributed LLM Query Coordinator", date: "Aug 2026", cats: ["GenAI", "Distributed", "Backend"],
    tagline: "Ask a sharded Postgres cluster questions in English; the coordinator writes SQL, picks shards and scatter-gathers the results.",
    stack: ["Python", "FastAPI", "PostgreSQL", "asyncpg", "Gemini API", "Docker", "Alembic"],
    bullets: [
      "Gemini turns natural language into SQL and decides which of the US / EU / Global shards hold the answer.",
      "Non-blocking scatter-gather with asyncio.gather + asyncpg; results are reduced and aggregated in Python.",
      "Targeted routing avoids full-cluster scans; 3 shards run via Docker Compose.",
    ],
    flow: ["Question", "LLM → SQL + plan", "Shard router", "asyncpg ×3", "Reduce"],
    repo: GH + "distributed-sql-query-engine",
  },
  {
    id: "finops", title: "FinOps Assistant — Text-to-SQL for Cloud Costs", date: "Jul 2026", cats: ["GenAI", "Backend"],
    tagline: "Ask cloud-cost questions in plain English, with a 2-stage Text-to-SQL evaluation pipeline.",
    stack: ["Python", "FastAPI", "SQLite", "LLM APIs", "Pydantic"],
    bullets: [
      "FastAPI service that answers natural-language questions about cloud spend over a FinOps database.",
      "Resilient 2-stage Text-to-SQL evaluation harness with automatic rate-limit backoff.",
      "Follows the patterns from my internship Text-to-SQL work: schema grounding and read-only guards.",
    ],
    repo: GH + "finops-assistant",
  },
  {
    id: "codereview", title: "Code Reviewer — gRPC Review Service", date: "Apr 2026", cats: ["Backend", "Distributed"],
    tagline: "Flask API + gRPC review service with an audit consumer, Alembic migrations and Docker Compose.",
    stack: ["Python", "Flask", "gRPC", "Alembic", "Docker", "PyTest"],
    bullets: [
      "Protobuf-defined CodeReviewService exposed over gRPC alongside a Flask REST API.",
      "A separate audit-consumer service processes review events asynchronously.",
      "Migrations with Alembic, containerized multi-service stack, Makefile workflow.",
    ],
    repo: GH + "code-reviewer",
  },
  {
    id: "cat", title: "CAT Co-Pilot — Heavy Machinery Operator Assistant", date: "Sep 2026", cats: ["ML", "Frontend", "Backend"],
    tagline: "Hackathon build: in-cab HUD and telematics engine with voice I/O, safety shield and a task-duration ML model.",
    stack: ["Python", "FastAPI", "WebSockets", "Next.js", "React", "Tailwind", "Scikit-Learn"],
    bullets: [
      "FastAPI + WebSocket backend streams live telemetry to a Next.js in-cab HUD and a React/Vite operator interface.",
      "Voice router, safety shield, operator coaching and analytics leaderboard modules.",
      "Random-forest regressor predicts task duration; cold-start gate → inspection → runway shift flow; mobile-responsive.",
    ],
    repo: GH + "butterflies",
  },
  {
    id: "ocr", title: "Document & OCR Extraction Engine", date: "Aug 2026", cats: ["Backend", "Frontend"],
    tagline: "Full-stack async OCR: upload PDFs or images, get machine-readable text back via polling.",
    stack: ["Python", "FastAPI", "SQLAlchemy", "SQLite", "React", "Tailwind", "Tesseract"],
    bullets: [
      "pdfplumber layout-aware extraction for PDFs; Tesseract + Pillow OCR for PNG/JPG/WEBP.",
      "CPU-heavy OCR offloaded to FastAPI BackgroundTasks: returns 202 Accepted, and the React client polls until done.",
    ],
    repo: GH + "document-ocr-extractor",
  },
  {
    id: "gcm", title: "git-context-memory", date: "Aug 2026", cats: ["GenAI", "Tools"],
    tagline: "CLI that remembers development context per repo and generates commit messages via a git hook.",
    stack: ["Python", "SQLAlchemy", "Alembic", "SQLite", "LLM APIs"],
    bullets: [
      "Ingests conversation/repo context into a local SQLite memory store with search.",
      "Installs a prepare-commit-msg hook that drafts commit messages from that context; packaged with a CLI entry point.",
    ],
    repo: GH + "git-context-memory",
  },
  {
    id: "exam", title: "Multi-Tenant Cloud Examination Platform", date: "2025", cats: ["Backend", "Cloud"],
    tagline: "Proctored exam system on AWS with tenant isolation and event-driven webcam monitoring.",
    stack: ["Python", "AWS", "Lambda", "Aurora", "EC2", "OpenCV"],
    bullets: [
      "Multi-tenant platform on EC2 with Amazon Aurora isolating concurrent user data, test state and submissions.",
      "Event-driven proctoring on Lambda + OpenCV detects off-screen gaze and logs integrity alerts without interrupting the session.",
      "Relational schemas tuned for low-latency question retrieval during high-traffic exam windows.",
    ],
  },
  {
    id: "humaniser", title: "Humaniser", date: "Jul 2026", cats: ["Tools"],
    tagline: "Typed TypeScript text-transformation pipeline with a pluggable rules engine.",
    stack: ["TypeScript", "Vitest", "ESLint"],
    bullets: ["Rule-based pipeline with typed core, rules and a Vitest test suite; built with tsup."],
  },
  {
    id: "adk", title: "Agent Development Kit — Agent Patterns", date: "Jul 2026", cats: ["GenAI"],
    tagline: "Seven progressive agent builds: tools, LiteLLM, structured outputs, sessions, persistence and multi-agent orchestration.",
    stack: ["Python", "Google ADK", "LiteLLM"],
    bullets: ["Basic agent → tool agent → LiteLLM routing → structured outputs → session state → persistent storage → multi-agent orchestration."],
    repo: GH + "agent-development-kit",
  },
];

// Internship, university and contact: shown as units in the "About me" rack.
const LANDMARKS = [
  {
    id: "ptg", title: "People Tech Group — Software Engineer Intern", date: "May – Jul 2025",
    tagline: "Built an enterprise Text-to-SQL assistant that turns business questions into BigQuery SQL for automated restocking decisions.",
    stack: ["FastAPI", "LLM APIs", "ChromaDB", "BigQuery", "MongoDB", "Python"],
    metrics: [["85%", "fewer schema hallucinations"], ["100%", "mutating SQL blocked"], ["90%", "execution accuracy, 10-query benchmark"], ["20+", "tables covered"]],
    flow: ["Question", "Schema retrieval (ChromaDB)", "LLM writes SQL", "AST guard + LLM judge", "BigQuery"],
    bullets: [
      "FastAPI service and LLM API that translate business questions into BigQuery SQL across 20+ tables.",
      "A ChromaDB layer retrieves the top 5 relevant table schemas with their foreign keys, cutting schema hallucinations by 85% and making multi-table joins accurate.",
      "An AST-based SQL parser blocks every mutating command, and an LLM-as-a-Judge validates intent before anything runs.",
      "Multi-turn sessions persist in MongoDB, with windowing to keep per-request tokens bounded.",
    ],
  },
  {
    id: "vit", title: "VIT Vellore — B.Tech Computer Science", date: "2023 – 2027",
    tagline: "Final-year B.Tech in Computer Science and Engineering, CGPA 8.17 / 10.",
    stack: ["Python", "Java", "C++", "C", "SQL"],
    metrics: [["8.17", "CGPA out of 10"], ["2027", "graduating"]],
    bullets: [
      "Student coordinator at Gravitas, VIT's tech fest: registration and onboarding for thousands of participants.",
      "Management team at Team Ardra (SEDS-VIT), a student UAV research team.",
      "Alumni Entrepreneur Connect domain, Institution's Innovation Council.",
    ],
  },
  {
    id: "contact", title: "Contact — Get in touch", date: "Open to work",
    tagline: "I'm looking for graduate backend, ML and AI-engineering roles in Hyderabad or anywhere in India, starting December 2026.",
    stack: [], bullets: [],
    links: [["Email me", "mailto:nalamkarthik9@gmail.com"], ["GitHub", "https://github.com/Nalam-Karthik"], ["LinkedIn", "https://www.linkedin.com/in/nalam-karthik-a37b34277/"], ["Resume (PDF)", "resume.pdf"]],
  },
];

const RACKS = [
  { name: "Backend and distributed systems", short: "Backend", color: "#8b7cf6", ids: ["ledgerly", "shardsql", "codereview", "ocr", "exam", "humaniser"] },
  { name: "GenAI and agents", short: "GenAI", color: "#2bb3a3", ids: ["relay", "graphrag", "autoprd", "finops", "gcm", "adk"] },
  { name: "ML and data", short: "ML and data", color: "#f2b544", ids: ["recsys", "fraud", "rings", "cat"] },
  { name: "About me", short: "About me", color: "#f26b5b", ids: ["ptg", "vit", "contact"] },
];
// The strongest systems get the bigger 2U chassis.
const TWO_U = new Set(["ledgerly", "relay", "recsys", "graphrag", "fraud", "ptg"]);

