"""
RAG Indexer
Builds and persists FAISS vector indexes for Constitution, Kanoon, and PRS.
Run once via: python -m app.rag.indexer
"""

import os
import logging
from pathlib import Path

from llama_index.core import (
    VectorStoreIndex,
    SimpleDirectoryReader,
    StorageContext,
    load_index_from_storage,
    Settings,
)
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.vector_stores.faiss import FaissVectorStore
import faiss

logger = logging.getLogger(__name__)

from app.config import settings

# Paths
DATA_DIR = settings.DATA_DIR
INDEX_DIR = settings.INDEX_DIR
INDEX_DIR.mkdir(exist_ok=True)

# Index names → data folders
INDEX_CONFIGS = {
    "constitution": DATA_DIR / "constitution",
    "kanoon": DATA_DIR / "kanoon",
    "prs": DATA_DIR / "prs",
}

# Global index registry (populated at startup)
INDEXES: dict = {}

# Embedding model
EMBED_MODEL_NAME = settings.EMBED_MODEL
EMBED_DIM = settings.EMBED_DIM


def get_embed_model():
    """Initialize sentence-transformer embedding model."""
    return HuggingFaceEmbedding(
        model_name=EMBED_MODEL_NAME,
        embed_batch_size=32,
    )


async def build_indexes():
    """
    Load or build all three FAISS indexes.
    Called at app startup.
    """
    global INDEXES

    embed_model = get_embed_model()
    Settings.embed_model = embed_model
    Settings.llm = None  # We use Ollama directly, not via LlamaIndex LLM

    for name, data_path in INDEX_CONFIGS.items():
        index_path = INDEX_DIR / name

        if index_path.exists() and (index_path / "docstore.json").exists():
            # Load existing index
            logger.info(f"📂 Loading existing index: {name}")
            INDEXES[name] = _load_index(index_path, embed_model)
        elif data_path.exists() and any(data_path.iterdir()):
            # Build new index from documents
            logger.info(f"🔨 Building index: {name} from {data_path}")
            INDEXES[name] = _build_index(name, data_path, index_path, embed_model)
        else:
            logger.warning(
                f"⚠️  No data found for {name} at {data_path}. "
                "Add documents and re-run indexer."
            )
            INDEXES[name] = None


def _build_index(name: str, data_path: Path, index_path: Path, embed_model) -> VectorStoreIndex:
    """Build a new FAISS index from documents in data_path."""
    # Load documents
    documents = SimpleDirectoryReader(
        str(data_path),
        recursive=True,
        required_exts=[".pdf", ".txt", ".md"],
    ).load_data()

    logger.info(f"📄 Loaded {len(documents)} documents for {name}")

    # Add metadata tags
    for doc in documents:
        doc.metadata["source"] = name
        doc.metadata["title"] = doc.metadata.get("file_name", "Unknown")

    # FAISS vector store
    faiss_index = faiss.IndexFlatL2(EMBED_DIM)
    vector_store = FaissVectorStore(faiss_index=faiss_index)
    storage_context = StorageContext.from_defaults(vector_store=vector_store)

    # Build index
    index = VectorStoreIndex.from_documents(
        documents,
        storage_context=storage_context,
        embed_model=embed_model,
        show_progress=True,
    )

    # Persist to disk
    index_path.mkdir(parents=True, exist_ok=True)
    index.storage_context.persist(persist_dir=str(index_path))
    logger.info(f"✅ Index {name} saved to {index_path}")

    return index


def _load_index(index_path: Path, embed_model) -> VectorStoreIndex:
    """Load persisted index from disk."""
    faiss_index = faiss.IndexFlatL2(EMBED_DIM)
    vector_store = FaissVectorStore(faiss_index=faiss_index)
    storage_context = StorageContext.from_defaults(
        vector_store=vector_store,
        persist_dir=str(index_path),
    )
    return load_index_from_storage(storage_context, embed_model=embed_model)


def get_indexes() -> dict:
    """Return loaded indexes."""
    return INDEXES


# Allow running as standalone script: python -m app.rag.indexer
if __name__ == "__main__":
    import asyncio
    logging.basicConfig(level=logging.INFO)
    asyncio.run(build_indexes())
    print("✅ All indexes built successfully.")
