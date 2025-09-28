import { useMemo, type JSX } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { Well } from './gravity';

type GroupProps = JSX.IntrinsicElements['group'];

export function usePlanets(): Well[] {
    return useMemo<Well[]>(
        () => [
            {
                id: 'about',
                label: 'About',
                pos: new THREE.Vector3(0, 0, -30),
                mass: 180,
                coreRadius: 3,
                orbitRadius: 10,
            },
            {
                id: 'skills',
                label: 'Skills',
                pos: new THREE.Vector3(24, 0, -12),
                mass: 160,
                coreRadius: 3,
                orbitRadius: 10,
            },
            {
                id: 'projects',
                label: 'Projects',
                pos: new THREE.Vector3(-24, 0, -10),
                mass: 220,
                coreRadius: 4,
                orbitRadius: 12,
            },
            {
                id: 'exp',
                label: 'Experience',
                pos: new THREE.Vector3(0, 0, 20),
                mass: 200,
                coreRadius: 3,
                orbitRadius: 11,
            },
            {
                id: 'contact',
                label: 'Contact',
                pos: new THREE.Vector3(18, 0, 26),
                mass: 150,
                coreRadius: 3,
                orbitRadius: 9,
            },
        ],
        [],
    );
}

const COLORS = ['#7aa2ff', '#ffae7a', '#9cff7a', '#ff7ad5', '#f4ff7a'];

export function Planets(props: GroupProps & { wells: Well[] }) {
    const { wells, ...groupProps } = props;
    return (
        <group {...groupProps}>
            {wells.map((p, i) => (
                <group key={p.id} position={p.pos}>
                    <mesh>
                        <sphereGeometry args={[p.coreRadius, 32, 16]} />
                        <meshStandardMaterial
                            roughness={0.6}
                            metalness={0.1}
                            color={COLORS[i % COLORS.length]}
                            emissive="#111"
                        />
                    </mesh>
                    <mesh>
                        <sphereGeometry args={[p.coreRadius * 1.15, 32, 16]} />
                        <meshBasicMaterial
                            color={COLORS[i % COLORS.length]}
                            transparent
                            opacity={0.25}
                            blending={THREE.AdditiveBlending}
                            depthWrite={false}
                        />
                    </mesh>
                    <mesh rotation-x={-Math.PI / 2}>
                        <ringGeometry args={[p.orbitRadius * 0.98, p.orbitRadius * 1.02, 64]} />
                        <meshBasicMaterial transparent opacity={0.25} color="#ffffff" />
                    </mesh>
                    <Html center distanceFactor={6} position={[0, p.coreRadius + 0.8, 0]}>
                        <div
                            className="rounded-full bg-white/10 px-4 py-2 text-2xl text-white/90 backdrop-blur"
                            style={{ transform: 'scale(3)' }}
                        >
                            {p.label}
                        </div>
                    </Html>
                </group>
            ))}
        </group>
    );
}
