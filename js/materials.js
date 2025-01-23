import { lang_strings } from './language.js';
import * as THREE from 'three';

import { initializedModule, setInitialized  } from './language.js';
await initializedModule('lights');

const getMaterials = async () => {
  return new Promise((resolve, reject) => {
    let materials = [
      new THREE.MeshStandardMaterial({ color: backgroundColor, side: THREE.DoubleSide, map: createTextTexture(lang_strings["cube"][0]["cube_side"]) }),
      new THREE.MeshStandardMaterial({ color: backgroundColor, side: THREE.DoubleSide, map: createTextTexture(lang_strings["cube"][1]["cube_side"]) }),
      new THREE.MeshStandardMaterial({ color: backgroundColor, side: THREE.DoubleSide, map: createTextTexture(lang_strings["cube"][2]["cube_side"]) }),
      new THREE.MeshStandardMaterial({ color: backgroundColor, side: THREE.DoubleSide, map: createTextTexture(lang_strings["cube"][3]["cube_side"]) }),
      new THREE.MeshStandardMaterial({ color: backgroundColor, side: THREE.DoubleSide, map: createTextTexture(lang_strings["cube"][4]["cube_side"]) }),
      new THREE.MeshStandardMaterial({ color: backgroundColor, side: THREE.DoubleSide, map: createTextTexture(lang_strings["cube"][5]["cube_side"]) }),
    ];
      resolve(materials);
    });
}

// Plane to receive the shadow
//const green = "rgba(0, 60, 10, 1)";
//const blue = "rgba(10, 0, 100, 1)";

const green = "rgba(16, 15, 13, 1)";
const blue = "rgba(0, 0, 0, 1)";

const canvas = document.createElement('canvas');
canvas.width = 1400;
canvas.height = 1400;
const context = canvas.getContext('2d');

const gradient = context.createLinearGradient(25, 100, 0, 20);
gradient.addColorStop(0, green); // Red-ish
gradient.addColorStop(1, blue); // Blue-ish

const gradient2 = context.createLinearGradient(2000, 1000, 0, 2000);
gradient2.addColorStop(0, "rgb(16,15,13)"); // Red-ish
gradient2.addColorStop(1, "rgb(14,13,12)"); // Blue-ish

context.fillStyle = gradient;
context.fillRect(0, 0, canvas.width, canvas.height);

// Create a texture from the canvas
const texture = new THREE.CanvasTexture(canvas);

// Create two different materials
const shadowMaterial = new THREE.MeshStandardMaterial({
  color: 0x222222,
  opacity: 1,
  transparent: true,
});

const basicMaterial = new THREE.MeshBasicMaterial({
  map: texture,
});

const backgroundColor = "#ffffff"; // White background
const neonColors = [
  '#39FF14', // Neon Green
  '#FF073A', // Neon Red
  '#FCF951', // Neon Yellow
  '#0FF0FC', // Neon Cyan
  '#F62459', // Neon Pink
  '#9932CC', // Neon Purple
];

const wireframeMaterial = new THREE.LineBasicMaterial({ vertexColors: true, linewidth: 5 });

// Function to create text texture for each side of the cube
function createTextTexture(letter) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext('2d');
  context.fillStyle = gradient2;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.font = 'bold 128px Arial';
  context.fillStyle = '#ffffff';
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(letter, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  return texture;
}

setInitialized('materials');

export { getMaterials, wireframeMaterial, shadowMaterial, basicMaterial, neonColors };