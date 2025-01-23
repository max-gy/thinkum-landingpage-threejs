import en from '../lang/en.js';

var modulesLoaded = [];

async function initializedModule(modulename) {
    return new Promise(async (resolve, reject) => {
        let unsub = setInterval(() => {
            if (modulename.includes(modulename)) {
                clearInterval(unsub);
                resolve();
            } 
        }, 100);
    })
}

// Initial text
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {

            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

async function setInitialized(moduleName) {
    modulesLoaded.push(moduleName);
}



var lang_strings = en//en;//await get_l_strings();
console.log(lang_strings);

async function get_l_strings() {
    return new Promise((resolve,reject)=> readTextFile("../lang/en.json", function(text){
         resolve(JSON.parse(text));
    }));
}

document.onreadystatechange = async function () {
    console.log(document.readyState);
    if (document.readyState === 'complete') {
        document.getElementById('loading').classList.add('scale-line');
        setInitialized('language');
    }
}

export { lang_strings, initializedModule, setInitialized };