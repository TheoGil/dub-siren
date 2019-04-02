import { Draggable } from 'gsap/Draggable';
import { Tweenlite } from 'gsap/TweenLite';
import clamp from './clamp';
import map_range from './map_range';

class Knob {
    constructor(options) {
        this.containerEl = document.querySelector(options.el);
        this.rotaryKnobEl = this.containerEl.querySelector('.js-rotary-knob');
        this.ghostDraggableEl = this.containerEl.querySelector('.js-ghost-draggable');
        this.triggerEl = this.containerEl.querySelector('.js-knob-trigger');
        this.draggable = Draggable.create(this.ghostDraggableEl, {
            type: 'y',
            trigger: this.triggerEl,
            onDrag: this.onDrag.bind(this),
            onPress: (e) => {e.stopPropagation();},
            liveSnap: options.snap || false,
            allowNativeTouchScrolling: false,
        });
        this.minAngle = options.minAngle || 0;
        this.maxAngle = options.maxAngle || 360;
        this.value = options.value || 0;
        this.minValue = options.minValue || 0;
        this.maxValue = options.maxValue || 1;
        this.onDragCallback = options.onDrag || null;

        this.setValue(this.value);
    }

    onDrag(e) {
        e.preventDefault();

        // Update UI (knob's rotation)
        const deltaY = -this.draggable[0].deltaY;
        const newRotationValue = this.getKnobRotation() + deltaY;
        this.setKnobRotation(newRotationValue);

        // Update actual based on the knob's rotation
        const percentage = 100 * (this.getKnobRotation() - this.minAngle) / (this.maxAngle - this.minAngle);
        this.value = map_range(percentage, 0, 100, this.minValue, this.maxValue);

        if (this.onDragCallback) {
            this.onDragCallback(this.value);
        }
    }

    setKnobRotation(angle) {
        TweenLite.set(this.rotaryKnobEl, {
            rotation: clamp(angle, this.minAngle, this.maxAngle),
        });
    }

    getKnobRotation() {
        if (!this.rotaryKnobEl._gsTransform) {
            return this.value;
        } else {
            return this.rotaryKnobEl._gsTransform.rotation;
        }
    }

    setValue(value) {
        value = clamp(value, this.minValue, this.maxValue);
        this.value = value;
        const angle = this.getAngleFromValue(this.value);
        this.setKnobRotation(angle);
    }

    getAngleFromValue(value) {
        const percentage = 100 * (value - this.minValue) / (this.maxValue - this.minValue);
        return map_range(percentage, 0, 100, this.minAngle, this.maxAngle);
    }
}

export default Knob;