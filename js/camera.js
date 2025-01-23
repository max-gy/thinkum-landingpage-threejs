import * as THREE from 'three';

import { initializedModule, setInitialized  } from './language.js';
await initializedModule('renderer');

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

// Set camera position to look from a 30-degree angle
camera.position.set(0, 1, 5);
camera.lookAt(0, 0, 0);

// Function to calculate which side of the cube faces the camera
const getFacingSide = (cube, camera) => {

    // Step 1: Get cube's world position
    const cubeWorldPosition = new THREE.Vector3();
    cube.getWorldPosition(cubeWorldPosition);
  
    // Step 2: Get camera's view direction
    const cameraWorldPosition = new THREE.Vector3();
    camera.getWorldPosition(cameraWorldPosition);
    const viewDirection = new THREE.Vector3();
    viewDirection.subVectors(cubeWorldPosition, cameraWorldPosition).normalize();
  
    // Step 3: Define face normal vectors in the cube's local space
    const normals = {
      "1": new THREE.Vector3(1, 0, 0),
      "0": new THREE.Vector3(-1, 0, 0),
      "3": new THREE.Vector3(0, 1, 0),
      "2": new THREE.Vector3(0, -1, 0),
      "5": new THREE.Vector3(0, 0, 1),
      "4": new THREE.Vector3(0, 0, -1)
    };
  
    // Step 4: Transform normals to the cube's world space
    const cubeMatrix = new THREE.Matrix4();
    cubeMatrix.extractRotation(cube.matrixWorld);
  
    const transformedNormals = {};
    for (const face in normals) {
      transformedNormals[face] = normals[face].clone().applyMatrix4(cubeMatrix);
    }
  
    // Step 5: Calculate dot products
    let closestFace = "";
    let closestDotProduct = -Infinity;
    for (const face in transformedNormals) {
      const dotProduct = viewDirection.dot(transformedNormals[face]);
      if (dotProduct > closestDotProduct) {
        closestDotProduct = dotProduct;
        closestFace = face;
      }
    }
  
    // Step 6: Return the name of the closest face
    return closestFace;
  }
  
  setInitialized('camera');

export { camera, getFacingSide };