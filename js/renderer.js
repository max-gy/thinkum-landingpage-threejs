import * as THREE from 'three';
import { initializedModule, setInitialized  } from './language.js';

await initializedModule('language');    

const container = document.getElementById('canvas-container');
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // Enable shadow maps in the renderer
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Softer shadows
container.appendChild(renderer.domElement);


const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // Set background color to black

setInitialized("renderer");

export { renderer, scene, initializedModule };