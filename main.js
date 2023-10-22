import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import CubeClass from './components/cubeClass';

//SCENE & CAMERA
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(10, 16, 50);

//RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x555555, 1);

document.body.appendChild(renderer.domElement);

//LIGHTS
const pointLight = new THREE.PointLight(0xffffff, 3);
scene.add(pointLight);
pointLight.position.set(0, 20, 0);
const sphereSize = 1;
const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
scene.add(pointLightHelper);

//CAMERA CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
controls.zoomSpeed = 7;
controls.dynamicDampingFactor = 0.1;
controls.update();

//GEOMETRY
let space = 1.1;

const boxes = new THREE.Group();

for (let x = -20; x < 20; x += space) {
  for (let z = -20; z < 20; z += space) {
    const cube = new CubeClass(x, z);
    boxes.add(cube);
  }
}

scene.add(boxes);
boxes.rotation.set(0, 0, 0);

//ANIMATE
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

//EVENT HANDLER
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
