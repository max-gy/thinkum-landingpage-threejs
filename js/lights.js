
    import { scene } from './renderer.js';
    import * as THREE from 'three';

    import { initializedModule, setInitialized  } from './language.js';
    await initializedModule('camera');    

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0); // Reduced intensity
    scene.add(ambientLight);

    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.1); // Ambient environment light
    scene.add(hemisphereLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 20, 10);
    directionalLight.castShadow = true; // Enable shadows for the light

    // Set shadow properties for the directional light
    directionalLight.shadow.mapSize.width = 400; // Further reduced to blur more
    directionalLight.shadow.mapSize.height = 400; // Further reduced to blur more
    directionalLight.shadow.camera.near = 10;
    directionalLight.shadow.camera.far = 150;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    directionalLight.shadow.radius = 300; // Adjust radius if needed
    directionalLight.shadow.blurSamples = 200; // Adjust radius if needed
    directionalLight.shadow.intensity = 0.9; // Adjust radius if needed
    directionalLight.shadow.bias = 0; // Adjust bias if needed
    scene.add(directionalLight);

    setInitialized('lights');
