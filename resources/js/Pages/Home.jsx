import PortfolioShell from '@/Components/PortfolioShell';
import SectionCard from '@/Components/SectionCard';
import LiveInfo from '@/Components/LiveInfo';
import { attributes, profile } from '@/data/profile';
import useGithubData from '@/hooks/useGithubData';
import { useEffect, useState } from 'react';

export default function Home() {
    const { languages, traits, status } = useGithubData();
    const topLanguages = languages.slice(0, 8);
    const [tagText, setTagText] = useState('');
    const [tagIndex, setTagIndex] = useState(0);
    const [tagDeleting, setTagDeleting] = useState(false);
    const tagPhrases = [
        'Cyber Security and Digital Forensics',
        'Web Development',
        'Software Engineering',
        'Computer Networks',
    ];

    useEffect(() => {
        const current = tagPhrases[tagIndex];
        const speed = tagDeleting ? 70 : 140;
        const pause = tagDeleting ? 900 : 1800;

        const timeout = setTimeout(() => {
            if (!tagDeleting) {
                const next = current.slice(0, tagText.length + 1);
                setTagText(next);
                if (next === current) {
                    setTagDeleting(true);
                }
            } else {
                const next = current.slice(0, tagText.length - 1);
                setTagText(next);
                if (next === '') {
                    setTagDeleting(false);
                    setTagIndex((prev) => (prev + 1) % tagPhrases.length);
                }
            }
        }, tagText.length === 0 && tagDeleting === false ? pause : speed);

        return () => clearTimeout(timeout);
    }, [tagText, tagDeleting, tagIndex, tagPhrases]);

    return (
        <PortfolioShell title="Home | Karabo Motlaleselelo">
            <section className="relative flex min-h-[70vh] flex-col justify-center gap-10 pb-6 pt-10 lg:min-h-[78vh]">
                <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
                    <div className="space-y-6">
                        <p className="text-xs uppercase tracking-[0.4em] text-amber-600 dark:text-amber-500">
                            <span className="typing-caret">{tagText}</span>
                        </p>
                        <h1 className="text-4xl font-semibold leading-tight text-slate-900 dark:text-slate-50 md:text-5xl lg:text-6xl">
                            {profile.name}
                        </h1>
                        <p className="text-lg text-slate-700 dark:text-slate-300">{profile.title}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{profile.location}</p>
                        <div className="flex flex-wrap gap-3 pt-4">
                            <a
                                href={route('projects')}
                                className="rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-amber-500/20 transition hover:-translate-y-0.5 hover:bg-amber-400"
                            >
                                View Projects
                            </a>
                            <a
                                href={route('contact')}
                                className="rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50 dark:hover:bg-slate-700"
                            >
                                Contact Me
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 lg:ml-auto lg:max-w-sm lg:translate-x-6">
                        <div className="animate-float-in">
                            <LiveInfo />
                        </div>
                        <div className="animate-float-in space-y-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm p-6">
                            <p className="text-xs uppercase font-semibold text-slate-500 dark:text-slate-400">Profile</p>
                            <p className="text-sm text-slate-700 dark:text-slate-200">{profile.summary}</p>
                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-700/50 dark:text-slate-200">
                                <p className="text-slate-700 dark:text-slate-200">{profile.phone}</p>
                                <a
                                    className="text-amber-600 underline decoration-amber-300 underline-offset-4 hover:text-amber-700 dark:text-amber-400 dark:decoration-amber-500"
                                    href={`mailto:${profile.email}`}
                                >
                                    {profile.email}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="mt-10 flex flex-col gap-8 lg:gap-10">
                <SectionCard
                    title="Personal Attributes"
                    className="animate-float-in lg:translate-x-6 lg:self-start lg:max-w-3xl"
                    style={{ animationDelay: '120ms' }}
                >
                    <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-200">
                        {attributes.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </SectionCard>
                <SectionCard
                    title="Focus Areas"
                    className="animate-float-in lg:-translate-x-6 lg:self-end lg:max-w-3xl"
                    style={{ animationDelay: '240ms' }}
                >
                    <div className="grid gap-4 text-sm text-slate-700 dark:text-slate-200 sm:grid-cols-2">
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-700/30">
                            Security monitoring and incident response.
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-700/30">
                            Digital forensics and evidence handling.
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-700/30">
                            Risk assessments and security audits.
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-700/30">
                            Web development and modern frontend builds.
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-700/30">
                            Software engineering and system design.
                        </div>
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-700/30">
                            Linux forensic environments and tooling.
                        </div>
                    </div>
                </SectionCard>
                <SectionCard
                    title="GitHub Skills Snapshot"
                    className="animate-float-in lg:translate-x-4 lg:self-start lg:max-w-3xl"
                    style={{ animationDelay: '360ms' }}
                >
                    {status === 'loading' && (
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                            Loading GitHub skills...
                        </p>
                    )}
                    {status === 'ready' && (
                        <div className="space-y-4">
                            <div className="flex flex-wrap gap-2">
                                {topLanguages.map((lang) => (
                                    <span
                                        key={lang.name}
                                        className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 shadow-sm"
                                    >
                                        {lang.name}
                                    </span>
                                ))}
                            </div>
                            <p className="text-sm text-slate-700 dark:text-slate-200">
                                {traits.slice(0, 6).join(', ')}
                            </p>
                            <a
                                href={route('skills')}
                                className="inline-flex text-amber-600 underline decoration-amber-300 underline-offset-4 hover:text-amber-700 dark:text-amber-400 dark:decoration-amber-500"
                            >
                                View all GitHub skills
                            </a>
                        </div>
                    )}
                </SectionCard>
            </div>
        </PortfolioShell>
    );
}
