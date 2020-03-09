import { Editable } from './editable'

export class HtmlEditable extends Editable {
  getNodeValue () {
    return this.$el.innerHTML.replace(/\n|\t|\s{2,}/g, '').trim()
  }

  setNodeValue (value) {
    this.$el.innerHTML = value.replace(/\n|\t|\s{2,}/g, '')
  }
}
