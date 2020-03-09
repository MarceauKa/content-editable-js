export class Editable {
  constructor ($node) {
    this.$el = $node
    this.name = $node.dataset.editable
    this.original = this.getNodeValue()
    this.value = null
    this.dirty = false
    this.group = 'default'
    this.editing = false

    this.bindEvents()
    this.detectGroup()
  }

  static init ($node) {
    if ($node.dataset.editableIsHtml !== undefined) {
      return new HtmlEditable($node)
    }

    if ($node.dataset.editableIsImage !== undefined) {
      return new ImageEditable($node)
    }

    return new TextEditable($node)
  }

  toggle () {
    this.editing = !this.editing

    if (this.$el.hasAttribute('contenteditable')) {
      this.$el.removeAttribute('contenteditable')
    } else {
      this.$el.setAttribute('contenteditable', true)
    }
  }

  reset () {
    this.dirty = false
    this.value = null
  }

  restoreOriginalValue () {
    this.reset()
    this.setNodeValue(this.original)
  }

  newOriginalValue () {
    this.reset()
    this.original = this.getNodeValue()
  }

  bindEvents () {
    this.$el.addEventListener('blur', (event) => {
      if (this.editing) {
        event.preventDefault()
        this.changed()
      }
    })
  }

  changed () {
    const value = this.getNodeValue()

    if (this.original !== value) {
      this.value = value
      this.dirty = true
    }
  }

  detectGroup () {
    const $group = this.$el.closest('[data-group]')

    if ($group) {
      this.group = $group.dataset.group || 'default'
    }
  }

  getNodeValue () {
    throw new Error('Editable getNotValue can\'t be accessed directly')
  }

  setNodeValue (value) {
    throw new Error('Editable setNotValue can\'t be accessed directly')
  }
}
