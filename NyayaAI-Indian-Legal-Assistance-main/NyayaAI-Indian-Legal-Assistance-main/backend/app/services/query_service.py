"""
Query Service
Orchestrates: classification → retrieval → context fusion → LLM → response parsing
"""

import logging
from typing import AsyncIterator

from app.rag.classifier import classify_query
from app.rag.retriever import MultiIndexRetriever
from app.rag.context_builder import build_context
from app.services.ollama_service import OllamaService
from app.utils.response_parser import parse_llm_response
from app.utils.prompts import build_legal_prompt, build_eli5_prompt, build_hindi_prompt

logger = logging.getLogger(__name__)


class QueryService:
    def __init__(self):
        self.retriever = MultiIndexRetriever()
        self.ollama = OllamaService()

    async def process_query(
        self,
        query: str,
        eli5: bool = False,
        hindi: bool = False,
    ) -> dict:
        """
        Full RAG pipeline:
        1. Classify query → which indexes to hit
        2. Retrieve relevant chunks
        3. Build structured context
        4. Generate with Ollama
        5. Parse and return structured response
        """

        # Step 1: Classify query
        query_type = classify_query(query)
        logger.info(f"🔍 Query classified as: {query_type}")

        # Step 2: Multi-index retrieval
        retrieved = await self.retriever.retrieve(query=query, query_type=query_type)
        logger.info(f"📚 Retrieved {sum(len(v) for v in retrieved.values())} chunks")

        # Step 3: Build structured context
        context = build_context(retrieved)

        # Step 4: Build prompt
        prompt = build_legal_prompt(query=query, context=context)

        # Step 5: Generate response
        raw_response = await self.ollama.generate(prompt)

        # Step 6: Parse structured response
        parsed = parse_llm_response(raw_response)

        # Step 7: Optional ELI5
        if eli5:
            eli5_prompt = build_eli5_prompt(query=query, answer=parsed["answer"])
            eli5_raw = await self.ollama.generate(eli5_prompt)
            parsed["eli5_explanation"] = eli5_raw.strip()

        # Step 8: Optional Hindi
        if hindi:
            hindi_prompt = build_hindi_prompt(text=parsed["answer"])
            hindi_raw = await self.ollama.generate(hindi_prompt)
            parsed["hindi_translation"] = hindi_raw.strip()

        # Add metadata
        parsed["query_type"] = query_type
        parsed["sources"] = self._format_sources(retrieved)

        return parsed

    async def stream_query(
        self,
        query: str,
        eli5: bool = False,
        hindi: bool = False,
    ) -> AsyncIterator[str]:
        """Streaming version - yields tokens as they arrive from Ollama."""

        query_type = classify_query(query)
        retrieved = await self.retriever.retrieve(query=query, query_type=query_type)
        context = build_context(retrieved)
        prompt = build_legal_prompt(query=query, context=context)

        async for token in self.ollama.stream_generate(prompt):
            yield token

    def _format_sources(self, retrieved: dict) -> list[dict]:
        """Format retrieved chunks into source citations."""
        sources = []
        for index_name, nodes in retrieved.items():
            for node in nodes:
                sources.append({
                    "source": index_name,
                    "title": node.metadata.get("title", "Unknown"),
                    "page": node.metadata.get("page", None),
                    "score": round(node.score, 3) if hasattr(node, "score") else None,
                })
        return sources
