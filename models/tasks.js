const Task = require("./task")

class Tasks {
  #list
  constructor() {
    this.#list = {}
  }

  loadDataFromArray(data = []) {
    data.map((task) => {
      this.#list[task.id] = task
    })
  } 

  addTask(desc = '') {
    const task = new Task(desc)
    this.#list[task.id] = task.toString()
  }

  get listObject() {
    return this.#list
  }

  get listArray() {
    const list = []
    Object.keys(this.#list).forEach(key => {
      list.push(this.#list[key])
    })
    return list
  }

  get list() {
    this.listArray.forEach((task, i) => {
      const idx = `${i + 1}`.green
      const { description, checkOn, updatedAt = 'none' } = task
      const state = (checkOn) ? 'Completado'.green : 'Pendiente'.red

      console.log(`${idx} ${description} :: ${state} ${checkOn ? updatedAt.green : ''}`)
    })
  }

  deleteTask(id = '') {
    if(this.#list[id]) {
      delete this.#list[id]
      console.log('Tarea borrada correctamente'.green)
    }
  }

  toggleCheck(ids = []) {
    ids.forEach((id) => {
      const task = this.#list[id]
      if (!task.checkOn) {
        task.checkOn = true
        task.updatedAt = new Date().toISOString()
      }
    })

    this.listArray.forEach(task => {
      if (!ids.includes(task.id)) {
        this.#list[task.id].checkOn = false;
      }
    })
  }

  pendingOrCheckTasks(checked = true) {
    let idx = 0
    this.listArray.forEach(task => {
      const { description, checkOn, updatedAt = 'none' } = task
      const state = (checkOn) ? 'Completado'.green : 'Pendiente'.red
      if (checked) {
        if (checkOn) {
          idx++
          console.log(`${ (idx + '.').green } ${description} :: ${state} updatedAt: ${updatedAt.green}`)
        }
      } else {
        if (!checkOn) {
          idx++
          console.log(`${ (idx + '.').green } ${description} :: ${state}`)
        }
      }
    })
  }
}

module.exports = Tasks