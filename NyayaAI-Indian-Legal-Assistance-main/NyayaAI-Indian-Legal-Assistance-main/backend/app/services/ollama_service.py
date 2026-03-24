"""
Ollama Service
Handles communication with local Ollama instance (Mistral model).
"""

import httpx
import json
import logging
from typing import AsyncIterator
from app.config import settings

logger = logging.getLogger(__name__)

OLLAMA_BASE_URL = settings.OLLAMA_BASE_URL
MODEL_NAME = settings.OLLAMA_MODEL
TIMEOUT = settings.OLLAMA_TIMEOUT


class OllamaService:
    def __init__(self):
        self.base_url = OLLAMA_BASE_URL
        self.model = MODEL_NAME

    async def generate(self, prompt: str) -> str:
        """
        Send prompt to Ollama and return full response.
        Uses non-streaming for structured parsing.
        """
        payload = {
            "model": self.model,
            "prompt": prompt,
            "stream": False,
            "options": {
                "temperature": 0.1,       # Low temp for factual legal answers
                "top_p": 0.9,
                "num_predict": 1024,
                "stop": ["</s>", "[INST]"],
            },
        }

        async with httpx.AsyncClient(timeout=TIMEOUT) as client:
            try:
                response = await client.post(
                    f"{self.base_url}/api/generate",
                    json=payload,
                )
                response.raise_for_status()
                data = response.json()
                return data.get("response", "")
            except httpx.TimeoutException:
                logger.error("⏰ Ollama request timed out")
                raise Exception("LLM timeout - please try again")
            except httpx.HTTPStatusError as e:
                logger.error(f"❌ Ollama HTTP error: {e}")
                raise Exception(f"LLM service error: {e.response.status_code}")

    async def stream_generate(self, prompt: str) -> AsyncIterator[str]:
        """
        Streaming generation - yields tokens one by one.
        """
        payload = {
            "model": self.model,
            "prompt": prompt,
            "stream": True,
            "options": {
                "temperature": 0.1,
                "top_p": 0.9,
                "num_predict": 1024,
            },
        }

        async with httpx.AsyncClient(timeout=TIMEOUT) as client:
            async with client.stream(
                "POST",
                f"{self.base_url}/api/generate",
                json=payload,
            ) as response:
                async for line in response.aiter_lines():
                    if line.strip():
                        try:
                            data = json.loads(line)
                            token = data.get("response", "")
                            if token:
                                yield token
                            if data.get("done", False):
                                break
                        except json.JSONDecodeError:
                            continue

    async def check_health(self) -> bool:
        """Check if Ollama is running."""
        try:
            async with httpx.AsyncClient(timeout=3.0) as client:
                resp = await client.get(f"{self.base_url}/api/tags")
                return resp.status_code == 200
        except Exception:
            return False
