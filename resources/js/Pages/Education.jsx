import PortfolioShell from '@/Components/PortfolioShell';
import SectionCard from '@/Components/SectionCard';
import { education } from '@/data/profile';

export default function Education() {
    return (
        <PortfolioShell title="Education | Karabo Motlaleselelo">
            <div className="flex flex-col gap-8 lg:gap-10">
                {education.map((item, index) => (
                    <SectionCard
                        key={item.degree}
                        title={item.degree}
                        className={`animate-float-in ${
                            index % 2 === 0
                                ? 'lg:translate-x-8 lg:self-start lg:max-w-3xl'
                                : 'lg:-translate-x-6 lg:self-end lg:max-w-3xl'
                        }`}
                        style={{ animationDelay: `${index * 120}ms` }}
                    >
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                            {item.school} | {item.dates}
                        </p>
                        <p className="text-sm text-slate-700 dark:text-slate-200">{item.details}</p>
                    </SectionCard>
                ))}
            </div>
        </PortfolioShell>
    );
}
