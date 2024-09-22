"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
// @ts-ignore
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";  
import Stats from "three/examples/jsm/libs/stats.module.js";
import GUI from "lil-gui";

const ThreeScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      const gui = new GUI();

      const stats = new Stats();
      containerRef.current?.appendChild(stats.dom);


      if (typeof window !== "undefined") {
        const renderer = new THREE.WebGLRenderer();
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );        
        const controls = new OrbitControls(camera, renderer.domElement);
        
        const sun = new THREE.DirectionalLight();
        sun.position.set(1, 2, 3);
        scene.add(sun);

        const ambientLight = new THREE.AmbientLight();
        ambientLight.intensity = 0.5;
        scene.add(ambientLight);

        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current?.appendChild(renderer.domElement);
        camera.position.z = 5;
        controls.update();


        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // Render the scene and camera
        renderer.render(scene, camera);


        const handleResize = () => {
          const width = window.innerWidth;
          const height = window.innerHeight;
    
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
    
          renderer.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);


        // Add Gui controls
        const folder = gui.addFolder('Cube');
        folder.add(cube.position, 'x', -10, 10).name('Position X');
        folder.addColor(cube.material, 'color').name('Color');

        // Add this function inside the useEffect hook
        const renderScene = () => {
          controls.update();
          stats.update();
          renderer.render(scene, camera);
          requestAnimationFrame(renderScene);
        };

        // Call the renderScene function to start the animation loop
        renderScene();
        
      }




    }
  }, []);

  return <div ref={containerRef} />;
};

export default ThreeScene;
