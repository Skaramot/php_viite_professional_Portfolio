import { Head, Link, router, useForm } from '@inertiajs/react';
import { formatDistanceToNow } from 'date-fns';
import PortfolioShell from '@/Components/PortfolioShell';

const REACTIONS = [
    { type: 'like', emoji: '👍' },
    { type: 'love', emoji: '❤️' },
    { type: 'fire', emoji: '🔥' },
    { type: 'clap', emoji: '👏' },
    { type: 'think', emoji: '🤔' },
];

function CommentForm({ postId }) {
    const { data, setData, post: submitComment, processing, errors, reset } = useForm({
        author_name: '',
        content: '',
    });

    const handleComment = (e) => {
        e.preventDefault();
        submitComment(route('blog.comments.store', postId), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const charCount = data.content.length;
    const charLimit = 1000;

    return (
        <form
            onSubmit={handleComment}
            className="animate-float-in rounded-2xl border border-white/30 bg-white/70 p-6 shadow-[0_18px_40px_-24px_rgba(20,10,5,0.45)] backdrop-blur dark:border-white/10 dark:bg-slate-900/65"
        >
            <h3 className="mb-5 text-lg font-semibold text-slate-900 dark:text-slate-100">
                Leave a comment
            </h3>

            {/* Name input */}
            <div className="mb-4">
                <label htmlFor="author_name" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Name <span className="text-amber-500">*</span>
                </label>
                <input
                    id="author_name"
                    type="text"
                    value={data.author_name}
                    onChange={(e) => setData('author_name', e.target.value)}
                    required
                    placeholder="Your name"
                    className="w-full rounded-xl border border-white/40 bg-white/60 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-sm backdrop-blur transition focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-200/50 dark:border-white/10 dark:bg-slate-800/50 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-amber-500/60 dark:focus:ring-amber-500/20"
                />
                {errors.author_name && (
                    <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{errors.author_name}</p>
                )}
            </div>

            {/* Comment textarea */}
            <div className="mb-4">
                <label htmlFor="content" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Comment <span className="text-amber-500">*</span>
                </label>
                <textarea
                    id="content"
                    value={data.content}
                    onChange={(e) => setData('content', e.target.value.slice(0, charLimit))}
                    required
                    maxLength={charLimit}
                    rows={4}
                    placeholder="Share your thoughts…"
                    className="w-full resize-none rounded-xl border border-white/40 bg-white/60 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-sm backdrop-blur transition focus:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-200/50 dark:border-white/10 dark:bg-slate-800/50 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-amber-500/60 dark:focus:ring-amber-500/20"
                />
                <div className="mt-1 flex items-center justify-between">
                    {errors.content ? (
                        <p className="text-xs text-red-500 dark:text-red-400">{errors.content}</p>
                    ) : (
                        <span />
                    )}
                    <span className={`text-xs ${charCount > charLimit * 0.9 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400 dark:text-slate-500'}`}>
                        {charCount}/{charLimit}
                    </span>
                </div>
            </div>

            {/* Submit button */}
            <button
                type="submit"
                disabled={processing}
                className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:from-amber-600 hover:to-orange-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-300/50 disabled:cursor-not-allowed disabled:opacity-60 dark:from-amber-600 dark:to-orange-600 dark:hover:from-amber-500 dark:hover:to-orange-500 dark:focus:ring-amber-500/30"
            >
                {processing ? 'Posting…' : 'Post Comment'}
            </button>
        </form>
    );
}

function CommentCard({ comment, index }) {
    const timeAgo = formatDistanceToNow(new Date(comment.created_at), { addSuffix: true });
    const initial = comment.author_name?.charAt(0)?.toUpperCase() || '?';

    return (
        <div
            className="animate-float-in rounded-2xl border border-white/30 bg-white/70 p-5 shadow-[0_8px_24px_-12px_rgba(20,10,5,0.25)] backdrop-blur dark:border-white/10 dark:bg-slate-900/65"
            style={{ animationDelay: `${index * 80}ms` }}
        >
            <div className="mb-3 flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-300 to-slate-400 text-xs font-bold text-white dark:from-slate-600 dark:to-slate-700">
                    {initial}
                </div>
                <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {comment.author_name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{timeAgo}</p>
                </div>
            </div>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {comment.content}
            </p>
        </div>
    );
}

export default function BlogShow({ post }) {
    const toggleReaction = (postId, type) => {
        router.post(route('blog.reactions.toggle', postId), { type }, {
            preserveScroll: true,
        });
    };

    const initial = post.user?.name?.charAt(0)?.toUpperCase() || '?';
    const timeAgo = formatDistanceToNow(new Date(post.published_at || post.created_at), { addSuffix: true });

    return (
        <PortfolioShell title={`Post by ${post.user?.name || 'Unknown'}`}>
            {/* Back link */}
            <div className="animate-float-in mb-6">
                <Link
                    href={route('blog.index')}
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/60 px-4 py-2 text-sm font-medium text-slate-700 backdrop-blur transition hover:border-amber-200 hover:text-amber-900 dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:border-amber-500/40 dark:hover:text-amber-200"
                >
                    <span className="text-base">←</span> Back to Blog
                </Link>
            </div>

            <div className="mx-auto max-w-2xl space-y-8">
                {/* Post card */}
                <article className="animate-float-in rounded-2xl border border-white/30 bg-white/70 p-0 shadow-[0_18px_40px_-24px_rgba(20,10,5,0.45)] backdrop-blur dark:border-white/10 dark:bg-slate-900/65">
                    {/* Author header */}
                    <div className="flex items-center gap-3 px-8 pt-8 pb-5">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-base font-bold text-white shadow-md ring-2 ring-amber-300/40 dark:ring-amber-500/30">
                            {initial}
                        </div>
                        <div className="min-w-0">
                            <p className="truncate text-base font-semibold text-slate-900 dark:text-slate-100">
                                {post.user?.name || 'Unknown'}
                            </p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                {timeAgo}
                            </p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="px-8 pb-5">
                        <p className="whitespace-pre-wrap text-base leading-relaxed text-slate-800 dark:text-slate-200">
                            {post.content}
                        </p>
                    </div>

                    {/* Image */}
                    {post.image && (
                        <div className="px-5 pb-5">
                            <img
                                src={`/storage/${post.image}`}
                                alt=""
                                className="w-full rounded-xl object-cover shadow-inner"
                                loading="lazy"
                            />
                        </div>
                    )}

                    {/* Divider */}
                    <div className="mx-8 border-t border-slate-200/60 dark:border-white/10" />

                    {/* Reaction bar */}
                    <div className="flex flex-wrap items-center gap-2 px-8 py-4">
                        {REACTIONS.map(({ type, emoji }) => {
                            const count = post.reaction_counts?.[type] || 0;
                            const isActive = post.user_reactions?.includes(type);

                            return (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => toggleReaction(post.id, type)}
                                    className={`flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                                        isActive
                                            ? 'border-amber-300 bg-amber-100/90 text-amber-900 shadow-sm ring-1 ring-amber-200/50 dark:border-amber-500/60 dark:bg-amber-950/70 dark:text-amber-200 dark:ring-amber-500/20'
                                            : 'border-white/40 bg-white/50 text-slate-600 hover:border-amber-200 hover:bg-amber-50/80 hover:text-amber-800 dark:border-white/10 dark:bg-slate-800/40 dark:text-slate-400 dark:hover:border-amber-500/40 dark:hover:bg-amber-950/40 dark:hover:text-amber-300'
                                    }`}
                                    aria-label={`React with ${type}`}
                                >
                                    <span>{emoji}</span>
                                    {count > 0 && <span>{count}</span>}
                                </button>
                            );
                        })}
                    </div>
                </article>

                {/* Comments section */}
                <section className="space-y-6">
                    <h2
                        className="animate-float-in text-xl font-bold text-slate-900 dark:text-slate-100"
                        style={{ animationDelay: '100ms' }}
                    >
                        Comments ({post.comments?.length || 0})
                    </h2>

                    {/* Comment form */}
                    <div style={{ animationDelay: '150ms' }}>
                        <CommentForm postId={post.id} />
                    </div>

                    {/* Comment list */}
                    {post.comments && post.comments.length > 0 ? (
                        <div className="space-y-4">
                            {post.comments.map((comment, idx) => (
                                <CommentCard key={comment.id} comment={comment} index={idx} />
                            ))}
                        </div>
                    ) : (
                        <div className="animate-float-in py-12 text-center" style={{ animationDelay: '200ms' }}>
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/70 shadow-md backdrop-blur dark:border-white/10 dark:bg-slate-900/65">
                                <span className="text-3xl">💬</span>
                            </div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                Be the first to comment!
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </PortfolioShell>
    );
}
