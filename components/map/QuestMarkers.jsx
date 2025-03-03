// components/QuestMarker
import { useState } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Quest type colors for glow effect
const questColors = {
  reading: 'orange',
  video: 'purple',
  'hands-on': 'green',
  team: 'blue',
  live: 'red'
};

export default function QuestMarkers({ quests = [], points = [] }) {
  const [hoveredQuest, setHoveredQuest] = useState(null);
  const { scene } = useGLTF('/models/portal.glb'); // Load single portal model

  if (!points || points.length === 0) {
    console.warn("No points available for quest markers.");
    return null;
  }

  return (
    <>
      {quests.map((quest, index) => {
        const pos = points[index] || [0, 1.5, 0]; // Default position if missing
        const color = questColors[quest.type] || 'white'; // Get unique color

        return (
          <PortalMarker
            key={quest.id}
            position={pos}
            quest={quest}
            scene={scene}
            color={color}
            setHoveredQuest={setHoveredQuest}
          />
        );
      })}

      {/* Display floating text when hovering */}
      {hoveredQuest && (
        <Html position={hoveredQuest.position} center>
          <div style={{
            background: 'rgba(0, 0, 0, 0.8)',
            padding: '5px 10px',
            color: 'white',
            fontWeight: 'bold',
            borderRadius: '5px'
          }}>
            {hoveredQuest.name}
          </div>
        </Html>
      )}
    </>
  );
}
function PortalMarker({ position, quest, scene, color, setHoveredQuest }) {
    const portalRef = useRef();
    // Clone the scene so each portal is independent
    const clonedScene = scene.clone();
  
    // Rotate portal slowly in animation loop
    useFrame(() => {
      if (portalRef.current) {
        portalRef.current.rotation.y += 0.001;
      }
    });
  
    // Raise the portal by adding an offset to the Y position.
    // Also, set renderOrder so it draws on top of lower-order objects.
    return (
      <group
        position={[position.x, position.y + 0.2, position.z + 0.02]} // raise by 0.2 units
        ref={portalRef}
        renderOrder={2} // render after objects with default renderOrder (0)
        onPointerOver={() => setHoveredQuest({ name: quest.name, position })}
        onPointerOut={() => setHoveredQuest(null)}
      >
        {/* Glowing ring around the portal */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2, 2.5, 32]} />
          <meshStandardMaterial 
            color={color} 
            emissive={color} 
            emissiveIntensity={1.5} 
            transparent 
            opacity={0.8} 
          />
        </mesh>
  
        {/* Portal Model - Cloned to show multiple */}
        <primitive object={clonedScene} scale={1.5} rotation={[Math.PI / 2, 0, 0]} />
      </group>
    );
  }
  