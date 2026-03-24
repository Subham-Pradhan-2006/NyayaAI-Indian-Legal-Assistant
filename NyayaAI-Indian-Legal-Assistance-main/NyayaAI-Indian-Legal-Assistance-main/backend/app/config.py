"""
NyayaAI Configuration
Loads settings from environment variables / .env file.
"""

import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env file if present
load_dotenv()


class Settings:
    # Ollama
    OLLAMA_BASE_URL: str = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
    OLLAMA_MODEL: str = os.getenv("OLLAMA_MODEL", "mistral")
    OLLAMA_TIMEOUT: float = float(os.getenv("OLLAMA_TIMEOUT", "60"))

    # RAG retrieval
    TOP_K_CONSTITUTION: int = int(os.getenv("TOP_K_CONSTITUTION", "3"))
    TOP_K_KANOON: int = int(os.getenv("TOP_K_KANOON", "2"))
    TOP_K_PRS: int = int(os.getenv("TOP_K_PRS", "2"))

    # Embeddings
    EMBED_MODEL: str = os.getenv("EMBED_MODEL", "BAAI/bge-small-en-v1.5")
    EMBED_DIM: int = int(os.getenv("EMBED_DIM", "384"))

    # Paths
    DATA_DIR: Path = Path(os.getenv("DATA_DIR", "data"))
    INDEX_DIR: Path = Path(os.getenv("INDEX_DIR", "indexes"))

    # API
    API_HOST: str = os.getenv("API_HOST", "0.0.0.0")
    API_PORT: int = int(os.getenv("API_PORT", "8000"))
    ALLOWED_ORIGINS: list[str] = os.getenv(
        "ALLOWED_ORIGINS",
        "http://localhost:3000,http://127.0.0.1:3000"
    ).split(",")

    # Logging
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")


settings = Settings()
