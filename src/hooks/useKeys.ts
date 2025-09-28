import { useEffect, useRef } from 'react';

const pressed = new Set<string>();
export function pressKey(k: string) {
    pressed.add(k.toLowerCase());
}
export function releaseKey(k: string) {
    pressed.delete(k.toLowerCase());
}

export function useKeys() {
    const live = useRef(pressed);
    useEffect(() => {
        const down = (e: KeyboardEvent) => pressed.add(e.key.toLowerCase());
        const up = (e: KeyboardEvent) => pressed.delete(e.key.toLowerCase());
        window.addEventListener('keydown', down);
        window.addEventListener('keyup', up);
        return () => {
            window.removeEventListener('keydown', down);
            window.removeEventListener('keyup', up);
        };
    }, []);
    const has = (k: string) => live.current.has(k);
    return {
        forward: () => has('w') || has('arrowup'),
        back: () => has('s') || has('arrowdown'),
        left: () => has('a') || has('arrowleft'),
        right: () => has('d') || has('arrowright'),
        boost: () => has('shift'),
    };
}
