/*
import { createStore, select, setProps, withProps } from '@ngneat/elf';
import { Todo } from './todo';

import {
  withRequestsStatus,
  createRequestDataSource,
} from '@ngneat/elf-requests';

const todoItem = createStore(
  {
    name: 'todoItemStore',
  },
  withProps<{
    todo: Todo | undefined;
  }>({
    todo: undefined
  }),
  withRequestsStatus()
);

const todoItemDataSource = createRequestDataSource({
  data$: () => todoItem.pipe(select((state) => state.todo)),
  dataKey: 'todo',
  idleAsPending: true,
  requestKey: 'todo',
  store: todoItem,
});

export function setTodo(inserted_todo: Todo) {
  todoItem.update(
    setProps({
      todo: inserted_todo,
    }),
    todoItemDataSource.setSuccess()
  );
}

export const todoItemDataSource$ = todoItemDataSource.data$();


*/
