import React from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
    BarChart, Bar, PieChart, Pie, Cell 
} from 'recharts';

export default function Dashboard({ stats, visitsChart, topPages, devices, browsers, recentVisitors, hourlyVisits }) {
    
    const COLORS = ['#fbbf24', '#34d399', '#f472b6', '#38bdf8', '#a78bfa'];

    const formatDataForPie = (dataObj) => {
        return Object.keys(dataObj).map((key) => ({
            name: key,
            value: dataObj[key]
        }));
    };

    const deviceData = formatDataForPie(devices);
    
    const browserData = Object.keys(browsers).map((key) => ({
        name: key,
        value: browsers[key]
    }));

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="rounded-xl border border-white/20 bg-slate-900/90 p-3 shadow-lg backdrop-blur">
                    <p className="text-sm font-semibold text-slate-100 mb-1">{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} className="text-sm font-bold" style={{ color: entry.color }}>
                            {entry.name}: {entry.value}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    const StatCard = ({ title, value, icon, gradient = "from-slate-100 to-white dark:from-slate-800 dark:to-slate-800/80" }) => (
        <div className={`rounded-2xl border border-slate-200 dark:border-white/10 bg-gradient-to-br ${gradient} p-6 shadow-sm backdrop-blur relative overflow-hidden group hover:-translate-y-1 transition duration-300`}>
            <div className="absolute -right-4 -top-4 text-slate-300 dark:text-slate-700/50 opacity-20 group-hover:scale-110 transition duration-500">
                {icon}
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">{title}</p>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-100">{value}</p>
        </div>
    );

    return (
        <AdminLayout title="Analytics Dashboard">
            
            {/* Top Row Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <StatCard title="Total Visits" value={stats.total_visits} icon={
                    <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" /></svg>
                } gradient="from-amber-50 to-white dark:from-amber-900/20 dark:to-slate-900" />
                <StatCard title="Today's Visits" value={stats.today_visits} icon={
                    <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
                } />
                <StatCard title="This Week" value={stats.week_visits} icon={
                    <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
                } />
                <StatCard title="Live Now" value={stats.live_visitors} icon={
                    <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A120.1 120.1 0 0010 1a120.148 120.148 0 00-1.3.046l-.5 8.5a5.006 5.006 0 00-2.169 1.816L1.455 9.77a.5.5 0 00-.598.598l1.593 4.577a5.008 5.008 0 001.815 2.168l-1.026 1.95a.5.5 0 00.598.598l4.576-1.592a5.008 5.008 0 004.338 0l4.576 1.592a.5.5 0 00.598-.598l-1.026-1.95a5.008 5.008 0 001.815-2.168l1.593-4.577a.5.5 0 00-.598-.598l-4.576 1.592a5.006 5.006 0 00-2.169-1.816l-.5-8.5z" clipRule="evenodd" /></svg>
                } />
            </div>

            {/* Second Row Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-white/10 shadow-sm text-center">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Unique Visitors</p>
                    <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{stats.unique_visitors}</p>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-white/10 shadow-sm text-center">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Monthly</p>
                    <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{stats.month_visits}</p>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-white/10 shadow-sm text-center">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Total Posts</p>
                    <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{stats.total_posts}</p>
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-white/10 shadow-sm text-center">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Total Comments</p>
                    <p className="text-xl font-bold text-slate-800 dark:text-slate-100">{stats.total_comments}</p>
                </div>
            </div>

            {/* 30 Days Trend */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-white/10 shadow-sm mb-6">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6">Visits Trend (30 Days)</h3>
                <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={visitsChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(val) => val.split('-').slice(1).join('/')} minTickGap={20} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="count" name="Visits" stroke="#fbbf24" strokeWidth={3} fillOpacity={1} fill="url(#colorVisits)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Top Pages & Devices */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-white/10 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6">Top Pages</h3>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={topPages} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" opacity={0.2} />
                                <XAxis type="number" hide />
                                <YAxis dataKey="path" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} width={120} />
                                <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
                                <Bar dataKey="count" name="Visits" fill="#38bdf8" radius={[0, 4, 4, 0]} barSize={20} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-white/10 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6">Devices</h3>
                    <div className="h-64 w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={deviceData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={5} dataKey="value" stroke="none">
                                    {deviceData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="flex flex-col gap-2">
                            {deviceData.map((entry, index) => (
                                <div key={entry.name} className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                    <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">{entry.name}</span>
                                    <span className="text-sm font-semibold ml-auto">{entry.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Hourly & Browsers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-white/10 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6">Hourly Pattern</h3>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={hourlyVisits} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                                <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 10}} minTickGap={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                                <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
                                <Bar dataKey="count" name="Visits" fill="#a78bfa" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-white/10 shadow-sm">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-6">Top Browsers</h3>
                    <div className="flex flex-col gap-4">
                        {browserData.map((browser, index) => (
                            <div key={browser.name}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium text-slate-700 dark:text-slate-300">{browser.name}</span>
                                    <span className="text-slate-500 font-semibold">{browser.value}</span>
                                </div>
                                <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
                                    <div 
                                        className="h-2 rounded-full" 
                                        style={{ 
                                            width: `${Math.max(2, (browser.value / Math.max(...browserData.map(d=>d.value))) * 100)}%`,
                                            backgroundColor: COLORS[index % COLORS.length] 
                                        }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Visitors Table */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                    <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">Recent Visitors</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400">
                            <tr>
                                <th className="px-6 py-3 font-medium">Time</th>
                                <th className="px-6 py-3 font-medium">Page Path</th>
                                <th className="px-6 py-3 font-medium">Browser</th>
                                <th className="px-6 py-3 font-medium">Device</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-700/50 text-slate-700 dark:text-slate-300">
                            {recentVisitors.length > 0 ? recentVisitors.map((visitor, i) => (
                                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-500">{visitor.time}</td>
                                    <td className="px-6 py-4 truncate max-w-xs">{visitor.path}</td>
                                    <td className="px-6 py-4">{visitor.browser}</td>
                                    <td className="px-6 py-4 capitalize">{visitor.device}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-8 text-center text-slate-500">No visitors recorded yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        </AdminLayout>
    );
}
