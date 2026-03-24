"""
Chat Route - /api/chat
Handles user legal queries through the RAG pipeline.
"""

from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, field_validator
import logging
import json

from app.services.query_service import QueryService
from app.utils.sanitizer import sanitize_input

logger = logging.getLogger(__name__)
router = APIRouter()

# Singleton query service (initialized at startup)
query_service = QueryService()


class ChatRequest(BaseModel):
    query: str
    eli5: bool = False          # "Explain like I'm 10" mode
    hindi: bool = False         # Hindi translation mode

    @field_validator("query")
    @classmethod
    def validate_query(cls, v):
        if not v or not v.strip():
            raise ValueError("Query cannot be empty")
        if len(v) > 1000:
            raise ValueError("Query too long (max 1000 characters)")
        return v.strip()


from typing import Optional

class ChatResponse(BaseModel):
    answer: str
    legal_basis: list[str]
    simple_explanation: str
    confidence: str
    sources: list[dict]
    query_type: str
    eli5_explanation: Optional[str] = None
    hindi_translation: Optional[str] = None


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest, req: Request):
    """
    Main chat endpoint. Accepts a legal query and returns structured answer.
    """
    # Sanitize input to prevent prompt injection
    clean_query = sanitize_input(request.query)

    logger.info(f"📨 Incoming query: {clean_query[:80]}...")

    try:
        result = await query_service.process_query(
            query=clean_query,
            eli5=request.eli5,
            hindi=request.hindi,
        )
        return result
    except Exception as e:
        logger.error(f"❌ Query processing failed: {e}")
        raise HTTPException(status_code=500, detail="Failed to process legal query")


@router.post("/chat/stream")
async def chat_stream(request: ChatRequest):
    """
    Streaming version of the chat endpoint for real-time token delivery.
    """
    clean_query = sanitize_input(request.query)

    async def generate():
        try:
            async for chunk in query_service.stream_query(
                query=clean_query,
                eli5=request.eli5,
                hindi=request.hindi,
            ):
                yield f"data: {json.dumps({'chunk': chunk})}\n\n"
        except Exception as e:
            yield f"data: {json.dumps({'error': str(e)})}\n\n"
        yield "data: [DONE]\n\n"

    return StreamingResponse(generate(), media_type="text/event-stream")
