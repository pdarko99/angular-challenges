import { createStore, setProps, withProps } from '@ngneat/elf';
import { Todo } from './todo';
import {
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
    todo: Todo | null;
    loadingSingleTodo: boolean;
  }>({
    todo: null,
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

export function setTodo(inserted_todo: Todo) {
  todo.update(
    setProps({
      todo: inserted_todo,
    }),
    todoDataSource.setSuccess()
  );
}

export const todoDataSource$ = todoDataSource.data$();
