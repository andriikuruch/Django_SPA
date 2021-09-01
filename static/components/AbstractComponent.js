export default class {
    constructor(url) {
        this.url = 'static/components/' + url;
    }

    async setup() {}

    async getTemplate() {
        return await fetch(this.url)
            .then(response => response.text())
            .then(async template => {
                const el = document.createElement('div');
                el.innerHTML = template;
                const t = el.firstChild;
                this.template = document.importNode(t.content, true);
                await this.setup();
                return this.template;
            });
    }
}