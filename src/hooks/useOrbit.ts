import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { Well } from '@/world/gravity';

export function useOrbit(
    getShipPos: () => THREE.Vector3,
    wells: Well[],
    onEnter: (id: string) => void,
    onLeave?: (id: string) => void,
) {
    const current = useRef<string | null>(null);

    useEffect(() => {
        let raf = 0;
        const tick = () => {
            const pos = getShipPos();
            let hit: string | null = null;

            for (const well of wells) {
                if (pos.distanceTo(well.pos) < well.orbitRadius) {
                    hit = well.id;
                    break;
                }
            }

            if (hit !== current.current) {
                if (current.current && onLeave) {
                    onLeave(current.current);
                }
                if (hit) {
                    onEnter(hit);
                }
                current.current = null;
            }
            raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [wells, onEnter, onLeave, getShipPos]);
}
