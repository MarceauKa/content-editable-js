import { Editable } from './editable'

export class TextEditable extends Editable {
  getNodeValue () {
    return this.$el.textContent.trim()
  }

  setNodeValue (value) {
    this.$el.textContent = value
  }
}
