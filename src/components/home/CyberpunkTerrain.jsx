import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CyberpunkTerrain() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000428, 10, 50);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);

    // Create grid
    const gridSize = 50;
    const gridDivisions = 50;
    const gridGeometry = new THREE.PlaneGeometry(
      gridSize,
      gridSize * 2,
      gridDivisions,
      gridDivisions * 2
    );
    
    const positions = gridGeometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i];
      const y = positions[i + 1];
      const distance = Math.sqrt(x * x + y * y);
      positions[i + 2] = Math.sin(distance * 0.1) * 0.5;
    }
    gridGeometry.attributes.position.needsUpdate = true;

    const gridMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ffff,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });

    const grid1 = new THREE.Mesh(gridGeometry, gridMaterial);
    grid1.rotation.x = -Math.PI / 2;
    grid1.position.y = -2;
    scene.add(grid1);

    const grid2 = new THREE.Mesh(gridGeometry, gridMaterial.clone());
    grid2.rotation.x = -Math.PI / 2;
    grid2.position.y = -2;
    grid2.position.z = -gridSize;
    scene.add(grid2);

    // Create mountains
    const mountainGeometry = new THREE.PlaneGeometry(60, 15, 40, 10);
    const mountainPositions = mountainGeometry.attributes.position.array;
    
    for (let i = 0; i < mountainPositions.length; i += 3) {
      const x = mountainPositions[i];
      mountainPositions[i + 2] = Math.abs(Math.sin(x * 0.15)) * 8 + Math.random() * 2;
    }
    mountainGeometry.attributes.position.needsUpdate = true;

    const mountain1 = new THREE.Mesh(
      mountainGeometry,
      new THREE.MeshBasicMaterial({
        color: 0xff00ff,
        wireframe: true,
        transparent: true,
        opacity: 0.4,
      })
    );
    mountain1.rotation.x = -Math.PI / 2;
    mountain1.position.set(-15, 0, -25);
    scene.add(mountain1);

    const mountain2 = new THREE.Mesh(
      mountainGeometry.clone(),
      new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      })
    );
    mountain2.rotation.x = -Math.PI / 2;
    mountain2.position.set(15, 0, -30);
    mountain2.scale.set(0.8, 0.8, 1.2);
    scene.add(mountain2);

    // Create floating elements
    const floatingElements = [];
    for (let i = 0; i < 15; i++) {
      const geometry = new THREE.OctahedronGeometry(1, 0);
      const material = new THREE.MeshBasicMaterial({
        color: 0xff00ff,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
      });
      const element = new THREE.Mesh(geometry, material);
      
      element.position.set(
        (Math.random() - 0.5) * 40,
        Math.random() * 10 + 2,
        -Math.random() * 40 - 10
      );
      
      element.scale.setScalar(Math.random() * 0.5 + 0.3);
      element.userData.baseY = element.position.y;
      element.userData.speed = Math.random() * 0.5 + 0.3;
      element.userData.rotationSpeed = (Math.random() - 0.5) * 0.02;
      
      floatingElements.push(element);
      scene.add(element);
    }

    // Create stars
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = [];
    
    for (let i = 0; i < 1000; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = Math.random() * 30 + 5;
      const z = -Math.random() * 100;
      starPositions.push(x, y, z);
    }
    
    starGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(starPositions, 3)
    );

    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      transparent: true,
      opacity: 0.8,
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Animation
    const clock = new THREE.Clock();
    
    function animate() {
      requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime();

      // Animate grids
      grid1.position.z = ((elapsedTime * 3) % gridSize) - gridSize;
      grid2.position.z = grid1.position.z - gridSize;

      // Animate floating elements
      floatingElements.forEach((element) => {
        element.rotation.x += element.userData.rotationSpeed;
        element.rotation.y += element.userData.rotationSpeed;
        element.position.y =
          element.userData.baseY + Math.sin(elapsedTime * element.userData.speed) * 0.5;
      });

      // Animate stars
      stars.rotation.z = elapsedTime * 0.01;

      renderer.render(scene, camera);
    }

    animate();

    // Handle resize
    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      gridGeometry.dispose();
      gridMaterial.dispose();
      mountainGeometry.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
      floatingElements.forEach((element) => {
        element.geometry.dispose();
        element.material.dispose();
      });
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-[#000428] via-[#004e92] to-[#000428] overflow-hidden">
      <div ref={containerRef} className="absolute inset-0" />
      
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