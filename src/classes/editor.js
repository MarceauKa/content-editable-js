import { Editable } from "./editable";

export default class Editor {
    constructor(app) {
        this.app = app;
        this.editing = false;
    }

    edit() {
        this.app.debug('Enter editing mode');
        this.editing = true;
        this.toggleEditables();
    }

    cancel() {
        this.app.debug('Canceling changes');
        this.editing = false;

        if (this.getDirtyItems().length > 0) {
            this.getDirtyItems().forEach((editable) => {
                editable.restoreOriginalValue();
            });
        }

        this.toggleEditables();
    }

    save() {
        this.app.debug('Saving changes');
        this.editing = false;
        let modified = this.getDirtyItems();

        if (modified.length > 0) {
            this.groups.forEach((group) => {
                let groupChanges = modified.filter(editable => editable.group === group.name);

                if (groupChanges.length > 0) {
                    let changes = groupChanges.map((editable) => {
                        return {
                            name: editable.name,
                            value: editable.value
                        }
                    });

                    this.app.debug(`Sending group changes`, group.name, changes);
                    this.app.recorder.save(changes, group.endpoint);
                }
            });

            modified.forEach((editable) => {
                editable.newOriginalValue();
            });
        } else {
            this.app.debug('Nothing to save');
        }

        this.toggleEditables();
    }

    initGroups() {
        this.groups = [];
        let groups = document.querySelectorAll('[data-group]');

        this.groups.push({
            $el: null,
            name: 'default',
            endpoint: null,
        });

        groups.forEach((group) => {
            this.groups.push({
                $el: group,
                name: group.dataset.group,
                endpoint: group.dataset.groupEndpoint || null,
            });
        });
    }

    initEditables() {
        this.app.debug('Editables initialized');
        this.editables = [];
        let nodes = document.querySelectorAll('[data-editable]');

        nodes.forEach((node) => {
            this.initEditable(node);
        });
    }

    initEditable($node) {
        let editable = Editable.init($node);
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
