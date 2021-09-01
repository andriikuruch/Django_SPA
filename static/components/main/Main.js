import AbstractComponent from "/static/components/AbstractComponent.js";
import Slider from "/static/components/slider/Slider.js";

export default class extends AbstractComponent{
    constructor() {
        super('main/main.html');
    }

    async setup() {
        const slider = new Slider();
        this.template.appendChild(await slider.getTemplate());
        this.template.querySelector('.offer__check-btn')
            .addEventListener('click', e => {
                console.log('i`am pressed');
            });
    }
}

