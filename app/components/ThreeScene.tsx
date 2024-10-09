"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
// @ts-ignore
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";  
import Stats from "three/examples/jsm/libs/stats.module.js";
import GUI from "lil-gui";
import { World } from "@/src/World.class";

// charcter
import GLTFModelLoader  from "@/src/GLTFModelLoader.class";


 

const ThreeScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      //////

      const gui = new GUI();
      
      const stats = new Stats();
      containerRef.current?.appendChild(stats.dom);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );    


      if (typeof window !== "undefined") {
        const animate = () => {
          controls.update();
          renderer.render(scene, camera);
          stats.update();
        };

        const renderer = new THREE.WebGLRenderer();
        renderer.setAnimationLoop(animate);
        renderer.setPixelRatio(devicePixelRatio);
        document.body.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);

        // Instantiate the FBXModelLoader
        const fbxLoader = new GLTFModelLoader(scene);
        // Load your FBX model
        fbxLoader
          .loadModel("/assets/characters/knight/Knight.glb");

        // admind terrain
        const world = new World(10, 10);
        scene.add(world);

        const sun = new THREE.DirectionalLight();
        sun.intensity = 3;
        sun.position.set(1, 2, 3);
        scene.add(sun);

        const ambientLight = new THREE.AmbientLight();
        ambientLight.intensity = 0.5;
        scene.add(ambientLight);

        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current?.appendChild(renderer.domElement);

        camera.position.set(10, 2, 10);

        const handleResize = () => {
          const width = window.innerWidth;
          const height = window.innerHeight;

          camera.aspect = width / height;
          camera.updateProjectionMatrix();

          renderer.setSize(width, height);
        };

        window.addEventListener("resize", handleResize);

        // Add Gui controls
        const worldFolder = gui.addFolder("Terrain");
        worldFolder.add(world, "width", 1, 100, 1).name("Width");
        worldFolder.add(world, "height", 1, 100, 1).name("Height");
        worldFolder.add(world, "treeCount", 1, 100, 1).name("Tree Count");
        worldFolder.add(world, "rockCount", 1, 100, 1).name("Rock Count");
        worldFolder.add(world, "busheCount", 1, 100, 1).name("Bush Count");
        worldFolder.add(world, "generate").name("Generate");
        worldFolder.onChange(() => {
          world.createTerrain();
        });

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


