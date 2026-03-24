"""
Query Classifier
Determines which indexes to query based on the user's legal question.
Uses keyword heuristics (fast, no LLM call needed).
"""

import re
from typing import Literal

QueryType = Literal["constitutional", "case_law", "legislative", "general"]

# Keywords that signal Constitution queries
CONSTITUTION_KEYWORDS = [
    r"\barticle\s+\d+",
    r"\bfundamental rights?\b",
    r"\bdirective principles?\b",
    r"\bamendment\b",
    r"\bpart\s+[ivxlIVXL]+\b",
    r"\bpreamble\b",
    r"\bconstitution\b",
    r"\bwrit\b",
    r"\bhabeas corpus\b",
    r"\bmandamus\b",
    r"\bcertiorari\b",
    r"\bprohibition\b",
    r"\bquo warranto\b",
    r"\bfederal\b",
    r"\blegislature\b.*\bpower\b",
    r"\bseparation of powers?\b",
    r"\bjudicial review\b",
    r"\bunion.*state\b",
]

# Keywords that signal case law queries
CASE_LAW_KEYWORDS = [
    r"\bcase\b",
    r"\bjudgment\b",
    r"\bruling\b",
    r"\bvs\.?\b",
    r"\bvs\b",
    r"\bcourt\b",
    r"\bhigh court\b",
    r"\bsupreme court\b",
    r"\bverdict\b",
    r"\bprecedent\b",
    r"\bappeal\b",
    r"\bpetition\b",
    r"\blitigat\b",
    r"\bjudge\b",
    r"\bbail\b",
    r"\bacquit\b",
    r"\bconvict\b",
    r"\bfir\b",
    r"\bchargesheet\b",
    r"\btrial\b",
]

# Keywords that signal legislative/PRS queries
LEGISLATIVE_KEYWORDS = [
    r"\bact\b",
    r"\bbill\b",
    r"\blaw\b",
    r"\blegislat\b",
    r"\bparliament\b",
    r"\blok sabha\b",
    r"\brajya sabha\b",
    r"\bsection\s+\d+",
    r"\bcode\b",
    r"\bordinance\b",
    r"\bstatute\b",
    r"\bregulat\b",
    r"\bnotification\b",
    r"\bpolicy\b",
    r"\brule\s+\d+",
]


def classify_query(query: str) -> QueryType:
    """
    Classify query into one of 4 types:
    - constitutional: hits Constitution index primarily
    - case_law: hits Kanoon index primarily
    - legislative: hits PRS index primarily
    - general: hits all indexes
    """
    q = query.lower()

    constitution_score = _score(q, CONSTITUTION_KEYWORDS)
    case_law_score = _score(q, CASE_LAW_KEYWORDS)
    legislative_score = _score(q, LEGISLATIVE_KEYWORDS)

    # If strong constitutional signal
    if constitution_score >= 2:
        return "constitutional"

    # If strong case law signal
    if case_law_score >= 2:
        return "case_law"

    # If strong legislative signal
    if legislative_score >= 2:
        return "legislative"

    # If any signal at all, use the dominant one
    scores = {
        "constitutional": constitution_score,
        "case_law": case_law_score,
        "legislative": legislative_score,
    }
    max_score = max(scores.values())
    if max_score > 0:
        return max(scores, key=scores.get)

    # No clear signal → query all
    return "general"


def _score(text: str, patterns: list[str]) -> int:
    """Count how many keyword patterns match in text."""
    return sum(1 for p in patterns if re.search(p, text, re.IGNORECASE))


def get_retrieval_config(query_type: QueryType) -> dict:
    """
    Returns retrieval config: which indexes to query and top-k for each.
    """
    configs = {
        "constitutional": {
            "constitution": 3,
            "kanoon": 1,
            "prs": 1,
        },
        "case_law": {
            "constitution": 1,
            "kanoon": 3,
            "prs": 1,
        },
        "legislative": {
            "constitution": 1,
            "kanoon": 1,
            "prs": 3,
        },
        "general": {
            "constitution": 3,
            "kanoon": 2,
            "prs": 2,
        },
    }
    return configs.get(query_type, configs["general"])
