import { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import Terrain from './Terrain';
import Path from './Path';
import QuestMarkers from './QuestMarkers';
import * as THREE from 'three';

// Type definition for different types of quests/learning resources
// Each type corresponds to a different learning activity and will have a unique visual representation
type QuestType = 'reading' | 'video' | 'hands-on' | 'team' | 'live';

// Interface defining the structure of a quest/learning resource object
interface Quest {
  id: number;      // Unique identifier for the quest
  type: QuestType; // The type of learning activity this quest represents
  name: string;    // Display name for the quest
}

export default function ThreeCanvas() {
  // Creates sample quests for demo purposes
  // In a production environment, these would be fetched from an API based on the user's learning plan
  // useMemo ensures these objects are only created once unless dependencies change
  const quests = useMemo<Quest[]>(() => [
    { id: 1, type: 'reading', name: 'Read Chapter 1' },
    { id: 2, type: 'video', name: 'Watch Intro Video' },
    { id: 3, type: 'hands-on', name: 'Try Interactive Exercise' },
    { id: 4, type: 'team', name: 'Join Group Discussion' },
    { id: 5, type: 'live', name: 'Attend Live Webinar' },
  ], []);

  // Generates random positions for quests on the map
  // Creates a Vector3 with x and z coordinates (horizontal plane) for each quest
  // Y coordinate is 0 to place all quests on the terrain surface
  // The positions are randomized within a range of -40 to 40 units on both axes
  const questPoints = useMemo(() => {
    return quests.map(() => {
      const x = (Math.random() - 0.5) * 80;
      const y = 0.314;
      const z = (Math.random() - 0.5) * 80;
      return new THREE.Vector3(x, y, z);
    });
  }, [quests]);

  return (
    // Canvas is the main container for Three.js scenes in React Three Fiber
    // It sets up the renderer and provides the context for all 3D objects
    <Canvas 
      camera={{ 
        position: [0, 5, 5], // Initial camera position (x, y, z)
        fov: 50                // Field of view in degrees (controls zoom level)
      }} 
      style={{ width: '100vw', height: '100vh' }} // Make canvas fill the viewport
    >
      {/* Ambient light provides overall illumination to the scene */}
      <ambientLight intensity={0.8} />
      
      {/* Directional light creates shadows and highlights, simulating sunlight */}
      <directionalLight position={[50, 100, 50]} intensity={1.5} />
      
      {/* Suspense provides a loading boundary for asynchronously loaded components */}
      <Suspense fallback={null}>
        {/* Terrain creates the hexagonal grid base for the learning map */}
        <Terrain width={100} depth={100} tileSize={8} />
        
        {/* Path creates visual connections between quest points */}
        <Path questPoints={questPoints} />
        
        {/* QuestMarkers places interactive 3D objects at each quest position */}
        <QuestMarkers quests={quests} points={questPoints} />
      </Suspense>
      
      {/* OrbitControls allows the user to navigate the 3D scene */}
      <OrbitControls
        minPolarAngle={Math.PI / 2 - 0.1} // Restricts vertical rotation to slightly above horizontal
        maxPolarAngle={Math.PI / 2 - 0.1} // Keeps camera from going below horizontal
        minDistance={50}                  // Prevents zooming in too close
        maxDistance={150}                 // Prevents zooming out too far
        enablePan={true}                  // Allows panning (moving the camera horizontally)
      />
    </Canvas>
  );
}
