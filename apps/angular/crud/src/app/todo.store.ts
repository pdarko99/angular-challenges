import { createStore } from '@ngneat/elf';
import {
  getAllEntities,
  selectAllEntities,
  selectEntity,
  setEntities,
  withEntities,
} from '@ngneat/elf-entities';
import {
  createRequestDataSource,
  withRequestsStatus,
} from '@ngneat/elf-requests';
import { Todo } from './todo';

const todosStore = createStore(
  {
    name: 'todosStore',
  },
  withEntities<Todo>(),
  withRequestsStatus()
);

const todosDataSource = createRequestDataSource({
  data$: () => todosStore.pipe(selectAllEntities()),
  dataKey: 'todo',
  idleAsPending: true,
  requestKey: 'todo',
  store: todosStore,
});

export const todoDataSource = createRequestDataSource({
  data$: (key: Todo['id']) => todosStore.pipe(selectEntity(key)),
  dataKey: 'todo',
  idleAsPending: true,
  requestStatusOptions: { groupKey: 'todos' },
  store: todosStore,
});

export function setTodos(todos: Todo[]) {
  todosStore.update(setEntities(todos), todosDataSource.setSuccess());
}

export function getTodos() {
  return todosStore.query(getAllEntities());
}

export const todosDataSource$ = todosDataSource.data$();

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
