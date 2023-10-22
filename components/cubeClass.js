import * as THREE from 'three';

export default class CubeClass extends THREE.Mesh {
  constructor(posX, posZ) {
    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshPhysicalMaterial({
      color: 0xff69b4,
      metalness: 0.5,
      roughness: 0.5,
      //   side: THREE.DoubleSide,
    });
    super(geometry, material);

    this.receiveShadow = true;
    this.scale.setY(Math.round(Math.random() * 10));
    this.position.x = posX;

    this.position.y = 0;
    this.position.z = posZ;

    this.colorChange = () => {
      this.material.color.setHex(Math.floor(Math.random() * 16777216));
    };
  }
}
