import os
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.environ.get('GROQ_API_KEY', '')
GROQ_MODEL = os.environ.get('GROQ_MODEL', 'llama-3.3-70b-versatile')
PORT = int(os.environ.get('PORT', '8001'))

ALLOWED_ORIGINS = os.environ.get(
    'ALLOWED_ORIGINS',
    'http://localhost:8000,http://127.0.0.1:8000'
).split(',')

# Number of knowledge-base chunks the retriever returns per query for the
# RAG pipeline (see app/retriever.py).
RAG_TOP_K = int(os.environ.get('RAG_TOP_K', '3'))