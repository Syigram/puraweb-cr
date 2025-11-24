import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Grid() {
  const meshRef = useRef();
  const gridSize = 50;
  const gridDivisions = 50;

  const gridGeometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(gridSize, gridSize * 2, gridDivisions, gridDivisions * 2);
    const positions = geometry.attributes.position.array;
    
    // Create wave effect on the grid
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const distance = Math.sqrt(x * x + y * y);
      positions[i + 2] = Math.sin(distance * 0.1) * 0.5;
    }
    
    geometry.attributes.position.needsUpdate = true;
    return geometry;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.z = ((state.clock.elapsedTime * 3) % gridSize) - gridSize;
    }
  });

  return (
    <>
      <mesh ref={meshRef} geometry={gridGeometry} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <meshBasicMaterial
          color="#00ffff"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
      <mesh geometry={gridGeometry} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, -gridSize]}>
        <meshBasicMaterial
          color="#00ffff"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
    </>
  );
}

function Mountains() {
  const mountainsRef = useRef();
  
  const mountainGeometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(60, 15, 40, 10);
    const positions = geometry.attributes.position.array;
    
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      positions[i + 2] = Math.abs(Math.sin(x * 0.15)) * 8 + Math.random() * 2;
    }
    
    geometry.attributes.position.needsUpdate = true;
    return geometry;
  }, []);

  return (
    <>
      <mesh geometry={mountainGeometry} position={[-15, 0, -25]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshBasicMaterial
          color="#ff00ff"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>
      <mesh geometry={mountainGeometry} position={[15, 0, -30]} rotation={[-Math.PI / 2, 0, 0]} scale={[0.8, 0.8, 1.2]}>
        <meshBasicMaterial
          color="#00ffff"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
    </>
  );
}

function FloatingElements() {
  const elements = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 40,
        Math.random() * 10 + 2,
        -Math.random() * 40 - 10
      ],
      scale: Math.random() * 0.5 + 0.3,
      speed: Math.random() * 0.5 + 0.3,
      rotationSpeed: (Math.random() - 0.5) * 0.02
    }));
  }, []);

  return (
    <>
      {elements.map((element) => (
        <FloatingElement key={element.id} {...element} />
      ))}
    </>
  );
}

function FloatingElement({ position, scale, speed, rotationSpeed }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed;
      meshRef.current.rotation.y += rotationSpeed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <octahedronGeometry args={[1, 0]} />
      <meshBasicMaterial
        color="#ff00ff"
        wireframe
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

function Stars() {
  const starsRef = useRef();
  
  const starGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    
    for (let i = 0; i < 1000; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = Math.random() * 30 + 5;
      const z = -Math.random() * 100;
      positions.push(x, y, z);
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.z = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={starsRef} geometry={starGeometry}>
      <pointsMaterial
        color="#ffffff"
        size={0.1}
        transparent
        opacity={0.8}
      />
    </points>
  );
}

function Scene() {
  return (
    <>
      <fog attach="fog" args={["#000428", 10, 50]} />
      <ambientLight intensity={0.5} />
      <Grid />
      <Mountains />
      <FloatingElements />
      <Stars />
    </>
  );
}

export default function CyberpunkTerrain() {
  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-[#000428] via-[#004e92] to-[#000428] overflow-hidden">
      <Canvas
        camera={{ position: [0, 5, 10], fov: 75 }}
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      >
        <Scene />
      </Canvas>
      
      {/* Overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 pointer-events-none" />
      
      {/* Scanlines effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, cyan 2px, cyan 4px)",
        }}
      />
    </div>
  );
}