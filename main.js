import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import CubeClass from './components/cubeClass';

const gridButtonOne = document.getElementById('grid-size-1');
const gridButtonTwo = document.getElementById('grid-size-2');
const gridButtonThree = document.getElementById('grid-size-3');

//SCENE & CAMERA
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 30, 40);

//RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xaaaaaa, 1);
document.body.appendChild(renderer.domElement);

//LIGHTS
const light = new THREE.DirectionalLight(0xffffff, 1);
scene.add(light);
light.position.set(0, 40, 0);

//CAMERA CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
controls.zoomSpeed = 7;
controls.dynamicDampingFactor = 0.1;
controls.update();

//GEOMETRY

let space = 1;

gridButtonOne.addEventListener('click', (e) => {
  space = 1;
  createBoxes(space);
});
gridButtonTwo.addEventListener('click', () => {
  space = 2;
  createBoxes(space);
});
gridButtonThree.addEventListener('click', () => {
  space = 3;
  createBoxes(space);
});

let boxArray = [];

function createBoxes(space) {
  if (boxArray.length > 0) {
    boxArray.forEach((obj) => {
      obj.geometry.dispose();
      obj.material.dispose();
      scene.remove(obj);
    });
  }

  for (let x = -20; x < 20; x += space) {
    for (let z = -20; z < 20; z += space) {
      const box = new CubeClass(x, z);
      boxArray.push(box);
      scene.add(box);
    }
  }
}

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function changeColor() {
  raycaster.setFromCamera(pointer, camera);

  const intersects = raycaster.intersectObjects(scene.children);

  if (intersects.length > 0) {
    intersects[0].object.material.color.setHex(0xff0000);
    setTimeout(intersects[0].object.changeBackColor, 500);
  }
}

//ANIMATE
function animate() {
  changeColor();

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  controls.update();
}
animate();

//EVENT HANDLER

window.addEventListener('pointermove', onPointerMove);

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
