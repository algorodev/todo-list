export const updateLocalStorage = (key, item) => localStorage.setItem(key, JSON.stringify(item))

export const getItemFromLocalStorage = (key) => localStorage.getItem(key)
