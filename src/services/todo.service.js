import { getItemFromLocalStorage, updateLocalStorage } from '../utils/storage'

export const createTodo = (value) => {
	let list = getTodos()
	const newTodo = {
		id: list.length + 1,
		title: value,
		completed: false
	}

	list.push(newTodo)
	updateLocalStorage('TODO_LIST', list)
}

export const getTodos = () => {
	const list = getItemFromLocalStorage('TODO_LIST')
	return JSON.parse(list) || []
}

export const updateTodoById = (id) => {
	const list = getTodos()
	list.forEach((todo) => {
		if (todo.id === id) todo.completed = true
	})

	updateLocalStorage('TODO_LIST', list)
}

export const getActiveTodosCount = () => {
	const list = getTodos()
	const activeList = list.filter(todo => !todo.completed)
	return activeList.length
}

export const deleteTodoById = (id) => {
	const list = getTodos()
	const filteredList = list.filter((todo) => todo.id !== id)

	updateLocalStorage('TODO_LIST', filteredList)
}
