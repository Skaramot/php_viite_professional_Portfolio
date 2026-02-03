import { useEffect, useMemo, useState } from 'react';

const CACHE_KEY = 'gh_skaramot_cache_v1';
const CACHE_TTL_MS = 1000 * 60 * 30;
const USERNAME = 'Skaramot';

function readCache() {
    try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed || Date.now() - parsed.timestamp > CACHE_TTL_MS) return null;
        return parsed.data;
    } catch {
        return null;
    }
}

function writeCache(data) {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data }));
    } catch {
        // ignore cache write failures
    }
}

async function fetchAllRepos(signal) {
    const response = await fetch(
        `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`,
        { signal },
    );
    if (!response.ok) {
        throw new Error(`GitHub request failed (${response.status})`);
    }
    const data = await response.json();
    return Array.isArray(data) ? data.filter((repo) => !repo.fork) : [];
}

async function fetchLanguages(repos, signal) {
    const languages = {};
    const concurrency = 6;
    let index = 0;

    async function worker() {
        while (index < repos.length) {
            const currentIndex = index;
            index += 1;
            const repo = repos[currentIndex];
            try {
                const response = await fetch(repo.languages_url, { signal });
                if (!response.ok) continue;
                const data = await response.json();
                Object.entries(data).forEach(([lang, bytes]) => {
                    languages[lang] = (languages[lang] || 0) + bytes;
                });
            } catch {
                // ignore individual repo failures
            }
        }
    }

    await Promise.all(Array.from({ length: concurrency }, worker));
    return languages;
}

export default function useGithubData() {
    const [repos, setRepos] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [status, setStatus] = useState('loading');
    const [error, setError] = useState('');

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const load = async () => {
            try {
                const cached = readCache();
                if (cached && isMounted) {
                    setRepos(cached.repos || []);
                    setLanguages(cached.languages || []);
                    setStatus('ready');
                    return;
                }

                const repoData = await fetchAllRepos(controller.signal);
                const langData = await fetchLanguages(repoData, controller.signal);
                const totalBytes = Object.values(langData).reduce((sum, value) => sum + value, 0);
                const languageList = Object.entries(langData)
                    .map(([name, bytes]) => ({
                        name,
                        bytes,
                        percent: totalBytes ? (bytes / totalBytes) * 100 : 0,
                    }))
                    .sort((a, b) => b.bytes - a.bytes);

                if (isMounted) {
                    setRepos(repoData);
                    setLanguages(languageList);
                    setStatus('ready');
                    writeCache({ repos: repoData, languages: languageList });
                }
            } catch (err) {
                if (!isMounted || err.name === 'AbortError') return;
                setStatus('error');
                setError('Unable to load GitHub data right now.');
            }
        };

        load();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);

    const traits = useMemo(() => {
        return languages.map((lang) => `${lang.name} development`);
    }, [languages]);

    return { repos, languages, traits, status, error };
}
