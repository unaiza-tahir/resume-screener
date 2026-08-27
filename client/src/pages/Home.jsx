import { Link } from 'react-router-dom';

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /><path d="M9 13h6" /><path d="M9 17h6" />
      </svg>
    ),
    title: 'AI Resume Analysis',
    desc: 'Upload your resume and a job description to get an instant, detailed match analysis.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" />
      </svg>
    ),
    title: 'ATS Score Check',
    desc: 'See exactly how applicant tracking systems will read and parse your resume.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
    ),
    title: 'Actionable Suggestions',
    desc: 'Get specific, practical tips to close skill gaps and strengthen your resume.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: 'AI Mock Interview',
    desc: 'Practice with role-specific, resume-based questions in a text chat interview, then get a scored report.',
  },
];

const stats = [
  { value: '100%', label: 'Free to use' },
  { value: '<60s', label: 'To get results' },
  { value: '5', label: 'Interview questions' },
];

const steps = [
  { n: '01', title: 'Upload Resume', desc: 'Add your PDF or DOCX resume, no account needed.', color: 'teal' },
  { n: '02', title: 'Paste Job Description', desc: 'Add the role you want to be evaluated against.', color: 'mauve' },
  { n: '03', title: 'Review Your Analysis', desc: 'See your ATS score, matching skills, and gaps.', color: 'teal' },
  { n: '04', title: 'Practice the Interview', desc: 'Take an AI mock interview and get a scored report.', color: 'mauve' },
];

const benefits = [
  'Completely free to use',
  'Instant, detailed feedback',
  'ATS-optimized scoring',
  'Realistic mock interview practice',
  'Works for any role or industry',
];

function HeroIllustration() {
  return (
    <div className="relative">
      {/* glow behind the card stack */}
      <div className="absolute -inset-10 bg-[radial-gradient(circle_at_30%_30%,rgba(45,212,191,0.35),transparent_60%),radial-gradient(circle_at_75%_70%,rgba(232,158,171,0.28),transparent_55%)] blur-2xl" />
      <svg viewBox="0 0 420 360" className="relative w-full h-auto max-w-md mx-auto drop-shadow-[0_25px_60px_rgba(0,0,0,0.55)]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cardGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#16222E" />
            <stop offset="100%" stopColor="#0E1720" />
          </linearGradient>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2DD4BF" />
            <stop offset="100%" stopColor="#E89EAB" />
          </linearGradient>
          <linearGradient id="barGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2DD4BF" />
            <stop offset="100%" stopColor="#1D8F9B" />
          </linearGradient>
        </defs>

        <rect x="40" y="30" width="220" height="290" rx="20" fill="url(#cardGrad)" stroke="rgba(255,255,255,0.06)" />
        <rect x="66" y="64" width="120" height="10" rx="5" fill="url(#barGrad)" />
        <rect x="66" y="86" width="168" height="7" rx="3.5" fill="rgba(255,255,255,0.10)" />
        <rect x="66" y="102" width="168" height="7" rx="3.5" fill="rgba(255,255,255,0.10)" />
        <rect x="66" y="118" width="120" height="7" rx="3.5" fill="rgba(255,255,255,0.10)" />
        <rect x="66" y="146" width="80" height="8" rx="4" fill="#E89EAB" />
        <rect x="66" y="166" width="168" height="7" rx="3.5" fill="rgba(255,255,255,0.10)" />
        <rect x="66" y="182" width="150" height="7" rx="3.5" fill="rgba(255,255,255,0.10)" />
        <rect x="66" y="210" width="80" height="8" rx="4" fill="#E89EAB" />
        <rect x="66" y="230" width="168" height="7" rx="3.5" fill="rgba(255,255,255,0.10)" />
        <rect x="66" y="246" width="140" height="7" rx="3.5" fill="rgba(255,255,255,0.10)" />
        <rect x="66" y="262" width="168" height="7" rx="3.5" fill="rgba(255,255,255,0.10)" />

        <circle cx="330" cy="90" r="54" fill="url(#cardGrad)" stroke="rgba(255,255,255,0.06)" />
        <circle cx="330" cy="90" r="34" fill="none" stroke="url(#ringGrad)" strokeWidth="7" strokeDasharray="160" strokeDashoffset="30" strokeLinecap="round" transform="rotate(-90 330 90)" />
        <text x="330" y="97" textAnchor="middle" fontSize="22" fontWeight="700" fill="#F1F5F9" fontFamily="Lexend, sans-serif">82%</text>

        <rect x="270" y="190" width="130" height="130" rx="20" fill="url(#cardGrad)" stroke="rgba(255,255,255,0.06)" />
        <circle cx="335" cy="228" r="18" fill="rgba(45,212,191,0.15)" />
        <path d="M328 228l5 5 10-10" stroke="#2DD4BF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <rect x="290" y="256" width="90" height="7" rx="3.5" fill="rgba(255,255,255,0.10)" />
        <rect x="290" y="272" width="70" height="7" rx="3.5" fill="rgba(255,255,255,0.10)" />
        <rect x="290" y="292" width="60" height="18" rx="9" fill="url(#barGrad)" />
      </svg>
    </div>
  );
}

export default function Home() {
  return (
    <main className="bg-[#0A1015] text-slate-200">
      {/* Hero — deep space-teal gradient with floating glow orbs */}
      <section className="relative overflow-hidden bg-[#0A1015]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,rgba(15,100,131,0.55),transparent_60%)]" />
        <div className="absolute -top-32 -left-24 w-96 h-96 rounded-full bg-[#2DD4BF]/20 blur-[110px]" />
        <div className="absolute top-40 -right-24 w-[28rem] h-[28rem] rounded-full bg-[#E89EAB]/15 blur-[130px]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="2" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
        <div className="relative max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-200 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-sm">
              AI-Powered &middot; Free &middot;
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl font-bold text-white leading-tight [text-shadow:0_2px_20px_rgba(45,212,191,0.25)]">
              Land your next role with a resume that <span className="bg-gradient-to-r from-[#2DD4BF] to-[#E89EAB] bg-clip-text text-transparent">actually gets read.</span>
            </h1>
            <p className="mt-5 text-lg text-slate-400 leading-relaxed max-w-lg">
              Upload your resume and a job description. Get an instant ATS score, skill-gap
              analysis, and a realistic AI mock interview — completely free.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/upload"
                className="focus-ring bg-gradient-to-b from-[#22C7B5] to-[#0F9E92] text-[#06181A] text-sm font-semibold px-6 py-3 rounded-xl shadow-[0_10px_30px_-8px_rgba(45,212,191,0.6)] hover:shadow-[0_14px_36px_-6px_rgba(45,212,191,0.75)] hover:-translate-y-0.5 transition-all duration-200"
              >
                Analyze My Resume
              </Link>
              <Link
                to="/interview"
                className="focus-ring bg-white/5 border border-white/15 backdrop-blur-sm hover:bg-white/10 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
              >
                Try AI Interview
              </Link>
            </div>
          </div>
          <HeroIllustration />
        </div>
      </section>

      {/* Stats strip */}
      <section className="bg-[#0E161C] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">{s.value}</div>
              <div className="mt-1 text-xs sm:text-sm text-slate-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold text-[#E89EAB] uppercase tracking-wide">Features</span>
          <h2 className="mt-2 text-3xl font-bold text-white">Everything you need to prepare</h2>
          <p className="mt-3 text-slate-400">From resume analysis to interview practice, in one clean workflow.</p>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6" style={{ perspective: '1200px' }}>
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group relative rounded-2xl p-6 bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:[transform:rotateX(4deg)_rotateY(-4deg)] hover:shadow-[0_25px_50px_-15px_rgba(0,0,0,0.6)]"
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-lg ${
                  i % 2 === 0
                    ? 'bg-gradient-to-br from-[#2DD4BF] to-[#0F6483] text-[#06181A] shadow-[0_8px_20px_-6px_rgba(45,212,191,0.6)]'
                    : 'bg-gradient-to-br from-[#E89EAB] to-[#A7878D] text-[#2B1418] shadow-[0_8px_20px_-6px_rgba(232,158,171,0.5)]'
                }`}
              >
                {f.icon}
              </div>
              <h3 className="mt-4 font-semibold text-white">{f.title}</h3>
              <p className="mt-1.5 text-sm text-slate-400 leading-relaxed">{f.desc}</p>
              <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_50%_0%,rgba(45,212,191,0.10),transparent_70%)]" />
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="relative py-20 bg-[#0E161C] border-y border-white/5 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[36rem] h-[20rem] bg-[#0F6483]/20 blur-[120px] rounded-full" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-semibold text-[#2DD4BF] uppercase tracking-wide">Process</span>
            <h2 className="mt-2 text-3xl font-bold text-white">How it works</h2>
            <p className="mt-3 text-slate-400">Four simple steps, no account required.</p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div
                key={s.n}
                className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-b from-white/[0.06] to-white/[0.02] border border-white/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-white/20"
              >
                <span
                  className={`text-3xl font-bold ${
                    s.color === 'teal'
                      ? 'bg-gradient-to-b from-[#5EEAD4] to-[#0F6483] bg-clip-text text-transparent'
                      : 'bg-gradient-to-b from-[#F4C6CE] to-[#A7878D] bg-clip-text text-transparent'
                  }`}
                >
                  {s.n}
                </span>
                <h3 className="mt-3 font-semibold text-white">{s.title}</h3>
                <p className="mt-1.5 text-sm text-slate-400 leading-relaxed">{s.desc}</p>
                <span
                  className={`absolute -bottom-6 -right-6 w-20 h-20 rounded-full blur-xl opacity-30 ${
                    s.color === 'teal' ? 'bg-[#2DD4BF]' : 'bg-[#E89EAB]'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-xs font-semibold text-[#E89EAB] uppercase tracking-wide">Why us</span>
          <h2 className="mt-2 text-3xl font-bold text-white">Why job seekers use this</h2>
          <p className="mt-3 text-slate-400 leading-relaxed">
            Built to make resume prep and interview practice accessible
            to everyone, with no cost and no account.
          </p>
          <ul className="mt-6 space-y-3">
            {benefits.map((b, i) => (
              <li key={b} className="flex items-center gap-3 text-slate-200">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 shadow-md ${
                    i % 2 === 0
                      ? 'bg-gradient-to-br from-[#2DD4BF] to-[#0F6483] text-[#06181A]'
                      : 'bg-gradient-to-br from-[#E89EAB] to-[#A7878D] text-[#2B1418]'
                  }`}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <span className="text-sm">{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative rounded-3xl p-8 bg-gradient-to-br from-[#123645] to-[#0A1F27] border border-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] [transform:rotateY(-3deg)] hover:[transform:rotateY(0deg)] transition-transform duration-500">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2DD4BF]/25 to-transparent border border-white/10 text-[#5EEAD4] flex items-center justify-center">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-white">Chat-style practice</h3>
              <p className="text-sm text-slate-400">A text interview, question by question, just like the real thing.</p>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            <div className="h-2 rounded-full bg-white/10"><div className="h-2 rounded-full bg-gradient-to-r from-[#2DD4BF] to-[#0F6483] w-4/5" /></div>
            <div className="h-2 rounded-full bg-white/10"><div className="h-2 rounded-full bg-gradient-to-r from-[#F4C6CE] to-[#E89EAB] w-3/5" /></div>
            <div className="h-2 rounded-full bg-white/10"><div className="h-2 rounded-full bg-gradient-to-r from-[#2DD4BF] to-[#0F6483] w-2/3" /></div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="rounded-3xl px-8 py-14 text-center relative overflow-hidden border border-white/10 bg-gradient-to-br from-[#5C3A42] via-[#7A4C56] to-[#3A2226] shadow-[0_40px_80px_-25px_rgba(0,0,0,0.8)]">
          <div className="absolute -top-20 -left-10 w-64 h-64 bg-[#E89EAB]/25 blur-[100px] rounded-full" />
          <div className="absolute -bottom-24 -right-10 w-72 h-72 bg-[#2DD4BF]/15 blur-[110px] rounded-full" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots2" width="28" height="28" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="2" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots2)" />
          </svg>
          <div className="relative">
            <h2 className="text-3xl font-bold text-white">Ready to see where you stand?</h2>
            <p className="mt-3 text-white/80 max-w-lg mx-auto">
              Get your resume analyzed in under a minute — completely free
            </p>
            <Link
              to="/upload"
              className="focus-ring mt-7 inline-flex items-center bg-gradient-to-b from-[#22C7B5] to-[#0F9E92] text-[#06181A] text-sm font-semibold px-7 py-3 rounded-xl shadow-[0_14px_30px_-8px_rgba(45,212,191,0.6)] hover:-translate-y-0.5 transition-all duration-200"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}