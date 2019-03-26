import {
    Synth,
    PingPongDelay,
    LFO,
} from 'tone/Tone/index';
import Knob from './Knob';
import '../scss/index.scss';

const C1 = 32.70;
const C3 = 130.81;
const C7 = 2093;

class DubSiren {
    constructor() {
        this.note = C3;
        this.keyDown = false;
        this.isPlaying = false;
        this.sustainModeActive = false;

        // Setup delay
        this.delay = new PingPongDelay('8n.', 0.6);
        this.delay.wet.value = 0.25;
        this.delay.toMaster();

        // Setup synth
        this.synth = new Synth({
            oscillator: {
                type: 'square',
            },
            envelope: {
                attack: 0.005,
                decay: 0.6,
                sustain: 0,
                release: 1.37,
            }
        });
        this.synth.connect(this.delay);

        // Setup LFO
        this.lfo = new LFO('8n.', C1, C7);
        this.lfo.connect(this.synth.oscillator.frequency);
        this.lfo.start();

        // Attach event listeners to UI
        // Synth UI
        document.querySelector('.js-trigger-signal').addEventListener('click', this.toggleSignal.bind(this));
        document.querySelector('.js-sustain-mode').addEventListener('change', this.toggleSustainMode.bind(this));
        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));
        document.querySelector('.js-synth-freq').addEventListener('input', (e) => {
            this.synth.frequency.value = e.target.value;
            this.note = this.synth.frequency.value;
        });

        // Delay UI
        document.querySelector('.js-delay-time').addEventListener('input', (e) => {
            this.delay.delayTime.setValueAtTime(e.target.value, 0);
        });
        document.querySelector('.js-delay-feedback').addEventListener('input', (e) => {
            this.delay.feedback.setValueAtTime(e.target.value, 0);
        });
        // LFO UI
        document.querySelector('.js-lfo-freq').addEventListener('input', (e) => {
            this.lfo.frequency.value = e.target.value;
        });
        document.querySelector('.js-lfo-amp').addEventListener('input', (e) => {
            this.lfo.amplitude.value = e.target.value;
        });

        new Knob({
            el: '.js-knob',
            value: this.note,
            eminValue: C1,
            maxValue: C7,
            onDrag: (value) => {
                this.synth.frequency.value = value;
                this.note = value;
            }
        });
    }

    toggleSignal(event, forceSustain) {
        if (this.sustainModeActive || forceSustain) {
            if (this.isPlaying) {
                this.synth.envelope.sustain = 0;
                this.synth.triggerRelease();
            } else {
                this.synth.envelope.sustain = 1;
                this.synth.triggerAttack(this.note);
            }
            this.isPlaying = !this.isPlaying;
        } else {
            this.synth.envelope.sustain = 0;
            this.synth.triggerAttackRelease(this.note);
        }
    }

    onKeyDown(e) {
        if (!this.keyDown) {
            this.keyDown = true;
            this.toggleSignal(e, true);
        }
    }

    onKeyUp(e) {
        this.keyDown = false;
        this.toggleSignal(e, true);
    }

    toggleSustainMode(e) {
        this.sustainModeActive = e.target.checked;
        this.synth.envelope.sustain = this.sustainModeActive ? 1 : 0;
    }
}

new DubSiren();
