import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';


export type TToDo = {
  title: string;
  isComplete: boolean;
};

type TToDoState = {
  todos: TToDo[];
};

type TToDoActions = {
  addTodo: (title: string) => void;
  markAsCompleted: (index: number) => void;
};

// const todoSlice: StateCreator<TToDoState & TToDoActions> = (set, get) => ({
//   todos: [],
//   addTodo: (title) => {
//     const { todos } = get();
//     set(state => ({ ...state, todos: [...todos, {title: title, isComplete: false}] }));
//   },
//   markAsCompleted: (index) => {
//     const { todos } = get();
//     const newTodos = [
//       ...todos.slice(0, index),
//       {...todos[index], isComplete: !todos[index].isComplete},
//       ...todos.slice(index + 1),
//     ];
//     set(state => ({ ...state, todos: newTodos }));
//   },
// });
//
// export const useTodoStore = create<TToDoState & TToDoActions>(
//   devtools(todoSlice, {
//     name: 'zustand/todo-storage',
//     serialize: {
//       options: true,
//     },
//   })
// );
export const useTodoStore = create<TToDoState & TToDoActions>()(
  devtools(
    (set, get) => ({
      todos: [],
      addTodo: (title) => {
        const { todos } = get();
        set(state => ({ ...state, todos: [...todos, {title: title, isComplete: false}] }));
      },
      markAsCompleted: (index) => {
        const { todos } = get();
        const newTodos = [
          ...todos.slice(0, index),
          {...todos[index], isComplete: !todos[index].isComplete},
          ...todos.slice(index + 1),
        ];
        set(state => ({ ...state, todos: newTodos }));
      },
    }),
    {
      name: 'zustand/todo-storage',
      serialize: {
        options: true,
      },
    }
  )
);
