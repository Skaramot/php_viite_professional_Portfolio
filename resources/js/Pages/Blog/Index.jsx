import { Head, Link, router } from '@inertiajs/react';
import { formatDistanceToNow } from 'date-fns';
import PortfolioShell from '@/Components/PortfolioShell';

const REACTIONS = [
    { type: 'like', emoji: '👍' },
    { type: 'love', emoji: '❤️' },
    { type: 'fire', emoji: '🔥' },
    { type: 'clap', emoji: '👏' },
    { type: 'think', emoji: '🤔' },
];

function PostCard({ post }) {
    const toggleReaction = (postId, type) => {
        router.post(route('blog.reactions.toggle', postId), { type }, {
            preserveScroll: true,
        });
    };

    const initial = post.user?.name?.charAt(0)?.toUpperCase() || '?';
    const timeAgo = formatDistanceToNow(new Date(post.published_at || post.created_at), { addSuffix: true });

    return (
        <article className="animate-float-in rounded-2xl border border-slate-200 bg-white p-0 shadow-sm transition-all duration-300 hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
            {/* Author header */}
            <div className="flex items-center gap-3 px-6 pt-6 pb-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-sm font-bold text-white shadow-md ring-2 ring-amber-300/40 dark:ring-amber-500/30">
                    {initial}
                </div>
                <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {post.user?.name || 'Unknown'}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        {timeAgo}
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="px-6 pb-4">
                <p className="whitespace-pre-wrap text-[0.938rem] leading-relaxed text-slate-800 dark:text-slate-200">
                    {post.content}
                </p>
            </div>

            {/* Image */}
            {post.image && (
                <div className="px-4 pb-4">
                    <img
                        src={`/storage/${post.image}`}
                        alt=""
                        className="w-full rounded-xl object-cover shadow-inner"
                        loading="lazy"
                    />
                </div>
            )}

            {/* Divider */}
            <div className="mx-6 border-t border-slate-200 dark:border-slate-700" />

            {/* Reaction bar + Comments */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3">
                <div className="flex flex-wrap gap-1.5">
                    {REACTIONS.map(({ type, emoji }) => {
                        const count = post.reaction_counts?.[type] || 0;
                        const isActive = post.user_reactions?.includes(type);

                        return (
                            <button
                                key={type}
                                type="button"
                                onClick={() => toggleReaction(post.id, type)}
                                className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                                    isActive
                                        ? 'border-amber-300 bg-amber-50 text-amber-600 shadow-sm dark:border-amber-500/60 dark:bg-amber-900/20 dark:text-amber-400'
                                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-amber-200 hover:bg-amber-50 hover:text-amber-600 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-400 dark:hover:border-amber-500/40 dark:hover:bg-amber-900/10 dark:hover:text-amber-400'
                                }`}
                                aria-label={`React with ${type}`}
                            >
                                <span className="text-sm">{emoji}</span>
                                {count > 0 && <span>{count}</span>}
                            </button>
                        );
                    })}
                </div>

                <Link
                    href={route('blog.show', post.id)}
                    className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-amber-200 hover:text-amber-600 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-400 dark:hover:border-amber-500/40 dark:hover:text-amber-400"
                >
                    💬 {post.comments_count || 0} comment{post.comments_count !== 1 ? 's' : ''}
                </Link>
            </div>
        </article>
    );
}

export default function BlogIndex({ posts }) {
    const hasNoPosts = !posts?.data?.length;

    return (
        <PortfolioShell title="Blog">
            {/* Header */}
            <div className="animate-float-in mb-10 text-center">
                <h1 className="bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent dark:from-amber-300 dark:via-orange-300 dark:to-amber-400 sm:text-5xl">
                    Blog
                </h1>
                <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
                    Thoughts, updates, and musings
                </p>
                <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-amber-400 to-orange-500" />
            </div>

            {/* Posts feed */}
            {hasNoPosts ? (
                <div className="animate-float-in mx-auto max-w-md py-20 text-center">
                    <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
                        <span className="text-5xl">✍️</span>
                    </div>
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                        No posts yet
                    </h2>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        Check back soon! New content is on the way.
                    </p>
                </div>
            ) : (
                <div className="mx-auto max-w-2xl space-y-8">
                    {posts.data.map((post, idx) => (
                        <div
                            key={post.id}
                            style={{ animationDelay: `${idx * 100}ms` }}
                        >
                            <PostCard post={post} />
                        </div>
                    ))}

                    {/* Pagination */}
                    {posts.links && posts.links.length > 3 && (
                        <nav className="animate-float-in flex items-center justify-center gap-2 pt-4" style={{ animationDelay: '300ms' }}>
                            {posts.links.map((link, idx) => {
                                if (!link.url) {
                                    return (
                                        <span
                                            key={idx}
                                            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-400 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-500"
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    );
                                }
                                return (
                                    <Link
                                        key={idx}
                                        href={link.url}
                                        preserveScroll
                                        className={`rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                                            link.active
                                                ? 'border-amber-300 bg-amber-50 text-amber-600 shadow-sm dark:border-amber-500/60 dark:bg-amber-900/20 dark:text-amber-400'
                                                : 'border-slate-200 bg-white text-slate-600 hover:border-amber-200 hover:bg-amber-50 hover:text-amber-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:border-amber-500/40 dark:hover:text-amber-400'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                );
                            })}
                        </nav>
                    )}
                </div>
            )}
        </PortfolioShell>
    );
}
