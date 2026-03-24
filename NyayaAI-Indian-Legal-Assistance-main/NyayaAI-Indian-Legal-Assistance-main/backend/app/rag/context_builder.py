"""
Context Builder
Fuses retrieved document chunks from multiple indexes into a structured context string.
"""

from llama_index.core.schema import NodeWithScore


def build_context(retrieved: dict[str, list[NodeWithScore]]) -> str:
    """
    Build structured context string from retrieved chunks.
    
    Format:
    [CONSTITUTION]
    ...
    [CASE LAW]
    ...
    [SIMPLIFIED EXPLANATION]
    ...
    """
    sections = []

    # Section 1: Constitution
    constitution_nodes = retrieved.get("constitution", [])
    if constitution_nodes:
        texts = _extract_texts(constitution_nodes)
        sections.append(f"[CONSTITUTION]\n{_join_texts(texts)}")

    # Section 2: Case Law
    kanoon_nodes = retrieved.get("kanoon", [])
    if kanoon_nodes:
        texts = _extract_texts(kanoon_nodes)
        sections.append(f"[CASE LAW]\n{_join_texts(texts)}")

    # Section 3: Simplified Explanation (PRS)
    prs_nodes = retrieved.get("prs", [])
    if prs_nodes:
        texts = _extract_texts(prs_nodes)
        sections.append(f"[SIMPLIFIED EXPLANATION]\n{_join_texts(texts)}")

    if not sections:
        return "No relevant legal documents found in the database."

    return "\n\n".join(sections)


def _extract_texts(nodes: list[NodeWithScore]) -> list[str]:
    """Extract text content from nodes, trimming to avoid context overflow."""
    texts = []
    for node in nodes:
        text = node.node.get_content().strip()
        # Limit each chunk to 600 chars to control total context size
        if len(text) > 600:
            text = text[:600] + "..."
        if text:
            texts.append(text)
    return texts


def _join_texts(texts: list[str]) -> str:
    return "\n---\n".join(texts)
