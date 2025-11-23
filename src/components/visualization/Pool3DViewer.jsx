import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Slider } from "@/shared/components/ui/slider";
import { RotateCw, ZoomIn, ZoomOut, Sun, Moon } from "lucide-react";

export default function Pool3DViewer({ concept }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const poolRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(10);
  const [timeOfDay, setTimeOfDay] = useState("day");

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb); // Sky blue
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 8, 12);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 0.8);
    sunLight.position.set(5, 10, 5);
    sunLight.castShadow = true;
    scene.add(sunLight);

    // Ground (yard)
    const groundGeometry = new THREE.PlaneGeometry(30, 30);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x3a7d3a,
      roughness: 0.8 
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Pool dimensions from concept
    const poolLength = parseFloat(concept?.pool_dimensions?.split('x')[0]) || 20;
    const poolWidth = parseFloat(concept?.pool_dimensions?.split('x')[1]) || 10;
    const poolDepth = parseFloat(concept?.pool_depth_deep) || 6;

    // Pool shell
    const poolGeometry = new THREE.BoxGeometry(poolLength, poolDepth * 0.3, poolWidth);
    const poolMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x0077be,
      transparent: true,
      opacity: 0.7,
      roughness: 0.1,
      metalness: 0.3
    });
    const pool = new THREE.Mesh(poolGeometry, poolMaterial);
    pool.position.y = -poolDepth * 0.15;
    pool.castShadow = true;
    pool.receiveShadow = true;
    scene.add(pool);
    poolRef.current = pool;

    // Water surface
    const waterGeometry = new THREE.PlaneGeometry(poolLength, poolWidth);
    const waterMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x1e90ff,
      transparent: true,
      opacity: 0.6,
      roughness: 0.1,
      metalness: 0.5
    });
    const water = new THREE.Mesh(waterGeometry, waterMaterial);
    water.rotation.x = -Math.PI / 2;
    water.position.y = 0.1;
    water.receiveShadow = true;
    scene.add(water);

    // Pool deck (coping)
    const deckGeometry = new THREE.BoxGeometry(poolLength + 4, 0.3, poolWidth + 4);
    const deckMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xd4a373,
      roughness: 0.7
    });
    const deck = new THREE.Mesh(deckGeometry, deckMaterial);
    deck.position.y = -0.15;
    deck.receiveShadow = true;
    scene.add(deck);

    // Add spa if in concept
    if (concept?.key_features?.some(f => f.toLowerCase().includes('spa'))) {
      const spaGeometry = new THREE.CylinderGeometry(3, 3, 1.5, 32);
      const spaMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x0066aa,
        transparent: true,
        opacity: 0.7
      });
      const spa = new THREE.Mesh(spaGeometry, spaMaterial);
      spa.position.set(poolLength / 2 + 2, -0.5, 0);
      spa.castShadow = true;
      scene.add(spa);
    }

    // Add lights (Jandy Infinite Watercolor)
    const lightCount = concept?.lighting_plan?.total_lights || 10;
    const lightSpacing = poolLength / (lightCount / 2);
    
    for (let i = 0; i < lightCount / 2; i++) {
      const lightGeometry = new THREE.SphereGeometry(0.15, 16, 16);
      const lightMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x00ffff,
        emissive: 0x00ffff,
        emissiveIntensity: 2
      });
      const light = new THREE.Mesh(lightGeometry, lightMaterial);
      light.position.set(
        -poolLength / 2 + (i * lightSpacing) + lightSpacing / 2,
        -poolDepth * 0.1,
        -poolWidth / 2 + 0.5
      );
      scene.add(light);

      // Point light for glow
      const pointLight = new THREE.PointLight(0x00ffff, 0.5, 5);
      pointLight.position.copy(light.position);
      scene.add(pointLight);
    }

    // Add waterfall if in concept
    if (concept?.key_features?.some(f => f.toLowerCase().includes('waterfall'))) {
      const waterfallGeometry = new THREE.BoxGeometry(2, 2, 0.5);
      const waterfallMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x708090,
        roughness: 0.6
      });
      const waterfall = new THREE.Mesh(waterfallGeometry, waterfallMaterial);
      waterfall.position.set(0, 1, -poolWidth / 2 - 0.5);
      waterfall.castShadow = true;
      scene.add(waterfall);
    }

    // Animation loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      
      // Rotate pool based on slider
      pool.rotation.y = rotation;
      
      // Water animation (subtle wave effect)
      water.position.y = 0.1 + Math.sin(Date.now() * 0.001) * 0.05;
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [concept]);

  // Update rotation when slider changes
  useEffect(() => {
    if (poolRef.current) {
      poolRef.current.rotation.y = rotation;
    }
  }, [rotation]);

  // Update camera zoom
  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.z = zoom;
    }
  }, [zoom]);

  // Update lighting for time of day
  useEffect(() => {
    if (!sceneRef.current) return;
    
    if (timeOfDay === "night") {
      sceneRef.current.background = new THREE.Color(0x0a0a2e);
      // Make pool lights brighter at night
      sceneRef.current.children.forEach(child => {
        if (child instanceof THREE.Mesh && child.material.emissive) {
          child.material.emissiveIntensity = 3;
        }
      });
    } else {
      sceneRef.current.background = new THREE.Color(0x87ceeb);
      sceneRef.current.children.forEach(child => {
        if (child instanceof THREE.Mesh && child.material.emissive) {
          child.material.emissiveIntensity = 2;
        }
      });
    }
  }, [timeOfDay]);

  return (
    <Card className="border-none shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RotateCw className="w-5 h-5 text-cyan-600" />
          Interactive 3D Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div 
          ref={mountRef} 
          className="w-full h-96 rounded-lg overflow-hidden bg-gray-900"
        />
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Rotation</span>
              <span className="text-sm text-gray-600">{Math.round(rotation * 180 / Math.PI)}°</span>
            </div>
            <Slider
              value={[rotation]}
              onValueChange={(val) => setRotation(val[0])}
              min={0}
              max={Math.PI * 2}
              step={0.1}
              className="w-full"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Zoom</span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setZoom(Math.min(zoom + 2, 20))}>
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={() => setZoom(Math.max(zoom - 2, 5))}>
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Time of Day</span>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant={timeOfDay === "day" ? "default" : "outline"}
                  onClick={() => setTimeOfDay("day")}
                >
                  <Sun className="w-4 h-4 mr-1" />
                  Day
                </Button>
                <Button 
                  size="sm" 
                  variant={timeOfDay === "night" ? "default" : "outline"}
                  onClick={() => setTimeOfDay("night")}
                >
                  <Moon className="w-4 h-4 mr-1" />
                  Night
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-500 text-center pt-2 border-t">
          Interactive 3D visualization • Rotate and zoom to explore
        </div>
      </CardContent>
    </Card>
  );
}