export default function SectionCard({ title, children, className = '', style }) {
    return (
        <section
            className={`space-y-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm p-6 transition duration-300 hover:shadow-md ${className}`}
            style={style}
        >
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">{title}</h2>
            {children}
        </section>
    );
}
