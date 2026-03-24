# ⚖️ NyayaAI – Indian Legal Assistant

> A privacy-first, RAG-powered AI chatbot for Indian law. Ask questions about the Constitution, case law, and legislation — answered locally via Ollama (Mistral), with zero cloud dependency.

![NyayaAI](https://img.shields.io/badge/NyayaAI-v1.0-orange?style=for-the-badge)
![Mistral](https://img.shields.io/badge/LLM-Mistral-blue?style=for-the-badge)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-green?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Frontend-Next.js_14-black?style=for-the-badge)

---

## 📁 Project Structure

```
nyayaai/
├── backend/                      # FastAPI + LlamaIndex + FAISS
│   ├── app/
│   │   ├── main.py               # FastAPI app entry point
│   │   ├── routes/
│   │   │   ├── chat.py           # /api/chat endpoint
│   │   │   └── health.py         # /api/health endpoint
│   │   ├── services/
│   │   │   ├── query_service.py  # RAG pipeline orchestrator
│   │   │   └── ollama_service.py # Ollama LLM integration
│   │   ├── rag/
│   │   │   ├── indexer.py        # FAISS index builder & loader
│   │   │   ├── classifier.py     # Query classification (heuristic)
│   │   │   ├── retriever.py      # Multi-index FAISS retrieval
│   │   │   └── context_builder.py# Context fusion for LLM
│   │   └── utils/
│   │       ├── prompts.py        # Prompt templates
│   │       ├── response_parser.py# Structured response parser
│   │       └── sanitizer.py      # Input sanitization
│   ├── data/
│   │   ├── constitution/         # ← Add Constitution PDFs/TXTs here
│   │   ├── kanoon/               # ← Add case law PDFs here
│   │   └── prs/                  # ← Add PRS summaries here
│   ├── indexes/                  # Auto-generated FAISS indexes
│   ├── ingest.py                 # Data ingestion script
│   └── requirements.txt
│
└── frontend/                     # Next.js 14 + Tailwind + Framer Motion
    ├── src/
    │   ├── app/
    │   │   ├── page.tsx          # Landing page
    │   │   ├── chat/page.tsx     # Chat page
    │   │   ├── layout.tsx        # Root layout
    │   │   └── globals.css       # Global styles + design tokens
    │   ├── components/
    │   │   ├── landing/          # Navbar, Hero, Features, etc.
    │   │   └── chat/             # ChatInterface, MessageBubble, etc.
    │   └── lib/
    │       ├── api.ts            # API client
    │       └── types.ts          # TypeScript types
    ├── package.json
    ├── next.config.js            # Proxy to FastAPI backend
    └── tailwind.config.js
```

---

## ⚙️ Tech Stack

| Layer       | Technology                            |
|-------------|---------------------------------------|
| LLM         | Ollama (Mistral 7B) — local inference |
| RAG         | LlamaIndex + FAISS                    |
| Embeddings  | `BAAI/bge-small-en-v1.5`             |
| Backend     | FastAPI + Python 3.11+                |
| Frontend    | Next.js 14 (App Router)               |
| Styling     | Tailwind CSS + Framer Motion          |
| Vector DB   | FAISS (in-process, no server needed)  |

---

## 🚀 Installation & Setup

### Prerequisites

- Python 3.11+
- Node.js 18+
- [Ollama](https://ollama.ai) installed

### Alternative: Docker Compose (Recommended)

The easiest way to run the application is using Docker Desktop.

```bash
# 1. Start Ollama and ensure Mistral is pulled
ollama serve
ollama pull mistral

# 2. Start the FastAPI and Next.js containers in the background
docker compose up --build -d
```

Frontend will be available at: http://localhost:3000
Backend API will be available at: http://localhost:8000

To stop the containers:
```bash
docker compose down
```

---

### Manual Setup (Without Docker)

### Step 1: Install & Start Ollama

```bash
# Install Ollama (macOS/Linux)
curl -fsSL https://ollama.ai/install.sh | sh

# Pull Mistral model (4GB download)
ollama pull mistral

# Verify Ollama is running
ollama serve   # starts on http://localhost:11434
```

---

### Step 2: Backend Setup

```bash
cd nyayaai/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

---

### Step 3: Add Legal Documents

Place your legal documents in the `data/` folders:

```
data/
├── constitution/    ← Indian Constitution PDF(s) or TXT files
├── kanoon/          ← Case law PDFs from Indian Kanoon
└── prs/             ← PRS India legislative summaries
```

> **Sample data included**: The repo comes with sample text files covering key constitutional articles, landmark cases, and legislative summaries to get you started immediately.

**Recommended data sources:**
- Constitution: [India Code](https://www.indiacode.nic.in/) — search "Constitution"
- Case Law: [Indian Kanoon](https://indiankanoon.org) — download landmark case PDFs
- Legislation: [PRS India](https://prsindia.org) — Bills & Acts summaries

---

### Step 4: Build Indexes

```bash
cd nyayaai/backend

# Activate venv first
source venv/bin/activate

# Run ingestion (builds FAISS indexes from documents)
python ingest.py
```

This creates the `indexes/` folder with FAISS indexes for all three sources.

---

### Step 5: Start the Backend

```bash
cd nyayaai/backend
source venv/bin/activate

uvicorn app.main:app --reload --port 8000
```

API will be available at: http://localhost:8000
Swagger docs at: http://localhost:8000/docs

---

### Step 6: Frontend Setup

```bash
cd nyayaai/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be available at: http://localhost:3000

---

## 🧪 Sample Test Queries

Try these in the chat interface or via the API:

### Constitutional Rights
```
"What are my fundamental rights if I am arrested by the police?"
"What does Article 21 say about the right to life and liberty?"
"Can the government take away my freedom of speech? Under what conditions?"
"What is the significance of the Preamble to the Indian Constitution?"
```

### Case Law
```
"What was decided in Maneka Gandhi vs Union of India?"
"Explain the Basic Structure Doctrine from Kesavananda Bharati case."
"What are the Vishaka Guidelines and how did they come about?"
"What does the Indra Sawhney case say about reservations?"
```

### Legislation
```
"How do I file an RTI application? What information can I ask for?"
"What are my rights under the Consumer Protection Act 2019?"
"What is the POCSO Act and what does it protect against?"
"What penalties exist for drunk driving under the Motor Vehicles Act?"
```

---

## 🔌 API Reference

### POST /api/chat

```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What are my rights if police arrest me?",
    "eli5": false,
    "hindi": false
  }'
```

**Response:**
```json
{
  "answer": "Under Article 22 of the Indian Constitution...",
  "legal_basis": ["Article 22, Indian Constitution", "D.K. Basu vs State of West Bengal (1997)"],
  "simple_explanation": "If police arrest you, they must tell you why...",
  "confidence": "High",
  "sources": [
    {"source": "constitution", "title": "constitution_sample.txt", "score": 0.923},
    {"source": "kanoon", "title": "landmark_cases.txt", "score": 0.887}
  ],
  "query_type": "constitutional",
  "eli5_explanation": null,
  "hindi_translation": null
}
```

### GET /api/health

```bash
curl http://localhost:8000/api/health
```

```json
{"status": "ok", "ollama": "connected", "model": "mistral"}
```

---

## 🧠 Architecture: How It Works

```
User Query
    │
    ▼
┌─────────────────────────────┐
│     Query Classifier        │  Keywords → constitutional / case_law / legislative / general
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│   Multi-Index Retriever     │
│  ┌──────────┐ ┌──────────┐  │
│  │ CONST.   │ │ KANOON   │  │  Top-K chunks per index
│  │ FAISS    │ │ FAISS    │  │  (3 + 2 + 2 = 7 max)
│  └──────────┘ └──────────┘  │
│  ┌──────────┐               │
│  │  PRS     │               │
│  │ FAISS    │               │
│  └──────────┘               │
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│     Context Builder         │  [CONSTITUTION] + [CASE LAW] + [EXPLANATION]
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│   Prompt Template           │  System prompt + context + user query
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│   Ollama (Mistral 7B)       │  Local inference, no cloud
└──────────────┬──────────────┘
               │
               ▼
┌─────────────────────────────┐
│   Response Parser           │  → Answer, Legal Basis, Explanation, Confidence
└─────────────────────────────┘
```

---

## 🔐 Security Features

- **Input sanitization**: Strips HTML, control chars, injection patterns
- **Prompt injection protection**: Detects and neutralizes `[INST]`, `ignore previous instructions`, etc.
- **No external API calls**: Everything runs on localhost
- **No data persistence**: Queries are not logged or stored

---

## ⚡ Performance Tips

1. **Speed up embeddings**: Already using `bge-small-en` (lightweight, fast)
2. **Reduce context**: Lower `top_k` in `classifier.py` if latency is high
3. **GPU acceleration**: If you have a GPU, Ollama uses it automatically
4. **Quantized model**: Use `mistral:7b-instruct-q4_K_M` for faster inference

```bash
ollama pull mistral:7b-instruct-q4_K_M
```

Then update `MODEL_NAME` in `app/services/ollama_service.py`.

---

## 🌟 Bonus Features

| Feature | How to Use |
|---------|-----------|
| **ELI5 Mode** | Toggle "Explain Like I'm 10" in sidebar or pass `"eli5": true` |
| **Hindi Translation** | Toggle हिंदी in sidebar or pass `"hindi": true` |
| **Source Citations** | Click "N sources" in any response to expand |
| **Streaming** | Use `/api/chat/stream` for real-time token delivery |
| **Query Pre-fill** | Share `/chat?q=your+question` to pre-fill the chat |

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| `Ollama offline` in UI | Run `ollama serve` in a terminal |
| `Index not found` | Run `python ingest.py` to build indexes |
| Slow responses | Use quantized Mistral model (see Performance Tips) |
| Empty answers | Add more documents to `data/` folders and re-ingest |
| CORS errors | Ensure frontend runs on port 3000 and backend on 8000 |

---

## 📜 Disclaimer

NyayaAI is for **informational and educational purposes only**. It is not a substitute for professional legal advice. Always consult a qualified lawyer for legal matters.

---

*Built with ⚖️ for legal access for all Indians*
