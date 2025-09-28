import { useCallback, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useOrbit } from '@/hooks/useOrbit';
import { BoostBurst } from './BoostBurst';
import { Planets, usePlanets } from './Planet';
import { Ship } from './Ship';
import { Starfield } from './StarField';

type Props = {
    onOrbitChange: (id: string | null) => void;
    onTelemetry: (s: number, boostCd: number) => void;
    resetSignal: number;
};

export function Scene({ onOrbitChange, onTelemetry, resetSignal }: Props) {
    const wells = usePlanets();
    const shipRef = useRef<THREE.Group>(null!);
    const flameRef = useRef<THREE.Mesh | null>(null);
    const throttleRef = useRef(0);
    const camTarget = useRef(new THREE.Vector3());
    const resetTick = useRef(0);

    const getShipPos = useCallback(() => shipRef.current?.position ?? new THREE.Vector3(), []);
    useOrbit(
        getShipPos,
        wells,
        id => onOrbitChange(id),
        () => onOrbitChange(null),
    );

    useEffect(() => {
        const g = shipRef.current;
        if (!g) return;
        g.position.set(0, 0, 8);
        g.rotation.set(0, Math.PI, 0);
        flameRef.current = null;
        resetTick.current += 1;
    }, [resetSignal]);

    useFrame(({ camera }, dt) => {
        if (document.hidden) return;
        const g = shipRef.current;
        if (!g) return;
        const fwd = new THREE.Vector3(0, 0, -1).applyQuaternion(g.quaternion);
        camTarget.current
            .copy(g.position)
            .addScaledVector(fwd, -6)
            .add(new THREE.Vector3(0, 2.5, 0));
        camera.position.lerp(camTarget.current, 1 - Math.pow(0.001, dt * 60));
        camera.lookAt(g.position);

        if (!flameRef.current) {
            const found = g.getObjectByName('engineFlame');
            if (found && (found as any).isMesh) flameRef.current = found as THREE.Mesh;
        }
        const flame = flameRef.current;
        if (flame) {
            const mat = flame.material as THREE.MeshBasicMaterial;
            const target = 0.15 + 0.6 * throttleRef.current;
            mat.opacity += (target - mat.opacity) * 0.2;
            flame.scale.y += (0.7 + 2.0 * throttleRef.current - flame.scale.y) * 0.2;
            flame.scale.x += (0.7 + 0.6 * throttleRef.current - flame.scale.x) * 0.2;
        }
    });

    const handleBoost = () => (BoostBurst as any)._trigger?.();
    const handleThrottle = (t: number) => {
        throttleRef.current = t;
    };

    return (
        <>
            <color attach="background" args={['#0b0f15']} />
            <ambientLight intensity={0.35} />
            <directionalLight position={[10, 20, 10]} intensity={1.2} />
            <Starfield />
            <Planets wells={wells} />
            <BoostBurst originRef={shipRef} />
            <Ship
                ref={shipRef}
                wells={wells}
                onBoost={handleBoost}
                onThrottleChange={handleThrottle}
                onTelemetry={onTelemetry}
                resetTick={resetTick.current}
            />
        </>
    );
}
