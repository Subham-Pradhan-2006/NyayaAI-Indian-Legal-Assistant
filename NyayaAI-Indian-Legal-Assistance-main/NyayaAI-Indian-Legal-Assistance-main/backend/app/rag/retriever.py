"""
Multi-Index Retriever
Queries FAISS indexes based on query classification.
"""

import logging
from typing import Optional

from llama_index.core import QueryBundle
from llama_index.core.schema import NodeWithScore

from app.rag.indexer import get_indexes
from app.rag.classifier import get_retrieval_config, QueryType

logger = logging.getLogger(__name__)


class MultiIndexRetriever:
    """
    Retrieves relevant document chunks from multiple FAISS indexes.
    Returns a dict: { index_name: [NodeWithScore, ...] }
    """

    async def retrieve(
        self,
        query: str,
        query_type: QueryType,
    ) -> dict[str, list[NodeWithScore]]:
        """
        Retrieve top-k chunks from relevant indexes based on query type.
        """
        indexes = get_indexes()
        config = get_retrieval_config(query_type)
        results = {}

        for index_name, top_k in config.items():
            index = indexes.get(index_name)

            if index is None:
                logger.warning(f"⚠️  Index {index_name} not loaded, skipping")
                results[index_name] = []
                continue

            try:
                retriever = index.as_retriever(similarity_top_k=top_k)
                nodes = await retriever.aretrieve(QueryBundle(query_str=query))
                results[index_name] = nodes
                logger.info(f"📎 {index_name}: retrieved {len(nodes)} chunks")
            except Exception as e:
                logger.error(f"❌ Retrieval failed for {index_name}: {e}")
                results[index_name] = []

        return results


def _format_node(node: NodeWithScore) -> str:
    """Format a retrieved node for display."""
    text = node.node.get_content()
    score = round(node.score, 3) if node.score else "N/A"
    source = node.node.metadata.get("source", "unknown")
    title = node.node.metadata.get("title", "")
    return f"[{source.upper()}] {title} (score: {score})\n{text[:500]}"
