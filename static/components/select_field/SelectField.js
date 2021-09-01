import AbstractComponent from "/static/components/AbstractComponent.js";

export default class extends AbstractComponent {

    constructor({selectTitle, options}) {
        super('select_field/select_field.html');
        this.options = options;
        this.selectTitle = selectTitle;
    }

    async setup() {
        // this.elSelectNative = this.template.querySelector(".js_select_native");
        // const elSelectNativeBox = this.elSelectNative.firstElementChild;
        //
        // elSelectNativeBox.innerHTML = this.selectTitle;
        //
        // this.options.forEach(option => {
        //     const element = document.createElement("option");
        //     element.setAttribute("value", option.value);
        //     element.innerHTML = option.text;
        //     this.elSelectNative.appendChild(element);
        // });

        this.elSelectCustom = this.template.querySelector(".js_select_custom");
        this.elSelectCustomBox = this.elSelectCustom.children[0];
        this.elSelectCustomOpts = this.elSelectCustom.children[1];

        this.elSelectCustomBox.innerHTML = this.selectTitle;

        this.options.forEach(option => {
            const element = document.createElement("div");
            element.classList.add("select_custom__option");
            element.setAttribute("data-value", option.value);
            element.innerHTML = option.text;
            this.elSelectCustomOpts.appendChild(element);
        });

        this.customOptsList = Array.from(this.elSelectCustomOpts.children);
        this.optionsCount =  this.customOptsList.length;

        this.optionChecked = "";
        this.optionHoveredIndex = -1;

        this.elSelectCustomBox.addEventListener("click", (e) => {
            const isClosed = !this.elSelectCustom.classList.contains("isActive");

            if (isClosed) {
                this.openSelectCustom();
            } else {
                this.closeSelectCustom();
            }
        });

        // //Update selectCustom value when selectNative is changed.
        // this.elSelectNative.addEventListener("change", (e) => {
        //   const value = e.target.value;
        //   const elRespectiveCustomOption = this.elSelectCustomOpts.querySelectorAll(
        //     `[data-value="${value}"]`
        //   )[0];
        //
        //   this.updateCustomSelectChecked(value, elRespectiveCustomOption.textContent);
        // });

        // Update selectCustom value when an option is clicked or hovered
        this.customOptsList.forEach((elOption, index) => {
          elOption.addEventListener("click", (e) => {
            const value = e.target.getAttribute("data-value");

            // Sync native select to have the same value
            // this.elSelectNative.value = value;
            this.updateCustomSelectChecked(value, e.target.textContent);
            this.closeSelectCustom();
          });

          elOption.addEventListener("mouseenter", (e) => {
            this.updateCustomSelectHovered(index);
          });

          // TODO: Toggle these event listeners based on selectCustom visibility
        });
    }


    openSelectCustom() {
        this.elSelectCustom.classList.add("isActive");
        this.elSelectCustom.firstElementChild
            .style.setProperty(
                "--background",
            'url("../../icons/arrow_dropdown_rev.svg")'
        );

        // Remove aria-hidden in case this was opened by a user
        // who uses AT (e.g. Screen Reader) and a mouse at the same time.
        this.elSelectCustom.setAttribute("aria-hidden", false);

        if (this.optionChecked) {
            const optionCheckedIndex = this.customOptsList.findIndex(
            (el) => el.getAttribute("data-value") === this.optionChecked
            );
            this.updateCustomSelectHovered(optionCheckedIndex);
        }

        // Add related event listeners
        document.addEventListener("click", this.watchClickOutside.bind(this));
        document.addEventListener("keydown", this.supportKeyboardNavigation.bind(this));
    }

    closeSelectCustom() {
        this.elSelectCustom.classList.remove("isActive");

        this.elSelectCustom.firstElementChild
            .style.setProperty(
                "--background",
            'url("../../icons/arrow_dropdown.svg")'
        );

        this.elSelectCustom.setAttribute("aria-hidden", true);

        this.updateCustomSelectHovered(-1);

        // Remove related event listeners
        document.removeEventListener("click", this.watchClickOutside.bind(this));
        document.removeEventListener("keydown", this.supportKeyboardNavigation.bind(this));
    }

    updateCustomSelectHovered(newIndex) {
      const prevOption = this.elSelectCustomOpts.children[this.optionHoveredIndex];
      const option = this.elSelectCustomOpts.children[newIndex];

      if (prevOption) {
        prevOption.classList.remove("isHover");
      }
      if (option) {
        option.classList.add("isHover");
      }

      this.optionHoveredIndex = newIndex;
    }

    updateCustomSelectChecked(value, text) {
      const prevValue = this.optionChecked;

      const elPrevOption = this.elSelectCustomOpts.querySelector(
        `[data-value="${prevValue}"`
      );
      const elOption = this.elSelectCustomOpts.querySelector(`[data-value="${value}"`);

      if (elPrevOption) {
        elPrevOption.classList.remove("isActive");
      }

      if (elOption) {
        elOption.classList.add("isActive");
      }

      this.elSelectCustomBox.textContent = text;
      this.optionChecked = value;
    }

    watchClickOutside(e) {
        const didClickedOutside = !this.elSelectCustom.contains(e.target);
        if (didClickedOutside) {
            this.closeSelectCustom();
        }
    }

    supportKeyboardNavigation(e) {
      // press down -> go next
      if (e.keyCode === 40 && this.optionHoveredIndex < this.optionsCount - 1) {
        let index = this.optionHoveredIndex;
        e.preventDefault(); // prevent page scrolling
        this.updateCustomSelectHovered(this.optionHoveredIndex + 1);
      }

      // press up -> go previous
      if (e.keyCode === 38 && this.optionHoveredIndex > 0) {
        e.preventDefault(); // prevent page scrolling
        this.updateCustomSelectHovered(this.optionHoveredIndex - 1);
      }

      // press Enter or space -> select the option
      if (e.keyCode === 13 || e.keyCode === 32) {
        e.preventDefault();

        const option = this.elSelectCustomOpts.children[this.optionHoveredIndex];
        const value = option && option.getAttribute("data-value");

        if (value) {
          // this.elSelectNative.value = value;
          this.updateCustomSelectChecked(value, option.textContent);
        }
        this.closeSelectCustom();
      }

      // press ESC -> close selectCustom
      if (e.keyCode === 27) {
        this.closeSelectCustom();
      }
    }
}