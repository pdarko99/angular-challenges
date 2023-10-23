import { createStore, select, setProps, withProps } from '@ngneat/elf';
import { Todo } from './todo';
import {
  getAllEntities,
  selectAllEntities,
  setEntities,
  withEntities,
} from '@ngneat/elf-entities';
import {
  withRequestsStatus,
  createRequestDataSource,
} from '@ngneat/elf-requests';

const todo = createStore(
  {
    name: 'todoStore',
  },
  withEntities<Todo>(),
  withProps<{
    loadingSingleTodo: boolean;
  }>({
    loadingSingleTodo: false,
  }),
  withRequestsStatus()
);

const todoDataSource = createRequestDataSource({
  data$: () => todo.pipe(selectAllEntities()),
  dataKey: 'todo',
  idleAsPending: true,
  requestKey: 'todo',
  store: todo,
});

export function setTodos(todos: Todo[]) {
  todo.update(setEntities(todos), todoDataSource.setSuccess());
}

export const selectTodo$ = todo.pipe(
  select((state) => ({ loading: state.loadingSingleTodo }))
);

export function setIsTodoLoading() {
  todo.update(
    setProps({
      loadingSingleTodo: true,
    })
  );
}

export function setNotLoading() {
  todo.update(
    setProps({
      loadingSingleTodo: false,
    })
  );
}

export function getTodos() {
  return todo.query(getAllEntities());
}

export const todoDataSource$ = todoDataSource.data$();

// export function setBooks(book: Book[]) {
//     bookStore.update(
//       // setEntities(book),
//       updateAllEntities((entity) => {
//         return entity.map((todo) => );
//       }),
//       bookDataSource.setSuccess(),
//       bookDataSource.setCached()
//     );
//   }

// todos: state.todos.map((t) => (t.id === todo.id ? todo : t)),

// todosStore.update(
//   updateAllEntities((entity) => ({ ...entity, count: entity.count + 1 }))
// );

// todosStore.update(updateEntities(id, (entity) => ({ ...entity, name })));
