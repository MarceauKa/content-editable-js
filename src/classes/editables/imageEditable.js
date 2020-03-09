import { i18n } from '../i18n'
import { Editable } from './editable'

export class ImageEditable extends Editable {
  bindEvents () {
    super.bindEvents()

    this.$el.addEventListener('click', (event) => {
      if (this.editing) {
        event.preventDefault()
        this.askValue()
      }
    })
  }

  askValue () {
    const value = prompt(i18n._.prompt_image, this.getNodeValue())

    if (value !== null && value !== this.getNodeValue()) {
      this.setNodeValue(value)
    }
  }

  getNodeValue () {
    return this.$el.src
  }

  setNodeValue (value) {
    this.$el.src = value
  }
}
