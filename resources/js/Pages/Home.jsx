import PortfolioShell from '@/Components/PortfolioShell';
import SectionCard from '@/Components/SectionCard';
import { attributes, profile } from '@/data/profile';

export default function Home() {
    return (
        <PortfolioShell title="Home | Karabo Motlaleselelo">
            <header className="animate-float-in grid gap-6 rounded-3xl border border-white/25 bg-white/75 p-8 shadow-[0_24px_60px_-32px_rgba(20,10,5,0.45)] backdrop-blur md:grid-cols-[1.2fr_0.8fr] dark:border-white/10 dark:bg-slate-900/70">
                <div className="space-y-4">
                    <p className="text-sm uppercase tracking-[0.2em] text-amber-700 dark:text-amber-200">
                        Cybersecurity and Digital Forensics
                    </p>
                    <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl dark:text-white">
                        {profile.name}
                    </h1>
                    <p className="text-lg text-slate-700 dark:text-slate-200">{profile.title}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-300">{profile.location}</p>
                </div>
                <div className="space-y-3 text-sm">
                    <div className="rounded-xl border border-white/30 bg-white/75 p-4 text-slate-800 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-100">
                        <p className="text-xs uppercase text-amber-700 dark:text-amber-200">Contact</p>
                        <div className="mt-2 space-y-1">
                            <p className="text-slate-700 dark:text-slate-100">{profile.phone}</p>
                            <a
                                className="text-amber-800 underline decoration-amber-300 underline-offset-4 dark:text-amber-200 dark:decoration-amber-500"
                                href={`mailto:${profile.email}`}
                            >
                                {profile.email}
                            </a>
                        </div>
                    </div>
                    <div className="rounded-xl border border-white/30 bg-white/70 p-4 dark:border-white/10 dark:bg-slate-900/70">
                        <p className="text-xs uppercase text-amber-700 dark:text-amber-200">Summary</p>
                        <p className="mt-2 text-slate-700 dark:text-slate-200">{profile.summary}</p>
                    </div>
                </div>
            </header>

            <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-10">
                <SectionCard
                    title="Personal Attributes"
                    className="animate-float-in lg:translate-x-5"
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
                    className="animate-float-in lg:-translate-x-4"
                    style={{ animationDelay: '240ms' }}
                >
                    <div className="grid gap-4 text-sm text-slate-700 dark:text-slate-200 sm:grid-cols-2">
                        <div className="rounded-xl border border-amber-100/80 bg-amber-50/70 p-4 dark:border-amber-900/40 dark:bg-slate-900/60">
                            Security monitoring and incident response.
                        </div>
                        <div className="rounded-xl border border-amber-100/80 bg-amber-50/70 p-4 dark:border-amber-900/40 dark:bg-slate-900/60">
                            Digital forensics and evidence handling.
                        </div>
                        <div className="rounded-xl border border-amber-100/80 bg-amber-50/70 p-4 dark:border-amber-900/40 dark:bg-slate-900/60">
                            Risk assessments and security audits.
                        </div>
                        <div className="rounded-xl border border-amber-100/80 bg-amber-50/70 p-4 dark:border-amber-900/40 dark:bg-slate-900/60">
                            Linux forensic environments and tooling.
                        </div>
                    </div>
                </SectionCard>
            </div>
        </PortfolioShell>
    );
}
