import Recorder from './recorder'
import Editor from './editor'
import Toolbar from './toolbar'
import { i18n } from './i18n'

export default class App {
  constructor (config) {
    this.config = {
      ...{
        debug: false,
        defaultEndpoint: null,
        headers: {},
        showOnInit: true,
      },
      ...config,
    }

    this.toolbar = new Toolbar(this)
    this.recorder = new Recorder(this)
    this.editor = new Editor(this)

    if (this.config.showOnInit === true) {
      this.show()
    }

    this.debug('Locale detected', i18n.locale.toUpperCase())
  }

  show () {
    this.debug('Show')
    this.toolbar.show()
    this.editor.initGroups()
    this.editor.initEditables()
  }

  hide () {
    this.debug('Hide')
    this.toolbar.hide()
  }

  debug (...args) {
    if (this.config.debug) {
      console.log('[ContentEditable]', ...args)
    }
  }
}
