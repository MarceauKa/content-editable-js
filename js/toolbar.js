class Toolbar {
    i18n = {
        fr: {
            edit: 'Modifier',
            save: 'Enregistrer',
            cancel: 'Annuler',
        },
        en: {
            edit: 'Edit',
            save: 'Save',
            cancel: 'Cancel',
        },
    };

    init(editor) {
        this.editor = editor;

        this.insert();
        this.bindToolbarEvents();
    }

    insert() {
        document.body.insertAdjacentHTML('beforeend', this.getTemplate());

        this.$toolbar = document.querySelector('div[data-toolbar=""]');
        this.$opened = this.$toolbar.querySelector('[data-toolbar="opened"]');
        this.$closed = this.$toolbar.querySelector('[data-toolbar="closed"]');
    }

    toggleToolbar(state = true) {
        this.$opened.style.display = state ? 'block' : 'none';
        this.$closed.style.display = state ? 'none' : 'block';
    }

    bindToolbarEvents() {
        this.$closed
            .querySelector('button[data-toolbar="edit"]')
            .addEventListener('click', (event) => {
                event.preventDefault();
                this.toggleToolbar(true);
                this.editor.edit();
            });

        this.$opened
            .querySelector('button[data-toolbar="cancel"]')
            .addEventListener('click', (event) => {
                event.preventDefault();
                this.toggleToolbar(false);
                this.editor.cancel();
            });

        this.$opened
            .querySelector('button[data-toolbar="save"]')
            .addEventListener('click', (event) => {
                event.preventDefault();
                this.toggleToolbar(false);
                this.editor.save();
            });
    }

    getTemplate() {
        let lang = this.getI18N();

        return `
        <div style="position: absolute; top: 10px; right: 10px;" data-toolbar>
            <div data-toolbar="closed" style="display: block;">
                <button class="btn btn-primary shadow-sm" data-toolbar="edit">${lang.edit}</button>
            </div>
            <div data-toolbar="opened" style="display: none;">
                <button class="btn btn-warning shadow-sm mr-1" data-toolbar="cancel">${lang.cancel}</button>
                <button class="btn btn-success shadow-sm" data-toolbar="save">${lang.save}</button>
            </div>
        </div>
        `;
    }

    getI18N(lang = null) {
        lang = lang === null ? document.querySelector('[lang]').getAttribute('lang') : lang;

        if (this.i18n.hasOwnProperty(lang)) {
            return this.i18n[lang];
        }

        return this.i18n.en;
    }
}
