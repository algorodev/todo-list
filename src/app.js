import { createTodo, getTodos } from './services/todo.service'

const titleFormControl = document.getElementById('form_input')
const formButton = document.getElementById('form_button')
const listContainer = document.getElementById('list_container')
const listLength = document.getElementById('todo_list_length')
const todoForm = document.getElementById('todo_form')

todoForm.addEventListener('submit', (event) => {
	event.preventDefault()
	if (titleFormControl.value === '') return

	createTodo(titleFormControl.value)
	titleFormControl.value = null

	loadTodoList()
})

formButton.addEventListener('click', () => {
	if (titleFormControl.value === '') return

	createTodo(titleFormControl.value)
	titleFormControl.value = null

	loadTodoList()
})

export const refreshList = (list, index) => {
	listContainer.innerHTML = list
	listLength.textContent = index
}

export const loadTodoList = () => {
	const todoList = getTodos()
	let listItems = ''

	todoList.map((todo) => {
		listItems += `<div class="todo-item"><p id="todo_item_${todo.id}">${todo.title}</p><button id="todo_item_${todo.id}_delete_button" class="todo-item__action"><label for="todo_item_${todo.id}_delete_button" class="todo-item__label-action material-symbols-outlined" onclick="deleteTodoById(${todo.id})">delete</label></button></div>`
	})

	refreshList(listItems, todoList.length)
}

loadTodoList()
