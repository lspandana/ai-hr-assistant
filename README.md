# 🏥 HR Assistant — Enterprise Knowledge Copilot

An AI-powered internal HR chatbot built for Healthcare employees to instantly access HR policies, leave information, compliance guidelines, and workplace procedures.

Built with **React + TypeScript** frontend, **Node.js + Express** backend, **Google Gemini AI**, and a **RAG (Retrieval-Augmented Generation)** pipeline.

---

## 📸 Screenshots

### Chat Interface
- Health-branded UI with orange and blue color scheme
- Suggested questions for quick access
- Source attribution showing referenced policies
- 👍👎 feedback controls for Responsible AI

---

## 🏗️ Architecture Overview
__________________________________
|   React + TypeScript Frontend   │
│         localhost:3000          │
└────────────────┬────────────────┘
│            HTTP REST            |
┌────────────────▼────────────────┐
│   Node.js + Express Backend     │
│         localhost:3001          │
│                                 │
│  RAG Service → Vector Store     │
│  Gemini Service → Google AI     │
│  HR Policies JSON (12 docs)     │
└────────────────┬────────────────┘
│              HTTPS              |
┌────────────────▼────────────────┐
│      Google Gemini API          │
│      gemini-1.5-flash           │
___________________________________

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, TypeScript, Tailwind CSS |
| Backend | Node.js 20, Express 4 |
| LLM | Google Gemini 1.5 Flash (Free Tier) |
| Retrieval | In-Memory RAG with keyword scoring |
| Dataset | 12 HR Policy Documents (synthetic) |

---

## ⚙️ Prerequisites

Make sure you have the following installed:

| Tool | Version | Download |
|---|---|---|
| Node.js | v20+ | https://nodejs.org |
| npm | v10+ | Included with Node.js |
| Git | Latest | https://git-scm.com |

---

## 🔑 API Key Setup

This project requires a **Google Gemini API key** (free).

1. Go to **https://aistudio.google.com**
2. Click **"Get API Key"** → **"Create API Key"**
3. Copy your key
4. Follow the backend setup steps below to add it

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/lspandana/ai-hr-assistant.git
cd ai-hr-assistant
```

---

### 2. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Open `.env` and add your Gemini API key:
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001

Start the backend:
```bash
node src/app.js
```

You should see:
Loaded 12 HR policy documents
 HR Assistant API running on port 3001
📋 Health check: http://localhost:3001/api/health

---

### 3. Frontend Setup

Open a **new terminal tab** and run:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start the frontend
npm start
```

The app will automatically open at **http://localhost:3000** ✅

---

## 🧪 Testing the API

### Health Check
```bash
curl http://localhost:3001/api/health
```

### Test Leave Policy
```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is the leave policy at Health client?"}'
```

### Test Incident Escalation
```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is the escalation process for incidents?"}'
```

### Test Onboarding
```bash
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What are the onboarding steps for new employees?"}'
```

---

## 📁 Project Structure
ai-hr-assistant/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── chatController.js    ← REST endpoints + session management
│   │   ├── services/
│   │   │   ├── ragService.js        ← RAG orchestration
│   │   │   ├── geminiService.js     ← Gemini LLM integration
│   │   │   ├── vectorStore.js       ← In-memory keyword search
│   │   │   └── dataLoader.js        ← Policy document loader
│   │   ├── middleware/
│   │   │   ├── errorHandler.js      ← Global error handling
│   │   │   └── requestLogger.js     ← Request logging
│   │   ├── routes/
│   │   │   └── chatRoutes.js        ← Route definitions
│   │   └── app.js                   ← Express app entry point
│   ├── data/
│   │   └── hr_policies.json         ← 12 HR policy documents
│   ├── .env.example                 ← Environment template
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatWindow.tsx       ← Message display
│   │   │   ├── MessageBubble.tsx    ← Individual messages
│   │   │   ├── InputBar.tsx         ← User input + suggested questions
│   │   │   ├── SourceBadge.tsx      ← Policy source attribution
│   │   │   └── FeedbackButtons.tsx  ← 👍👎 feedback controls
│   │   ├── hooks/
│   │   │   └── useChat.ts           ← Chat state management
│   │   ├── services/
│   │   │   └── api.ts               ← Backend API calls
│   │   ├── types/
│   │   │   └── index.ts             ← TypeScript interfaces
│   │   └── App.tsx                  ← Root component
│   └── package.json
│
├── docs/
│   ├── architecture.md              ← System architecture
│   ├── responsible-ai.md            ← Responsible AI governance
│   ├── prompt-design.md             ← Prompt engineering notes
│   └── accuracy-limitations.md     ← Accuracy & limitations
│
└── README.md

## How RAG Works
1. Employee asks a question
2. Backend scores all 12 HR policy documents
3. Top 3 most relevant documents retrieved
4. Documents injected into Gemini prompt as context
5. Gemini generates grounded response
6. Response returned with source policy references
7. Frontend displays answer + colored source badges

---

## 🤖 Example Questions to Try

| Question | Policy Retrieved |
|---|---|
| "What is the annual leave entitlement?" | POL-001 Annual Leave Policy |
| "How many sick days do I get?" | POL-002 Sick Leave Policy |
| "What is the maternity leave policy?" | POL-003 Maternity & Paternity Leave |
| "How do I report a P1 incident?" | POL-010 Incident Escalation Policy |
| "What are the onboarding steps?" | POL-005 Employee Onboarding Process |
| "What is the HIPAA policy?" | POL-006 HIPAA & PHI Handling Policy |
| "Can I work from home?" | POL-012 Remote Work Policy |

---

## 🔐 Security

- API keys stored in `.env` file — never committed to Git
- `.env` is listed in `.gitignore`
- `.env.example` provided as template for reviewers
- No employee personal data processed or stored
- All session IDs are randomly generated UUIDs

---

## ⚖️ Responsible AI

- All responses grounded in actual HR policy documents
- Source attribution on every AI response
- Persistent disclaimer directing employees to HR for important decisions
- 👍👎 feedback mechanism for continuous improvement
- Low temperature (0.2) for consistent factual responses
- Fallback to hr@abc.com when answer not found

See [docs/responsible-ai.md](docs/responsible-ai.md) for full governance details.

---

## 📈 Scale-Out Considerations

| Current POC | Production Ready |
|---|---|
| In-memory vector store | Pinecone / Weaviate |
| JSON knowledge base | PostgreSQL / MongoDB |
| Single process | Kubernetes clustering |
| No auth | SSO integration |
| Free Gemini tier | Paid tier / Azure OpenAI |
| Console logging | Datadog / ELK Stack |

---

## 🔧 Design Rationale

### Why RAG over Fine-tuning?
RAG allows the knowledge base to be updated without retraining the model. Perfect for HR policies that change frequently.

### Why Keyword Scoring over Embeddings?
For a POC with 12 documents, keyword scoring provides sufficient accuracy without additional API costs or rate limit concerns.

### Why Gemini over GPT-4?
Gemini free tier provides 1,500 requests/day — sufficient for a POC demo without requiring paid credentials.

### Why Node.js over FastAPI?
Node.js shares the JavaScript ecosystem with the React frontend, reducing context switching and simplifying the overall stack.

---

## 📝 Assumptions & Limitations

- Dataset is synthetic — generated to represent realistic HR policies
- No real employee data is used anywhere in the system
- Knowledge base is static — real deployment would connect to live HR systems
- Free tier API limits may cause occasional delays during heavy testing
- Session history is in-memory — restarting server clears all sessions

---

## 🔮 What I Would Improve With More Time

1. **Semantic embeddings** for better retrieval accuracy
2. **Authentication** via SSO
3. **Streaming responses** for better UX
4. **Database persistence** for conversation history
5. **Unit and integration tests** for all services
6. **CI/CD pipeline** with GitHub Actions
7. **Docker containerization** for easy deployment
8. **Mobile responsive** design improvements
9. **Multi-language support** for global employees
10. **Analytics dashboard** for HR team to monitor usage

---

## 👩‍💻 Author

**Spandana Lekkala**
AI Fullstack Developer
[GitHub](https://github.com/lspandana/ai-hr-assistant)

---

*Built as part of AI Fullstack Developer Assignment — May 2026*