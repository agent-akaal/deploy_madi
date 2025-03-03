// QuestMarkers.tsx - Creates interactive 3D markers for learning resources on the map
import { useState } from 'react'; // For managing hover state
import { useGLTF, Html } from '@react-three/drei'; // For loading 3D models and rendering HTML in 3D space
import { useRef } from 'react'; // For accessing and manipulating DOM elements directly
import { useFrame } from '@react-three/fiber'; // For animations that run on each frame
import * as THREE from 'three'; // Core Three.js library

// Define types for our quest objects
// Each type represents a different learning activity category
type QuestType = 'reading' | 'video' | 'hands-on' | 'team' | 'live';

// Interface for quest data structure - represents a learning resource
interface Quest {
  id: number;      // Unique identifier
  type: QuestType; // Category of learning activity
  name: string;    // Display name of the quest/resource
}

// Interface for props passed to the QuestMarkers component
interface QuestMarkersProps {
  quests: Quest[];            // Array of quest/resource data
  points: THREE.Vector3[];    // 3D positions for each quest
}

// Interface for props passed to individual PortalMarker components
interface PortalMarkerProps {
  position: THREE.Vector3;    // 3D position of this marker
  quest: Quest;               // Data for this specific quest
  scene: THREE.Group;         // The 3D model to use for the marker
  color: string;              // Color to use for the glow effect (based on quest type)
  setHoveredQuest: (quest: { name: string; position: THREE.Vector3 } | null) => void; // Callback for hover state
}

// Quest type colors for glow effect
// Each learning activity type has a distinct color for visual categorization
const questColors: Record<QuestType, string> = {
  reading: 'orange',   // Orange for reading materials
  video: 'purple',     // Purple for video content
  'hands-on': 'green', // Green for interactive exercises
  team: 'blue',        // Blue for team/collaborative activities
  live: 'red'          // Red for live/synchronous events
};

// Main component that renders all quest markers
export default function QuestMarkers({ quests = [], points = [] }: QuestMarkersProps) {
  // State to track which quest is currently being hovered over
  // Used to display a tooltip with the quest name
  const [hoveredQuest, setHoveredQuest] = useState<{ name: string; position: THREE.Vector3 } | null>(null);
  
  // Load the 3D model for the portal effect
  // This uses React Suspense (configured in the parent component) to handle async loading
  const { scene } = useGLTF('/models/portal.glb');

  // Validate that we have positions for the quests
  if (!points || points.length === 0) {
    console.warn("No points available for quest markers.");
    return null;
  }

  return (
    <>
      {/* Map through each quest to create a portal marker */}
      {quests.map((quest, index) => {
        // Get the position for this quest, or use a default if not provided
        const pos = points[index] || new THREE.Vector3(0, 1.5, 0);
        // Get the color for this quest type, or use white as fallback
        const color = questColors[quest.type] || 'white';

        // Render a PortalMarker for each quest
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

      {/* Display floating text when hovering over a quest marker */}
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

// Component for an individual portal marker
// Creates a 3D visual representation of a learning resource/quest
function PortalMarker({ position, quest, scene, color, setHoveredQuest }: PortalMarkerProps) {
    // Reference to the portal group for animation
    const portalRef = useRef<THREE.Group>(null);
    // Clone the scene so each portal is independent
    // This prevents shared state issues between markers
    const clonedScene = scene.clone();
  
    // Rotate portal slowly in animation loop
    // This creates a continuous gentle spinning effect for visual interest
    useFrame(() => {
      if (portalRef.current) {
        portalRef.current.rotation.y += 0.001; // Slow rotation around Y axis
      }
    });
  
    // Create the portal marker with proper positioning and interaction handlers
    return (
      <group
        position={[position.x, position.y + 0.2, position.z + 0.02]} // Raise slightly above terrain
        ref={portalRef}
        renderOrder={2} // Ensure portal renders on top of terrain and paths
        // onPointerOver={() => setHoveredQuest({ name: quest.name, position })} // Show tooltip on hover
        // onPointerOut={() => setHoveredQuest(null)} // Hide tooltip when not hovering
      >
        {/* Glowing ring around the portal */}
        <mesh rotation={[Math.PI / 2, 0, 0]}> {/* Rotate to lay flat on XZ plane */}
          <ringGeometry args={[2, 2.5, 32]} /> {/* Inner radius, outer radius, segments */}
          <meshStandardMaterial 
            color={color}              // Base color from quest type
            emissive={color}           // Self-illumination color 
            emissiveIntensity={1.5}    // Brightness of glow effect
            transparent                // Enable transparency
            opacity={0.8}              // Partial transparency for glow effect
          />
        </mesh>
  
        {/* Portal Model - Cloned for each instance */}
        <primitive 
          object={clonedScene} 
          scale={2.5}                   // Size of the portal model
          rotation={[Math.PI / 2, 0, 0]} // Rotate to face upward
        />
      </group>
    );
}
  