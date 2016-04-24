import 'gsap'

import numberUtils from './utils/number-utils'
import Audio from './audio'
import Scene from './scene/scene'
import Icosahedron from './objects/icosahedron'

class App {

    /**
    * @constructor
    */
    constructor() {

        this.DELTA_TIME = 0;
        this.LAST_TIME = Date.now();

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.audio = new Audio();
        this.scene = new Scene();
        this.icosahedrons = new Array();

        const length = 3;
        for (let i = 0; i < length; i++) {
            this.icosahedrons[i] = new Icosahedron(i);
            this.scene.add(this.icosahedrons[i].mesh);
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
    * @param  {object} e - event
    */
    onResize(e) {

        const event = e || window.e;

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

        this.DELTA_TIME = Date.now() - this.LAST_TIME;
        this.LAST_TIME = Date.now();

        for (let i in this.icosahedrons) {
            this.icosahedrons[i].update(this.DELTA_TIME, this.audio, i);
        }

        this.scene.render();

    }

}

export default App
