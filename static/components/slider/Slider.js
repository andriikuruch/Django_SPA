import AbstractComponent from "/static/components/AbstractComponent.js";

export default class extends AbstractComponent{
    constructor() {
        super('slider/slider.html');
    }

    async setup() {
        const next = this.template.querySelector(".slider__arrow.right");
        const prev = this.template.querySelector(".slider__arrow");
        const images = Array.from(this.template.querySelectorAll(".slider__img"));
        const sliderLine = this.template.querySelector('.slider__line');
        let count = 1;

        // sliderLine.appendChild(images[0].cloneNode(true));
        // sliderLine.insertBefore(images[images.length - 1].cloneNode(true), images[0]);

        // next.addEventListener('click', e => {
        //     count++;
        //     this.rollSlider(sliderLine, count);
        //     let image = images.shift();
        //     images.push(image);
        //     sliderLine.removeChild(image);
        //     sliderLine.appendChild(image.cloneNode(true));
        // });

        // prev.addEventListener('click', e => {
        //     count--;
        //     this.rollSlider(sliderLine, count);
        //     let image = images.pop();
        //     images.unshift(image);
        //     sliderLine.removeChild(image);
        //     sliderLine.appendChild(image.cloneNode(true));
        // });
    }

    // rollSlider(sliderLine, count) {
    //     sliderLine.style.transform = 'translate(-' + count * 198 + 'px)';
    // }
}