import { useEffect, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { contact, experience, projects, skills, socials, whoami } from '@/content';
import HUD from '@/components/HUD';
import OnScreenControls from '@/components/OnScreenControls';
import { OverlayPanel } from '@/components/OverlayPanel';
import { Scene } from '@/world/Scene';

export default function Home() {
    const [orbit, setOrbit] = useState<string | null>(null);
    const [speed, setSpeed] = useState(0);
    const [boostCd, setBoostCd] = useState(0);
    const [resetSignal, setResetSignal] = useState(0);
    const [showHint, setShowHint] = useState(true);

    useEffect(() => {
        const el = document.querySelector('canvas') as HTMLCanvasElement | null;
        const fn = () => el?.focus?.();
        el?.addEventListener('pointerdown', fn, { once: true });
        return () => el?.removeEventListener('pointerdown', fn as any);
    }, []);

    useEffect(() => {
        if (speed > 0.5) setShowHint(false);
    }, [speed]);

    const section = useMemo(() => {
        const featured = projects.slice(0, 3);
        return {
            about: {
                title: 'About',
                summary: (
                    <div className="space-y-2">
                        <p>{whoami.tagline}</p>
                        <a
                            href={whoami.resumeUrl}
                            target="_blank"
                            className="rounded bg-white/10 px-3 py-2 hover:bg-white/20"
                        >
                            View Résumé
                        </a>
                    </div>
                ),
                full: (
                    <div className="space-y-4">
                        <p>{whoami.tagline}</p>
                        <div className="space-y-1">
                            <p>
                                I build automation and tooling, keep systems healthy, and ship pragmatic code. I’m
                                moving toward software engineering roles again while leveraging production experience.
                            </p>
                        </div>
                        <a
                            href={whoami.resumeUrl}
                            target="_blank"
                            className="rounded bg-white/10 px-3 py-2 hover:bg-white/20"
                        >
                            View Résumé
                        </a>
                    </div>
                ),
            },
            skills: {
                title: 'Skills',
                summary: (
                    <div className="space-y-2">
                        <p>
                            <b>Languages:</b> {skills.languages.join(', ')}
                        </p>
                        <p>
                            <b>Focus:</b> Python, automation, observability, pragmatic tooling
                        </p>
                    </div>
                ),
                full: (
                    <div className="space-y-3">
                        <div>
                            <b>Languages:</b> {skills.languages.join(', ')}
                        </div>
                        <div>
                            <b>Backend & Ops:</b> {skills.backendOps.join(', ')}
                        </div>
                        <div>
                            <b>Data & Tasks:</b> {skills.dataTasks.join(', ')}
                        </div>
                        <div>
                            <b>Frontend:</b> {skills.frontend.join(', ')}
                        </div>
                        <div>
                            <b>Practices:</b> {skills.practices.join(', ')}
                        </div>
                    </div>
                ),
            },
            projects: {
                title: 'Projects',
                summary: (
                    <div className="space-y-3">
                        {featured.map(p => (
                            <div key={p.id} className="rounded-lg bg-white/10 p-3">
                                <div className="text-sm font-semibold">{p.title}</div>
                                <div className="text-sm opacity-90">{p.summary}</div>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {p.links.map(l => (
                                        <a
                                            key={l.url}
                                            href={l.url}
                                            target="_blank"
                                            className="rounded bg-white/10 px-2 py-1 text-xs hover:bg-white/20"
                                        >
                                            {l.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <a
                            href="https://github.com/AndreaPallotta?tab=repositories"
                            className="inline-block rounded bg-white/10 px-3 py-2 hover:bg-white/20"
                        >
                            View All
                        </a>
                    </div>
                ),
                full: (
                    <div className="space-y-3">
                        {projects.map(p => (
                            <div key={p.id} className="rounded-lg bg-white/10 p-3">
                                <div className="text-sm font-semibold">{p.title}</div>
                                <div className="text-sm opacity-90">{p.summary}</div>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {p.tags.map(t => (
                                        <span key={t} className="rounded bg-white/10 px-2 py-1 text-xs">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {p.links.map(l => (
                                        <a
                                            key={l.url}
                                            href={l.url}
                                            target="_blank"
                                            className="rounded bg-white/10 px-2 py-1 text-xs hover:bg-white/20"
                                        >
                                            {l.label}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ),
            },
            exp: {
                title: 'Experience',
                summary: (
                    <div className="space-y-2">
                        <div className="font-semibold">{experience[0].role}</div>
                        <div className="text-sm opacity-90">
                            {experience[0].company} • {experience[0].when}
                        </div>
                    </div>
                ),
                full: (
                    <div className="space-y-4">
                        {experience.map((e, i) => (
                            <div key={i} className="rounded-lg bg-white/10 p-3">
                                <div className="font-semibold">{e.role}</div>
                                <div className="text-sm opacity-90">
                                    {e.company} • {e.when}
                                </div>
                                <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                                    {e.bullets.map((b, j) => (
                                        <li key={j}>{b}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                ),
            },
            contact: {
                title: 'Contact',
                summary: (
                    <div className="space-y-2">
                        <a href={`mailto:${contact.email}`} className="rounded bg-white/10 px-3 py-2 hover:bg-white/20">
                            {contact.email}
                        </a>
                        <a
                            href={contact.dot}
                            target="_blank"
                            className="rounded bg-white/10 px-3 py-2 hover:bg-white/20"
                        >
                            Dot Profile
                        </a>
                    </div>
                ),
                full: (
                    <div className="space-y-3">
                        <div className="space-x-2">
                            <a
                                href={`mailto:${contact.email}`}
                                className="rounded bg-white/10 px-3 py-2 hover:bg-white/20"
                            >
                                {contact.email}
                            </a>
                            <a
                                href={contact.dot}
                                target="_blank"
                                className="rounded bg-white/10 px-3 py-2 hover:bg-white/20"
                            >
                                Dot Profile
                            </a>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {socials.map(s => (
                                <a
                                    key={s.url}
                                    href={s.url}
                                    target="_blank"
                                    className="rounded bg-white/10 px-3 py-1 hover:bg-white/20"
                                >
                                    {s.label}
                                </a>
                            ))}
                        </div>
                    </div>
                ),
            },
        };
    }, [projects]);

    const active = orbit ? section[orbit as keyof typeof section] : null;

    return (
        <>
            {showHint && (
                <div className="pointer-events-none fixed top-3 left-1/2 z-20 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-white/90 backdrop-blur">
                    WASD/Arrows to fly, Shift to boost
                </div>
            )}

            {active && (
                <OverlayPanel
                    title={active.title}
                    summary={active.summary}
                    full={active.full}
                    onClose={() => setOrbit(null)}
                    className=""
                />
            )}

            <OnScreenControls />

            <HUD speed={speed} boostCd={boostCd} orbit={orbit} onReset={() => setResetSignal(v => v + 1)} />

            <Canvas
                className="fixed inset-0"
                camera={{ fov: 60, position: [0, 2.5, 8] }}
                dpr={Math.min(2, Math.max(1, window.devicePixelRatio))}
                gl={{ antialias: true, powerPreference: 'high-performance' }}
            >
                <Scene
                    onOrbitChange={setOrbit}
                    onTelemetry={(s, cd) => {
                        setSpeed(s);
                        setBoostCd(cd);
                    }}
                    resetSignal={resetSignal}
                />
            </Canvas>
        </>
    );
}
