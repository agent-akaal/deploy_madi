// Terrain.tsx - Creates a hexagonal grid terrain for the 3D learning map
import { useMemo } from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

// Props interface (implicitly defined by parameters)
// width: Total width of the terrain in world units
// depth: Total depth of the terrain in world units
// tileSize: Size of each hexagonal tile (distance from center to corner)
// portalPositions: Array of positions where portals exist (to avoid placing tiles there)
export default function Terrain({ width = 100, depth = 100, tileSize = 8, portalPositions = [] }) {
  // Load the grass texture for the terrain surface
  // The texture file should exist at /public/textures/grass.jpg
  const terrainTexture = useLoader(TextureLoader, '/textures/grass.jpg');
  
  // Configure texture to repeat seamlessly across tiles
  terrainTexture.wrapS = terrainTexture.wrapT = THREE.RepeatWrapping;
  terrainTexture.repeat.set(1, 1); // Set repeat scale for the texture

  // Generate hexagonal grid positions:
  // For flat-topped hexagons:
  // - Horizontal spacing is tileSize * sqrt(3) (distance between centers of adjacent hexagons in same row)
  // - Vertical spacing is tileSize * 1.5 (distance between centers of hexagons in adjacent rows)
  // This calculation creates a "honeycomb" pattern of hexagons
  // Tiles too close to portal positions are excluded to create clear spaces around interactive elements
  const clearanceRadius = tileSize * 1.5; // Distance to keep clear around portals
  
  // Use useMemo to optimize performance by only recalculating when dependencies change
  const hexTiles = useMemo(() => {
    const tiles = [];
    
    // Calculate spacing between hexagons
    const hexWidth = tileSize * Math.sqrt(3); // Horizontal distance between centers
    const hexHeight = tileSize * 1.5;         // Vertical distance between centers
    
    // Loop through the terrain area to place hexagonal tiles
    for (let x = -width / 2; x < width / 2; x += hexWidth) {
      for (let z = -depth / 2; z < depth / 2; z += hexHeight) {
        // Determine which row we're in (counting from the back of the terrain)
        const row = Math.floor((z + depth / 2) / hexHeight);
        
        // Offset every other row by half the hex width to create interlocking pattern
        // This is what creates the honeycomb effect
        const offset = (row % 2 === 0) ? 0 : hexWidth / 2;
        const pos = new THREE.Vector3(x + offset, 0, z);
        
        // Check if any portal is too close to this tile
        // If so, skip this tile to create a clear space around the portal
        const tooClose = portalPositions.some(portal => pos.distanceTo(portal) < clearanceRadius);
        if (!tooClose) {
          tiles.push(pos);
        }
      }
    }
    return tiles;
  }, [width, depth, tileSize, portalPositions]); // Only recalculate when these dependencies change

  // Render the terrain as a group of hexagonal tiles
  return (
    <group>
      {/* Map each tile position to a 3D hexagon (implemented as a thin cylinder) */}
      {hexTiles.map((pos, i) => (
        <mesh key={i} position={pos} receiveShadow>
          {/* Use a very thin cylinder with 6 sides to represent a flat hexagon
              This is more efficient than creating custom geometry */}
          <cylinderGeometry args={[tileSize, tileSize, -0.1, 6]} />
          <meshStandardMaterial map={terrainTexture} />
        </mesh>
      ))}
    </group>
  );
}
