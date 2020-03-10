import Recorder from './recorder'
import Editor from './editor'
import Toolbar from './toolbar'
import { i18n } from './i18n'
import { EditableFactory } from './editable'

export default class App {
  constructor (config = {}) {
    this.config = {
      debug: false,
      defaultEndpoint: null,
      headers: {},
      showOnInit: true,
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
    this.editor.toggleEditables();
    this.toolbar.hide()
  }

  setRecorder (recorder) {
    this.debug('Recorder updated')
    this.recorder = recorder

    return this;
  }

  setToolbar (toolbar) {
    this.debug('Toolbar updated')
    this.toolbar.hide()
    this.toolbar = toolbar

    if (this.config.showOnInit) {
      this.toolbar.show()
    }

    return this;
  }

  debug (...args) {
    if (this.config.debug) {
      console.log('[ContentEditable]', ...args)
    }
  }
}
