class Editor {
    constructor(toolbar, recorder) {
        this.toolbar = toolbar;
        this.recorder = recorder;
        this.editing = false;

        this.toolbar.init(this);

        this.initGroups();
        this.initEditables();
    }

    edit() {
        this.editing = true;
        this.toggleEditables();
    }

    cancel() {
        this.editing = false;

        if (this.getDirtyItems().length > 0) {
            this.getDirtyItems.forEach((editable) => {
                editable.reset();
                editable.setNodeValue(editable.original);
            });
        }

        this.editables.forEach((editable) => {
            editable.reset();
        });

        this.toggleEditables();
    }

    save() {
        this.editing = false;

        let modified = this.getDirtyItems();
        let changed = this.getDirtyItems().map((item) => {
            return {
                name: item.name,
                value: item.value
            }
        });

        if (changed.length > 0) {
            let group = this.groups.filter((group) => {
                return group.$el.contains(modified[0].$el);
            })[0];

            this.recorder.save(changed, group.endpoint || null);
        }

        this.toggleEditables();
    }

    initGroups() {
        this.groups = [];
        let groups = document.querySelectorAll('[data-group]');

        groups.forEach((group) => {
            this.groups.push({
                $el: group,
                name: group.dataset.group,
                endpoint: group.dataset.groupEndpoint || null,
            });
        });
    }

    initEditables() {
        this.editables = [];
        let items = document.querySelectorAll('[data-editable]');

        items.forEach((item) => {
            this.initEditable(item);
        });
    }

    initEditable($editable) {
        let editable = Editable.init($editable);
        this.editables.push(editable);
    }

    toggleEditables() {
        this.editables.forEach((editable) => {
            editable.toggle();
        })
    }

    getDirtyItems() {
        return this.editables.filter((editable) => {
            return editable.dirty === true;
        });
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
