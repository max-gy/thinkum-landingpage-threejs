
import { getFacingSide, camera } from "./camera.js";
import { cube } from "./geometry.js";
import { scene, renderer } from "./renderer.js";
import { updateHtmlTextsFromCube } from "./text.js";
import { _wireframeGeometry } from "./materials_shader.js";
import * as THREE from 'three';

import { initializedModule, setInitialized  } from './language.js';

await initializedModule('texts');
setInitialized('animations');

var target_rotation = [0, 0, 0];
var target_positionZ = 0;
var auto_rotate_cube = true;
var was_dragging = false;
var interval_subscription;
// Variables for mouse interaction
let isDragging = false;
let previousMousePosition = {
    x: 0,
    y: 0,
};
var currentTab = -1;
var wireFrameExtraRotation = 0.00;

var step_size = 0.0;

var facingSide = getFacingSide(cube, camera);

var _canvas = document.getElementById('canvas-container');
var last_rotations = [cube.rotation.x, cube.rotation.y, cube.rotation.z];
var once = false;
var needs_render = false;

// Mouse down event
document.addEventListener('mousedown', function (event) {
    isDragging = true;
});
document.addEventListener('touchstart', function (event) {
    isDragging = true;
    previousMousePosition = {
        x: event.changedTouches[0].clientX,
        y: event.changedTouches[0].clientY,
    };
});
// Mouse up event
document.addEventListener('mouseup', function (event) {
    isDragging = false;
    releaseScrolling();

});
document.addEventListener('touchend', function (event) {
    isDragging = false;
    releaseScrolling();
});

// Mouse move event
document.addEventListener('mousemove', handlePointerMove);
document.addEventListener('touchmove', handlePointerMove);

document.getElementById("main_container").addEventListener('scroll', function (event) {
})

function clearSubscription() {
    interval_subscription = clearInterval(interval_subscription);
}

function preventScrolling() {
}

function releaseScrolling() {
}

function handlePointerMove(event) {

    let cx = 0;
    let cy = 0;

    
    if (event.changedTouches) {
        cx = event.changedTouches[0].clientX;
        cy = event.changedTouches[0].clientY;
    } else {
        cx = event.clientX;
        cy = event.clientY;
    }

    var mul = 3;

    if (_canvas.clientWidth*2 > 2000) {
        mul = 1;
    } else {
        if (cy > window.innerHeight / 2) {
           return
        }
    }

    was_dragging = false;

    if (isDragging) {

        was_dragging = true;

        preventScrolling();

        clearSubscription()
        auto_rotate_cube = false;

        wireFrameExtraRotation += 0.01;
        if (wireFrameExtraRotation > 0.44) {
            wireFrameExtraRotation = 0.44;
        } else {
            _wireframeGeometry.rotateY(0.01);
        }

        const deltaMove = {
            x: (cx - previousMousePosition.x) * mul,
            y: (cy - previousMousePosition.y) * mul,
        };

        if (Math.abs(deltaMove.x) < 4 && Math.abs(deltaMove.y) < 4 &&
            Math.abs(deltaMove.x) > -4 && Math.abs(deltaMove.y) > -4) {
            was_dragging = false;
            return;
        }

        const deltaRotationQuaternion = new THREE.Quaternion()
            .setFromEuler(new THREE.Euler(
                toRadians(deltaMove.y * 0.1), // Adjusted sensitivity
                toRadians(deltaMove.x * 0.1), // Adjusted sensitivity
                0,
                'XYZ'
            ));

        cube.quaternion.multiplyQuaternions(deltaRotationQuaternion, cube.quaternion);

        last_rotations = [cube.rotation.x, cube.rotation.y, cube.rotation.z];
        once = true;
    }

    previousMousePosition = {
        x: cx,
        y: cy,
    };

}

// Function to convert degrees to radians
function toRadians(angle) {
    return angle * (Math.PI / 180);
}

function directionClosestRotPath(current, target) {
    if (current > target) {
        return current - target < Math.PI;
    } else {
        return target - current > Math.PI;
    }
}

// Render loop
function animate() {

    requestAnimationFrame(animate);

    if (auto_rotate_cube) {

        last_rotations = [cube.rotation.x, cube.rotation.y, cube.rotation.z];

        if (target_positionZ >= cube.position.z) {
            target_positionZ = 0;
            cube.position.z += step_size;
        }
        if (target_positionZ < cube.position.z) {
            cube.position.z -= step_size;
        }
        if (directionClosestRotPath(cube.rotation.x, target_rotation[0])) {
            cube.rotation.x -= step_size;
            if (cube.rotation.x < -Math.PI) cube.rotation.x += 2 * Math.PI;
            if (!directionClosestRotPath(cube.rotation.x, target_rotation[0])) cube.rotation.x = target_rotation[0];
        } else if (!directionClosestRotPath(cube.rotation.x, target_rotation[0])) {
            cube.rotation.x += step_size;
            if (cube.rotation.x > Math.PI) cube.rotation.x -= 2 * Math.PI;
            if (directionClosestRotPath(cube.rotation.x, target_rotation[0])) cube.rotation.x = target_rotation[0];
        }

        if (directionClosestRotPath(cube.rotation.y, target_rotation[1])) {
            cube.rotation.y -= step_size;
            if (cube.rotation.y < -Math.PI) cube.rotation.y += 2 * Math.PI;
            if (!directionClosestRotPath(cube.rotation.y, target_rotation[1])) cube.rotation.y = target_rotation[1];
        } else if (!directionClosestRotPath(cube.rotation.y, target_rotation[1])) {
            cube.rotation.y += step_size;
            if (cube.rotation.y > Math.PI) cube.rotation.y -= 2 * Math.PI;
            if (directionClosestRotPath(cube.rotation.y, target_rotation[1])) cube.rotation.y = target_rotation[1];
        }

        if (directionClosestRotPath(cube.rotation.z, target_rotation[2])) {
            cube.rotation.z -= step_size;
            if (cube.rotation.z < -Math.PI) cube.rotation.z += 2 * Math.PI;
            if (!directionClosestRotPath(cube.rotation.z, target_rotation[2])) cube.rotation.z = target_rotation[2];
        } else if (!directionClosestRotPath(cube.rotation.z, target_rotation[2])) {
            cube.rotation.z += step_size;
            if (cube.rotation.z > Math.PI) cube.rotation.z -= 2 * Math.PI;
            if (directionClosestRotPath(cube.rotation.z, target_rotation[2])) cube.rotation.z = target_rotation[2];
        }

    }

    // Optionally: Continuously check the facing side if either object moves
    const updatedFacingSide = getFacingSide(cube, camera);
   
    if (last_rotations[0] == cube.rotation.x && last_rotations[1] == cube.rotation.y && last_rotations[2] == cube.rotation.z) {
        if (once) {
            updateHtmlTextsFromCube(updatedFacingSide);
        }
        needs_render = false;
        wireFrameExtraRotation -= 0.01;
        if (wireFrameExtraRotation < 0) {
            wireFrameExtraRotation = 0;
        } else {
            _wireframeGeometry.rotateY(-0.01);
            needs_render = true;
        }
        once = false;
        if (facingSide !== updatedFacingSide) {
            facingSide = updatedFacingSide;
        }
    } else {
        needs_render = true;
        wireFrameExtraRotation += 0.01;
        if (wireFrameExtraRotation > 0.44) {
            wireFrameExtraRotation = 0.44;
        } else {
            _wireframeGeometry.rotateY(0.01);
        }
        once = true
    }

    if (needs_render) renderer.render(scene, camera);

}

function resize() {
    const width = _canvas.clientWidth*2;
    const height = _canvas.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    cube.position.x = 0;
    cube.position.y = 0;
    if (width > 2000) {
        cube.position.x = -0;
        cube.position.y = -0;
        cube.scale.set(1, 1, 1);
    } else {
        cube.scale.set(1.5, 1.5, 1.5);
    }
    renderer.render(scene, camera);
}

// Handle window resizing
window.addEventListener('resize', () => {
    resize();
});

function set_auto_rotate_cube(value) {
    auto_rotate_cube = value;
}

function rotateCubeTo(xyz) {
    target_rotation = xyz;
}

function set_target_rotation(xyz) {
    target_rotation = xyz;
}

const rotations = [
    [Math.PI, -Math.PI / 2, Math.PI], // 1
    [Math.PI, Math.PI / 2, Math.PI], // 2
    [-Math.PI / 2, Math.PI, Math.PI], // 3
    [Math.PI / 2, Math.PI, -Math.PI], // 4
    [Math.PI, Math.PI, Math.PI], // 5
    [Math.PI, 0, Math.PI], // 6
];


// Raycaster setup
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Convert mouse coordinates to normalized device coordinates (-1 to +1)
function onMouseClick(event) {

    if (_canvas.clientWidth*2 > 2000) {
        mouse.x = (event.clientX / window.innerWidth) * 1 - 0.25;
    } else {
        mouse.x = (event.clientX / window.innerWidth) * 1 - 0.5;
    }
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObject(cube);

    if (intersects.length > 0 && was_dragging == false) {
        const intersect = intersects[0];
        let entry = Math.floor(intersect.faceIndex / 2);
        if (entry == currentTab) {
            entry++;
            if (entry >= rotations.length) {
                entry = 0;
            }
        }
        target_rotation = rotations[entry];
        target_positionZ = -0.5;
        auto_rotate_cube = true;
        currentTab = entry;
    }
}

window.addEventListener('click', onMouseClick, false);

animate();
resize();

setTimeout(() => {
    step_size = 0.08;
    rotateCubeTo([Math.PI / 4, Math.PI / 4, 0]);
    document.getElementById("main-content-text2").style.opacity = 1;
    document.getElementById("main-content-text1").style.opacity = 1;
    let rot_index = 0;
    interval_subscription = setInterval(function () {
        rotateCubeTo(rotations[rot_index]);
        rot_index = (rot_index + 1) % rotations.length;
        if (rot_index >= rotations.length) {
            rot_index = 0;
        }
    }, 5000);
    document.getElementById('loading').classList.remove('scale-line');
    document.getElementById('loading').style.display = "none";
}, 500)

setTimeout(() => {
    step_size = 0.1;
}, 1000);

cube.rotation.x = 2.38;
cube.rotation.y = 2.38;
cube.rotation.z = 2.38;

scene.add(cube);

export { rotateCubeTo, clearSubscription, rotations, set_target_rotation, set_auto_rotate_cube };