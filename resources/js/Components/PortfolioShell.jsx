import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const navItems = [
    { label: 'Home', route: 'home' },
    { label: 'Experience', route: 'experience' },
    { label: 'Education', route: 'education' },
    { label: 'Skills', route: 'skills' },
    { label: 'Projects', route: 'projects' },
    { label: 'Publication', route: 'publication' },
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
            <div className="relative min-h-screen overflow-hidden text-slate-900 dark:text-slate-100 cursor-soft">
                <div
                    className="absolute inset-0 -z-20 bg-cover bg-center animate-bg-drift"
                    style={{ backgroundImage: "url('/images/portfolio-bg.jpg')" }}
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/25 via-slate-900/10 to-black/35 dark:from-black/55 dark:via-slate-900/30 dark:to-black/65" />
                <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(255,180,105,0.35),rgba(30,41,59,0.25),rgba(255,140,120,0.25))] mix-blend-multiply animate-gradient-drift dark:bg-[linear-gradient(120deg,rgba(251,191,36,0.18),rgba(15,23,42,0.5),rgba(244,114,182,0.18))]" />
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(255,214,170,0.16),transparent_60%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,214,170,0.12),transparent_60%)]" />

                <header className="mx-auto flex max-w-6xl items-center justify-between px-6 pt-10">
                    <Link
                        href={route('home')}
                        className="rounded-full border border-white/20 bg-white/75 px-4 py-2 text-xs font-semibold tracking-[0.25em] text-amber-900 shadow-sm backdrop-blur transition hover:shadow-md dark:border-white/10 dark:bg-slate-900/50 dark:text-amber-200"
                    >
                        <span className="font-mono">&lt;/skaramot&gt;</span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={toggleTheme}
                            className="rounded-full border border-white/20 bg-white/80 px-4 py-2 text-sm font-semibold text-amber-900 shadow-sm backdrop-blur transition hover:shadow-md dark:border-white/10 dark:bg-slate-900/60 dark:text-amber-200"
                        >
                            {isDark ? 'Light mode' : 'Dark mode'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsMenuOpen((prev) => !prev)}
                            className="flex items-center gap-2 rounded-full border border-white/20 bg-white/80 px-4 py-2 text-sm font-semibold text-amber-900 shadow-sm backdrop-blur transition hover:shadow-md dark:border-white/10 dark:bg-slate-900/60 dark:text-amber-200"
                            aria-expanded={isMenuOpen}
                            aria-label="Toggle navigation"
                        >
                            <span className="flex h-3 w-4 flex-col justify-between">
                                <span className="h-0.5 w-full rounded bg-current" />
                                <span className="h-0.5 w-full rounded bg-current" />
                                <span className="h-0.5 w-full rounded bg-current" />
                            </span>
                            Menu
                        </button>
                    </div>
                </header>

                {isMenuOpen && (
                    <div className="mx-auto mt-6 max-w-6xl px-6">
                        <nav className="animate-float-in rounded-3xl border border-white/20 bg-white/85 p-4 shadow-[0_22px_60px_-32px_rgba(20,10,5,0.45)] backdrop-blur dark:border-white/10 dark:bg-slate-900/80">
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {navItems.map((item, index) => {
                                    const href = route(item.route);
                                    const isActive = activePath === href;
                                    return (
                                        <Link
                                            key={item.route}
                                            href={href}
                                            className={`animate-menu-pop rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                                                isActive
                                                    ? 'border-amber-300 bg-amber-100/90 text-amber-900 dark:border-amber-500/60 dark:bg-amber-950/70 dark:text-amber-200'
                                                    : 'border-white/30 bg-white/70 text-slate-800 hover:border-amber-200 hover:text-amber-900 dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-200'
                                            }`}
                                            style={{ animationDelay: `${index * 70}ms` }}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    );
                                })}
                            </div>
                        </nav>
                    </div>
                )}

                <main className="mx-auto max-w-6xl px-6 pb-16 pt-8">{children}</main>
                <footer className="mx-auto max-w-6xl px-6 pb-10 text-xs text-white/70">
                    Photo by{' '}
                    <a
                        className="underline decoration-white/40 underline-offset-4 hover:text-white"
                        href="https://unsplash.com/@omgitsyeshi?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                    >
                        Yeshi Kangrang
                    </a>{' '}
                    on{' '}
                    <a
                        className="underline decoration-white/40 underline-offset-4 hover:text-white"
                        href="https://unsplash.com/photos/vehicles-traveling-on-road-wTD1-_u8x1g?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                    >
                        Unsplash
                    </a>
                </footer>
            </div>
        </>
    );
}
