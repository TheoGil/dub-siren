!function(e){function t(t){for(var i,l,s=t[0],r=t[1],u=t[2],c=0,g=[];c<s.length;c++)l=s[c],a[l]&&g.push(a[l][0]),a[l]=0;for(i in r)Object.prototype.hasOwnProperty.call(r,i)&&(e[i]=r[i]);for(h&&h(t);g.length;)g.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],i=!0,s=1;s<n.length;s++){var r=n[s];0!==a[r]&&(i=!1)}i&&(o.splice(t--,1),e=l(l.s=n[0]))}return e}var i={},a={0:0},o=[];function l(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,l),n.l=!0,n.exports}l.m=e,l.c=i,l.d=function(e,t,n){l.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,t){if(1&t&&(e=l(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(l.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)l.d(n,i,function(t){return e[t]}.bind(null,i));return n},l.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(t,"a",t),t},l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},l.p="";var s=window.webpackJsonp=window.webpackJsonp||[],r=s.push.bind(s);s.push=t,s=s.slice();for(var u=0;u<s.length;u++)t(s[u]);var h=r;o.push([199,1]),n()}({198:function(e,t,n){},199:function(e,t,n){"use strict";n.r(t);n(75),n(128),n(83);var i=n(22),a=n(117),o=n.n(a),l=n(118);n(1);var s=function(e,t,n){return Math.max(t,Math.min(e,n))};var r=function(e,t,n,i,a){return i+(e=(e-t)/(n-t))*(a-i)};function u(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var h=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.containerEl=document.querySelector(t.el),this.rotaryKnobEl=this.containerEl.querySelector(".js-rotary-knob"),this.ghostDraggableEl=this.containerEl.querySelector(".js-ghost-draggable"),this.triggerEl=this.containerEl.querySelector(".js-knob-trigger"),this.draggable=l.a.create(this.ghostDraggableEl,{type:"y",trigger:this.triggerEl,onDrag:this.onDrag.bind(this),liveSnap:t.snap||!1,allowNativeTouchScrolling:!1}),this.minAngle=t.minAngle||0,this.maxAngle=t.maxAngle||360,this.value=t.value||0,this.minValue=t.minValue||0,this.maxValue=t.maxValue||1,this.onDragCallback=t.onDrag||null,this.setValue(this.value)}var t,n,i;return t=e,(n=[{key:"onDrag",value:function(e){e.preventDefault();var t=-this.draggable[0].deltaY,n=this.getKnobRotation()+t;this.setKnobRotation(n);var i=100*(this.getKnobRotation()-this.minAngle)/(this.maxAngle-this.minAngle);this.value=r(i,0,100,this.minValue,this.maxValue),this.onDragCallback&&this.onDragCallback(this.value)}},{key:"setKnobRotation",value:function(e){TweenLite.set(this.rotaryKnobEl,{rotation:s(e,this.minAngle,this.maxAngle)})}},{key:"getKnobRotation",value:function(){return this.rotaryKnobEl._gsTransform?this.rotaryKnobEl._gsTransform.rotation:this.value}},{key:"setValue",value:function(e){e=s(e,this.minValue,this.maxValue),this.value=e;var t=this.getAngleFromValue(this.value);this.setKnobRotation(t)}},{key:"getAngleFromValue",value:function(e){var t=100*(e-this.minValue)/(this.maxValue-this.minValue);return r(t,0,100,this.minAngle,this.maxAngle)}}])&&u(t.prototype,n),i&&u(t,i),e}();n(198);function c(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}var g=32.7,y=130.81,f=2093,v=document.querySelector(".js-trigger-signal");o()(i.context,".js-trigger-signal",function(){new d,alert("Audio CTX ready!")});var d=function(){function e(){var t=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.volume=-10,this.note=y,this.delayFilerFreq=4e3,this.lfoFreq=6,this.lfoAmount=.5,this.keyDown=!1,this.isPlaying=!1,this.lockSignal=!1,this.reserveLFOwaveform=!1,this.delay=new i.PingPongDelay(.5,.6),this.delay.wet.value=1,this.delayFilter=new i.Filter(this.delayFilerFreq,"lowpass"),this.delayFilter.Q.value=7.5,this.delayVolume=new i.Volume(-6),this.delay.connect(this.delayFilter),this.delayFilter.connect(this.delayVolume),this.delayVolume.toMaster(),this.synth=new i.Synth({oscillator:{type:"square"},envelope:{attack:.005,decay:.6,sustain:0,release:.5}}),this.synth.volume.value=this.volume,this.synth.fan(this.delay,i.Master),this.triggerSignalBtn=v,this.lfo=new i.LFO(this.lfoFreq,g,f),this.lfo.connect(this.synth.oscillator.frequency),this.lfo.amplitude.value=this.lfoAmount,this.lfo.start(),new h({el:".js-osc-freq-knob",value:this.note,minValue:g,maxValue:f,onDrag:function(e){t.synth.frequency.value=e,t.note=e}}),new h({el:".js-osc-volume-knob",value:this.volume,minValue:-70,maxValue:0,onDrag:function(e){t.synth.volume.value=e}}),this.onMouseUpCallBack=this.onMouseUp.bind(this),this.triggerSignalBtn.addEventListener("mousedown",this.onMouseDown.bind(this)),this.triggerSignalBtn.addEventListener("touchstart",this.onMouseDown.bind(this)),document.querySelector(".js-signal-lock").addEventListener("change",function(e){t.lockSignal=e.target.checked,t.synth.envelope.sustain=t.lockSignal?1:0,document.querySelector(".js-signal-lock-button").classList.toggle("locked")}),document.addEventListener("keydown",this.onKeyDown.bind(this)),document.addEventListener("keyup",this.onKeyUp.bind(this)),new h({el:".js-lfo-freq-knob",value:this.lfoFreq,minValue:0,maxValue:15,onDrag:function(e){t.lfo.frequency.value=t.reserveLFOwaveform?-e:e}}),new h({el:".js-lfo-amp-knob",value:this.lfoAmount,minValue:0,maxValue:1,onDrag:function(e){t.lfo.amplitude.value=e}}),document.querySelectorAll(".js-lfo-waveform").forEach(function(e){e.addEventListener("change",function(e){"true"===e.target.getAttribute("data-reverse")?(t.reserveLFOwaveform=!0,t.lfo.frequency.value=-t.lfo.frequency.value):(t.reserveLFOwaveform=!1,t.lfo.frequency.value=Math.abs(t.lfo.frequency.value)),t.lfo.type=e.target.value})}),new h({el:".js-delay-time-knob",value:.5,minValue:.01,maxValue:1,onDrag:function(e){t.delay.delayTime.rampTo(e,.5)}}),new h({el:".js-delay-feedback-knob",value:.5,minValue:.01,maxValue:.95,onDrag:function(e){t.delay.feedback.setValueAtTime(e,.1)}}),new h({el:".js-delay-filter-freq-knob",value:this.delayFilerFreq,minValue:26,maxValue:5e3,onDrag:function(e){t.delayFilerFreq=e,t.delayFilter.frequency.value=e}}),document.querySelector(".js-delay-on-off").addEventListener("change",this.toggleDelay.bind(this))}var t,n,a;return t=e,(n=[{key:"toggleSignal",value:function(){this.isPlaying?(this.synth.envelope.sustain=0,this.synth.triggerRelease(),this.triggerSignalBtn.classList.remove("active")):(this.synth.envelope.sustain=1,this.synth.triggerAttack(this.note),this.triggerSignalBtn.classList.add("active")),this.isPlaying=!this.isPlaying}},{key:"toggleDelay",value:function(e){e.target.checked?this.synth.connect(this.delay):this.synth.disconnect(this.delay)}},{key:"startSignal",value:function(){this.isPlaying=!0,this.synth.envelope.sustain=1,this.synth.triggerAttack(this.note),this.triggerSignalBtn.classList.add("active")}},{key:"onMouseDown",value:function(){this.lockSignal?this.isPlaying?this.onMouseUp():(console.log("start!"),this.startSignal()):(console.log("stop"),this.startSignal(),document.addEventListener("mouseup",this.onMouseUpCallBack),document.addEventListener("touchend",this.onMouseUpCallBack))}},{key:"onMouseUp",value:function(){this.isPlaying=!1,this.synth.envelope.sustain=0,this.synth.triggerRelease(),this.triggerSignalBtn.classList.remove("active"),document.removeEventListener("mouseup",this.onMouseUpCallBack),document.removeEventListener("touchend",this.onMouseUpCallBack)}},{key:"onKeyDown",value:function(e){this.keyDown||32!==e.keyCode||(e.preventDefault(),this.keyDown=!0,this.toggleSignal(e,!0))}},{key:"onKeyUp",value:function(e){this.keyDown&&32===e.keyCode&&(this.keyDown=!1,this.toggleSignal(e,!0))}}])&&c(t.prototype,n),a&&c(t,a),e}()}});
//# sourceMappingURL=app.ac2d51aa.js.map