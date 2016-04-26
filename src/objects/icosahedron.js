import THREE from 'three'

class Icosahedron {

    /**
    * @constructor
    */
    constructor(id) {

				this.id = id;

        const colors = [0xFF0000, 0xFF7700, 0xFFFF00];

        const size = 100,
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
            rotate = .01 + (audioData / 4000),
			scale = 1 + (audioData / 50);

        this.mesh.rotation.x += rotate;
        this.mesh.rotation.y += rotate;
        this.mesh.rotation.z += rotate;

        this.mesh.scale.set(scale, scale, scale);

    }

}

export default Icosahedron
