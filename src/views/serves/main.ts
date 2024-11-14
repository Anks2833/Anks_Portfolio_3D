import * as BABYLON from '@babylonjs/core'; // Importing BabylonJS core library
import '@babylonjs/loaders/glTF'; // Importing GLTF loaders for 3D models
import HavokPhysics from '@babylonjs/havok'; // Importing Havok physics engine
import { ThirdPersonController } from './thirdPersonController'; // Importing custom third-person controller

// Main class for the Babylon scene
export class BabylonScene {
    public engine!: BABYLON.Engine; // BabylonJS engine
    public scene!: BABYLON.Scene; // Scene object
    public camera!: BABYLON.ArcRotateCamera; // Camera for viewing the scene
    public physicsPlugin!: BABYLON.HavokPlugin; // Physics plugin for Havok
    public shadowGenerator!: BABYLON.ShadowGenerator; // Shadow generator for lighting
    public axesViewer!: BABYLON.AxesViewer; // Viewer for axes (not used in the provided code)
    public physicsViewer!: BABYLON.PhysicsViewer; // Viewer for physics bodies (not used in the provided code)
    public characterController!: ThirdPersonController; // Controller for character movement

    // Constructor initializes the scene with a canvas
    constructor(_canvas: HTMLCanvasElement) {
        this.main(_canvas); // Start the main function
    }

    // Main function to set up the scene
    private async main(canvas: HTMLCanvasElement) {
        const havokPlugin = await HavokPhysics(); // Initialize Havok physics
        this.engine = new BABYLON.Engine(canvas, true); // Create the engine
        this.engine.clearColor = new BABYLON.Color4(24 / 255, 24 / 255, 27 / 255); // Set background color
        this.scene = new BABYLON.Scene(this.engine); // Create the scene
        this.scene.environmentTexture = BABYLON.CubeTexture.CreateFromPrefilteredData(
            import.meta.env.BASE_URL + '/textures/environment.dds',
            this.scene // Set environment texture for lighting
        );
        this.physicsPlugin = new BABYLON.HavokPlugin(true, havokPlugin); // Set up physics plugin
        this.scene.enablePhysics(undefined, this.physicsPlugin); // Enable physics in the scene
        this.physicsViewer = new BABYLON.PhysicsViewer(); // Initialize physics viewer
        this.addCamera(canvas); // Add camera to the scene
        this.addLight(); // Add lighting to the scene
        this.addCollisionMap(); // Add collision map for physics
        this.engine.runRenderLoop(() => {
            this.scene.render(); // Render the scene in a loop
        });
        window.addEventListener('resize', () => {
            this.engine.resize(); // Resize engine on window resize
        });
    }

    // Function to add collision map to the scene
    public addCollisionMap() {
        // const stepWidth = 4; // Width of steps
        // const stepHeight = 0.5; // Height of steps
        // const stepDepth = 2; // Depth of steps
        // const numSteps = 13; // Number of steps

        // // Create steps in the collision map
        // for (let i = 0; i < numSteps; i++) {
        //     const stepPosition = new BABYLON.Vector3(0, i * stepHeight, i * stepDepth - 10); // Position of each step

        //     const step = BABYLON.MeshBuilder.CreateBox(
        //         'step' + i,
        //         { width: stepWidth, height: stepHeight, depth: stepDepth },
        //         this.scene // Create step mesh
        //     );
        //     step.position = stepPosition; // Set position
        //     step.receiveShadows = true; // Enable shadows
        //     this.shadowGenerator.addShadowCaster(step); // Add to shadow generator
        //     this.addPhysicsAggregate(step); // Add physics to step
        // }

        // // Create slopes
        // const slope = BABYLON.MeshBuilder.CreateBox(
        //     'slope',
        //     { width: 4, height: 0.1, depth: 12 },
        //     this.scene
        // );
        // const slope25 = BABYLON.MeshBuilder.CreateBox(
        //     'slope',
        //     { width: 4, height: 0.1, depth: 16 },
        //     this.scene
        // );
        // slope.receiveShadows = true; // Enable shadows for slope
        // slope25.receiveShadows = true; // Enable shadows for slope25
        // this.shadowGenerator.addShadowCaster(slope); // Add to shadow generator
        // this.shadowGenerator.addShadowCaster(slope25); // Add to shadow generator

        // // Set rotation and position for slopes
        // slope.rotation.x = BABYLON.Tools.ToRadians(-35);
        // slope.position = new BABYLON.Vector3(6, 2.6, 7.16);
        // slope.material = this.randomColorMaterial(); // Assign random color material

        // slope25.rotation.x = BABYLON.Tools.ToRadians(-25);
        // slope25.position = new BABYLON.Vector3(12, 2.6, 4.7);
        // this.addPhysicsAggregate(slope); // Add physics to slope
        // this.addPhysicsAggregate(slope25); // Add physics to slope25


        // // Create a large flat surface
        // const erlou = BABYLON.MeshBuilder.CreateBox(
        //     'slope2',
        //     { width: 30, height: 0.1, depth: 30 },
        //     this.scene
        // );
        // erlou.position.z = 17 + 10; // Set position
        // erlou.position.y = 6; // Set position

        // // Create a PBR material for the surface
        // const pbr = new BABYLON.PBRMaterial('pbr', this.scene);
        // pbr.metallic = 0.0; // Set metallic property
        // pbr.roughness = 0; // Set roughness property
        // pbr.subSurface.isRefractionEnabled = true; // Enable refraction
        // pbr.subSurface.indexOfRefraction = 1.8; // Set index of refraction
        // erlou.material = pbr; // Assign material
        // erlou.receiveShadows = true; // Enable shadows
        // this.shadowGenerator.addShadowCaster(erlou); // Add to shadow generator
        // this.addPhysicsAggregate(erlou); // Add physics to erlou

        // // Create conveyor belt
        // const conveyor = BABYLON.MeshBuilder.CreateBox(
        //     'conveyor',
        //     { width: 20, height: 0.01, depth: 4 },
        //     this.scene
        // );
        // conveyor.receiveShadows = true; // Enable shadows
        // conveyor.position = new BABYLON.Vector3(-5, 0.005, -15); // Set position
        // const conveyorPhys = this.addPhysicsAggregate(conveyor); // Add physics to conveyor
        // conveyorPhys.body.setMotionType(1); // Set motion type

        // // Create a box on the conveyor
        // const box = BABYLON.MeshBuilder.CreateBox(
        //     'conveyor',
        //     { width: 12, height: 0.01, depth: 4 },
        //     this.scene
        // );
        // box.receiveShadows = true; // Enable shadows
        // this.shadowGenerator.addShadowCaster(box); // Add to shadow generator
        // box.position = new BABYLON.Vector3(-9, 0.005, 9); // Set position
        // const boxPhys = this.addPhysicsAggregate(box); // Add physics to box
        // boxPhys.body.setMotionType(1); // Set motion type

        // // Set up velocities for box and conveyor
        // const boxVelocity = new BABYLON.Vector3(0, -2, 0);
        // const conveyorVelocity = new BABYLON.Vector3(2, 0, 0);
        // this.scene.onBeforeRenderObservable.add(() => {
        //     // Update positions based on conditions
        //     if (conveyor.position.x < -10) {
        //         conveyorVelocity.x = 2; // Reverse conveyor direction
        //     }
        //     if (conveyor.position.x > 10) {
        //         conveyorVelocity.x = -2; // Reverse conveyor direction
        //     }
        //     if (box.position.y < 0.2) {
        //         boxVelocity.y = 2; // Move box up
        //     }
        //     if (box.position.y > 7.1) {
        //         boxVelocity.y = -2; // Move box down
        //     }
        //     boxPhys.body.setLinearVelocity(boxVelocity); // Set box velocity
        //     conveyorPhys.body.setLinearVelocity(conveyorVelocity); // Set conveyor velocity
        // });
        this.loadPlayer(); // Load player into the scene
    }

    // Function to load the player character
    private async loadPlayer() {
        // const container = await this.loadAsset('/textures/', 'x-bot.glb'); // Load player model (commented out)
        // const [mesheRoot] = container.meshes; // Get mesh root (commented out)
        // mesheRoot.receiveShadows = true; // Enable shadows for player (commented out)
        // this.shadowGenerator.addShadowCaster(mesheRoot); // Add to shadow generator (commented out)
        // container.addAllToScene(); // Add all meshes to scene (commented out)
        try {
            // this.addRandomBox(); // Add random boxes to the scene
            this.characterController = new ThirdPersonController(this.camera, this.scene); // Initialize character controller
            // const [mesheRoot] = this.characterController.meshContent.meshes; // Get character mesh (commented out)
            // this.shadowGenerator.addShadowCaster(mesheRoot); // Add to shadow generator (commented out)
            this.addGround(); // Add ground to the scene
        } catch (err) {
            console.log('err=============');
            console.log(err); // Log any errors
        }
    }

    // Function to add camera to the scene
    private addCamera(canvas: HTMLCanvasElement) {
        this.camera = new BABYLON.ArcRotateCamera(
            'arcCamera1',
            0,
            0,
            6,
            BABYLON.Vector3.Zero(),
            this.scene // Create camera
        );
        this.camera.attachControl(canvas, false); // Attach camera to canvas

        this.camera.setPosition(new BABYLON.Vector3(0, 8.14, -9.26)); // Set camera position
        this.camera.lowerRadiusLimit = 3; // Set lower radius limit for camera

        const isLocked = false; // Pointer lock state
        this.scene.onPointerDown = () => {
            if (!isLocked) {
                canvas.requestPointerLock =
                    canvas.requestPointerLock ||
                    canvas.msRequestPointerLock ||
                    canvas.mozRequestPointerLock ||
                    canvas.webkitRequestPointerLock ||
                    false; // Request pointer lock
                if (canvas.requestPointerLock) {
                    canvas.requestPointerLock(); // Lock pointer
                }
            }
        };
    }

    // Function to add light to the scene
    private addLight() {
        const hemisphericLight = new BABYLON.HemisphericLight(
            'hemisphericLight',
            new BABYLON.Vector3(0, 30, 0),
            this.scene // Create hemispheric light
        );
        hemisphericLight.intensity = 0.1; // Set light intensity

        const lightDirection = new BABYLON.Vector3(0, -1, 0); // Direction for directional light
        const light = new BABYLON.DirectionalLight('DirectionalLight', lightDirection, this.scene); // Create directional light
        light.position = new BABYLON.Vector3(0, 20, 6); // Set light position
        light.intensity = 0.5; // Set light intensity
        this.shadowGenerator = new BABYLON.ShadowGenerator(2048, light); // Create shadow generator
        this.shadowGenerator.useBlurExponentialShadowMap = true; // Enable blur for shadows

        this.shadowGenerator.setDarkness(0.5); // Set darkness of shadows
        this.shadowGenerator.filter = BABYLON.ShadowGenerator.FILTER_PCF; // Set shadow filter type
    }

    // Function to load assets into the scene
    public loadAsset(
        rootUrl: string,
        sceneFilename: string,
        callback?: (event: BABYLON.ISceneLoaderProgressEvent) => void
    ): Promise<BABYLON.AssetContainer> {
        return new Promise((resolve, reject) => {
            BABYLON.SceneLoader.LoadAssetContainer(
                import.meta.env.BASE_URL + rootUrl,
                sceneFilename,
                this.scene,
                (container) => {
                    resolve(container); // Resolve promise with loaded container
                },
                (evt) => {
                    callback && callback(evt); // Call callback if provided
                },
                () => {
                    reject(null); // Reject promise on error
                }
            );
        });
    }

    // Function to add a light helper to visualize light direction
    public addLigthHelper(light: BABYLON.Light, lightDirection: BABYLON.Vector3) {
        const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', { diameter: 2 }, this.scene); // Create sphere for light helper
        const p = light.getAbsolutePosition(); // Get light position
        const lightRay = new BABYLON.Ray(p, lightDirection, 30); // Create ray for light direction
        const rayHelper = new BABYLON.RayHelper(lightRay); // Create ray helper
        rayHelper.show(this.scene, new BABYLON.Color3(0, 255, 0)); // Show ray in the scene
        sphere.position = p; // Set sphere position
    }

    // Function to create a random color material
    public randomColorMaterial() {
        const num = Math.floor(Math.random() * 16777215).toString(16); // Generate random color
        const randomColor = BABYLON.Color3.FromHexString('#' + num); // Convert to Babylon color
        const material = new BABYLON.StandardMaterial('material_' + num, this.scene); // Create material
        material.diffuseColor = randomColor; // Set diffuse color
        return material; // Return material
    }

    // Function to add random boxes to the scene
    public addRandomBox() {
        for (let i = 0; i < 30; i++) { // Loop to create 30 boxes
            const pbr = new BABYLON.PBRMaterial('pbr', this.scene); // Create PBR material

            pbr.metallic = 0.0; // Set metallic property
            pbr.roughness = 0; // Set roughness property

            pbr.subSurface.isRefractionEnabled = true; // Enable refraction
            pbr.subSurface.indexOfRefraction = 1.8; // Set index of refraction

            let box!: BABYLON.Mesh; // Declare box variable
            const key = Math.floor(Math.random() * 6 + 1); // Randomly choose shape
            switch (key) {
                case 1:
                    box = BABYLON.MeshBuilder.CreateSphere(
                        BABYLON.PhysicsShapeType.SPHERE + '',
                        {},
                        this.scene // Create sphere
                    );
                    break;
                case 2:
                    box = BABYLON.MeshBuilder.CreateCapsule(
                        BABYLON.PhysicsShapeType.CAPSULE + '',
                        {},
                        this.scene // Create capsule
                    );
                    break;
                case 3:
                    box = BABYLON.MeshBuilder.CreateCylinder(
                        BABYLON.PhysicsShapeType.CYLINDER + '',
                        {},
                        this.scene // Create cylinder
                    );
                    break;
                case 4:
                    box = BABYLON.MeshBuilder.CreateTorus(
                        BABYLON.PhysicsShapeType.BOX + '',
                        {},
                        this.scene // Create torus
                    );
                    break;
                case 5:
                    box = BABYLON.MeshBuilder.CreateTiledBox(
                        BABYLON.PhysicsShapeType.BOX + '',
                        {},
                        this.scene // Create tiled box
                    );
                    break;
                case 6:
                    box = BABYLON.MeshBuilder.CreateBox(
                        BABYLON.PhysicsShapeType.BOX + '',
                        { size: 1 },
                        this.scene // Create box
                    );
            }

            box.material = pbr; // Assign PBR material
            box.position.x = Math.random() * 10 - 6; // Random x position
            box.position.y = Math.random() * 30 + 10; // Random y position
            box.position.z = Math.random() * 10 + 1; // Random z position
            new BABYLON.PhysicsAggregate(box, parseInt(box.name), { mass: 100 }, this.scene); // Add physics to box
            this.shadowGenerator && this.shadowGenerator.addShadowCaster(box); // Add to shadow generator
            if (box.physicsBody) {
                // this.physicsViewer.showBody(box.physicsBody); // Show physics body (commented out)
            }
        }
    }

    // Function to dispose of the scene and its resources
    public dispose() {
        this.engine?.dispose(); // Dispose engine
        this.scene?.actionManager?.dispose(); // Dispose action manager
        this.scene?.dispose(); // Dispose scene
        this.camera?.dispose(); // Dispose camera
        this.physicsPlugin?.dispose(); // Dispose physics plugin
    }

    // Function to add ground to the scene
    private addGround() {
        const ground = BABYLON.MeshBuilder.CreateGround(
            'ground',
            { width: 500, height: 500 },
            this.scene // Create ground mesh
        );
        const material = new BABYLON.StandardMaterial('material', this.scene); // Create material for ground
        material.diffuseColor = new BABYLON.Color3(39 / 255, 39 / 255, 42 / 255); // Set color
        ground.material = material; // Assign material
        ground.checkCollisions = true; // Enable collisions
        ground.receiveShadows = true; // Enable shadows
        ground.position.z = 15; // Set position
        this.addPhysicsAggregate(ground); // Add physics to ground
    }

    // Function to add physics to a mesh
    private addPhysicsAggregate(meshe: BABYLON.TransformNode) {
        const res = new BABYLON.PhysicsAggregate(
            meshe,
            BABYLON.PhysicsShapeType.BOX,
            { mass: 0, friction: 0.5 },
            this.scene // Create physics aggregate
        );
        return res; // Return physics aggregate
    }
}