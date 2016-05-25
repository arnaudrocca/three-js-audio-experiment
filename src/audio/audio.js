class Audio {

    /**
	 * @constructor
	 */
    constructor() {

        const Constructor = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new Constructor();
        this.analyser = this.audioCtx.createAnalyser();
        this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);

    }

    /**
	 * @method
	 * @name loadSound
	 * @description Load the sound
	 */
    loadSound() {

        this.soundPath = '//lab.arnaudrocca.fr/three-js-audio-experiment/assets/audio/DMX-Gonna_give_it_to_ya.mp3';

        const request = new XMLHttpRequest();
        request.open('GET', this.soundPath, true);
        request.responseType = 'arraybuffer';

        // Decode asynchronously
        request.onload = () => {

            this.audioCtx.decodeAudioData(request.response, (buffer) => {

                // SUCCESS CALLBACK

                // Create sound from buffer
                this.audioBuffer = buffer;
                this.audioSource = this.audioCtx.createBufferSource();
                this.audioSource.buffer = this.audioBuffer;

                // Connect the audio source to context's output
                this.audioSource.connect(this.analyser);
                this.analyser.connect(this.audioCtx.destination);

                // Audio source params
                this.audioSource.crossOrigin = 'anonymous';
                this.audioSource.loop = true;

                // Play the sound
                this.audioSource.start(this.audioCtx.currentTime);

            }, (error) => {

                // ERROR CALLBACK
                console.info(`The following error occured : \n${error}`);

            });

        }

        request.send();

    }

    /**
	 * @method
	 * @name splitFrenquencyArray
	 * @description Split the frequency data
     * @param {array} frequencyData
     * @param {number} split - The length of the frequencyArray
     * @return {array} frequencyArray
	 */
    splitFrenquencyArray(frequencyData, split) {

        const length = frequencyData.length;
        const frequencyArray = new Array();
        let i = 0;

        while (i < length) {
            let size = Math.ceil((length - i) / split--);
            frequencyArray.push(frequencyData.slice(i, i + size));
            i += size;
        }

        return frequencyArray;

    }

    /**
	 * @method
	 * @name getAudioData
     * @description Define how much information you want to get from the original frequency data
     * @param {number} split - The number of splitted array
	 * @return {array} audioData / {number} average
	 */
    getAudioData(split = 1) {

        this.analyser.getByteFrequencyData(this.frequencyData);

        if (split > 1) {

            // Split the frequency array
		    const frequencyArray = this.splitFrenquencyArray(this.frequencyData, split);

            let audioData = new Array();

            // Make average of frenquency array entries
            for (let i in frequencyArray) {
                const splittedArray = frequencyArray[i];
                let average = 0;

                for (let frequency of splittedArray) {
                    average += frequency;
                }
                audioData[i] = average / splittedArray.length;
            }

            return audioData;

        } else {

            // Calculate the average
            let average = 0;

            for (let frequency of this.frequencyData) {
                average += frequency;
            }
            average = average / this.frequencyData.length;

            return average;

        }

    }

}

export default Audio
