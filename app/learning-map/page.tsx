"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// Dynamically import the ThreeCanvas to avoid SSR issues with three.js
// Three.js is not compatible with server-side rendering, so this ensures
// it only loads on the client side, preventing hydration errors
const ThreeCanvasWithNoSSR = dynamic(
  () => import('@/components/map/ThreeCanvas'),
  { ssr: false } // Disables server-side rendering for this component
);

export default function LearningMapPage() {
  const router = useRouter();
  const [showHelp, setShowHelp] = useState(false);
  
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Three.js canvas */}
      <ThreeCanvasWithNoSSR />
      
      {/* Overlay with title and navigation */}
      <div className="absolute top-0 left-0 w-full p-6 bg-gradient-to-b from-black/70 to-transparent z-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Your Learning Journey Map</h1>
            <p className="text-white/80 mb-4">
              Explore your personalized learning path in 3D. Navigate using mouse controls.
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="bg-white/20 hover:bg-white/30 text-white"
              onClick={() => setShowHelp(prev => !prev)}
            >
              {showHelp ? 'Hide Help' : 'Show Help'}
            </Button>
            <Button
              variant="outline"
              className="bg-white/20 hover:bg-white/30 text-white"
              onClick={() => router.back()}
            >
              Return to Study Plan
            </Button>
          </div>
        </div>
        
        {showHelp && (
          <div className="bg-black/60 text-white mt-4 p-4 rounded-md backdrop-blur-sm max-w-2xl">
            <h3 className="text-lg font-semibold mb-2">Map Controls</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Click and drag to rotate the view</li>
              <li>Scroll to zoom in/out</li>
              <li>Right-click and drag to pan</li>
              <li>Press R to regenerate the terrain</li>
              <li>Hover over markers to see details</li>
            </ul>
          </div>
        )}
      </div>
      
      {/* Bottom legend */}
      <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent">
        <div className="flex justify-center space-x-6 text-white text-sm">
          <div className="flex items-center">
            <span className="w-3 h-3 inline-block mr-1 rounded-full bg-[#3498db]"></span>
            <span>Reading</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 inline-block mr-1 rounded-full bg-[#e74c3c]"></span>
            <span>Video</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 inline-block mr-1 rounded-full bg-[#2ecc71]"></span>
            <span>Hands-on</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 inline-block mr-1 rounded-full bg-[#9b59b6]"></span>
            <span>Team</span>
          </div>
          <div className="flex items-center">
            <span className="w-3 h-3 inline-block mr-1 rounded-full bg-[#f39c12]"></span>
            <span>Live</span>
          </div>
        </div>
      </div>
    </div>
  );
} 