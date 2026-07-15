import React, { useRef, useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { useForm, usePage, router } from '@inertiajs/react';

export default function Edit({ post }) {
    const { auth } = usePage().props;
    const [preview, setPreview] = useState(post.image ? `/storage/${post.image}` : null);
    const fileInputRef = useRef(null);

    const { data, setData, processing, errors } = useForm({
        content: post.content || '',
        image: null,
        remove_image: false,
        _method: 'PUT',
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData(data => ({ ...data, image: file, remove_image: false }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setData(data => ({ ...data, image: null, remove_image: true }));
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const submit = (e) => {
        e.preventDefault();
        router.post(route('admin.posts.update', post.id), data, {
            forceFormData: true,
        });
    };

    return (
        <AdminLayout title="Edit Post">
            <div className="max-w-2xl">
                <form onSubmit={submit} className="bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200 dark:border-white/10 shadow-lg overflow-hidden">
                    <div className="p-6">
                        <div className="flex gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex-shrink-0 flex items-center justify-center text-white font-bold text-lg">
                                {auth.user.name.charAt(0)}
                            </div>
                            <div className="flex-1 pt-1">
                                <p className="font-semibold text-slate-900 dark:text-slate-100 leading-tight mb-2">{auth.user.name}</p>
                                
                                <textarea
                                    value={data.content}
                                    onChange={e => setData('content', e.target.value)}
                                    placeholder="What's on your mind?"
                                    className="w-full bg-transparent border-none focus:ring-0 resize-none min-h-[150px] text-lg text-slate-800 dark:text-slate-200 placeholder-slate-400 p-0"
                                    maxLength={5000}
                                />
                                {errors.content && <p className="text-rose-500 text-sm mt-1">{errors.content}</p>}
                                
                                <div className="text-right mt-1">
                                    <span className={`text-xs ${data.content.length > 4900 ? 'text-rose-500' : 'text-slate-400'}`}>
                                        {data.content.length}/5000
                                    </span>
                                </div>
                            </div>
                        </div>

                        {preview && (
                            <div className="ml-16 mb-4 relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 group inline-block">
                                <img src={preview} alt="Preview" className="max-h-80 object-contain" />
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="absolute top-2 right-2 bg-black/60 text-white p-1.5 rounded-full hover:bg-rose-500 transition opacity-0 group-hover:opacity-100"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        )}
                        {errors.image && <p className="text-rose-500 text-sm ml-16 mb-4">{errors.image}</p>}
                    </div>

                    <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700/50 flex justify-between items-center">
                        <div>
                            <input 
                                type="file" 
                                ref={fileInputRef}
                                onChange={handleImageChange} 
                                className="hidden" 
                                accept="image/*" 
                            />
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-500/10 p-2.5 rounded-full transition flex items-center gap-2"
                                title="Change Image"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </button>
                        </div>
                        <button
                            type="submit"
                            disabled={processing || (!data.content.trim() && !data.image && !preview)}
                            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white px-6 py-2.5 rounded-full font-bold shadow-md shadow-amber-500/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
