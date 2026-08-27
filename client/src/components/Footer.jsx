import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0A1015] mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12 grid sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2">
          <div className="flex items-center gap-2.5">
            <Logo size={32} />
            <span className="font-display font-semibold text-white">AI Resume Screener</span>
          </div>
          <p className="mt-3 text-sm text-slate-400 max-w-sm leading-relaxed">
            Free AI-powered resume analysis and mock interview practice.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white">Product</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li><Link to="/upload" className="hover:text-[#5EEAD4] transition-colors">Resume Analysis</Link></li>
            <li><Link to="/interview" className="hover:text-[#5EEAD4] transition-colors">AI Interview</Link></li>
            <li><Link to="/faq" className="hover:text-[#5EEAD4] transition-colors">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white">About</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-400">
            <li><Link to="/about" className="hover:text-[#5EEAD4] transition-colors">About the project</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="text-xs text-slate-500">&copy; 2026 AI Resume Screener.</span>

        </div>
      </div>
    </footer>
  );
}