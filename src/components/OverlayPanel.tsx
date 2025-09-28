import { useState, type ReactNode } from 'react';

export function OverlayPanel({
    title,
    summary,
    full,
    onClose,
    className = '',
}: {
    title: string;
    summary: ReactNode;
    full: ReactNode;
    onClose: () => void;
    className?: string;
}) {
    const [expanded, setExpanded] = useState(false);
    const sizeClass = expanded
        ? 'top-4 bottom-28 w-[min(1100px,96vw)] max-h-[calc(100vh-2rem-7rem)]'
        : 'bottom-28 w-[min(680px,92vw)]';
    return (
        <div
            className={`pointer-events-auto fixed left-1/2 z-40 -translate-x-1/2 rounded-2xl bg-white/10 text-white/90 backdrop-blur-md shadow-xl p-5 ${sizeClass} ${className}`}
        >
            <div className="mb-2 flex items-center justify-between">
                <h2 className="text-lg font-semibold">{title}</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => setExpanded(v => !v)}
                        className="rounded bg-white/10 px-2 py-1 text-sm hover:bg-white/20"
                    >
                        {expanded ? 'Collapse' : 'Expand'}
                    </button>
                    <button onClick={onClose} className="rounded bg-white/10 px-2 py-1 text-sm hover:bg-white/20">
                        Close
                    </button>
                </div>
            </div>
            <div className={`text-sm ${expanded ? 'overflow-auto' : ''}`}>{expanded ? full : summary}</div>
        </div>
    );
}
