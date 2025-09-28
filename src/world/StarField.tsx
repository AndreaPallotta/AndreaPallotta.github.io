import { useMemo } from 'react';

export function Starfield({ count = 1500, spread = 800 }) {
    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < arr.length; i += 3) {
            arr[i] = (Math.random() - 0.5) * spread;
            arr[i + 1] = (Math.random() - 0.5) * spread * 0.6;
            arr[i + 2] = (Math.random() - 0.5) * spread;
        }
        return arr;
    }, [count, spread]);

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial size={0.75} sizeAttenuation opacity={0.85} transparent />
        </points>
    );
}
