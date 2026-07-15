import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router, Head } from '@inertiajs/react';
import { formatDistanceToNow } from 'date-fns';

export default function Index({ posts }) {
    
    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this post?')) {
            router.delete(route('admin.posts.destroy', id));
        }
    };

    return (
        <AdminLayout title="Blog Posts">
            <div className="flex justify-between items-center mb-8">
                <p className="text-slate-500 dark:text-slate-400">Manage your microblog posts</p>
                <Link
                    href={route('admin.posts.create')}
                    className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white px-5 py-2.5 rounded-full font-semibold shadow-lg shadow-amber-500/30 transition transform hover:-translate-y-0.5"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    New Post
                </Link>
            </div>

            {posts.data.length === 0 ? (
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-12 text-center border border-slate-200 dark:border-white/10 shadow-sm">
                    <div className="w-24 h-24 mx-auto bg-amber-100 dark:bg-amber-900/20 text-amber-500 rounded-full flex items-center justify-center mb-6">
                        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">No posts yet</h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-md mx-auto">You haven't written any blog posts. Start sharing your thoughts and updates!</p>
                    <Link
                        href={route('admin.posts.create')}
                        className="inline-block bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-6 py-3 rounded-full font-semibold hover:bg-slate-800 dark:hover:bg-white transition"
                    >
                        Write your first post
                    </Link>
                </div>
            ) : (
                <div className="space-y-6 max-w-3xl">
                    {posts.data.map((post) => (
                        <div key={post.id} className="bg-white dark:bg-slate-800/80 rounded-2xl p-6 border border-slate-200 dark:border-white/10 shadow-sm transition hover:shadow-md">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold">
                                        {post.user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900 dark:text-slate-100">{post.user.name}</p>
                                        <p className="text-xs text-slate-500">
                                            {post.published_at ? formatDistanceToNow(new Date(post.published_at), { addSuffix: true }) : 'Draft'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Link
                                        href={route('admin.posts.edit', post.id)}
                                        className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-full transition"
                                        title="Edit post"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(post.id)}
                                        className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-full transition"
                                        title="Delete post"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            
                            <div className="mb-4">
                                <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{post.content}</p>
                            </div>

                            {post.image && (
                                <div className="mb-4 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 max-h-96">
                                    <img src={`/storage/${post.image}`} alt="Post attachment" className="w-full h-full object-cover" />
                                </div>
                            )}

                            <div className="flex gap-4 text-sm text-slate-500 border-t border-slate-100 dark:border-slate-700/50 pt-4 mt-2">
                                <span className="flex items-center gap-1.5">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                    {post.comments_count || 0} Comments
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {post.reactions_count || 0} Reactions
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            {/* Pagination */}
            {posts.links && posts.links.length > 3 && (
                <div className="mt-8 flex justify-center gap-1">
                    {posts.links.map((link, i) => (
                        <Link
                            key={i}
                            href={link.url || '#'}
                            className={`px-4 py-2 rounded-lg text-sm transition ${
                                link.active 
                                    ? 'bg-amber-500 text-white font-bold' 
                                    : !link.url 
                                        ? 'text-slate-400 cursor-not-allowed' 
                                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}
