import { Link } from 'react-router-dom';

type Props = {
    speed: number;
    boostCd: number;
    orbit: string | null;
    onReset: () => void;
};

export default function HUD({ speed, boostCd, orbit, onReset }: Props) {
    const pct = Math.max(0, Math.min(1, 1 - boostCd));
    return (
        <div className="pointer-events-auto fixed inset-x-0 bottom-0 z-20 mx-auto w-full max-w-6xl p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] text-white">
            <div className="flex flex-col gap-3 rounded-2xl bg-white/10 p-3 backdrop-blur md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap items-center gap-3">
                    <Link to="/" className="rounded bg-white/10 px-2 py-1 hover:bg-white/20">
                        Spacefolio
                    </Link>
                    {orbit && (
                        <span className="rounded bg-white/10 px-2 py-1">
                            Orbiting: <b className="ml-1">{orbit.toUpperCase()}</b>
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-4">
                    <div className="min-w-[160px]">
                        <div className="text-xs opacity-80">Boost (Hold Shift)</div>
                        <div className="h-2 w-full overflow-hidden rounded bg-white/10">
                            <div className="h-full rounded bg-cyan-400/80" style={{ width: `${pct * 100}%` }} />
                        </div>
                    </div>
                    <div className="w-28 text-right">
                        <div className="text-xs opacity-80">Speed</div>
                        <div className="tabular-nums">{Math.round(speed).toString().padStart(3, '0')}</div>
                    </div>
                    <button onClick={onReset} className="rounded bg-white/10 px-3 py-1 hover:bg-white/20">
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
}
