<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Geilke Thinkum</title>
  <link rel="stylesheet" href="css/poppins.css">
  <link rel="stylesheet" href="css/lora.css">
  <link rel="stylesheet" href="css/styles.css?<?= filemtime('css/styles.css')?>">
  
</head>

<body>

<div id="main_container" style="position:absolute;top:0;left:0;width:100vw;height:100vh;">
  <div class="main-nav">
    <div class="nav-item" id="nav-home">Home</div>
    <div class="nav-item" id="nav-about">About</div>
    <div class="nav-item" id="nav-contact">Contact</div>
    <div class="nav-item" id="nav-projects">Projects</div>
    <div class="nav-item" id="nav-imprint">Imprint</div>
    <div class="nav-item" id="nav-future">Future</div>
  </div>

  <div id="canvas-container"></div>

  <div id="loading">loading...</div>

  <div style="background:rgba(0,0,0,0.0)" id="main-content-text-wrapper">
    <div style="background:rgba(0,0,0,0.0)" id="main-content-text2"></div>
    <div style="background:rgba(0,0,0,0.0)" id="main-content-text1"></div>
  </div>

</div>

  <script type="importmap">
    {
      "imports": {
        "three": "./node_modules/three/build/three.module.js",
        "three/addons/": "./node_modules/three/examples/jsm/"
      }
    }
  </script>


  <script src="lang/en.js" type="module"></script>
  <script src="js/language.js" type="module"></script>
  <script src="js/renderer.js" type="module"></script>
  <script src="js/camera.js" type="module"></script>
  <script src="js/lights.js" type="module"></script>
  <script src="js/materials.js" type="module"></script>
  <script src="js/materials_shader.js" type="module"></script>
  <script src="js/geometry.js" type="module"></script>
  <script src="js/navigation.js" type="module"></script>
  <script src="js/text.js" type="module"></script>

  <script src="js/animations.js" type="module"></script>

</body>

</html>