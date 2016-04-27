class Audio {

    /**
	* @constructor
	*/
    constructor() {

        this.soundPath = '//lab.arnaudrocca.fr/three-js-audio-experiment/assets/audio/DMX-Gonna_give_it_to_ya.mp3';

        const constructor = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new constructor();
        this.analyser = this.audioCtx.createAnalyser();
        this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);

    }

    /**
	* @method
	* @name loadSound
	* @description Load the sound
	*/
    loadSound() {

        let request = new XMLHttpRequest();
        request.open('GET', this.soundPath, true);
        request.responseType = 'arraybuffer';

        // Decode asynchronously
        request.onload = function() {

            this.audioCtx.decodeAudioData(request.response, function(buffer) {

                // Success callback
                this.audioBuffer = buffer;

                // Create sound from buffer
                this.audioSource = this.audioCtx.createBufferSource();
                this.audioSource.buffer = this.audioBuffer;

                // Connect the audio source to context's output
                this.audioSource.connect(this.analyser);
                this.analyser.connect(this.audioCtx.destination);

                // Play the sound
                this.audioSource.crossOrigin = 'anonymous';
                this.audioSource.start(this.audioCtx.currentTime);

                // Loop the sound
                this.audioSource.loop = true;

            }.bind(this), function() {

                // Error callback

            });

        }.bind(this);

        request.send();

    }

    /**
	* @method
	* @name splitFrenquencyArray
	* @description Split the frequency data
    * @param {array} frequencyData
    * @param {number} separator - The length of the frequencyArray
    * @return {array} frequencyArray
	*/
    splitFrenquencyArray(frequencyData, separator) {

        let tab = Object.keys(frequencyData).map(function(key) {
            return frequencyData[key];
        });

        let length = tab.length,
            frequencyArray = new Array(),
            i = 0;

        while (i < length) {
            let size = Math.ceil((length - i) / separator--);
            frequencyArray.push(tab.slice(i, i + size));
            i += size;
        }

        return frequencyArray;

    }

    /**
	* @method
	* @name getAudioData
    * @description Define how much information you want to get from the original frequency data
    * @param {number} separator - The length of the frequencyArray
	* @return {array} audioData
	*/
    getAudioData(separator) {

        this.analyser.getByteFrequencyData(this.frequencyData);
        let audioData = new Array();

        // Split array
		const frequencyArray = this.splitFrenquencyArray(this.frequencyData, separator);

		// Make average of frenquency array entries
		for (let i = 0; i < frequencyArray.length; i++) {
			let average = 0;

			for (let j = 0; j < frequencyArray[i].length; j++) {
				average += frequencyArray[i][j];
			}
			audioData[i] = average / frequencyArray[i].length;
		}

        return audioData;

    }

}

export default Audio
