import {
    Synth,
    PingPongDelay,
    LFO,
    Master,
    Filter,
    Volume,
} from 'tone/Tone/index';
import Knob from './Knob';
import '../scss/index.scss';

const C1 = 32.70;
const C3 = 130.81;
const C7 = 2093;

class DubSiren {
    constructor() {
        this.volume = -10;
        this.note = C3;
        this.delayFilerFreq = 4000;
        this.keyDown = false;
        this.isPlaying = false;
        this.lockSignal = false;

        // Setup delay
        this.delay = new PingPongDelay(0.5, 0.6);
        this.delay.wet.value = 1;
        this.delayFilter = new Filter(this.delayFilerFreq, 'lowpass');
        this.delayFilter.Q.value = 7.5;
        this.delayVolume = new Volume(-6);
        this.delay.connect(this.delayFilter);
        this.delayFilter.connect(this.delayVolume);
        this.delayVolume.toMaster();

        // Setup synth
        this.synth = new Synth({
            oscillator: {
                type: 'square',
            },
            envelope: {
                attack: 0.005,
                decay: 0.6,
                sustain: 0,
                release: 0.5,
            }
        });
        this.synth.volume.value = this.volume ;
        this.synth.fan(this.delay, Master);
        this.triggerSignalBtn = document.querySelector('.js-trigger-signal');

        // Setup LFO
        this.lfo = new LFO('8n.', C1, C7);
        this.lfo.connect(this.synth.oscillator.frequency);
        this.lfo.start();

        // Attach event listeners to UI
        // Synth UI
        new Knob({
            el: '.js-osc-freq-knob',
            value: this.note,
            minValue: C1,
            maxValue: C7,
            onDrag: (value) => {
                this.synth.frequency.value = value;
                this.note = value;
            }
        });
        new Knob({
            el: '.js-osc-volume-knob',
            value: this.volume,
            minValue: -70,
            maxValue: 0,
            onDrag: (value) => {
                this.synth.volume.value = value;
            }
        });
        this.onMouseUpCallBack = this.onMouseUp.bind(this);
        this.triggerSignalBtn.addEventListener('mousedown', this.onMouseDown.bind(this));
        document.querySelector('.js-signal-lock').addEventListener('change', (e) => {
            this.lockSignal = e.target.checked;
            this.synth.envelope.sustain = this.lockSignal ? 1 : 0;
            const buttonEl = document.querySelector('.js-signal-lock-button');
            buttonEl.classList.toggle('locked');
        });
        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));

        // LFO UI
        new Knob({
            el: '.js-lfo-freq-knob',
            value: 1,
            minValue: 0,
            maxValue: 15,
            onDrag: (value) => {
                this.lfo.frequency.value = value;
            }
        });
        new Knob({
            el: '.js-lfo-amp-knob',
            value: 0.5,
            minValue: 0,
            maxValue: 1,
            onDrag: (value) => {
                this.lfo.amplitude.value = value;
            }
        });
        const LFOWaveformsTypeButtons = document.querySelectorAll('.js-lfo-waveform');
        LFOWaveformsTypeButtons.forEach((buttonEL) => {
            buttonEL.addEventListener('change', (e) => {
                this.lfo.type = e.target.value;
            });
        });

        // Delay UI
        new Knob({
            el: '.js-delay-time-knob',
            value: 0.5,
            minValue: 0.01,
            maxValue: 1,
            onDrag: (value) => {
                this.delay.delayTime.setValueAtTime(value, 0.1);
            }
        });
        new Knob({
            el: '.js-delay-feedback-knob',
            value: 0.5,
            minValue: 0.01,
            maxValue: 0.95,
            onDrag: (value) => {
                this.delay.feedback.setValueAtTime(value, 0.1);
            }
        });
        new Knob({
            el: '.js-delay-filter-freq-knob',
            value: this.delayFilerFreq,
            minValue: 26,
            maxValue: 5000,
            onDrag: (value) => {
                this.delayFilerFreq = value;
                this.delayFilter.frequency.value = value;
            }
        });
        document.querySelector('.js-delay-on-off').addEventListener('change', this.toggleDelay.bind(this));
    }

    toggleSignal(event, forceSustain) {
        // if (this.lockSignal || forceSustain) {
            if (this.isPlaying) {
                this.synth.envelope.sustain = 0;
                this.synth.triggerRelease();
                this.triggerSignalBtn.classList.remove('active');
            } else {
                this.synth.envelope.sustain = 1;
                this.synth.triggerAttack(this.note);
                this.triggerSignalBtn.classList.add('active');
            }
            this.isPlaying = !this.isPlaying;
        // } else {
            // this.synth.envelope.sustain = 0;
            // this.synth.triggerAttackRelease(this.note);
        // }
    }

    toggleDelay(e) {
        // this.delay.wet.value = e.target.checked ? 1 : 0;
        if (e.target.checked) {
            this.synth.connect(this.delay);
        } else {
            this.synth.disconnect(this.delay);
        }
    }

    onMouseDown() {
        this.synth.envelope.sustain = 1;
        this.synth.triggerAttack(this.note);
        this.triggerSignalBtn.classList.add('active');
        document.addEventListener('mouseup', this.onMouseUpCallBack);
    }

    onMouseUp() {
        this.synth.envelope.sustain = 0;
        this.synth.triggerRelease();
        this.triggerSignalBtn.classList.remove('active');

        document.removeEventListener('mouseup', this.onMouseUpCallBack);
    }

    onKeyDown(e) {
        if (!this.keyDown && e.keyCode === 32) {
            // Prevent button from being activated if one is focused
            e.preventDefault();

            this.keyDown = true;
            this.toggleSignal(e, true);
        }
    }

    onKeyUp(e) {
        if (this.keyDown && e.keyCode === 32) {
            this.keyDown = false;
            this.toggleSignal(e, true);
        }
    }
}

new DubSiren();
