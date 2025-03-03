// components/Terrain.jsx
import { useMemo } from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

export default function Terrain({ width = 100, depth = 100, tileSize = 8, portalPositions = [] }) {
  // Load the grass texture (ensure /public/textures/grass.jpg exists)
  const terrainTexture = useLoader(TextureLoader, '/textures/grass.jpg');
  terrainTexture.wrapS = terrainTexture.wrapT = THREE.RepeatWrapping;
  terrainTexture.repeat.set(1, 1);

  // Generate hexagonal grid positions:
  // For flat-topped hexagons, the horizontal spacing is tileSize * sqrt(3)
  // and vertical spacing is tileSize * 1.5.
  // We'll skip tiles that are too close to any portal.
  const clearanceRadius = tileSize * 1.5; // Adjust as needed
  const hexTiles = useMemo(() => {
    const tiles = [];
    const hexWidth = tileSize * Math.sqrt(3);
    const hexHeight = tileSize * 1.5;
    for (let x = -width / 2; x < width / 2; x += hexWidth) {
      for (let z = -depth / 2; z < depth / 2; z += hexHeight) {
        // Offset every other row for the honeycomb pattern.
        const row = Math.floor((z + depth / 2) / hexHeight);
        const offset = (row % 2 === 0) ? 0 : hexWidth / 2;
        const pos = new THREE.Vector3(x + offset, 0, z);
        // Check if any portal is too close to this tile.
        const tooClose = portalPositions.some(portal => pos.distanceTo(portal) < clearanceRadius);
        if (!tooClose) {
          tiles.push(pos);
        }
      }
    }
    return tiles;
  }, [width, depth, tileSize, portalPositions]);

  
  return (
    <group>
      {hexTiles.map((pos, i) => (
        <mesh key={i} position={pos} receiveShadow>
          {/* Use a very thin cylinder to represent a flat hexagon */}
          <cylinderGeometry args={[tileSize, tileSize, 0.1, 6]} />
          <meshStandardMaterial map={terrainTexture} />
        </mesh>
      ))}
    </group>
  );
}
