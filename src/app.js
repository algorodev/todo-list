import { createTodo, getTodos } from './services/todo.service'
import * as element from './utils/elements'

let todoHTMLElements = ''
let todoItemsLength = 0

element.todoForm.addEventListener('submit', (event) => onCreateTodo(event))

element.formButton.addEventListener('click', (event) => onCreateTodo(event))

export const onCreateTodo = (event) => {
	event.preventDefault()
	if (element.titleFormControl.value === '') return

	createTodo(element.titleFormControl.value)
	element.titleFormControl.value = null

	loadTodoList()
}

export const refreshList = () => {
	element.listContainer.innerHTML = todoHTMLElements
	element.listLength.textContent = todoItemsLength + ''
	todoHTMLElements = ''
}

export const loadTodoList = () => {
	const todoList = getTodos()

	todoList.map((todo) => {
		++todoItemsLength
		todoHTMLElements += `<div class="todo-item"><p id="todo_item_${todo.id}">${todo.title}</p><button id="todo_item_${todo.id}_delete_button" class="todo-item__action"><label for="todo_item_${todo.id}_delete_button" class="todo-item__label-action material-symbols-outlined" onclick="deleteTodoById(${todo.id})">delete</label></button></div>`
	})

	refreshList()
}

loadTodoList()
