import { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import Terrain from './Terrain';
import Path from './Path';
import QuestMarkers from './QuestMarkers';
import * as THREE from 'three';

export default function ThreeCanvas() {
  const quests = useMemo(() => [
    { id: 1, type: 'reading', name: 'Read Chapter 1' },
    { id: 2, type: 'video', name: 'Watch Intro Video' },
    { id: 3, type: 'hands-on', name: 'Try Interactive Exercise' },
    { id: 4, type: 'team', name: 'Join Group Discussion' },
    { id: 5, type: 'live', name: 'Attend Live Webinar' },
  ], []);

  // Instead of pre-defining a route, you can randomize the quest coordinates:
  const questPoints = useMemo(() => {
    return quests.map(() => {
      const x = (Math.random() - 0.5) * 80;
      const z = (Math.random() - 0.5) * 80;
      return new THREE.Vector3(x, 0, z);
    });
  }, [quests]);

  return (
    <Canvas camera={{ position: [0, 80, 50], fov: 50 }} style={{ width: '100%', height: '100vh' }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[50, 100, 50]} intensity={1.5} />
      <Suspense fallback={null}>
        <Terrain width={100} depth={100} tileSize={8} />
        <Path questPoints={questPoints} />
        <QuestMarkers quests={quests} points={questPoints} />
      </Suspense>
      <OrbitControls
        minPolarAngle={Math.PI / 2 - 0.1}
        maxPolarAngle={Math.PI / 2 - 0.1}
        minDistance={50}
        maxDistance={150}
        enablePan={true}
      />
    </Canvas>
  );
}
