import THREE from 'three'

class Icosahedron {

    /**
    * @constructor
    */
    constructor(id) {

        this.id = id;

        const colors = [0xFF0000, 0xFF7700, 0xFFFF00];

        const size = 120,
            detail = this.id + 1,
            geometry = new THREE.IcosahedronGeometry(size, detail),
            material = new THREE.MeshBasicMaterial({
            wireframe: true,
            wireframeLinewidth: (this.id == 2) ? 1 : 2,
            color: colors[this.id]
        });

        this.mesh = new THREE.Mesh(geometry, material);

    }

    /**
    * @method
    * @name update
    * @description Triggered on every TweenMax tick
    * @param {object} audio
    */
    update(audio) {

        const audioData = audio.getAudioData(3)[this.id],
            scale = 1 + (audioData / 80);

        this.mesh.rotation.x += .01 + (audioData / 4000);
        this.mesh.rotation.y += .01 + (audioData / 4000);
        this.mesh.rotation.z += .01 + (audioData / 4000);

        this.mesh.scale.set(scale, scale, scale);

    }

}

export default Icosahedron
