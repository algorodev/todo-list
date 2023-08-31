import { createTodo, deleteTodoById, getActiveTodosCount, getTodos, updateTodoById } from './services/todo.service'
import * as element from './utils/elements'

let todoHTMLElements = ''
let activeTab = 'all'
let activeTodos = []

element.todoForm.addEventListener('submit', (event) => onCreateTodo(event))

element.formButton.addEventListener('click', (event) => onCreateTodo(event))

element.allTodosTab.addEventListener('click', () => {
	activeTab = 'all'
	element.allTodosTab.classList.add('tab-menu__button--active')
	element.activeTodosTab.classList.remove('tab-menu__button--active')
	element.completedTodosTab.classList.remove('tab-menu__button--active')

	loadTodoList()
})

element.activeTodosTab.addEventListener('click', () => {
	activeTab = 'active'
	element.activeTodosTab.classList.add('tab-menu__button--active')
	element.allTodosTab.classList.remove('tab-menu__button--active')
	element.completedTodosTab.classList.remove('tab-menu__button--active')

	loadTodoList()
})

element.completedTodosTab.addEventListener('click', () => {
	activeTab = 'completed'
	element.completedTodosTab.classList.add('tab-menu__button--active')
	element.allTodosTab.classList.remove('tab-menu__button--active')
	element.activeTodosTab.classList.remove('tab-menu__button--active')

	loadTodoList()
})

export const onCreateTodo = (event) => {
	event.preventDefault()
	if (element.titleFormControl.value === '') return

	createTodo(element.titleFormControl.value)
	element.titleFormControl.value = null

	loadTodoList()
}

export const refreshList = () => {
	element.listContainer.innerHTML = todoHTMLElements
	element.listLength.textContent = getActiveTodosCount()
}

export const loadTodoList = () => {
	const todoList = getTodos()

	todoList.map((todo) => {
		if (activeTab === 'active' && todo.completed || activeTab === 'completed' && !todo.completed) return

		activeTodos.push(todo)

		todoHTMLElements += `<div id="todo_item_${todo.id}" class="todo-item ${todo.completed ? 'todo-item--completed' : ''}">
													<p>${todo.title}</p>
													<button id="todo_item_${todo.id}_delete_button" class="todo-item__action">
														<label for="todo_item_${todo.id}_delete_button" class="todo-item__label-action material-symbols-outlined">delete</label>
													</button>
												</div>`
	})

	refreshList()
	addListenersToTodoItems()
	resetValues()
}

export const addListenersToTodoItems = () => {
	if (activeTodos.length === 0) return

	for (const todo of activeTodos) {
		document.getElementById(`todo_item_${todo.id}`).addEventListener('click', () => {
			if (!todo.completed) updateTodoById(todo.id)
			if (todo.completed) deleteTodoById(todo.id)

			loadTodoList()
		})
	}
}

export const resetValues = () => {
	todoHTMLElements = ''
	activeTodos = []
}

loadTodoList()
