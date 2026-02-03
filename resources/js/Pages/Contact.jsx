import PortfolioShell from '@/Components/PortfolioShell';
import SectionCard from '@/Components/SectionCard';
import { profile, references } from '@/data/profile';

export default function Contact() {
    return (
        <PortfolioShell title="Contact | Karabo Motlaleselelo">
            <div className="flex flex-col gap-8 lg:gap-10">
                <SectionCard
                    title="Contact"
                    className="animate-float-in lg:translate-x-6 lg:self-start lg:max-w-3xl"
                    style={{ animationDelay: '0ms' }}
                >
                    <div className="space-y-3 text-sm text-slate-700 dark:text-slate-200">
                        <p className="text-slate-500 dark:text-slate-300">{profile.location}</p>
                        <p>{profile.phone}</p>
                        <a
                            className="text-amber-800 underline decoration-amber-300 underline-offset-4 dark:text-amber-200 dark:decoration-amber-500"
                            href={`mailto:${profile.email}`}
                        >
                            {profile.email}
                        </a>
                        <a
                            className="text-amber-800 underline decoration-amber-300 underline-offset-4 dark:text-amber-200 dark:decoration-amber-500"
                            href={profile.github}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {profile.github}
                        </a>
                    </div>
                </SectionCard>

                <SectionCard
                    title="References"
                    className="animate-float-in lg:-translate-x-6 lg:self-end lg:max-w-3xl"
                    style={{ animationDelay: '140ms' }}
                >
                    <div className="space-y-4 text-sm text-slate-700 dark:text-slate-200">
                        {references.map((item) => (
                            <div key={item.email} className="space-y-1">
                                <p className="font-semibold text-slate-900 dark:text-slate-50">{item.name}</p>
                                <p className="text-slate-700 dark:text-slate-200">{item.role}</p>
                                <p className="text-slate-700 dark:text-slate-200">{item.phone}</p>
                                <a
                                    className="text-amber-800 underline decoration-amber-300 underline-offset-4 dark:text-amber-200 dark:decoration-amber-500"
                                    href={`mailto:${item.email}`}
                                >
                                    {item.email}
                                </a>
                            </div>
                        ))}
                    </div>
                </SectionCard>
            </div>
        </PortfolioShell>
    );
}
