import PortfolioShell from '@/Components/PortfolioShell';
import SectionCard from '@/Components/SectionCard';
import { certifications, skills, training } from '@/data/profile';

export default function Skills() {
    return (
        <PortfolioShell title="Skills | Karabo Motlaleselelo">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
                <SectionCard
                    title="Key Skills"
                    className="animate-float-in lg:translate-x-4"
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
                    className="animate-float-in lg:-translate-x-3"
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
                    className="animate-float-in lg:translate-x-2"
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
            </div>
        </PortfolioShell>
    );
}
