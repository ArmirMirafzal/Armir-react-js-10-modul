// @ts-nocheck
import { faker } from "@faker-js/faker";
import { produce } from "immer";
import { legacy_createStore as createStore } from "redux";
const initialState = { todos: [] };

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "add-todo":
			return produce(state, (diff) => {
				const todo = {
					id: faker.string.uuid(),
					completed: false,
					description: action.payload.description,
				};
				diff.todos.push(todo);
			});

		case "delete-todo":
			return produce(state, (diff) => {
				const todoIdx = diff.todos.findIndex((todo) => todo.id === action.payload.id);
				diff.todos.splice(todoIdx, 1);
			});

		case "edit-todo":
			return produce(state, (diff) => {
				const todoIdx = state.todos.findIndex((todo) => todo.id === action.payload.id);
				diff.todos[todoIdx].description = action.payload.description;
			});

		default:
			return state;
	}
};

const store = createStore(reducer);

function listener() {
	const state = store.getState();
	console.log(state);
}

store.subscribe(listener);

store.dispatch({ type: "add-todo", payload: { description: "first todo" } });
store.dispatch({ type: "add-todo", payload: { description: "second todo" } });
store.dispatch({ type: "add-todo", payload: { description: "third todo" } });

const { todos } = store.getState();
store.dispatch({ type: "delete-todo", payload: { id: todos[0].id } });
