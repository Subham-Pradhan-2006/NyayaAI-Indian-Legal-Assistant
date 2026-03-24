"""
Health Check Route
"""

from fastapi import APIRouter
import httpx
import logging
from app.config import settings

logger = logging.getLogger(__name__)
router = APIRouter()


@router.get("/health")
async def health():
    """Check API and Ollama connectivity."""
    ollama_status = "unreachable"
    try:
        async with httpx.AsyncClient(timeout=3.0) as client:
            resp = await client.get(f"{settings.OLLAMA_BASE_URL}/api/tags")
            if resp.status_code == 200:
                ollama_status = "connected"
    except Exception:
        pass

    return {
        "status": "ok",
        "ollama": ollama_status,
        "model": settings.OLLAMA_MODEL,
    }
