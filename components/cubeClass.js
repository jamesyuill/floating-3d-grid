import * as THREE from 'three';

export default class CubeClass extends THREE.Mesh {
  constructor(posX, posZ) {
    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshMatcapMaterial({
      color: 0xffffff,
    });
    super(geometry, material);

    this.receiveShadow = true;
    // this.scale.setY(Math.round(Math.random() * 4));
    this.scale.setY(Math.ceil(Math.random() * 3));

    this.position.x = posX;

    this.position.y = 0;
    this.position.z = posZ;

    this.colorChange = () => {
      this.material.color.setHex(Math.floor(Math.random() * 16777216));
    };

    this.changeBackColor = () => {
      this.material.color.setHex(0xffffff);
    };
  }
}
