
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { Line2 } from 'three/addons/lines/Line2.js';
import { LineGeometry } from 'three/addons/lines/LineGeometry.js';
import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js';
import { scene } from './renderer.js';
import { WireframeGeometry2 } from 'three/addons/lines/WireframeGeometry2.js';
import { wireframeGeometry, cube } from './geometry.js';
import { neonColors } from './materials.js';
import * as THREE from 'three';

import { initializedModule, setInitialized  } from './language.js';
await initializedModule('materials');

const vertexShader = `
  varying vec3 vColor;
  void main() {
    vColor = color;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  void main() {
    gl_FragColor = vec4(vColor, 1.0);
  }
`;

const edgeMaterial = new THREE.ShaderMaterial({
  vertexShader: vertexShader, 
  fragmentShader: fragmentShader,
  vertexColors: true,
  side: THREE.BackSide,
  linewidth: 14,
});

const lineMaterial = new LineMaterial({
  color: 0x00ffff,
  linewidth: 5.2, // in pixels
  dashed: false,
  alphaToCoverage: true,
});

const edgePoints = [
  new THREE.Vector3(-1, -1, -1),
  new THREE.Vector3(1, -1, -1),
  new THREE.Vector3(1, 1, -1),
  new THREE.Vector3(-1, 1, -1),
  new THREE.Vector3(-1, -1, -1),
  new THREE.Vector3(-1, -1, 1),
  new THREE.Vector3(1, -1, 1),
  new THREE.Vector3(1, 1, 1),
  new THREE.Vector3(-1, 1, 1),
  new THREE.Vector3(-1, -1, 1),
  new THREE.Vector3(1, -1, 1),
  new THREE.Vector3(1, -1, -1),
  new THREE.Vector3(1, 1, -1),
  new THREE.Vector3(1, 1, 1),
  new THREE.Vector3(-1, 1, 1),
  new THREE.Vector3(-1, 1, -1),
];

// Create a new geometry for the edges
const edgeGeometry = new THREE.BufferGeometry().setFromPoints(edgePoints);
edgeGeometry.scale(0.52, 0.52, 0.52);
const __lineGeometry = new LineGeometry().fromLine(new THREE.Line(edgeGeometry));
// Create line segments for the edges
const edges = new Line2(__lineGeometry, lineMaterial);

const logo = new THREE.Mesh(wireframeGeometry, edgeMaterial);

logo.scale.set(0.3, 0.3, 0.3);
logo.position.set(-1, 1.6, 0);
logo.rotation.set(3.5, 3.7,8.23);

// Add the edges to the scene
//scene.add(edges3);
cube.add(edges);
console.log("cube", cube);
//scene.add(logo);

setInitialized('shaders');

export { edges as _wireframeGeometry}
