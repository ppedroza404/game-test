import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

class GLTFModelLoader {
    loader: GLTFLoader;
    scene: any;
    asset: any;
    constructor(scene: any) {
        this.scene = scene;
        this.loader = new GLTFLoader();
        this.asset = null;
    }

    loadModel(path: any) {
        return this.loader.load(path, (gltf) => {
            const model = gltf.scene; //> Retornar solo el modelo manejarlo en otra clase
            model.position.set(3 + 0.5, 0, 5 + 0.5);
            model.scale.set(0.2, 0.2, 0.2);
            this.scene.add( model );
 
        }); 
    }
}

export default GLTFModelLoader;
