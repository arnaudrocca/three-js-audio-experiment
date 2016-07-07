import Audio from './utils/Audio'
import Scene from './utils/Scene'
import Sphere from './objects/Sphere'

class App {

    /**
     * @constructor
     */
    constructor() {

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.audio = new Audio();
        this.scene = new Scene();
        this.spheres = new Array();

        const length = 3;
        for (let i = 0; i < length; i++) {
            this.spheres[i] = new Sphere(i);
            this.scene.add(this.spheres[i].mesh);
        }

        const root = document.body.querySelector('.app');
        root.appendChild(this.scene.renderer.domElement);

        this.audio.loadSound();

        this.addListeners();

    }

    /**
     * @method
     * @name onResize
     * @description Triggered when window is resized
     */
    onResize() {

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.scene.resize(this.width, this.height);

    }

    /**
     * @method
     * @name addListeners
     */
    addListeners() {

        window.addEventListener('resize', this.onResize.bind(this));
        TweenMax.ticker.addEventListener('tick', this.update.bind(this));

    }

    /**
     * @method
     * @name update
     * @description Triggered on every TweenMax tick
     */
    update() {

        for (let sphere of this.spheres) {
            sphere.update(this.audio);
        }

        this.scene.render(this.audio);

    }

}

export default App
