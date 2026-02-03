import PortfolioShell from '@/Components/PortfolioShell';
import SectionCard from '@/Components/SectionCard';
import { experience } from '@/data/profile';

export default function Experience() {
    return (
        <PortfolioShell title="Experience | Karabo Motlaleselelo">
            <div className="grid gap-8 lg:gap-10">
                {experience.map((item, index) => (
                    <SectionCard
                        key={item.role}
                        title={item.role}
                        className={`animate-float-in ${
                            index % 3 === 0
                                ? 'lg:translate-x-6'
                                : index % 3 === 1
                                  ? 'lg:-translate-x-4'
                                  : 'lg:translate-x-2'
                        }`}
                        style={{ animationDelay: `${index * 120}ms` }}
                    >
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                            {item.company} | {item.dates}
                        </p>
                        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-200">
                            {item.highlights.map((point) => (
                                <li key={point}>{point}</li>
                            ))}
                        </ul>
                    </SectionCard>
                ))}
            </div>
        </PortfolioShell>
    );
}
