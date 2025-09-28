import { useEffect, useState } from 'react';
import { pressKey, releaseKey } from '@/hooks/useKeys';

export default function OnScreenControls() {
    const [show, setShow] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia('(pointer: coarse)');
        setShow(mq.matches);
        const fn = () => setShow(window.matchMedia('(pointer: coarse)').matches);
        mq.addEventListener?.('change', fn);
        return () => mq.removeEventListener?.('change', fn);
    }, []);
    if (!show) return null;

    const down = (k: string) => () => pressKey(k);
    const up = (k: string) => () => releaseKey(k);

    return (
        <div className="pointer-events-auto fixed bottom-28 left-0 right-0 z-30 mx-auto flex max-w-6xl items-end justify-between px-4">
            <div className="flex gap-2">
                <button
                    className="h-12 w-12 rounded-full bg-white/10 text-white active:bg-white/20"
                    onPointerDown={down('a')}
                    onPointerUp={up('a')}
                    onPointerCancel={up('a')}
                    onPointerLeave={up('a')}
                >
                    ◀
                </button>
                <button
                    className="h-12 w-12 rounded-full bg-white/10 text-white active:bg-white/20"
                    onPointerDown={down('d')}
                    onPointerUp={up('d')}
                    onPointerCancel={up('d')}
                    onPointerLeave={up('d')}
                >
                    ▶
                </button>
            </div>
            <div className="flex gap-2">
                <button
                    className="h-12 w-20 rounded-full bg-white/10 text-white active:bg-white/20"
                    onPointerDown={down('w')}
                    onPointerUp={up('w')}
                    onPointerCancel={up('w')}
                    onPointerLeave={up('w')}
                >
                    Thrust
                </button>
                <button
                    className="h-12 w-20 rounded-full bg-white/10 text-white active:bg-white/20"
                    onPointerDown={down('shift')}
                    onPointerUp={up('shift')}
                    onPointerCancel={up('shift')}
                    onPointerLeave={up('shift')}
                >
                    Boost
                </button>
            </div>
        </div>
    );
}
