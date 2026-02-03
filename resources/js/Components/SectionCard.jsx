export default function SectionCard({ title, children, className = '', style }) {
    return (
        <section
            className={`space-y-4 rounded-2xl border border-white/30 bg-white/70 p-6 shadow-[0_18px_40px_-24px_rgba(20,10,5,0.45)] backdrop-blur transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(20,10,5,0.55)] dark:border-white/10 dark:bg-slate-900/65 ${className}`}
            style={style}
        >
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">{title}</h2>
            {children}
        </section>
    );
}
