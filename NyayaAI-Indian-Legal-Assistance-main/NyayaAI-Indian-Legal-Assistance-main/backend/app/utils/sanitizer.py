"""
Input Sanitizer
Prevents prompt injection and sanitizes user inputs.
"""

import re
import html


# Prompt injection patterns to detect and neutralize
INJECTION_PATTERNS = [
    r"ignore\s+(all\s+)?previous\s+instructions",
    r"forget\s+(your\s+)?instructions",
    r"you\s+are\s+now\s+a",
    r"act\s+as\s+(if\s+you\s+are\s+)?a",
    r"disregard\s+(all\s+)?previous",
    r"\[INST\]",
    r"\[/INST\]",
    r"<\|system\|>",
    r"<\|user\|>",
    r"<\|assistant\|>",
    r"###\s*(instruction|system|prompt)",
    r"SYSTEM\s*:",
    r"JAILBREAK",
    r"DAN\s+mode",
]


def sanitize_input(text: str) -> str:
    """
    Sanitize user input:
    1. Strip HTML entities
    2. Remove/neutralize prompt injection attempts
    3. Normalize whitespace
    4. Enforce length limit
    """
    if not text:
        return ""

    # 1. Unescape HTML entities
    text = html.unescape(text)

    # 2. Remove control characters
    text = re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]", "", text)

    # 3. Check for injection attempts and neutralize
    for pattern in INJECTION_PATTERNS:
        if re.search(pattern, text, re.IGNORECASE):
            # Log potential injection attempt (in production, alert security)
            text = re.sub(pattern, "[REDACTED]", text, flags=re.IGNORECASE)

    # 4. Normalize whitespace
    text = re.sub(r"\s+", " ", text).strip()

    # 5. Enforce max length
    if len(text) > 1000:
        text = text[:1000]

    return text


def is_legal_query(text: str) -> bool:
    """
    Basic check to ensure query is related to legal topics.
    Returns True if query seems legal in nature.
    """
    legal_indicators = [
        "law", "legal", "court", "article", "act", "constitution",
        "rights", "case", "section", "rule", "regulation", "india",
        "judge", "bail", "fir", "petition", "appeal", "crime",
        "contract", "property", "divorce", "tax", "lok", "rajya",
    ]
    text_lower = text.lower()
    return any(word in text_lower for word in legal_indicators)
