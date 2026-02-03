import PortfolioShell from '@/Components/PortfolioShell';
import SectionCard from '@/Components/SectionCard';
import { publication } from '@/data/profile';

export default function Publication() {
    return (
        <PortfolioShell title="Publication | Karabo Motlaleselelo">
            <SectionCard
                title="Publication"
                className="animate-float-in lg:translate-x-4"
                style={{ animationDelay: '120ms' }}
            >
                <div className="space-y-2 text-sm text-slate-700 dark:text-slate-200">
                    <p className="font-semibold text-slate-900 dark:text-slate-50">{publication.title}</p>
                    <p>{publication.venue}</p>
                    <p>{publication.authors}</p>
                    <a
                        className="text-amber-800 underline decoration-amber-300 underline-offset-4 dark:text-amber-200 dark:decoration-amber-500"
                        href={publication.doi}
                    >
                        {publication.doi}
                    </a>
                </div>
            </SectionCard>
        </PortfolioShell>
    );
}
