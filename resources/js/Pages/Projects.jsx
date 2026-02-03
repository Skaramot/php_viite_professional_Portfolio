import PortfolioShell from '@/Components/PortfolioShell';
import SectionCard from '@/Components/SectionCard';
import { projects } from '@/data/profile';
import { useEffect, useMemo, useState } from 'react';

export default function Projects() {
    const [repos, setRepos] = useState([]);
    const [status, setStatus] = useState('loading');
    const [error, setError] = useState('');

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const loadRepos = async () => {
            try {
                const response = await fetch(
                    'https://api.github.com/users/Skaramot/repos?per_page=100&sort=updated',
                    { signal: controller.signal },
                );
                if (!response.ok) {
                    throw new Error(`GitHub request failed (${response.status})`);
                }
                const data = await response.json();
                if (isMounted) {
                    setRepos(Array.isArray(data) ? data : []);
                    setStatus('ready');
                }
            } catch (err) {
                if (!isMounted || err.name === 'AbortError') return;
                setStatus('error');
                setError('Unable to load GitHub repositories right now.');
            }
        };

        loadRepos();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);

    const displayedRepos = useMemo(() => {
        return repos
            .filter((repo) => !repo.fork)
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    }, [repos]);

    return (
        <PortfolioShell title="Projects | Karabo Motlaleselelo">
            <div className="grid gap-8 lg:gap-10">
                <SectionCard
                    title="Featured Initiatives"
                    className="animate-float-in lg:-translate-x-4"
                    style={{ animationDelay: '0ms' }}
                >
                    <div className="grid gap-6">
                        {projects.map((item) => (
                            <div key={item.name} className="space-y-2">
                                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                                    {item.name}
                                </h3>
                                <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-200">
                                    {item.details.map((detail) => (
                                        <li key={detail}>{detail}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </SectionCard>

                <SectionCard
                    title="GitHub Repositories"
                    className="animate-float-in lg:translate-x-4"
                    style={{ animationDelay: '140ms' }}
                >
                    {status === 'loading' && (
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                            Loading repositories...
                        </p>
                    )}
                    {status === 'error' && (
                        <p className="text-sm text-rose-600 dark:text-rose-300">{error}</p>
                    )}
                    {status === 'ready' && (
                        <div className="grid gap-4 sm:grid-cols-2">
                            {displayedRepos.map((repo) => (
                                <article
                                    key={repo.id}
                                    className="rounded-2xl border border-white/20 bg-white/70 p-4 text-sm text-slate-700 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-200"
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                                            {repo.name}
                                        </h3>
                                        <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800 dark:bg-amber-900/60 dark:text-amber-200">
                                            {repo.language || 'Mixed'}
                                        </span>
                                    </div>
                                    {repo.description && (
                                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                                            {repo.description}
                                        </p>
                                    )}
                                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                                        <span>Updated {new Date(repo.updated_at).toLocaleDateString()}</span>
                                        {repo.stargazers_count > 0 && <span>★ {repo.stargazers_count}</span>}
                                        {repo.forks_count > 0 && <span>Forks {repo.forks_count}</span>}
                                    </div>
                                    <a
                                        className="mt-3 inline-flex text-amber-800 underline decoration-amber-300 underline-offset-4 dark:text-amber-200 dark:decoration-amber-500"
                                        href={repo.html_url}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        View repository
                                    </a>
                                </article>
                            ))}
                        </div>
                    )}
                </SectionCard>
            </div>
        </PortfolioShell>
    );
}
