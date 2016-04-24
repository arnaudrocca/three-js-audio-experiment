import THREE from 'three'

class Icosahedron {

    /**
    * @constructor
    */
    constructor(id) {

        const colors = [0xFF0000, 0xFF7700, 0xFFFF00];

        const size = 120,
            detail = id + 1,
            geometry = new THREE.IcosahedronGeometry(size, detail),
            material = new THREE.MeshBasicMaterial({
            wireframe: true,
            wireframeLinewidth: 2,
            color: colors[id]
        });

        this.mesh = new THREE.Mesh(geometry, material);

    }

    /**
    * @method
    * @name update
    * @description Triggered on every TweenMax tick
    * @param {number} dt - DELTA_TIME
    * @param {object} audio
    * @param {number} id
    */
    update(dt, audio, id) {

        const audioData = audio.getAudioData(3)[id],
            scale = 1 + (audioData / 80);

        this.mesh.rotation.x += .01 + (audioData / 4000);
        this.mesh.rotation.y += .01 + (audioData / 4000);
        this.mesh.rotation.z += .01 + (audioData / 4000);

        this.mesh.scale.set(scale, scale, scale);

    }

}

export default Icosahedron
