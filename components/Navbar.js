import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState('light');
    const router = useRouter();

    // Add shadow on scroll
    useEffect(() => {
    const handler = () => {
      const nav = document.querySelector('nav');
      if (!nav) return;
      if (window.scrollY > 8) nav.classList.add('scrolled-nav');
      else nav.classList.remove('scrolled-nav');
    };
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

    // Close mobile menu on route change
    useEffect(() => {
        const close = () => setIsOpen(false);
        router.events.on('routeChangeComplete', close);
        router.events.on('hashChangeComplete', close);
        return () => {
            router.events.off('routeChangeComplete', close);
            router.events.off('hashChangeComplete', close);
        };
    }, [router.events]);

    // Initialize theme (dark/light) and provide toggle
    useEffect(() => {
      if (typeof window === 'undefined') return;
      const saved = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initial = saved || (prefersDark ? 'dark' : 'light');
      setTheme(initial);
      const el = document.documentElement;
      if (initial === 'dark') el.classList.add('dark'); else el.classList.remove('dark');
    }, []);

    const toggleTheme = () => {
      const next = theme === 'dark' ? 'light' : 'dark';
      setTheme(next);
      const el = document.documentElement;
      if (next === 'dark') el.classList.add('dark'); else el.classList.remove('dark');
      try { localStorage.setItem('theme', next); } catch {}
    };

	return (
		<nav className="fixed inset-x-0 top-0 z-30 bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl supports-[backdrop-filter]:bg-white/30 border-b border-white/20 dark:border-white/10 transition-shadow">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					{/* Brand */}
					<div className="flex items-center gap-3">
						<a href="/" className="flex items-center gap-2">
							<img src="/assets/logo.png" alt="Akash Inter College Logo" className="h-8 w-auto" />
							<span className="text-sm font-semibold leading-none text-gray-900 dark:text-gray-100">
								AKASH INTER
								<span className="block text-[10px] text-gray-600 dark:text-gray-300">COLLEGE</span>
							</span>
						</a>
					</div>

					{/* Desktop nav */}
					<div className="hidden md:flex items-center gap-6 text-sm text-gray-700 dark:text-gray-200">
						<Link href="/" className="nav-glow hover:text-gray-900 dark:hover:text-white">Home</Link>
						<Link href="/about" className="nav-glow hover:text-gray-900 dark:hover:text-white">About</Link>
						<Link href="/academics" className="nav-glow hover:text-gray-900 dark:hover:text-white">Academics</Link>
						<Link href="/admissions" className="nav-glow hover:text-gray-900 dark:hover:text-white">Admissions</Link>
						<Link href="/faculty" className="nav-glow hover:text-gray-900 dark:hover:text-white">Faculty</Link>
						<Link href="/achievements" className="nav-glow hover:text-gray-900 dark:hover:text-white">Achievements</Link>
						<Link href="/gallery" className="nav-glow hover:text-gray-900 dark:hover:text-white">Gallery</Link>
						<Link href="/contact" className="nav-glow hover:text-gray-900 dark:hover:text-white">Contact</Link>
					</div>

					{/* CTA */}
					<div className="hidden md:flex items-center">
						<Link href="/admissions" className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 text-white shadow-sm hover:shadow-[0_0_0_3px_rgba(99,102,241,0.25)] transition-all">
							Admission Open
						</Link>
						{/* Search button removed */}
						<span className="ml-3 text-lg" role="img" aria-label="India">🇮🇳</span>
						<button onClick={toggleTheme} aria-label="Toggle dark mode" className="ml-3 p-2 rounded-full bg-white/40 dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10 hover:ring-primary/40 transition">
							{theme === 'dark' ? (
								/* Sun icon */
								<svg className="h-4 w-4 text-yellow-400" viewBox="0 0 24 24" fill="currentColor"><path d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.79 1.8-1.79Zm10.48 0 1.79-1.79-1.79-1.79-1.79 1.79 1.79 1.79ZM12 4.5a1 1 0 0 0 1-1V1h-2v2.5a1 1 0 0 0 1 1Zm0 15a1 1 0 0 0-1 1V23h2v-2.5a1 1 0 0 0-1-1Zm7.5-7.5a1 1 0 0 0 1-1H23v-2h-2.5a1 1 0 0 0-1 1 1 1 0 0 0 1 1ZM4.5 12a1 1 0 0 0-1-1H1v2h2.5a1 1 0 0 0 1-1Zm12.74 6.66 1.79 1.79 1.79-1.79-1.79-1.79-1.79 1.79ZM4.84 17.24l-1.8 1.79 1.8 1.79 1.79-1.79-1.79-1.79ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z"/></svg>
							) : (
								/* Moon icon */
								<svg className="h-4 w-4 text-gray-700" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/></svg>
							)}
						</button>
					</div>

					{/* Mobile button */}
                    <div className="md:hidden">
						<button
							aria-label="Toggle Menu"
                            aria-expanded={isOpen}
							className="inline-flex items-center justify-center rounded p-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-white/10"
							onClick={() => setIsOpen((v) => !v)}
						>
							<svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						</button>
					</div>
				</div>
			</div>

			{/* Mobile menu */}
            {isOpen && (
				<div className="md:hidden border-t border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900">
					<div className="space-y-1 px-4 py-3">
						<Link href="/" onClick={() => setIsOpen(false)} className="block px-2 py-2 rounded hover:bg-gray-50 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200">Home</Link>
						<Link href="/about" onClick={() => setIsOpen(false)} className="block px-2 py-2 rounded hover:bg-gray-50 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200">About</Link>
						<Link href="/academics" onClick={() => setIsOpen(false)} className="block px-2 py-2 rounded hover:bg-gray-50 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200">Academics</Link>
						<Link href="/admissions" onClick={() => setIsOpen(false)} className="block px-2 py-2 rounded hover:bg-gray-50 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200">Admissions</Link>
						<Link href="/faculty" onClick={() => setIsOpen(false)} className="block px-2 py-2 rounded hover:bg-gray-50 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200">Faculty</Link>
						<Link href="/achievements" onClick={() => setIsOpen(false)} className="block px-2 py-2 rounded hover:bg-gray-50 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200">Achievements</Link>
						<Link href="/gallery" onClick={() => setIsOpen(false)} className="block px-2 py-2 rounded hover:bg-gray-50 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200">Gallery</Link>
						<Link href="/contact" onClick={() => setIsOpen(false)} className="block px-2 py-2 rounded hover:bg-gray-50 dark:hover:bg-white/10 text-gray-700 dark:text-gray-200">Contact</Link>
						<div className="pt-2">
							<Link href="/admissions" onClick={() => setIsOpen(false)} className="block text-center px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 text-white hover:shadow-[0_0_0_3px_rgba(99,102,241,0.25)] transition-all">
								Admission Open
							</Link>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
}
