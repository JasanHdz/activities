const inquirer = require('inquirer')
require('colors')

const inquirerMenu = async () => {
  console.clear()
  console.log('============================='.green)
  console.log('::: Seleccione una opción :::'.green)
  console.log('=============================\n'.green)

  const { option } = await inquirer.prompt([{
    type: 'list',
    name: 'option',
    message: '¿Qué desea hacer?',
    choices: [
      { value: 1, name: `${'1.'.green} Crear tarea` },
      { value: 2, name: `${'2.'.green} Listar tareas` },
      { value: 3, name: `${'3.'.green} Listar tareas completadas` },
      { value: 4, name: `${'4.'.green} Listar tareas pendientes` },
      { value: 5, name: `${'5.'.green} Completar tarea(s)` },
      { value: 6, name: `${'6.'.green} Borrar tarea` },
      { value: 0, name: `${'0.'.green} Salir` },
    ]
  }])

  return option
} 

const pause = async () => {
  console.log('\n')
  await inquirer.prompt([{
    type: 'input',
    name: 'n',
    message: `Presione ${'ENTER'.green} para continuar`
  }])
}

const readLine = async (message) => {
  const question = [{
    type: 'input',
    name: 'desc',
    message,
    validate(value) {
      if (!value.length) {
        return 'Por favor ingrese un valor'
      }
      return true
    }
  }]

  const { desc } = await inquirer.prompt(question)
  return desc
}

const deleteTaskList = async (tasks = []) => {
  const choices = tasks.map((task, idx) => ({
    value: task.id,
    name: `${(idx + 1 + '.').green} ${task.description}`
  }))
  choices.unshift({value: 0, name: `${'0'.green} Cancelar`})
  const questions = [{
    type: 'list',
    name: 'id',
    message: 'Borrar',
    choices
  }]

  const { id } = await inquirer.prompt(questions) 
  return id
}

const showCheckList = async (tasks = []) => {
  const choices = tasks.map((task, idx) => ({
    value: task.id,
    name: `${(idx + 1 + '.').green} ${task.description}`,
    checked: task.checkOn ? true : false
  }))
  
  const question = [{
    type: 'checkbox',
    name: 'ids',
    message: 'Selecciones',
    choices
  }]

  const { ids } = await inquirer.prompt(question) 
  return ids
}

const confirm = async (message) => {
  const question = [{
    type: 'confirm',
    name: 'ok',
    message
  }]
  const { ok } = await inquirer.prompt(question)
  return ok
}

module.exports = {
  inquirerMenu,
  pause,
  readLine,
  deleteTaskList,
  confirm,
  showCheckList
}