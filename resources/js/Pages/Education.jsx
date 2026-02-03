import PortfolioShell from '@/Components/PortfolioShell';
import SectionCard from '@/Components/SectionCard';
import { education } from '@/data/profile';

export default function Education() {
    return (
        <PortfolioShell title="Education | Karabo Motlaleselelo">
            <div className="grid gap-8 lg:gap-10">
                {education.map((item, index) => (
                    <SectionCard
                        key={item.degree}
                        title={item.degree}
                        className={`animate-float-in ${index % 2 === 0 ? 'lg:translate-x-5' : 'lg:-translate-x-3'}`}
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
