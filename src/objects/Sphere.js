import THREE from 'three'

class Sphere {

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
            rotation = .01 + (audioData / 4000),
			scale = 1 + (audioData / 50);

        this.mesh.rotation.x += rotation;
        this.mesh.rotation.y += rotation;
        this.mesh.rotation.z += rotation;

        this.mesh.scale.set(scale, scale, scale);

    }

}

export default Sphere
