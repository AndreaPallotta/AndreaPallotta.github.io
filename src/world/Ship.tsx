import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useKeys } from '@/hooks/useKeys';
import { applyGravity, type Well } from './gravity';

type Props = {
    wells: Well[];
    onBoost?: () => void;
    onThrottleChange?: (t: number) => void;
    onTelemetry?: (s: number, boostCd: number) => void;
    resetTick?: number;
};

export const Ship = forwardRef<THREE.Group, Props>(
    ({ wells, onBoost, onThrottleChange, onTelemetry, resetTick = 0 }, ref) => {
        const group = useRef<THREE.Group>(null!);
        useImperativeHandle(ref, () => group.current);
        const vel = useRef(new THREE.Vector3());
        const acc = useRef(new THREE.Vector3());
        const keys = useKeys();
        const headlight = useRef<THREE.PointLight>(null!);

        const maxSpeed = 22;
        const thrust = 28;
        const damping = 0.98;
        const boost = { cdMax: 2.0, power: 40 };
        const boostCD = useRef(0);
        const throttle = useRef(0);
        const lastReset = useRef(-1);

        useFrame((_, _dt) => {
            let dt = Math.min(0.033, _dt);
            const g = group.current;
            if (!g) return;

            if (resetTick !== lastReset.current) {
                lastReset.current = resetTick;
                vel.current.set(0, 0, 0);
                acc.current.set(0, 0, 0);
                boostCD.current = 0;
            }

            const left = keys.left();
            const right = keys.right();
            const fwd = keys.forward();
            const back = keys.back();
            const boostKey = keys.boost();

            const yaw = (right ? -1 : 0) + (left ? 1 : 0);
            g.rotation.y += yaw * 0.04;

            const dir = new THREE.Vector3(0, 0, -1).applyQuaternion(g.quaternion);
            const t = (fwd ? 1 : 0) + (back ? -0.6 : 0);
            throttle.current = Math.max(0, t);
            onThrottleChange?.(throttle.current);

            acc.current.addScaledVector(dir, t * thrust);
            applyGravity(g.position, acc.current, wells);

            if (boostCD.current > 0) boostCD.current -= dt;
            if (boostKey && boostCD.current <= 0) {
                acc.current.addScaledVector(dir, boost.power);
                boostCD.current = boost.cdMax;
                onBoost?.();
                throttle.current = 1;
                onThrottleChange?.(1);
            }

            vel.current.addScaledVector(acc.current, dt);
            acc.current.set(0, 0, 0);

            const speed = vel.current.length();
            if (speed > maxSpeed) vel.current.multiplyScalar(maxSpeed / speed);
            vel.current.multiplyScalar(damping);
            g.position.addScaledVector(vel.current, dt);

            headlight.current.intensity += (0.2 + 1.2 * throttle.current - headlight.current.intensity) * 0.25;

            onTelemetry?.(speed, boostCD.current);
        });

        return (
            <group ref={group} position={[0, 0, 8]} rotation={[0, Math.PI, 0]}>
                <mesh position={[0, 0, -0.2]}>
                    <boxGeometry args={[0.6, 0.25, 1.6]} />
                    <meshStandardMaterial color="#1b2430" metalness={0.7} roughness={0.35} />
                </mesh>
                <mesh position={[0, 0.14, -0.2]}>
                    <boxGeometry args={[0.62, 0.02, 1.2]} />
                    <meshStandardMaterial color="#2e3b4e" metalness={0.5} roughness={0.5} />
                </mesh>
                <mesh position={[0, 0, -1.2]} rotation={[Math.PI / 2, 0, 0]}>
                    <coneGeometry args={[0.45, 0.8, 24]} />
                    <meshStandardMaterial color="#cfd6dd" metalness={0.6} roughness={0.35} />
                </mesh>
                <mesh position={[0, 0.08, -0.75]}>
                    <sphereGeometry args={[0.22, 20, 12]} />
                    <meshPhysicalMaterial
                        color="#78a6ff"
                        transparent
                        opacity={0.6}
                        roughness={0.1}
                        metalness={0}
                        transmission={0.6}
                    />
                </mesh>
                <mesh position={[-0.6, 0, -0.2]}>
                    <boxGeometry args={[0.8, 0.05, 0.8]} />
                    <meshStandardMaterial color="#2a3442" metalness={0.5} roughness={0.6} />
                </mesh>
                <mesh position={[0.6, 0, -0.2]}>
                    <boxGeometry args={[0.8, 0.05, 0.8]} />
                    <meshStandardMaterial color="#2a3442" metalness={0.5} roughness={0.6} />
                </mesh>
                <mesh position={[0, -0.08, -0.1]}>
                    <boxGeometry args={[0.12, 0.02, 0.5]} />
                    <meshStandardMaterial color="#ff6b6b" metalness={0.4} roughness={0.5} />
                </mesh>
                <mesh position={[0, 0, 0.9]}>
                    <cylinderGeometry args={[0.18, 0.18, 0.3, 16]} />
                    <meshStandardMaterial
                        color="#6bd3ff"
                        emissive="#2cc7ff"
                        emissiveIntensity={0.6}
                        metalness={0.4}
                        roughness={0.4}
                    />
                </mesh>
                <pointLight ref={headlight} position={[0, 0.2, -0.6]} intensity={0.2} distance={6} />
                <mesh name="engineFlame" position={[0, 0, 1.1]} rotation={[Math.PI / 2, 0, 0]}>
                    <coneGeometry args={[0.15, 0.9, 20]} />
                    <meshBasicMaterial
                        color="#7ef9ff"
                        transparent
                        opacity={0}
                        blending={THREE.AdditiveBlending}
                        depthWrite={false}
                    />
                </mesh>
            </group>
        );
    },
);
