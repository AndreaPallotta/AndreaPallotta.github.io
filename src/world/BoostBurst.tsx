import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function BoostBurst({ originRef }: { originRef: React.RefObject<THREE.Object3D> }) {
    const pointsRef = useRef<THREE.Points>(null!);
    const lifetime = 0.35;
    const t = useRef(0);
    const active = useRef(false);

    const dirs = useMemo(() => {
        const n = 120;
        const arr = new Float32Array(n * 3);
        for (let i = 0; i < n; i++) {
            const v = new THREE.Vector3().randomDirection().multiplyScalar(0.01 + Math.random() * 0.03);
            arr[i * 3 + 0] = v.x;
            arr[i * 3 + 1] = v.y;
            arr[i * 3 + 2] = v.z;
        }
        return arr;
    }, []);

    (BoostBurst as any)._trigger = () => {
        t.current = 0;
        active.current = true;
        if (pointsRef.current && originRef.current) {
            pointsRef.current.position.copy(originRef.current.position);
        }
    };

    useFrame((_, dt) => {
        if (!active.current) return;
        t.current += dt;
        const p = pointsRef.current;
        if (!p) return;

        const alpha = 1 - t.current / lifetime;
        (p.material as THREE.PointsMaterial).opacity = Math.max(0, alpha);

        const pos = p.geometry.getAttribute('position') as THREE.BufferAttribute;
        for (let i = 0; i < pos.count; i++) {
            pos.setX(i, pos.getX(i) + dirs[i * 3 + 0]);
            pos.setY(i, pos.getY(i) + dirs[i * 3 + 1]);
            pos.setZ(i, pos.getZ(i) + dirs[i * 3 + 2]);
        }
        pos.needsUpdate = true;

        if (t.current >= lifetime) {
            active.current = false;
            (p.material as THREE.PointsMaterial).opacity = 0;
        }
    });

    return (
        <points ref={pointsRef} frustumCulled={false}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[new Float32Array((dirs.length / 3) * 3), 3]} />
            </bufferGeometry>
            <pointsMaterial size={0.06} transparent opacity={0} color="#7ef9ff" depthWrite={false} />
        </points>
    );
}
