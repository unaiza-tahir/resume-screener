"""
Lightweight retrieval layer for the RAG (Retrieval-Augmented Generation) pipeline.

At startup, every chunk in the knowledge base is vectorized once with a
TF-IDF vectorizer. At query time, the incoming text (resume + job
description, an interview question, a candidate's answer, etc.) is
vectorized with the same vocabulary and compared against every knowledge
chunk using cosine similarity. The top-matching chunks are returned so they
can be injected into the LLM prompt as grounding context.

TF-IDF + cosine similarity is used instead of a neural embedding model
(e.g. sentence-transformers) to keep the service lightweight and avoid
heavy dependencies (PyTorch, large model downloads) that are unnecessary
for a small, fixed knowledge base of this size.
"""

from typing import List

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from . import config
from .knowledge_base import KNOWLEDGE_BASE

_vectorizer: TfidfVectorizer | None = None
_matrix = None


def _build_index() -> None:
    """Build the TF-IDF index once, lazily, on first use."""
    global _vectorizer, _matrix
    if _vectorizer is not None:
        return
    _vectorizer = TfidfVectorizer(stop_words="english")
    _matrix = _vectorizer.fit_transform([chunk["text"] for chunk in KNOWLEDGE_BASE])


def retrieve(query: str, top_k: int | None = None) -> List[str]:
    """Return the top_k knowledge-base chunks most relevant to `query`."""
    if not query or not query.strip():
        return []

    _build_index()
    k = top_k or config.RAG_TOP_K

    query_vector = _vectorizer.transform([query])
    scores = cosine_similarity(query_vector, _matrix).flatten()

    ranked_indices = scores.argsort()[::-1]

    results: List[str] = []
    for idx in ranked_indices[:k]:
        if scores[idx] <= 0:
            continue
        results.append(KNOWLEDGE_BASE[idx]["text"])
    return results


def format_context(chunks: List[str]) -> str:
    """Format retrieved chunks as a bullet list for inclusion in a prompt."""
    if not chunks:
        return "No specific guidelines retrieved; use general best practices."
    return "\n".join(f"- {chunk}" for chunk in chunks)