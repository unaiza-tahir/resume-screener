import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Resume", path: "/upload" },
    { name: "AI Interview", path: "/interview" },
    { name: "FAQ", path: "/faq" },
    { name: "About", path: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0A1015]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3">
          <Logo size={40} />

          <div>
            <h1 className="text-xl font-bold text-white">
              AI Resume Screener
            </h1>

            <p className="text-xs text-slate-400">
              Smart Career Assistant
            </p>
          </div>
        </NavLink>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-2">
          {links.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-b from-[#22C7B5] to-[#0F9E92] text-[#06181A] shadow-[0_8px_20px_-6px_rgba(45,212,191,0.5)]"
                    : "text-slate-300 hover:bg-white/5 hover:text-[#5EEAD4]"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Upload Button */}
        <div className="hidden md:block">
          <NavLink
            to="/upload"
            className="bg-white/5 border border-white/15 backdrop-blur-sm hover:bg-white/10 text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5"
          >
            Upload Resume
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {open ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <>
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#0A1015] border-t border-white/10">

          <div className="flex flex-col p-4 gap-2">

            {links.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl font-medium ${
                    isActive
                      ? "bg-gradient-to-b from-[#22C7B5] to-[#0F9E92] text-[#06181A]"
                      : "text-slate-300 hover:bg-white/5"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            <NavLink
              to="/upload"
              onClick={() => setOpen(false)}
              className="mt-2 bg-white/5 border border-white/15 text-white rounded-xl text-center py-3 font-semibold hover:bg-white/10"
            >
              Upload Resume
            </NavLink>

          </div>

        </div>
      )}
    </header>
  );
}