"""
Data Ingestion Script
Place your legal documents in the data/ folders and run this script.

Folder structure:
  data/
    constitution/   ← Indian Constitution PDFs/text
    kanoon/         ← Indian Kanoon case law PDFs
    prs/            ← PRS India legislative summaries

Usage:
  python ingest.py
"""

import asyncio
import logging
from pathlib import Path

logging.basicConfig(level=logging.INFO, format="%(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

# Create data directories if they don't exist
for folder in ["data/constitution", "data/kanoon", "data/prs"]:
    Path(folder).mkdir(parents=True, exist_ok=True)


async def main():
    from app.rag.indexer import build_indexes

    logger.info("🚀 Starting NyayaAI data ingestion...")
    logger.info("📁 Expected structure:")
    logger.info("   data/constitution/ - Indian Constitution documents")
    logger.info("   data/kanoon/       - Case law documents")
    logger.info("   data/prs/          - PRS India documents")
    logger.info("")

    # Check if data exists
    for folder in ["data/constitution", "data/kanoon", "data/prs"]:
        p = Path(folder)
        files = list(p.glob("**/*.pdf")) + list(p.glob("**/*.txt")) + list(p.glob("**/*.md"))
        if files:
            logger.info(f"✅ {folder}: {len(files)} files found")
        else:
            logger.warning(f"⚠️  {folder}: No documents found. Add PDFs or TXT files here.")

    logger.info("")
    await build_indexes()
    logger.info("✅ Ingestion complete!")


if __name__ == "__main__":
    asyncio.run(main())
