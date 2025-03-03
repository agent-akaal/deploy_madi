// Path.tsx - Creates visual pathways connecting learning resources in the 3D map
import { useMemo } from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

/**
 * Creates a rectangle (tile) geometry in the XZ plane,
 * pre-rotated by a given angle around the Y-axis.
 * The rectangle is centered at the origin.
 * 
 * This function generates custom geometry for path segments between quest points,
 * with each segment oriented correctly to connect two points.
 * 
 * @param {number} length - Length of the segment (along the path direction)
 * @param {number} width - Width of the path (perpendicular to direction)
 * @param {number} angle - Rotation angle (radians) about the Y-axis
 * @returns {THREE.BufferGeometry} - Custom geometry for the path segment
 */
function createSegmentGeometry(length: number, width: number, angle: number): THREE.BufferGeometry {
  const halfL = length / 2, halfW = width / 2;
  
  // Define vertices for a rectangle lying in the XZ plane, oriented along the X-axis:
  // This creates the base rectangle that will be rotated to align with the path direction
  const vertices = new Float32Array([
    -halfL, 0, -halfW,  // bottom left
     halfL, 0, -halfW,  // bottom right
     halfL, 0,  halfW,  // top right
    -halfL, 0,  halfW   // top left
  ]);
  
  // If angle is not zero, rotate the vertices around the Y axis.
  // This aligns the path segment with the direction between two quest points
  if (angle !== 0) {
    const cos = Math.cos(angle), sin = Math.sin(angle);
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i], z = vertices[i + 2];
      // Apply rotation matrix for Y-axis rotation
      vertices[i] = x * cos - z * sin;     // new x
      vertices[i + 2] = x * sin + z * cos; // new z
    }
  }
  
  // Create a new geometry and set the rotated vertices
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  
  // Simple UV mapping for texture coordinates:
  // UVs control how textures are mapped onto the geometry
  const uvs = new Float32Array([
    0, 0, // bottom left
    1, 0, // bottom right
    1, 1, // top right
    0, 1  // top left
  ]);
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  
  // Define indices for two triangles that make up the rectangle:
  // This determines which vertices form triangles for rendering
  geometry.setIndex([0, 1, 2, 2, 3, 0]);
  
  // Calculate normal vectors for proper lighting
  geometry.computeVertexNormals();
  
  return geometry;
}

// Interface for props passed to the Path component
interface PathProps {
  questPoints: THREE.Vector3[]; // Array of 3D positions for quest points to connect
}

// Main component for creating paths between quest points
export default function Path({ questPoints }: PathProps) {
  // Load the path texture (medieval blocks texture for visual appeal)
  // This gives the path a stone-like appearance
  const pathTexture = useLoader(TextureLoader, '/textures/medieval_blocks.jpg');
  
  // Configure texture wrapping and repetition
  pathTexture.wrapS = pathTexture.wrapT = THREE.RepeatWrapping;
  pathTexture.repeat.set(1, 10); // Repeat more along the path length
  pathTexture.needsUpdate = true; // Notify Three.js that the texture was modified

  // Calculate path segments between consecutive quest points
  // This creates the data needed to draw connecting paths between all points
  const segments = useMemo(() => {
    const segs = [];
    
    // Loop through quest points to create segments between each pair
    for (let i = 0; i < questPoints.length - 1; i++) {
      const A = questPoints[i];     // Starting point
      const B = questPoints[i + 1]; // Ending point
      
      // Compute the midpoint for placement of the segment
      // The segment will be positioned at this point
      const mid = A.clone().lerp(B, 0.5);
      
      // Compute the segment length (distance between points)
      const length = A.distanceTo(B);
      
      // Compute the angle in the XZ plane: angle from A to B about Y-axis
      // This determines the rotation needed to orient the path segment correctly
      const angle = Math.atan2(B.z - A.z, B.x - A.x);
      
      // Store the data needed to create this segment
      segs.push({ mid, length, angle });
    }
    
    return segs;
  }, [questPoints]); // Only recalculate when questPoints change

  // Width of the path - visual thickness of connections between quest points
  const pathWidth = 3;

  return (
    <group>
      {/* Map through each calculated segment and create a mesh for it */}
      {segments.map((seg, i) => {
        // Create custom geometry for this path segment
        const geometry = createSegmentGeometry(seg.length, pathWidth, seg.angle);
        
        return (
          // Place each segment at its midpoint with a slight Y offset
          <mesh
            key={i}
            geometry={geometry}
            position={[seg.mid.x, 0.01, seg.mid.z]}  // slight Y offset to avoid z-fighting
            renderOrder={1} // ensure the path renders on top of terrain if needed
          >
            <meshStandardMaterial 
              map={pathTexture}
              transparent          // Allow transparency for better visual integration
              depthTest={false}    // Disable depth testing to avoid visual glitches
              polygonOffset        // Use polygon offset to prevent z-fighting
              polygonOffsetFactor={-1} // Offset factor to push the path slightly above the terrain
            />
          </mesh>
        );
      })}
    </group>
  );
}
