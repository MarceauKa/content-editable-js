import { i18n } from './i18n';

export class Editable {
    constructor($node) {
        this.$el = $node;
        this.name = $node.dataset.editable;
        this.original = this.getNodeValue();
        this.value = null;
        this.dirty = false;
        this.group = 'default';

        this.bindEvent();
        this.detectGroup();
    }

    static init($node) {
        if ($node.dataset.editableIsHtml !== undefined) {
            return new HtmlEditable($node);
        }

        if ($node.dataset.editableIsImage !== undefined) {
            return new ImageEditable($node);
        }

        return new TextEditable($node);
    }

    toggle() {
        if (this.$el.hasAttribute('contenteditable')) {
            this.$el.removeAttribute('contenteditable');
        } else {
            this.$el.setAttribute('contenteditable', true);
        }
    }

    reset() {
        this.dirty = false;
        this.value = null;
    }

    restoreOriginalValue() {
        this.reset();
        this.setNodeValue(this.original);
    }

    newOriginalValue() {
        this.reset();
        this.original = this.getNodeValue();
    }

    bindEvent() {
        this.$el.addEventListener('blur', (event) => {
            event.preventDefault();
            this.changed();
        });
    }

    changed() {
        let value = this.getNodeValue();

        if (this.original !== value) {
            this.value = value;
            this.dirty = true;
        }
    }

    detectGroup() {
        let $group = this.$el.closest('[data-group]');

        if ($group) {
            this.group = $group.dataset.group || 'default';
        }
    }

    getNodeValue() {
        throw new Error("Editable getNotValue can't be accessed directly");
    }

    setNodeValue(value) {
        throw new Error("Editable setNotValue can't be accessed directly");
    }
}

export class TextEditable extends Editable {
    getNodeValue() {
        return this.$el.textContent.trim();
    }

    setNodeValue(value) {
        this.$el.textContent = value;
    }
}

export class HtmlEditable extends Editable {
    getNodeValue() {
        return this.$el.innerHTML.replace(/\n|\t|\s{2,}/g, '').trim();
    }

    setNodeValue(value) {
        this.$el.innerHTML = value.replace(/\n|\t|\s{2,}/g, '');
    }
}

export class ImageEditable extends Editable {
    bindEvent() {
        super.bindEvent();

        this.$el.addEventListener('click', (event) => {
            event.preventDefault();
            this.askValue();
        })
    }

    askValue() {
        let value = prompt(i18n._.prompt_image, this.getNodeValue());

        if (value !== null && value !== this.getNodeValue()) {
            this.setNodeValue(value);
        }
    }

    getNodeValue() {
        return this.$el.src;
    }

    setNodeValue(value) {
        this.$el.src = value;
    }
}
