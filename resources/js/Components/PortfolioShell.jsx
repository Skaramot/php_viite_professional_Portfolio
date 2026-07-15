import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const navItems = [
    { label: 'Home', route: 'home' },
    { label: 'Experience', route: 'experience' },
    { label: 'Education', route: 'education' },
    { label: 'Skills', route: 'skills' },
    { label: 'Projects', route: 'projects' },
    { label: 'Publication', route: 'publication' },
    { label: 'Blog', route: 'blog.index' },
    { label: 'Contact', route: 'contact' },
];

export default function PortfolioShell({ title, children }) {
    const [isDark, setIsDark] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { url } = usePage();

    useEffect(() => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const stored = localStorage.getItem('theme');
        const shouldBeDark = stored ? stored === 'dark' : prefersDark;
        setIsDark(shouldBeDark);
        document.documentElement.classList.toggle('dark', shouldBeDark);
    }, []);

    const toggleTheme = () => {
        const next = !isDark;
        setIsDark(next);
        document.documentElement.classList.toggle('dark', next);
        localStorage.setItem('theme', next ? 'dark' : 'light');
    };

    const activePath = url === '' ? '/' : url;

    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-slate-100 dark:bg-[#0f172a] text-slate-800 dark:text-slate-100 font-sans flex flex-col">
                <header className="bg-white/80 backdrop-blur dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 shadow-sm sticky top-0 z-50">
                    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                        <Link
                            href={route('home')}
                            className="font-mono text-amber-500 font-bold tracking-wider hover:text-amber-600 transition"
                        >
                            &lt;/skaramot&gt;
                        </Link>

                        <div className="hidden lg:flex items-center gap-6">
                            {navItems.map((item) => {
                                const href = route(item.route);
                                const isActive = activePath === href;
                                return (
                                    <Link
                                        key={item.route}
                                        href={href}
                                        className={`text-sm font-medium transition ${
                                            isActive
                                                ? 'text-amber-500'
                                                : 'text-slate-600 hover:text-amber-500 dark:text-slate-400 dark:hover:text-amber-400'
                                        }`}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                type="button"
                                onClick={toggleTheme}
                                className="text-slate-500 hover:text-amber-500 dark:text-slate-400 dark:hover:text-amber-400 transition"
                                title="Toggle Dark Mode"
                            >
                                {isDark ? (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsMenuOpen((prev) => !prev)}
                                className="lg:hidden text-slate-500 hover:text-amber-500 dark:text-slate-400 transition"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <nav className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
                            <div className="flex flex-col px-4 py-2">
                                {navItems.map((item) => {
                                    const href = route(item.route);
                                    const isActive = activePath === href;
                                    return (
                                        <Link
                                            key={item.route}
                                            href={href}
                                            className={`px-4 py-3 text-sm font-medium transition rounded-lg ${
                                                isActive
                                                    ? 'bg-amber-50 dark:bg-amber-900/10 text-amber-500'
                                                    : 'text-slate-600 hover:bg-slate-50 hover:text-amber-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-amber-400'
                                            }`}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    );
                                })}
                            </div>
                        </nav>
                    )}
                </header>

                <main className="flex-1 mx-auto w-full max-w-6xl px-6 py-8">
                    <div className="animate-float-in">
                        {children}
                    </div>
                </main>

                <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-auto">
                    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 text-sm text-slate-500 dark:text-slate-400">
                        <div>
                            &copy; {new Date().getFullYear()} Karabo Motlaleselelo.
                        </div>
                        <div className="font-mono text-xs text-slate-400 dark:text-slate-500">
                            v1.0.0
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
