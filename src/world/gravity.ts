import * as THREE from 'three';

export type Well = {
    id: string;
    label: string;
    pos: THREE.Vector3;
    mass: number;
    coreRadius: number;
    orbitRadius: number;
};

export function applyGravity(point: THREE.Vector3, acc: THREE.Vector3, wells: Well[]) {
    for (const well of wells) {
        const dir = new THREE.Vector3().subVectors(well.pos, point);
        const d2 = Math.max(dir.lengthSq(), well.coreRadius * well.coreRadius);
        const g = well.mass / d2;
        acc.add(dir.normalize().multiplyScalar(g));
    }
}
