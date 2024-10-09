import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/Addons.js";
import { TextureLoader } from "three";
export class Player extends THREE.Mesh{

    position: any;
    constructor() {
        super();
        this.material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
        })

        this.position.set(5.5,0.5,5.5);
        this.loadModel(); // Call loadModel in the constructor
    }

    loadModel() {
        const loader = new FBXLoader();
        const textureLoader = new TextureLoader();

        // Load the texture
        textureLoader.load('@/public/characters/mage_texture.png', (texture) => {
            // Set the texture to the material
            const material = new THREE.MeshBasicMaterial( {
                map: texture
             } );
        }, undefined, (error) => {
            console.error( 'An error happened loading texture.' );
        });

        // Load the FBX model
        loader.load('/public/characters/mage.fbx', (fbx) => {
            this.add(fbx); // Add the loaded model to the Player mesh
        }, undefined, (error) => {
            console.error('An error happened loading the FBX model.', error);
        });
    }
}