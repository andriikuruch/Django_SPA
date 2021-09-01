import AbstractComponent from "/static/components/AbstractComponent.js";
import Slider from "/static/components/slider/Slider.js";
import SelectField from "/static/components/select_field/SelectField.js";

export default class extends AbstractComponent {

    constructor() {
        super('category/category.html');
    }

    async setup() {
        const slider = new Slider();
        const filters = this.template.querySelector(".filters");
        const priceFilter = new SelectField({
            selectTitle: 'Price',
            options:[
                {text: '&#8364;20-30',value: 1},
                {text: '&#8364;30-50',value: 2},
                {text: '&#8364;50-100',value: 3},
                {text: '&#8364;100 and more',value: 4}
            ]
        });

        const sizeFilter = new SelectField({
            selectTitle: 'Size',
            options:[
                {text: 'S',value: 'S'},
                {text: 'M',value: 'M'},
                {text: 'L',value: 'L'},
                {text: 'XL',value: 'XL'},
                {text: 'XXL',value: 'XXL'}
            ]
        });

        const colorFilter = new SelectField({
            selectTitle: 'Color',
            options:[
                {text: 'Blue',value: 'blue'},
                {text: 'Red',value: 'red'},
                {text: 'Yellow',value: 'yellow'},
                {text: 'Green',value: 'green'},
                {text: 'Black',value: 'black'},
                {text: 'White',value: 'white'},
                {text: 'Orange',value: 'orange'},
                {text: 'Cyan',value: 'cyan'},
            ]
        });

        const sizeFilterTmp = await sizeFilter.getTemplate();
        sizeFilterTmp.querySelector(".select_wrapper").style.margin = "0 22px";

        filters.appendChild(await priceFilter.getTemplate());
        filters.appendChild(sizeFilterTmp);
        filters.appendChild(await colorFilter.getTemplate());

        this.template.appendChild(await slider.getTemplate());
    }
}