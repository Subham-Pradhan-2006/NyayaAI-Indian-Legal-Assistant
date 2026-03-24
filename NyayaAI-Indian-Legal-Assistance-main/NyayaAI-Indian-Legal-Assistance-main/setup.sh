#!/bin/bash
# NyayaAI - One-click setup script
# Usage: chmod +x setup.sh && ./setup.sh

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "  ╔═══════════════════════════════════╗"
echo "  ║    ⚖️  NyayaAI Setup Script        ║"
echo "  ║    Indian Legal Assistant          ║"
echo "  ╚═══════════════════════════════════╝"
echo -e "${NC}"

# Check Ollama
echo -e "${YELLOW}[1/5] Checking Ollama...${NC}"
if ! command -v ollama &> /dev/null; then
    echo -e "${RED}❌ Ollama not found. Install from https://ollama.ai${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Ollama found${NC}"

# Pull Mistral
echo -e "${YELLOW}[2/5] Pulling Mistral model (this may take a few minutes)...${NC}"
ollama pull mistral
echo -e "${GREEN}✅ Mistral ready${NC}"

# Backend setup
echo -e "${YELLOW}[3/5] Setting up Python backend...${NC}"
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt --quiet
echo -e "${GREEN}✅ Backend dependencies installed${NC}"

# Build indexes
echo -e "${YELLOW}[4/5] Building RAG indexes from sample data...${NC}"
python ingest.py
echo -e "${GREEN}✅ Indexes built${NC}"

cd ..

# Frontend setup
echo -e "${YELLOW}[5/5] Setting up Next.js frontend...${NC}"
cd frontend
npm install --quiet
echo -e "${GREEN}✅ Frontend dependencies installed${NC}"

cd ..

echo ""
echo -e "${GREEN}╔═══════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  ✅ NyayaAI setup complete!                   ║${NC}"
echo -e "${GREEN}╠═══════════════════════════════════════════════╣${NC}"
echo -e "${GREEN}║                                               ║${NC}"
echo -e "${GREEN}║  To start NyayaAI:                           ║${NC}"
echo -e "${GREEN}║                                               ║${NC}"
echo -e "${GREEN}║  Terminal 1 (Ollama):                        ║${NC}"
echo -e "${GREEN}║    ollama serve                              ║${NC}"
echo -e "${GREEN}║                                               ║${NC}"
echo -e "${GREEN}║  Terminal 2 (Backend):                       ║${NC}"
echo -e "${GREEN}║    cd backend                                ║${NC}"
echo -e "${GREEN}║    source venv/bin/activate                  ║${NC}"
echo -e "${GREEN}║    uvicorn app.main:app --reload --port 8000 ║${NC}"
echo -e "${GREEN}║                                               ║${NC}"
echo -e "${GREEN}║  Terminal 3 (Frontend):                      ║${NC}"
echo -e "${GREEN}║    cd frontend && npm run dev                ║${NC}"
echo -e "${GREEN}║                                               ║${NC}"
echo -e "${GREEN}║  Open: http://localhost:3000                 ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════╝${NC}"
