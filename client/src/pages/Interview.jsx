import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import {
  PDF,
  MARGIN,
  CONTENT_W,
  addWatermark,
  addHeader,
  addFooter,
  ensureSpace,
  scoreBox,
  scoreColor,
  sectionTitle,
  bulletList,
  calloutBox,
} from '../utils/pdfReport';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const MAX_MB = 10;
const QUESTION_SECONDS = 120;

function ScoreRing({ score, size = 96, label }) {
  const color = score >= 75 ? '#2DD4BF' : score >= 50 ? '#E89EAB' : '#F87171';
  const r = size / 2 - 8;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (score / 100) * circumference;
  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox={`0 0 ${size} ${size}`} className="-rotate-90 drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)]" width={size} height={size}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.6s ease', filter: `drop-shadow(0 0 6px ${color}80)` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-white">{score}%</span>
        </div>
      </div>
      {label && <span className="mt-2 text-sm font-medium text-slate-400 text-center">{label}</span>}
    </div>
  );
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}

function downloadInterviewReport(report) {
  const doc = new jsPDF();
  const pageNumRef = { n: 1 };
  const x = MARGIN;
  const w = CONTENT_W;

  addWatermark(doc);
  let y = addHeader(doc, 'AI Interview Report', 'Scored evaluation of your mock interview performance');
  addFooter(doc, pageNumRef.n);

  const boxW = (w - 6) / 2;
  const boxH = 26;
  scoreBox(doc, x, y, boxW, boxH, 'Overall Score', report.overallScore, scoreColor(report.overallScore));
  scoreBox(doc, x + boxW + 6, y, boxW, boxH, 'Communication', report.communicationScore, scoreColor(report.communicationScore));
  y += boxH + 6;
  scoreBox(doc, x, y, boxW, boxH, 'Technical', report.technicalScore, scoreColor(report.technicalScore));
  scoreBox(doc, x + boxW + 6, y, boxW, boxH, 'Confidence', report.confidenceScore, scoreColor(report.confidenceScore));
  y += boxH + 10;

  y = ensureSpace(doc, y, 30, pageNumRef);
  y = sectionTitle(doc, 'Summary', x, y);
  y = calloutBox(doc, report.summary || 'No summary available.', x, y, w);

  y = ensureSpace(doc, y, 30, pageNumRef);
  y = sectionTitle(doc, 'Strengths', x, y, PDF.primaryDark);
  y = bulletList(doc, report.strengths, x, y, w);

  y = ensureSpace(doc, y, 30, pageNumRef);
  y = sectionTitle(doc, 'Areas to Improve', x, y, PDF.secondaryDark);
  y = bulletList(doc, report.improvements, x, y, w);

  y = ensureSpace(doc, y, 30, pageNumRef);
  y = sectionTitle(doc, 'Question-by-Question Breakdown', x, y);

  (report.questions || [])
    .filter((q) => q.answer)
    .forEach((q, i) => {
      y = ensureSpace(doc, y, 26, pageNumRef);

      doc.setFillColor(...PDF.lightBg);
      doc.setDrawColor(...PDF.border);
      doc.setLineWidth(0.4);
      const qLines = doc.splitTextToSize(`Q${i + 1}: ${q.question}`, w - 24);
      const fLines = doc.splitTextToSize(q.feedback || '', w - 12);
      const boxH2 = (qLines.length + fLines.length) * 5 + 12;
      doc.roundedRect(x, y, w, boxH2, 3, 3, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(...PDF.dark);
      doc.text(qLines, x + 5, y + 7);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(...PDF.secondaryDark);
      doc.text(`${q.score ?? '-'}/10`, x + w - 5, y + 7, { align: 'right' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...PDF.gray);
      doc.text(fLines, x + 5, y + 7 + qLines.length * 5 + 3);

      y += boxH2 + 5;
    });

  doc.save('interview-report.pdf');
}

const cardClass =
  'rounded-2xl p-6 bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 backdrop-blur-sm shadow-[0_20px_45px_-20px_rgba(0,0,0,0.6)]';

export default function Interview() {
  const location = useLocation();
  const passed = location.state || {};

  const [phase, setPhase] = useState('setup');

  const [file, setFile] = useState(passed.file || null);
  const [jobDesc, setJobDesc] = useState(passed.jobDescription || '');
  const [setupError, setSetupError] = useState('');
  const [starting, setStarting] = useState(false);

  const [interviewId, setInterviewId] = useState(null);
  const [current, setCurrent] = useState(null);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [ending, setEnding] = useState(false);
  const [lastFeedback, setLastFeedback] = useState(null);
  const [report, setReport] = useState(null);
  const [apiError, setApiError] = useState('');
  const [timeLeft, setTimeLeft] = useState(QUESTION_SECONDS);

  const fileInputRef = useRef(null);

  const canStart = !!file && jobDesc.trim().length >= 30 && !starting;

  const handleFile = (files) => {
    const f = files && files[0];
    if (!f) return;
    const okType = /\.(pdf|docx)$/i.test(f.name);
    const okSize = f.size <= MAX_MB * 1024 * 1024;
    if (!okType) return setSetupError('Please upload a PDF or DOCX file.');
    if (!okSize) return setSetupError(`File must be under ${MAX_MB} MB.`);
    setSetupError('');
    setFile(f);
  };

  const startInterview = async () => {
    if (!canStart) return;
    setStarting(true);
    setSetupError('');

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('job_description', jobDesc.trim());
    formData.append('mode', 'text');

    try {
      const res = await fetch(`${API_URL}/api/interview/start`, { method: 'POST', body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Could not start the interview.');

      setInterviewId(data.interviewId);
      setCurrent({ index: data.index, total: data.total, question: data.question, category: data.category });
      setTimeLeft(QUESTION_SECONDS);
      setPhase('interview');
    } catch (err) {
      setSetupError(
        err.message === 'Failed to fetch'
          ? 'Could not reach the backend. Make sure the server is running at ' + API_URL
          : err.message
      );
    } finally {
      setStarting(false);
    }
  };

  useEffect(() => {
    if (phase !== 'interview') return;
    setTimeLeft(QUESTION_SECONDS);
    const t = setInterval(() => setTimeLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [phase, current?.index]);

  const submitAnswer = async () => {
    const answer = typedAnswer.trim();
    if (!answer || submitting) return;

    setSubmitting(true);
    setApiError('');

    try {
      const res = await fetch(`${API_URL}/api/interview/${interviewId}/answer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answer }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Could not submit your answer.');

      setLastFeedback({ score: data.questionScore, feedback: data.questionFeedback });
      setTypedAnswer('');

      if (data.completed) {
        setReport(data.report);
        setPhase('report');
      } else {
        setCurrent(data.next);
      }
    } catch (err) {
      setApiError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const endInterview = async () => {
    if (ending || !interviewId) return;
    setEnding(true);
    setApiError('');

    try {
      const res = await fetch(`${API_URL}/api/interview/${interviewId}/end`, { method: 'POST' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Could not end the interview.');
      setReport(data.report);
      setPhase('report');
    } catch (err) {
      setApiError(err.message);
    } finally {
      setEnding(false);
    }
  };

  if (phase === 'setup') {
    return (
      <main className="relative max-w-3xl mx-auto px-6 py-14 bg-[#0A1015] text-slate-200 min-h-screen overflow-hidden">
        <div className="pointer-events-none absolute -top-24 right-0 w-96 h-96 bg-[#0F6483]/20 blur-[120px] rounded-full" />

        <div className="relative">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">AI Interview</h1>
          <p className="mt-2 text-slate-400">
            Practice a real interview for this role. The AI asks questions based on your resume and the
            job description, then gives you a scored report at the end.
          </p>

          <div className={`mt-8 ${cardClass}`}>
            <h2 className="font-semibold text-white">1. Resume</h2>
            {file ? (
              <p className="mt-2 text-sm text-[#5EEAD4] font-medium">{file.name}</p>
            ) : (
              <p className="mt-2 text-sm text-slate-400">No resume selected yet.</p>
            )}
            <button
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
              className="focus-ring mt-3 text-sm font-medium text-white bg-white/5 hover:bg-white/10 border border-white/15 rounded-xl px-4 py-2 transition-all duration-200"
            >
              {file ? 'Change file' : 'Upload resume (PDF or DOCX)'}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx"
              className="hidden"
              onChange={(e) => handleFile(e.target.files)}
            />
          </div>

          <div className={`mt-6 ${cardClass}`}>
            <h2 className="font-semibold text-white">2. Job Description</h2>
            <textarea
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              placeholder="Paste the job description here..."
              className="focus-ring mt-3 w-full h-32 resize-none rounded-xl border border-white/10 bg-black/25 p-4 text-sm text-slate-200 placeholder:text-slate-500 outline-none focus:border-[#2DD4BF]/60"
            />
          </div>

          {setupError && <p className="mt-4 text-sm text-rose-400">{setupError}</p>}

          <div className="mt-8 flex justify-end">
            <button
              onClick={startInterview}
              disabled={!canStart}
              className="focus-ring bg-gradient-to-b from-[#22C7B5] to-[#0F9E92] text-[#06181A] disabled:bg-white/10 disabled:from-white/10 disabled:to-white/10 disabled:text-slate-500 disabled:shadow-none disabled:cursor-not-allowed text-sm font-semibold px-6 py-2.5 rounded-xl shadow-[0_10px_30px_-8px_rgba(45,212,191,0.6)] hover:-translate-y-0.5 transition-all duration-200"
            >
              {starting ? 'Preparing questions...' : 'Start Interview'}
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (phase === 'interview' && current) {
    const timeUp = timeLeft === 0;
    return (
      <main className="relative max-w-3xl mx-auto px-6 py-14 bg-[#0A1015] text-slate-200 min-h-screen overflow-hidden">
        <div className="pointer-events-none absolute -top-24 right-0 w-96 h-96 bg-[#0F6483]/20 blur-[120px] rounded-full" />

        <div className="relative">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-white">AI Interview</h1>
            <div className="flex items-center gap-3">
              <span
                className={`text-sm font-mono px-2.5 py-1 rounded-lg border ${
                  timeUp ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-white/5 text-slate-300 border-white/10'
                }`}
              >
                ⏱ {formatTime(timeLeft)}
              </span>
              <span className="text-sm text-slate-400">
                Question {current.index + 1} of {current.total}
              </span>
            </div>
          </div>

          <div className="mt-3 w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#2DD4BF] to-[#0F6483] transition-all duration-500"
              style={{ width: `${(current.index / current.total) * 100}%` }}
            />
          </div>

          {lastFeedback && (
            <div className="mt-6 rounded-xl p-4 bg-white/[0.04] border border-white/10">
              <p className="text-xs font-medium text-slate-400">Previous answer &middot; {lastFeedback.score}/10</p>
              <p className="mt-1 text-sm text-slate-300">{lastFeedback.feedback}</p>
            </div>
          )}

          <div className="mt-6 flex gap-3">
            <span className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#2DD4BF] to-[#0F6483] text-[#06181A] text-xs font-bold flex items-center justify-center shadow-md">AI</span>
            <div className={`flex-1 ${cardClass}`}>
              <span className="text-xs font-medium uppercase tracking-wide text-[#5EEAD4]">{current.category}</span>
              <p className="mt-2 text-base font-semibold text-white leading-snug">{current.question}</p>
            </div>
          </div>

          <div className="mt-4 flex gap-3 justify-end">
            <div className={`flex-1 ${cardClass}`}>
              <textarea
                value={typedAnswer}
                onChange={(e) => setTypedAnswer(e.target.value)}
                placeholder="Type your answer..."
                className="focus-ring w-full h-32 resize-none rounded-xl border border-white/10 bg-black/25 p-4 text-sm text-slate-200 placeholder:text-slate-500 outline-none focus:border-[#2DD4BF]/60"
              />

              {apiError && <p className="mt-3 text-sm text-rose-400">{apiError}</p>}

              <div className="mt-4 flex flex-wrap justify-between items-center gap-3">
                <button
                  onClick={endInterview}
                  disabled={ending}
                  className="focus-ring text-sm font-medium text-slate-400 hover:text-rose-400 transition-colors disabled:opacity-50"
                >
                  {ending ? 'Ending...' : 'End Interview'}
                </button>
                <button
                  onClick={submitAnswer}
                  disabled={!typedAnswer.trim() || submitting}
                  className="focus-ring bg-gradient-to-b from-[#22C7B5] to-[#0F9E92] text-[#06181A] disabled:bg-white/10 disabled:from-white/10 disabled:to-white/10 disabled:text-slate-500 disabled:shadow-none disabled:cursor-not-allowed text-sm font-semibold px-6 py-2.5 rounded-xl shadow-[0_10px_30px_-8px_rgba(45,212,191,0.6)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  {submitting ? 'Evaluating...' : 'Next Question →'}
                </button>
              </div>
            </div>
            <span className="shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[#E89EAB] to-[#A7878D] text-[#2B1418] text-xs font-bold flex items-center justify-center shadow-md">You</span>
          </div>
        </div>
      </main>
    );
  }

  if (phase === 'report' && report) {
    return (
      <main className="relative max-w-3xl mx-auto px-6 py-14 bg-[#0A1015] text-slate-200 min-h-screen overflow-hidden">
        <div className="pointer-events-none absolute -top-24 right-0 w-96 h-96 bg-[#0F6483]/20 blur-[120px] rounded-full" />

        <div className="relative">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Interview Report</h1>
              <p className="mt-2 text-slate-400">Here's how you did.</p>
            </div>
            <button
              onClick={() => downloadInterviewReport(report)}
              className="focus-ring inline-flex items-center gap-2 bg-white/5 border border-white/15 backdrop-blur-sm hover:bg-white/10 hover:border-[#2DD4BF]/40 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all duration-200"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M7 10l5 5 5-5" /><path d="M12 15V3" />
              </svg>
              Download PDF
            </button>
          </div>

          <div className={`mt-8 ${cardClass}`}>
            <div className="grid sm:grid-cols-4 gap-6">
              <ScoreRing score={report.overallScore} label="Overall" size={100} />
              <ScoreRing score={report.communicationScore} label="Communication" />
              <ScoreRing score={report.technicalScore} label="Technical" />
              <ScoreRing score={report.confidenceScore} label="Confidence" />
            </div>
            <p className="mt-6 text-sm text-slate-300 leading-relaxed border-t border-white/10 pt-5">{report.summary}</p>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div className={cardClass}>
              <h3 className="font-semibold text-white mb-3">Strengths</h3>
              <ul className="space-y-2">
                {report.strengths.map((s, i) => (
                  <li key={i} className="text-sm text-slate-300">✅ {s}</li>
                ))}
              </ul>
            </div>
            <div className={cardClass}>
              <h3 className="font-semibold text-white mb-3">Areas to Improve</h3>
              <ul className="space-y-2">
                {report.improvements.map((s, i) => (
                  <li key={i} className="text-sm text-slate-300">💡 {s}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <h3 className="font-semibold text-white">Question-by-Question Breakdown</h3>
            {report.questions.filter((q) => q.answer).map((q, i) => (
              <div key={i} className="rounded-2xl p-4 bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 backdrop-blur-sm">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm font-medium text-white">{q.question}</p>
                  <span className="shrink-0 text-xs font-semibold text-[#5EEAD4]">{q.score}/10</span>
                </div>
                <p className="mt-2 text-xs text-slate-400">{q.feedback}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={() => window.location.reload()}
              className="focus-ring bg-white/5 border border-white/15 backdrop-blur-sm hover:bg-white/10 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
            >
              Start a New Interview
            </button>
          </div>
        </div>
      </main>
    );
  }

  return null;
}