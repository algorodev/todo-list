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
