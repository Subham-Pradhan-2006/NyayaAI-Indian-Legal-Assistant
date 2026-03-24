"""
NyayaAI - Indian Legal Assistant
FastAPI Backend Entry Point
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from contextlib import asynccontextmanager
import logging

from app.routes.chat import router as chat_router
from app.routes.health import router as health_router
from app.rag.indexer import build_indexes
from app.config import settings

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Build RAG indexes on startup."""
    logger.info("🚀 NyayaAI backend starting...")
    try:
        await build_indexes()
        logger.info("✅ RAG indexes built successfully")
    except Exception as e:
        logger.warning(f"⚠️  Index build failed (run ingestion first): {e}")
    yield
    logger.info("👋 NyayaAI backend shutting down")


app = FastAPI(
    title="NyayaAI API",
    description="Indian Legal Assistant powered by RAG + Ollama",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(chat_router, prefix="/api", tags=["Chat"])
app.include_router(health_router, prefix="/api", tags=["Health"])


@app.get("/")
async def root():
    return {"message": "NyayaAI API is running", "docs": "/docs"}
