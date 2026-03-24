"""
Response Parser
Parses structured LLM output into typed Python dict.
"""

import re
import logging

logger = logging.getLogger(__name__)


def parse_llm_response(raw: str) -> dict:
    """
    Parse the LLM's structured response into a dict.
    
    Expected format:
    Answer: ...
    Legal Basis:
    - Article X
    - Case Y
    Simple Explanation: ...
    Confidence: High/Medium/Low
    """
    result = {
        "answer": "",
        "legal_basis": [],
        "simple_explanation": "",
        "confidence": "Low",
        "eli5_explanation": None,
        "hindi_translation": None,
    }

    if not raw or not raw.strip():
        result["answer"] = "I was unable to generate a response. Please try again."
        return result

    try:
        # Extract Answer
        answer_match = re.search(
            r"Answer:\s*(.+?)(?=\n\s*Legal Basis:|$)",
            raw, re.DOTALL | re.IGNORECASE
        )
        if answer_match:
            result["answer"] = answer_match.group(1).strip()

        # Extract Legal Basis (bullet points)
        basis_match = re.search(
            r"Legal Basis:\s*((?:[-•*]\s*.+\n?)+)",
            raw, re.DOTALL | re.IGNORECASE
        )
        if basis_match:
            basis_text = basis_match.group(1)
            items = re.findall(r"[-•*]\s*(.+)", basis_text)
            result["legal_basis"] = [item.strip() for item in items if item.strip()]

        # Extract Simple Explanation
        simple_match = re.search(
            r"Simple Explanation:\s*(.+?)(?=\n\s*Confidence:|$)",
            raw, re.DOTALL | re.IGNORECASE
        )
        if simple_match:
            result["simple_explanation"] = simple_match.group(1).strip()

        # Extract Confidence
        confidence_match = re.search(
            r"Confidence:\s*(High|Medium|Low)",
            raw, re.IGNORECASE
        )
        if confidence_match:
            result["confidence"] = confidence_match.group(1).capitalize()

        # Fallback: if parsing failed, use raw response as answer
        if not result["answer"] and raw.strip():
            result["answer"] = raw.strip()[:1000]
            result["confidence"] = "Low"

    except Exception as e:
        logger.error(f"❌ Response parsing failed: {e}")
        result["answer"] = raw.strip()[:1000] if raw else "Parsing error occurred."

    return result
