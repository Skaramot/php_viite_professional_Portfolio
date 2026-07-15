import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AdminLayout({ title, children }) {
    const { auth } = usePage().props;
    const { url } = usePage();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        {
            label: 'Dashboard',
            route: 'admin.dashboard',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
        },
        {
            label: 'Blog Posts',
            route: 'admin.posts.index',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
            ),
        },
        {
            label: 'New Post',
            route: 'admin.posts.create',
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
            ),
        },
    ];

    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col md:flex-row text-slate-900 dark:text-slate-100 font-sans">
                {/* Mobile Header */}
                <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 text-slate-100 shadow-md">
                    <Link href={route('home')} className="font-mono text-amber-500 font-semibold tracking-wider">
                        &lt;/skaramot&gt;
                    </Link>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-300 hover:text-white">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                </div>

                {/* Sidebar */}
                <aside className={`${isMenuOpen ? 'block' : 'hidden'} md:block w-full md:w-72 bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300 flex-shrink-0 min-h-screen shadow-xl relative z-20`}>
                    <div className="p-6 hidden md:block border-b border-slate-800">
                        <Link href={route('home')} className="font-mono text-amber-500 text-lg font-bold tracking-widest hover:text-amber-400 transition">
                            &lt;/skaramot&gt;
                        </Link>
                    </div>
                    
                    <nav className="p-4 space-y-1 flex-1">
                        {navItems.map((item) => {
                            const href = route(item.route);
                            const isActive = url.startsWith(new URL(href).pathname);
                            return (
                                <Link
                                    key={item.route}
                                    href={href}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium ${
                                        isActive 
                                        ? 'bg-amber-500/10 text-amber-400 border-l-4 border-amber-500' 
                                        : 'hover:bg-slate-800 hover:text-slate-100 border-l-4 border-transparent'
                                    }`}
                                >
                                    {item.icon}
                                    {item.label}
                                </Link>
                            );
                        })}

                        <div className="my-6 border-t border-slate-800"></div>

                        <Link
                            href={route('home')}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium hover:bg-slate-800 hover:text-slate-100 border-l-4 border-transparent"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Site
                        </Link>
                    </nav>

                    <div className="absolute bottom-0 w-full p-6 border-t border-slate-800 bg-slate-950/50">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg">
                                {auth.user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-slate-100">{auth.user.name}</p>
                                <p className="text-xs text-slate-400 truncate">{auth.user.email}</p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-50 dark:bg-[#0f172a]">
                    <header className="p-6 lg:px-10 flex-shrink-0">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{title}</h1>
                    </header>
                    <div className="flex-1 overflow-auto p-6 lg:px-10 pb-20">
                        <div className="animate-float-in">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
