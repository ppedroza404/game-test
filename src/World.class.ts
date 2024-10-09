import * as THREE from "three";

export class World extends THREE.Group {
  private objectMap: Map<any, any> = new Map();
  width: number;
  height: number;

  geometry!: THREE.PlaneGeometry;
  material!: THREE.MeshBasicMaterial;

  treeCount: number;
  rockCount: number;
  busheCount: number;

  terrain!: THREE.Mesh<
    THREE.PlaneGeometry,
    THREE.MeshBasicMaterial,
    THREE.Object3DEventMap
  >;
  trees: THREE.Group<THREE.Object3DEventMap> | undefined | any;
  bushes: THREE.Group<THREE.Object3DEventMap> | undefined | any;
  rocks: THREE.Group<THREE.Object3DEventMap> | undefined | any;

  

  constructor(width: number, height: number) {
    super();

    this.width = width;
    this.height = height;
    this.treeCount = 10;
    this.rockCount = 20;
    this.busheCount = 10;


    this.trees = new THREE.Group();
    this.add(this.trees);

    this.rocks = new THREE.Group();
    this.add(this.rocks);

    this.bushes = new THREE.Group();
    this.add(this.bushes);

    this.generate();
  }

  generate() {
    this.clearTerrain();
    this.createTerrain();
    this.createTrees();
    this.createRocks();
    this.createBushes();

    console.log(this.objectMap);
  }

  clearTerrain() {
    if (this.terrain) {
      this.terrain.geometry.dispose();
      this.terrain.material.dispose();
      this.remove(this.terrain);
    }

    if (this.trees) {
      this.trees.children.forEach((tree: any) => {
        tree.geometry?.dispose();
        tree.material?.dispose();
      });
      this.trees.clear();
    }

    if (this.rocks) {
      this.rocks.children.forEach((rock: any) => {
        rock.geometry?.dispose();
        rock.material?.dispose();
      });
      this.rocks.clear();
    }

    if (this.bushes) {
      this.bushes.children.forEach((bush: any) => {
        bush.geometry?.dispose();
        bush.material?.dispose();
      });
      this.bushes.clear();
    }

    this.objectMap.clear();
  }

  createTerrain() {
    if (this.terrain) {
        this.terrain.geometry.dispose();
        this.terrain.material.dispose();
        this.remove(this.terrain);
      }

    const terrainMaterial = new THREE.MeshBasicMaterial({ color: 0xffff, wireframe: false }); 
    const terrainGeometry = new THREE.PlaneGeometry(
      this.width,
      this.height,
      this.width,
      this.height
    );
    this.terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
    this.terrain.rotation.x = -Math.PI / 2;
    this.terrain.position.set(this.width / 2, 0, this.height / 2);
    this.add(this.terrain);
  }

  createTrees() {
    const treeRadius = 0.2;
    const treeHeight = 1;

    const treeGeometry = new THREE.ConeGeometry(treeRadius, treeHeight, 8);
    const treeMaterial = new THREE.MeshStandardMaterial({
      color: 0x305010,
      flatShading: true,
    });

    for (let i = 0; i < this.treeCount; i++) {
      const threeMesh = new THREE.Mesh(treeGeometry, treeMaterial);

      const coords = new THREE.Vector2(
        Math.floor(this.width * Math.random()),
        Math.floor(this.height * Math.random())
      );

      // dont place trees on top of each other
      if (this.objectMap.has(`${coords.x}-${coords.y}`)) {
        continue;
      }

      threeMesh.position.set(coords.x + 0.5, treeHeight / 2, coords.y + 0.5);

      this.trees.add(threeMesh);
      this.objectMap.set(`${coords.x}-${coords.y}`, threeMesh);
    }
  }

  createRocks() {
    const minRockRadius = 0.1;
    const maxRockRadius = 0.3;
    const minRockHeight = 0.5;
    const maxRockHeight = 0.8;
    const rockMaterial = new THREE.MeshStandardMaterial({
      color: 0xb0b0b0,
      flatShading: true,
    });

    for (let i = 0; i < this.rockCount; i++) {
      const radius = minRockRadius + Math.random() * (maxRockRadius - minRockRadius);
      const height = minRockHeight + Math.random() * (maxRockHeight - minRockHeight);
      const rockGeometry = new THREE.SphereGeometry(radius, 6, 5);

      const rockMesh = new THREE.Mesh(rockGeometry, rockMaterial);

      const coords = new THREE.Vector2(
        Math.floor(this.width * Math.random()),
        Math.floor(this.height * Math.random())
      );

      // dont place trees on top of each other
      if (this.objectMap.has(`${coords.x}-${coords.y}`)) {
        continue;
      }
      
      rockMesh.position.set(coords.x + 0.5, 0, coords.y + 0.5);    
      rockMesh.scale.y = height;

      this.rocks.add(rockMesh);
      this.objectMap.set(`${coords.x}-${coords.y}`, rockMesh);
    }
  }

  createBushes() {
    const minBushRadius = 0.1;
    const maxBusgRadius = 0.3;
    const minBushHeight = 0.5;
    const maxBushHeight = 0.8;
    const bushMaterial = new THREE.MeshStandardMaterial({
      color: 0x80a040,
      flatShading: true,
    });

    for (let i = 0; i < this.busheCount; i++) {
      const radius =
        minBushRadius + Math.random() * (maxBusgRadius - minBushRadius);
      const bushGeometry = new THREE.SphereGeometry(radius, 8, 8);
      const bushMesh = new THREE.Mesh(bushGeometry, bushMaterial);

      const coords = new THREE.Vector2(
        Math.floor(this.width * Math.random()),
        Math.floor(this.height * Math.random())
      );

      // dont place trees on top of each other
      if (this.objectMap.has(`${coords.x}-${coords.y}`)) {
        continue;
      }

      bushMesh.position.set(coords.x + 0.5, radius, coords.y + 0.5);

      this.bushes?.add(bushMesh);
      this.objectMap.set(`${coords.x}-${coords.y}`, bushMesh);
    }
  }
}
