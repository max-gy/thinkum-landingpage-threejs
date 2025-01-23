import { lang_strings } from './language.js';
import { scene } from './renderer.js';
import { selectFromNav } from './navigation.js';
import * as THREE from 'three';

import { initializedModule, setInitialized  } from './language.js';
await initializedModule('nav');

// Step 1: Create a canvas and draw the text on it
const text_canvas = document.createElement('canvas');
const text_context = text_canvas.getContext('2d');
const fontSize = 10;
text_canvas.width = 256;
text_canvas.height = 256;

// Set font and fill style
text_context.font = `${fontSize}px Arial`;
text_context.fillStyle = 'white';
text_context.textAlign = 'center';
text_context.textBaseline = 'middle';

// Draw the text

// Step 2: Create a texture from the canvas
const text_texture = new THREE.CanvasTexture(text_canvas);

// Step 3: Create a sprite material using the canvas texture
const text_spriteMaterial = new THREE.SpriteMaterial({ map: text_texture });

// Step 4: Create a sprite and set its position/scale
const text_sprite = new THREE.Sprite(text_spriteMaterial);
text_sprite.scale.set(4, 4, 1);  // Adjust the size of the sprite based on your scene scale
text_sprite.position.set(0, 2, 0); // Adjust the position based on your scene setup

// Step 5: Add the sprite to the scene
scene.add(text_sprite);

// Function to update the text
function updateText(newText) {
    // Clear the canvas
    text_context.clearRect(0, 0, text_canvas.width, text_canvas.height);

    // Set font and fill style again if needed
    text_context.font = `${fontSize}px Arial`;
    text_context.fillStyle = 'white';
    text_context.textAlign = 'center';
    text_context.textBaseline = 'middle';
    const lines = newText.split('\n');

    const lineHeight = fontSize * 1.2; // You can adjust the line height as needed

    // Calculate the initial y position to center the text block
    const totalTextHeight = lineHeight * lines.length;
    const startY = (text_canvas.height - totalTextHeight) / 2 + fontSize / 2;

    // Loop through lines and draw each line
    lines.forEach((line, index) => {
        text_context.fillText(line, text_canvas.width / 2, startY + index * lineHeight);
    });

        // Mark the texture as needing an update
    text_texture.needsUpdate = true;

}

var timeout_subscription;
function updateHtmlTextsFromCube(updatedFacingSide) {
    try {
        clearTimeout(timeout_subscription);
    } catch(e) {
        console.log(e);
    }
    document.getElementById('main-content-text2').classList.remove('scale-line');

    timeout_subscription = setTimeout(()=> {
        if (lang_strings) {
            selectFromNav(lang_strings["cube"][parseInt(updatedFacingSide)]["nav"])
            if (lang_strings["cube"][parseInt(updatedFacingSide)]["text"] != undefined) 
                document.getElementById("main-content-text1").innerHTML = lang_strings["cube"][parseInt(updatedFacingSide)]["text"];
            else 
                document.getElementById("main-content-text1").innerHTML = "";
            if (lang_strings["cube"][parseInt(updatedFacingSide)]["text2"] != undefined) 
                document.getElementById("main-content-text2").innerHTML = lang_strings["cube"][parseInt(updatedFacingSide)]["text2"];
            else
                document.getElementById("main-content-text2").innerHTML = "";
        }
        document.getElementById('main-content-text2').classList.add('scale-line');
    }, 200)
}

setInitialized('texts');

export { updateText, updateHtmlTextsFromCube };