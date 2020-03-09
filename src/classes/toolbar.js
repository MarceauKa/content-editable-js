import { i18n } from './i18n'

export default class Toolbar {
  constructor (app) {
    this.app = app
  }

  show () {
    this.insert()
    this.bindToolbarEvents()
  }

  hide () {
    this.$toolbar.remove()
    this.$opened = null
    this.$closed = null
  }

  insert () {
    document.body.insertAdjacentHTML('beforeend', this.getTemplate())

    this.$toolbar = document.querySelector('div[data-toolbar=""]')
    this.$opened = this.$toolbar.querySelector('[data-toolbar="opened"]')
    this.$closed = this.$toolbar.querySelector('[data-toolbar="closed"]')
  }

  toggleToolbar (state = true) {
    this.$opened.style.display = state ? 'block' : 'none'
    this.$closed.style.display = state ? 'none' : 'block'
  }

  bindToolbarEvents () {
    this.$closed.querySelector('button[data-toolbar="edit"]').
      addEventListener('click', (event) => {
        event.preventDefault()
        this.toggleToolbar(true)
        this.app.editor.edit()
      })

    this.$opened.querySelector('button[data-toolbar="cancel"]').
      addEventListener('click', (event) => {
        event.preventDefault()
        this.toggleToolbar(false)
        this.app.editor.cancel()
      })

    this.$opened.querySelector('button[data-toolbar="save"]').
      addEventListener('click', (event) => {
        event.preventDefault()
        this.toggleToolbar(false)
        this.app.editor.save()
      })
  }

  getTemplate () {
    return `
        <div style="position: fixed; top: 10px; right: 10px;" data-toolbar>
            <div data-toolbar="closed" style="display: block;">
                <button class="btn btn-primary shadow-sm" data-toolbar="edit">${i18n._.edit}</button>
            </div>
            <div data-toolbar="opened" style="display: none;">
                <button class="btn btn-warning shadow-sm mr-1" data-toolbar="cancel">${i18n._.cancel}</button>
                <button class="btn btn-success shadow-sm" data-toolbar="save">${i18n._.save}</button>
            </div>
        </div>
        `
  }
}
