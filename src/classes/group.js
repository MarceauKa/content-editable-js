export default class Group {
  constructor ($node = null) {
    this.$el = $node
    this.init()
  }

  init () {
    if (this.$el === null) {
      this.defaultGroup()
      return
    }

    this.name = this.$el.dataset.group
    this.endpoint = this.$el.dataset.groupEndpoint || null
  }

  defaultGroup () {
    this.name = 'default'
    this.endpoint = null
  }
}
