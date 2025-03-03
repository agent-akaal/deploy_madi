// components/Path.jsx
import { useMemo } from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

/**
 * Creates a rectangle (tile) geometry in the XZ plane,
 * pre-rotated by a given angle around the Y-axis.
 * The rectangle is centered at the origin.
 * @param {number} length - Length of the segment (along the path direction)
 * @param {number} width - Width of the path
 * @param {number} angle - Rotation angle (radians) about the Y-axis
 * @returns {THREE.BufferGeometry}
 */
function createSegmentGeometry(length, width, angle) {
  const halfL = length / 2, halfW = width / 2;
  // Define vertices for a rectangle lying in the XZ plane, oriented along the X-axis:
  const vertices = new Float32Array([
    -halfL, 0, -halfW,  // bottom left
     halfL, 0, -halfW,  // bottom right
     halfL, 0,  halfW,  // top right
    -halfL, 0,  halfW   // top left
  ]);
  // If angle is not zero, rotate the vertices around the Y axis.
  if (angle !== 0) {
    const cos = Math.cos(angle), sin = Math.sin(angle);
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i], z = vertices[i + 2];
      vertices[i] = x * cos - z * sin;
      vertices[i + 2] = x * sin + z * cos;
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  // Simple UV mapping:
  const uvs = new Float32Array([
    0, 0,
    1, 0,
    1, 1,
    0, 1
  ]);
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  // Define indices for two triangles:
  geometry.setIndex([0, 1, 2, 2, 3, 0]);
  geometry.computeVertexNormals();
  return geometry;
}

export default function Path({ questPoints }) {
  // Load the path texture (e.g. your medieval blocks texture)
  const pathTexture = useLoader(TextureLoader, '/textures/medieval_blocks.jpg');
  pathTexture.wrapS = pathTexture.wrapT = THREE.RepeatWrapping;
  pathTexture.repeat.set(1, 10);
  pathTexture.needsUpdate = true;

  // Assume questPoints is an array of static THREE.Vector3 with y = 0.
  // Build segments directly connecting each consecutive pair.
  const segments = useMemo(() => {
    const segs = [];
    for (let i = 0; i < questPoints.length - 1; i++) {
      const A = questPoints[i];
      const B = questPoints[i + 1];
      // Compute the midpoint for placement.
      const mid = A.clone().lerp(B, 0.5);
      // Compute the segment length.
      const length = A.distanceTo(B);
      // Compute the angle in the XZ plane: angle from A to B about Y-axis.
      const angle = Math.atan2(B.z - A.z, B.x - A.x);
      segs.push({ mid, length, angle });
    }
    return segs;
  }, [questPoints]);

  const pathWidth = 3; // Desired width of the path

  return (
    <group>
      {segments.map((seg, i) => {
        const geometry = createSegmentGeometry(seg.length, pathWidth, seg.angle);
        return (
          // Place each segment at its midpoint.
          <mesh
            key={i}
            geometry={geometry}
            position={[seg.mid.x, 0.01, seg.mid.z]}  // slight Y offset to avoid z-fighting
            renderOrder={1} // ensure the path renders on top if needed
          >
            <meshStandardMaterial 
              map={pathTexture}
              transparent
              depthTest={false}
              polygonOffset
              polygonOffsetFactor={-1}
            />
          </mesh>
        );
      })}
    </group>
  );
}
