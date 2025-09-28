import { useMemo, useState } from 'react';
import { projects as data, type Project } from '@/content';

const tagsFrom = (list: Project[]) => Array.from(new Set(list.flatMap(p => p.tags)));

export default function Projects() {
    const [query, setQuery] = useState('');
    const [activeTag, setActiveTag] = useState<string | null>(null);

    const tags = useMemo(() => tagsFrom(data), []);
    const items = useMemo(() => {
        const q = query.toLowerCase().trim();
        return data.filter(p => {
            const hitQ = !q || [p.title, p.summary, p.tags.join(' ')].some(s => s.toLowerCase().includes(q));
            const hitT = !activeTag || p.tags.includes(activeTag);
            return hitQ && hitT;
        });
    }, [query, activeTag]);

    return (
        <div className="mx-auto max-w-6xl px-4 py-6 text-white">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-2xl font-semibold">Projects</h1>
                <div className="flex items-center gap-2">
                    <input
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Search"
                        className="rounded-md bg-white/10 px-3 py-2 outline-none placeholder-white/60"
                    />
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setActiveTag(null)}
                            className={`rounded px-3 py-2 ${activeTag === null ? 'bg-white/20' : 'bg-white/10 hover:bg-white/20'}`}
                        >
                            All
                        </button>
                        {tags.map(t => (
                            <button
                                key={t}
                                onClick={() => setActiveTag(t === activeTag ? null : t)}
                                className={`rounded px-3 py-2 ${t === activeTag ? 'bg-white/20' : 'bg-white/10 hover:bg-white/20'}`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {items.map(p => (
                    <article key={p.id} className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                        <div className="flex items-start gap-4">
                            {p.image && (
                                <img
                                    src={p.image.src}
                                    alt={p.image.alt}
                                    className="h-20 w-20 flex-none rounded-lg object-contain bg-white/5 p-2"
                                />
                            )}
                            <div className="min-w-0">
                                <h2 className="truncate text-lg font-semibold">{p.title}</h2>
                                <p className="mt-1 text-sm text-white/90">{p.summary}</p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {p.tags.map(t => (
                                        <span key={t} className="rounded bg-white/10 px-2 py-1 text-xs">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {p.links.map(l => (
                                        <a
                                            key={l.url}
                                            href={l.url}
                                            target="_blank"
                                            className="rounded bg-white/10 px-3 py-1 text-sm hover:bg-white/20"
                                        >
                                            {l.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}
