import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// sphere

const geometry = new THREE.SphereGeometry(15, 32, 16);
const material = new THREE.MeshBasicMaterial({
  color: 0xffff00,
  wireframe: true,
});
const sphere = new THREE.Mesh(geometry, material);
// scene.add(sphere);

const moonTexture = new THREE.TextureLoader().load("moon.jpg");

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(15, 32, 16),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
  })
);
scene.add(moon);
// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);

// scene.add(lightHelper, gridHelper);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.1, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(300).fill().forEach(addStar);
const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);

  moon.rotation.x += 0.001;
  sphere.rotation.y += 0.005;
  sphere.rotation.z += 0.01;

  controls.update();
  renderer.render(scene, camera);
}

animate();
