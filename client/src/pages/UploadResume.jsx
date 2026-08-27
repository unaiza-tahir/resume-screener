import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResultsPanel from '../components/ResultsPanel';

const MAX_MB = 10;
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function UploadResume() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [jobDesc, setJobDesc] = useState('');
  const [status, setStatus] = useState('idle');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [apiError, setApiError] = useState('');
  const inputRef = useRef(null);
  const resultsRef = useRef(null);
  const progressTimer = useRef(null);

  const validate = (f) => {
    const okType = /\.(pdf|docx)$/i.test(f.name);
    const okSize = f.size <= MAX_MB * 1024 * 1024;
    if (!okType) return 'Please upload a PDF or DOCX file.';
    if (!okSize) return `File must be under ${MAX_MB} MB.`;
    return '';
  };

  const handleFiles = (files) => {
    const f = files && files[0];
    if (!f) return;
    const err = validate(f);
    if (err) {
      setError(err);
      setFile(null);
      return;
    }
    setError('');
    setFile(f);
    setResult(null);
    setStatus('idle');
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  }, []);

  const words = jobDesc.trim() ? jobDesc.trim().split(/\s+/).length : 0;
  const canAnalyze = !!file && jobDesc.trim().length >= 30 && status !== 'analyzing';

  const startFakeProgress = () => {
    setProgress(8);
    progressTimer.current = setInterval(() => {
      setProgress((p) => (p < 90 ? p + Math.random() * 10 : p));
    }, 400);
  };

  const stopFakeProgress = (finalValue) => {
    if (progressTimer.current) clearInterval(progressTimer.current);
    setProgress(finalValue);
  };

  const onAnalyze = async () => {
    if (!file) return;
    if (jobDesc.trim().length < 30) {
      setApiError('Job description must be at least 30 characters.');
      return;
    }

    setStatus('analyzing');
    setApiError('');
    setResult(null);
    startFakeProgress();

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('job_description', jobDesc.trim());

    try {
      const res = await fetch(API_URL + '/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || 'Something went wrong while analyzing your resume.');
      }

      stopFakeProgress(100);
      setResult(data);
      setStatus('done');
      setTimeout(function () {
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 250);
    } catch (err) {
      stopFakeProgress(0);
      if (err.message === 'Failed to fetch') {
        setApiError('Could not reach the backend. Make sure the server is running at ' + API_URL);
      } else {
        setApiError(err.message);
      }
      setStatus('error');
    }
  };

  const goToInterview = () => {
    navigate('/interview', { state: { file, jobDescription: jobDesc } });
  };

  return (
    <main className="relative max-w-6xl mx-auto px-6 py-14 bg-[#0A1015] text-slate-200 min-h-screen">
      {/* ambient glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[40rem] h-[22rem] bg-[#0F6483]/20 blur-[130px] rounded-full" />

      <div className="relative">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Upload &amp; Analyze</h1>
        <p className="mt-2 text-slate-400">Upload your resume and paste the job description to get an AI analysis.</p>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl p-6 bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 backdrop-blur-sm shadow-[0_20px_45px_-20px_rgba(0,0,0,0.6)]">
            <h2 className="font-semibold text-white">1. Upload Resume</h2>
            <p className="text-sm text-slate-400 mt-0.5">PDF or DOCX, up to {MAX_MB} MB.</p>

            <div
              onDragOver={function (e) { e.preventDefault(); setDragOver(true); }}
              onDragLeave={function () { setDragOver(false); }}
              onDrop={onDrop}
              onClick={function () { if (inputRef.current) inputRef.current.click(); }}
              role="button"
              tabIndex={0}
              onKeyDown={function (e) { if (e.key === 'Enter' && inputRef.current) inputRef.current.click(); }}
              className={
                'focus-ring mt-4 rounded-xl border-2 border-dashed h-44 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-200 ' +
                (dragOver
                  ? 'border-[#2DD4BF] bg-[#2DD4BF]/10 shadow-[0_0_0_4px_rgba(45,212,191,0.12)]'
                  : 'border-white/15 hover:border-[#2DD4BF]/50 hover:bg-white/[0.03]')
              }
            >
              <span className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2DD4BF]/25 to-transparent border border-white/10 text-[#5EEAD4] flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 14.9A7 7 0 0 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                  <path d="M12 12v9" />
                  <path d="m8 16 4-4 4 4" />
                </svg>
              </span>
              <span className="text-sm text-slate-300">
                {file ? (
                  <span className="font-medium text-[#5EEAD4]">{file.name}</span>
                ) : (
                  'Drag & drop or click to upload'
                )}
              </span>
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,.docx"
                className="hidden"
                onChange={function (e) { handleFiles(e.target.files); }}
              />
            </div>
            {error ? <p className="mt-2 text-sm text-rose-400">{error}</p> : null}
          </div>

          <div className="rounded-2xl p-6 bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 backdrop-blur-sm shadow-[0_20px_45px_-20px_rgba(0,0,0,0.6)]">
            <h2 className="font-semibold text-white">2. Job Description</h2>
            <p className="text-sm text-slate-400 mt-0.5">Paste the full job description below.</p>

            <textarea
              value={jobDesc}
              onChange={function (e) { setJobDesc(e.target.value); }}
              placeholder="Paste the job description here..."
              className="focus-ring mt-4 w-full h-44 resize-none rounded-xl border border-white/10 bg-black/25 p-4 text-sm text-slate-200 placeholder:text-slate-500 outline-none focus:border-[#2DD4BF]/60"
            />
            <p className="mt-2 text-xs text-slate-500">
              {jobDesc.length} characters &middot; {words} words
              {jobDesc.trim().length > 0 && jobDesc.trim().length < 30 ? (
                <span className="text-amber-400"> &middot; minimum 30 characters</span>
              ) : null}
            </p>
          </div>
        </div>

        {status === 'analyzing' && (
          <div className="mt-6 rounded-2xl p-5 bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 backdrop-blur-sm">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-white">Analyzing your resume...</span>
              <span className="text-slate-400">{Math.min(100, Math.round(progress))}%</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#2DD4BF] to-[#0F6483] transition-all duration-300"
                style={{ width: `${Math.min(100, progress)}%` }}
              />
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col items-end gap-3">
          {apiError ? <p className="text-sm text-rose-400 max-w-lg text-right">{apiError}</p> : null}
          <button
            onClick={onAnalyze}
            disabled={!canAnalyze}
            className="focus-ring bg-gradient-to-b from-[#22C7B5] to-[#0F9E92] text-[#06181A] disabled:bg-white/10 disabled:from-white/10 disabled:to-white/10 disabled:text-slate-500 disabled:shadow-none disabled:cursor-not-allowed text-sm font-semibold px-6 py-2.5 rounded-xl shadow-[0_10px_30px_-8px_rgba(45,212,191,0.6)] hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center gap-2"
          >
            {status === 'analyzing' ? (
              <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <circle cx="12" cy="12" r="10" opacity="0.25" />
                <path d="M22 12a10 10 0 0 0-10-10" />
              </svg>
            ) : null}
            {status === 'analyzing' ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>

        <div ref={resultsRef}>
          <ResultsPanel result={result} />
          {result && (
            <div className="mt-6 rounded-2xl p-6 bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 backdrop-blur-sm flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_20px_45px_-20px_rgba(0,0,0,0.6)]">
              <div>
                <h3 className="font-semibold text-white">Ready to practice?</h3>
                <p className="mt-1 text-sm text-slate-400">
                  Try a mock interview for this exact role, based on your resume and this job description.
                </p>
              </div>
              <button
                onClick={goToInterview}
                className="focus-ring shrink-0 bg-white/5 border border-white/15 backdrop-blur-sm hover:bg-white/10 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
              >
                Start Interview →
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}