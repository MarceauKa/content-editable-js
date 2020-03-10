import { HtmlEditable, ImageEditable, TextEditable } from './editables'

export class EditableFactory {
  static editables = {
    default: TextEditable,
    html: HtmlEditable,
    image: ImageEditable,
  }

  static make ($node) {
    let type = $node.dataset.editableType
    let handler = this.create(type)

    return new handler($node)
  }

  static add (name, handler) {
    this.editables[name] = handler
  }

  static create (name) {
    for (let type in this.editables) {
      if (type === name) {
        return this.editables[type]
      }
    }

    return this.editables['default']
  }
}
