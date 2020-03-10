import { EditableFactory } from './editable'
import Group from './group'

export default class Editor {
  constructor (app) {
    this.app = app
    this.editing = false
  }

  edit () {
    this.app.debug('Enter editing mode')
    this.editing = true
    this.toggleEditables()
  }

  cancel () {
    this.app.debug('Canceling changes')
    this.editing = false

    if (this.getDirtyItems().length > 0) {
      this.getDirtyItems().forEach((editable) => {
        editable.restoreOriginalValue()
      })
    }

    this.toggleEditables()
  }

  save () {
    this.editing = false
    const modified = this.getDirtyItems()

    if (modified.length > 0) {
      this.groups.forEach((group) => {
        const groupChanges = modified.filter(
          (editable) => editable.group === group.name,
        )

        if (groupChanges.length > 0) {
          const changes = groupChanges.map((editable) => ({
            name: editable.name,
            value: editable.value,
          }))

          this.app.debug('Sending group changes', group.name, changes)
          this.app.recorder.save(changes, group.endpoint)
        }
      })

      modified.forEach((editable) => {
        editable.newOriginalValue()
      })
    } else {
      this.app.debug('Nothing to save')
    }

    this.toggleEditables()
  }

  initGroups () {
    this.groups = []
    const groups = document.querySelectorAll('[data-group]')

    this.groups.push(new Group());

    groups.forEach((group) => {
      this.groups.push(new Group(group));
    })

    this.app.debug('Groups initialized', this.groups)
  }

  initEditables () {
    this.editables = []
    const editables = document.querySelectorAll('[data-editable]')

    editables.forEach((editable) => {
      this.initEditable(editable)
    })

    this.app.debug('Editables initialized', this.editables)
  }

  initEditable ($node) {
    const editable = EditableFactory.make($node)
    this.editables.push(editable)
  }

  toggleEditables () {
    this.editables.forEach((editable) => {
      editable.toggle()
    })
  }

  getDirtyItems () {
    return this.editables.filter((editable) => editable.dirty === true)
  }
}
