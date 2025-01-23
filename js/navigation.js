import { clearSubscription, rotations, set_target_rotation, set_auto_rotate_cube } from './animations.js  ';

import { initializedModule, setInitialized  } from './language.js';
await initializedModule('geometry');

function selectFromNav(navString) {
    var navItem = document.getElementById(navString);
    var allNavItems = document.getElementsByClassName("nav-item");
    for (var i = 0; i < allNavItems.length; i++) {
        allNavItems[i].classList.remove("selected");
    }
    navItem.classList.add("selected"); 
    clearSubscription();
}

var allNavItems = document.getElementsByClassName("nav-item");
for (var i = 0; i < allNavItems.length; i++) {
    allNavItems[i].addEventListener("click", function(e) {
        let this_index = 0;
        for (var j = 0; j < allNavItems.length; j++) {
            allNavItems[j].classList.remove("selected");
            if (allNavItems[j].id == e.target.id) {
                this_index = j;
            }
        }        
        this.classList.add("selected");
        set_target_rotation(rotations[this_index]);
        set_auto_rotate_cube(true);
    });

}

setInitialized('nav');

export { selectFromNav };