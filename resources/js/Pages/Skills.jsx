import PortfolioShell from '@/Components/PortfolioShell';
import SectionCard from '@/Components/SectionCard';
import { certifications, skills, training } from '@/data/profile';
import useGithubData from '@/hooks/useGithubData';

export default function Skills() {
    const { languages, traits, status } = useGithubData();

    return (
        <PortfolioShell title="Skills | Karabo Motlaleselelo">
            <div className="flex flex-col gap-8 lg:gap-10">
                <SectionCard
                    title="Key Skills"
                    className="animate-float-in lg:translate-x-6 lg:self-start lg:max-w-4xl"
                    style={{ animationDelay: '0ms' }}
                >
                    <div className="space-y-4">
                        {skills.map((group) => (
                            <div key={group.label}>
                                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                                    {group.label}
                                </h3>
                                <p className="mt-1 text-sm text-slate-700 dark:text-slate-200">
                                    {group.items.join(', ')}
                                </p>
                            </div>
                        ))}
                    </div>
                </SectionCard>

                <SectionCard
                    title="Hands-on Training"
                    className="animate-float-in lg:-translate-x-6 lg:self-end lg:max-w-4xl"
                    style={{ animationDelay: '120ms' }}
                >
                    <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-200">
                        {training.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </SectionCard>

                <SectionCard
                    title="Certifications"
                    className="animate-float-in lg:translate-x-4 lg:self-start lg:max-w-3xl"
                    style={{ animationDelay: '240ms' }}
                >
                    <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
                        {certifications.map((item) => (
                            <li key={item.name} className="flex justify-between gap-4">
                                <span className="font-medium text-slate-800 dark:text-slate-100">
                                    {item.name}
                                </span>
                                <span className="text-slate-500 dark:text-slate-300">{item.date}</span>
                            </li>
                        ))}
                    </ul>
                </SectionCard>

                <SectionCard
                    title="GitHub-Derived Skills"
                    className="animate-float-in lg:-translate-x-5 lg:self-end lg:max-w-4xl"
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
                                {languages.map((lang) => (
                                    <span
                                        key={lang.name}
                                        className="rounded-full border border-white/20 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-200"
                                    >
                                        {lang.name} ({lang.percent.toFixed(1)}%)
                                    </span>
                                ))}
                            </div>
                            <div className="text-sm text-slate-700 dark:text-slate-200">
                                {traits.join(', ')}
                            </div>
                        </div>
                    )}
                </SectionCard>
            </div>
        </PortfolioShell>
    );
}
