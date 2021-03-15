const { v4: uudiv4 } = require('uuid')

class Task {
  #id
  #desc
  #checkedOn
  #updatedAt

  constructor(desc) {
    this.#id = uudiv4()
    this.#desc = desc
    this.#checkedOn = null
    this.#updatedAt = new Date().toISOString()
  }

  toString() {
    return {
      id: this.#id,
      description: this.#desc,
      checkOn: this.#checkedOn,
      updatedAt: this.#updatedAt
    }
  }

  get id() {
    return this.#id
  } 
}

module.exports = Task