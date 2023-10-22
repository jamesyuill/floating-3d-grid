import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import CubeClass from './components/cubeClass';
const spaceSlider = document.getElementById('space-slider');

//SCENE & CAMERA
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 20, 50);

//RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xaaaaaa, 1);
document.body.appendChild(renderer.domElement);

//LIGHTS
const spotLight = new THREE.SpotLight(0xffffff, 100, 50, 60, 2, 4);
scene.add(spotLight);
spotLight.position.set(0, 30, 0);
const sphereSize = 1;
const spotLightHelper = new THREE.SpotLightHelper(spotLight, sphereSize);
scene.add(spotLightHelper);

//CAMERA CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
controls.zoomSpeed = 7;
controls.dynamicDampingFactor = 0.1;
controls.update();

//GEOMETRY
let space = 1;

spaceSlider.addEventListener('input', (e) => {
  space = e.target.value;
});

let objectAmount = 100;
let boxArray = [];

for (let x = -20; x < 20; x += space) {
  for (let z = -20; z < 20; z += space) {
    const box = new CubeClass(x, z);
    boxArray.push(box);
    box.updateMatrix();
    // box.setMatrixAt(x, box.matrix);

    scene.add(box);
  }
}

setInterval(() => {
  boxArray.forEach((item) => {
    item.colorChange();
  });
}, 1000);

//ANIMATE
function animate() {
  // mesh.instanceMatrix.needsUpdate = true;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  controls.update();
}
animate();

//EVENT HANDLER
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
