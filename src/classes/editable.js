import { HtmlEditable, ImageEditable, TextEditable } from './editables'

export class EditableFactory {
  static make ($node) {
    if ($node.dataset.editableIsHtml !== undefined) {
      return new HtmlEditable($node)
    }

    if ($node.dataset.editableIsImage !== undefined) {
      return new ImageEditable($node)
    }

    return new TextEditable($node)
  }
}
