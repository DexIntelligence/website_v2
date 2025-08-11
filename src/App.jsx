import React, { useState, useEffect } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import { Menu, X, ChevronRight } from "lucide-react";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Products from "./pages/Products.jsx";
import Insights from "./pages/Insights.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import Contact from "./pages/Contact.jsx";

// ---- Quick tweak zone -------------------------------------------------------
const NAV_LINKS = [
  { label: "About", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Insights", to: "/insights" },
];
const CTA = { label: "Contact", to: "/contact" };
const LOGO_TEXT = "YourLogo"; // logo uses /logo.png
// ----------------------------------------------------------------------------

function useScrollShadow() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return scrolled;
}

function Header() {
  const [open, setOpen] = useState(false);
  const scrolled = useScrollShadow();
  const location = useLocation();

  // Close mobile drawer when route changes
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-shadow ${
        scrolled ? "shadow-sm" : "shadow-none"
      } backdrop-blur bg-black text-white`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-28 items-center justify-between">
          {/* Left: Logo (desktop size 2x) */}
          <Link to="/" className="flex items-center gap-2 group">
             <img src="/logo.png" alt="Dex Intelligence Inc." className="h-24 w-auto" />
          </Link>


          {/* Center/Right: Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="px-3 py-2 text-xl rounded-xl hover:text-brand transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right: CTA + Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <Link
              to={CTA.to}
              className="hidden sm:inline-flex items-center gap-1 bg-brand text-white px-3 py-2 text-lg font-medium hover:bg-[#d68c3f] transition-colors"
            >
              {CTA.label}
              <ChevronRight className="h-4 w-4" aria-hidden />
            </Link>

            <button
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/30 hover:border-brand transition-colors"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-[60]" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85%] bg-black text-white shadow-2xl p-6 border-l-2 border-brand/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="Dex Intelligence Inc." className="h-12 w-auto" />
              </div>
              <button
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/30 hover:border-brand hover:bg-brand/10 transition-all"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 divide-y divide-white/10">
              <div className="py-2 flex flex-col">
                {NAV_LINKS.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="rounded-lg px-4 py-3 text-xl font-medium hover:text-brand hover:bg-brand/10 transition-all duration-200"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="py-3">
                <Link
                  to={CTA.to}
                  className="inline-flex w-full items-center justify-center gap-2 bg-brand text-white px-4 py-3 text-lg font-medium hover:bg-[#d68c3f] transition-colors rounded-lg"
                >
                  {CTA.label}
                  <ChevronRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default function App() {
  return (
    <div className="min-h-[100vh] bg-gradient-to-b from-black via-neutral-900 to-neutral-800 text-white">
      <Header />
      {/* Routes render the page below the header */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/insights/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        {/* Optional: 404 fallback */}
        <Route
          path="*"
          element={
            <main className="mx-auto max-w-6xl px-4 sm:px-6 pt-24">
              <h1 className="text-2xl font-semibold mb-2">Page not found</h1>
              <p className="opacity-80">
                The page you’re looking for doesn’t exist. <Link to="/" className="text-brand underline">Go home</Link>.
              </p>
            </main>
          }
        />
      </Routes>
      <footer className="py-12 opacity-70 text-xs mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex justify-between items-center">
          <span>© {new Date().getFullYear()} Dex Intelligence Inc.</span>
          <span>Toronto, ON</span>
        </div>
      </footer>
    </div>
  );
}
