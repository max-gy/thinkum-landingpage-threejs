
import { scene } from './renderer.js';
import { basicMaterial, shadowMaterial, wireframeMaterial, neonColors, getMaterials } from './materials.js';
import * as THREE from 'three';

import { initializedModule, setInitialized  } from './language.js';
await initializedModule('shaders');

// Create the main plane geometry
const planeWidth = 400;
const planeHeight = 400;
const segmentsW = 150;
const segmentsH = 150;
const planeGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight, segmentsW, segmentsH);

// Create a clone for the basic material
const planeGeometryBasic = new THREE.PlaneGeometry(planeWidth, planeHeight, segmentsW, segmentsH);

// Modify the vertices in planeGeometry.
const positionAttribute = planeGeometry.attributes.position;
const bendFactor = 0.00;
for (let i = 0; i < positionAttribute.count; i++) {
    const y = positionAttribute.getY(i);
    const z = y * y * bendFactor;
    positionAttribute.setZ(i, z);
}
planeGeometry.attributes.position.needsUpdate = true;
//planeGeometry.computeVertexNormals();

// Create a clone for the basic material and update the vertices in planeGeometryBasic
const positionAttributeBasic = planeGeometryBasic.attributes.position;
/*
for (let i = 0; i < positionAttributeBasic.count; i++) {
    const y = positionAttributeBasic.getY(i);
    const z = y * y * bendFactor;
    positionAttributeBasic.setZ(i, z);
}
positionAttributeBasic.needsUpdate = true;
planeGeometryBasic.computeVertexNormals();*/


// Create two meshes with the same geometry but different materials
const shadowPlane = new THREE.Mesh(planeGeometry, shadowMaterial);
shadowPlane.receiveShadow = true;
shadowPlane.rotation.x = -Math.PI / 4;
shadowPlane.position.y = -0.2; // Adjusted position for better visibility
shadowPlane.position.z = -3; // Adjusted position for better visibility

const displayPlane = new THREE.Mesh(planeGeometryBasic, basicMaterial);
displayPlane.receiveShadow = true;
displayPlane.rotation.x = -Math.PI / 4;
displayPlane.position.y = -0.8; // Adjusted position for better visibility
displayPlane.position.z = -3; // Adjusted position for better visibility

  //displayPlane.position.z -= 0.01; // Slightly move forward to prevent z-fighting

//scene.add(displayPlane);
scene.add(shadowPlane);

// Cube with letters
const geometry = new THREE.BoxGeometry();
geometry.rotateY(0.0)

let materials = [];
materials = await getMaterials();

const cube = new THREE.Mesh(geometry, materials);
cube.castShadow = true; // Enable shadows for the cube

// Wireframe for borders with neon colors
const wireframeGeometry = new THREE.EdgesGeometry(geometry);

// Apply neon colors to the borders
const colors = [];
for (let i = 0; i < wireframeGeometry.attributes.position.count; i++) {
    const color = new THREE.Color(neonColors[Math.floor(i / 2) % neonColors.length]);
    colors.push(color.r, color.g, color.b);
}

// Create line segments for the edges
const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);

wireframeGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

//cube.add(wireframe);

setInitialized('geometry');

export { cube, displayPlane, shadowPlane, wireframeGeometry };