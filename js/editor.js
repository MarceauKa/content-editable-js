class Editor {
    constructor(toolbar, recorder) {
        this.toolbar = toolbar;
        this.recorder = recorder;
        this.editing = false;

        this.toolbar.init(this);
        this.initEditables();
    }

    edit() {
        this.editing = true;
        this.toggleEditables();
    }

    cancel() {
        let modified = this.getDirtyItems();

        this.editing = false;

        if (modified.length > 0) {
            modified.forEach((item) => {
                item.$el.textContent = item.original;
            });
        }

        this.editables.map((item) => {
            item.dirty = false;
            item.value = null;
        });
    }

    save() {
        this.editing = false;

        let modified = this.getDirtyItems();
        let changed = modified.map((item) => {
            return {
                name: item.name,
                value: item.value
            }
        });

        if (changed.length > 0) {
            this.recorder.save(changed);
        }
    }

    initEditables() {
        this.editables = [];
        let items = document.querySelectorAll('[data-editable]');

        items.forEach((item) => {
            this.initEditable(item);
        });
    }

    initEditable($editable) {
        this.editables.push({
            $el: $editable,
            name: $editable.dataset.editable,
            original: $editable.textContent,
            value: null,
            dirty: false,
        });

        $editable.addEventListener('blur', (item) => {
            let element = this.editables.filter((item) => {
                return item.$el === event.target;
            })[0];

            if (element) {
                this.editableChanged(element);
            }
        });
    }

    toggleEditables() {
        this.editables.forEach((item) => {
            if (this.editing) {
                item.$el.setAttribute('contenteditable', true);
            } else {
                item.$el.removeAttribute('contenteditable');
            }
        })
    }

    getDirtyItems() {
        return this.editables.filter((item) => {
            return item.dirty === true;
        });
    }

    editableChanged(item) {
        let oldValue = item.original;
        let newValue = item.$el.textContent;

        if (oldValue !== newValue) {
            item.value = newValue.trim();
            item.dirty = true;
        }

        let index = this.editables.indexOf(item);
        this.editables[index] = item;
    }

    setContent(content = {}) {
        this.editables.forEach((editable) => {
            if (content.hasOwnProperty(editable.name)) {
                editable.$el.textContent = content[editable.name];
                editable.original = content[editable.name];
                editable.value = null;
                editable.dirty = false;
            }
        })
    }
}
