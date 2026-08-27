"""
Static domain-knowledge base used by the retrieval layer (app/retriever.py).

Each entry is a short, self-contained chunk of expert guidance about resumes,
ATS systems, or interview evaluation. At query time, the retriever finds the
chunks most relevant to the current resume / job description / interview
answer and injects them into the prompt sent to the LLM, so the model's
output is grounded in explicit, consistent guidelines instead of relying
only on what it may recall from training.
"""

KNOWLEDGE_BASE = [
    # --- ATS / resume parsing ---
    {
        "id": "ats-formatting",
        "text": (
            "ATS-friendly resumes avoid tables, text boxes, headers/footers, and multi-column "
            "layouts, since many applicant tracking systems parse resumes linearly and can "
            "scramble or drop content placed in these elements."
        ),
    },
    {
        "id": "ats-keywords",
        "text": (
            "ATS systems and recruiters rank resumes higher when they mirror the exact keywords "
            "and skill names used in the job description (e.g. 'React.js' vs 'React', "
            "'Node.js' vs 'NodeJS'), rather than only using synonyms."
        ),
    },
    {
        "id": "ats-file-format",
        "text": (
            "A single-column .docx or well-tagged PDF is the safest resume format for ATS "
            "parsing; scanned images or resumes exported from design tools like Canva often "
            "parse poorly and lose section structure."
        ),
    },
    {
        "id": "ats-section-headers",
        "text": (
            "Standard section headers ('Experience', 'Education', 'Skills', 'Projects') are "
            "parsed more reliably by ATS software than creative or non-standard header names."
        ),
    },
    # --- Resume quality / content ---
    {
        "id": "resume-quantify-impact",
        "text": (
            "Strong resume bullet points quantify impact with numbers, percentages, or scale "
            "(e.g. 'reduced load time by 40%', 'served 10,000+ users') rather than only listing "
            "responsibilities or duties."
        ),
    },
    {
        "id": "resume-action-verbs",
        "text": (
            "Resume bullets that start with strong action verbs ('built', 'led', 'optimized', "
            "'designed') read as more results-oriented than passive phrasing like 'responsible "
            "for' or 'worked on'."
        ),
    },
    {
        "id": "resume-relevance",
        "text": (
            "A resume tailored to a specific job description prioritizes and reorders the most "
            "relevant projects and skills near the top, rather than listing every experience "
            "chronologically regardless of relevance."
        ),
    },
    {
        "id": "resume-length",
        "text": (
            "For early-career candidates, a single-page resume that focuses on the most relevant "
            "and impressive experience is generally preferred over a longer resume padded with "
            "minor or unrelated details."
        ),
    },
    {
        "id": "resume-common-gaps",
        "text": (
            "Common resume weaknesses include missing measurable outcomes, generic objective "
            "statements, inconsistent formatting/dates, and skills listed without any project or "
            "experience to back them up."
        ),
    },
    {
        "id": "resume-skills-gap",
        "text": (
            "When a job description lists required skills that don't appear anywhere in a "
            "candidate's resume, that is a genuine skills gap worth surfacing explicitly, rather "
            "than assuming familiarity based on adjacent or similar technologies."
        ),
    },
    # --- Interview question design ---
    {
        "id": "interview-question-grounding",
        "text": (
            "Effective interview questions reference specific projects, technologies, or claims "
            "from the candidate's own resume, rather than asking generic questions that any "
            "candidate for any role could answer identically."
        ),
    },
    {
        "id": "interview-star-method",
        "text": (
            "Strong behavioral answers typically follow the STAR structure: Situation, Task, "
            "Action, and measurable Result. Answers that only describe a situation without a "
            "concrete action or result are considered incomplete."
        ),
    },
    {
        "id": "interview-technical-depth",
        "text": (
            "A technically strong interview answer explains not just what was done, but why that "
            "approach was chosen over alternatives, and what trade-offs were involved — surface- "
            "level or memorized-sounding answers lack this reasoning."
        ),
    },
    # --- Answer / performance evaluation ---
    {
        "id": "eval-communication",
        "text": (
            "Communication quality in an interview answer is judged by structure and clarity: "
            "well-organized answers with a clear beginning, middle, and conclusion score higher "
            "than rambling or disorganized responses, independent of technical correctness."
        ),
    },
    {
        "id": "eval-confidence-signals",
        "text": (
            "Confidence in an answer is reflected in decisive, specific language ('I designed X "
            "because Y') rather than excessive hedging ('I think maybe', 'I'm not sure but') "
            "throughout the response."
        ),
    },
    {
        "id": "eval-score-consistency",
        "text": (
            "Interview scores should be assigned consistently: a score of 8-10 reflects a "
            "complete, specific, well-reasoned answer; 5-7 reflects a partially complete or "
            "generic answer; 0-4 reflects an answer that is missing, off-topic, or incorrect."
        ),
    },
    {
        "id": "eval-report-summary",
        "text": (
            "A useful final interview report balances genuine strengths with specific, "
            "actionable areas for improvement, rather than only offering generic praise or "
            "generic criticism that isn't tied to what the candidate actually said."
        ),
    },
]