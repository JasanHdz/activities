require('colors')
const { inquirerMenu, pause, readLine, deleteTaskList, confirm, showCheckList } = require('./helpers/inquirer')
const { saveDB, readDB } = require('./helpers/save-file')
const Tasks = require('./models/tasks')

async function main() {
  let opt = true
  const tasks = new Tasks()
  const taskDB = readDB()
  if (taskDB) {
    tasks.loadDataFromArray(taskDB)
  }
  do {
    opt = await inquirerMenu()
    
    switch (opt) {
      case 1:
        const desc = await readLine('Descripción: ')
        console.log(desc)
        tasks.addTask(desc)
        break
      case 2: // listar Tareas
        tasks.list
        break
      case 3: // listar completas
        tasks.pendingOrCheckTasks(true)
        break
      case 4: // listar pendientes
        tasks.pendingOrCheckTasks(false)
        break
      case 5: // completado | pendiente
        const ids = await showCheckList(tasks.listArray)
        tasks.toggleCheck(ids)
        break
      case 6: // eliminar
        const id = await deleteTaskList(tasks.listArray)
        if(!id) break
        const ok = await confirm('¿Estas seguro que deseas borrar la tarea?')
        if (ok) tasks.deleteTask(id)
        break
      default:
        break
    }

    saveDB(tasks.listArray)
    await pause()
  } while(opt)
}

main()